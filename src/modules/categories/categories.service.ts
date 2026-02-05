import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto, QueryCategoryDto } from './dto';
import { PaginatedResponseDto } from '../../common/dto';

/**
 * Servicio para gestionar categorias de restaurantes
 * Proporciona operaciones CRUD completas con paginacion y filtros
 */
@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crear nueva categoria
   * Genera slug automaticamente si no se proporciona
   */
  async create(createCategoryDto: CreateCategoryDto) {
    // Generar slug si no se proporciona
    const slug =
      createCategoryDto.slug || this.generateSlug(createCategoryDto.name);

    // Verificar que el slug no exista
    const existing = await this.prisma.category.findUnique({
      where: { slug },
    });

    if (existing) {
      throw new ConflictException(
        `Ya existe una categoria con el slug: ${slug}`,
      );
    }

    // Verificar que el nombre no exista
    const existingName = await this.prisma.category.findUnique({
      where: { name: createCategoryDto.name },
    });

    if (existingName) {
      throw new ConflictException(
        `Ya existe una categoria con el nombre: ${createCategoryDto.name}`,
      );
    }

    const category = await this.prisma.category.create({
      data: {
        ...createCategoryDto,
        slug,
      },
      include: {
        _count: {
          select: { restaurants: true },
        },
      },
    });

    return this.formatCategory(category);
  }

  /**
   * Obtener todas las categorias con filtros y paginacion
   */
  async findAll(query: QueryCategoryDto) {
    const {
      page = 1,
      limit = 20,
      sortBy = 'name',
      order = 'asc',
      search,
    } = query;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const total = await this.prisma.category.count({ where });

    const categories = await this.prisma.category.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { [sortBy]: order },
      include: {
        _count: {
          select: { restaurants: true },
        },
      },
    });

    const formattedCategories = categories.map((c) => this.formatCategory(c));

    return new PaginatedResponseDto(formattedCategories, page, limit, total);
  }

  /**
   * Obtener categoria por ID
   */
  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { restaurants: true },
        },
      },
    });

    if (!category) {
      throw new NotFoundException(`Categoria con ID ${id} no encontrada`);
    }

    return this.formatCategory(category);
  }

  /**
   * Obtener categoria por slug
   */
  async findBySlug(slug: string) {
    const category = await this.prisma.category.findUnique({
      where: { slug },
      include: {
        _count: {
          select: { restaurants: true },
        },
      },
    });

    if (!category) {
      throw new NotFoundException(`Categoria con slug ${slug} no encontrada`);
    }

    return this.formatCategory(category);
  }

  /**
   * Actualizar categoria
   */
  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne(id);

    // Si cambia el slug, verificar que no exista
    if (updateCategoryDto.slug) {
      const existing = await this.prisma.category.findFirst({
        where: {
          slug: updateCategoryDto.slug,
          NOT: { id },
        },
      });

      if (existing) {
        throw new ConflictException(
          `Ya existe una categoria con el slug: ${updateCategoryDto.slug}`,
        );
      }
    }

    // Si cambia el nombre, verificar que no exista
    if (updateCategoryDto.name) {
      const existingName = await this.prisma.category.findFirst({
        where: {
          name: updateCategoryDto.name,
          NOT: { id },
        },
      });

      if (existingName) {
        throw new ConflictException(
          `Ya existe una categoria con el nombre: ${updateCategoryDto.name}`,
        );
      }
    }

    const category = await this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
      include: {
        _count: {
          select: { restaurants: true },
        },
      },
    });

    return this.formatCategory(category);
  }

  /**
   * Eliminar categoria
   */
  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.category.delete({
      where: { id },
    });

    return { message: 'Categoria eliminada exitosamente' };
  }

  // ============================================
  // METODOS PRIVADOS
  // ============================================

  /**
   * Generar slug a partir del nombre
   * Convierte caracteres especiales y espacios a formato URL amigable
   */
  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  /**
   * Formatear categoria para respuesta de la API
   */
  private formatCategory(category: any) {
    return {
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      iconUrl: category.iconUrl,
      restaurantCount: category._count?.restaurants || 0,
      createdAt: category.createdAt,
    };
  }
}
