import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateRestaurantDto,
  UpdateRestaurantDto,
  QueryRestaurantDto,
} from './dto';
import { PaginatedResponseDto } from '../../common/dto';

/**
 * Servicio para gestionar restaurantes
 * Proporciona operaciones CRUD completas con paginacion y filtros
 */
@Injectable()
export class RestaurantsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crear nuevo restaurante
   * Genera slug automaticamente si no se proporciona
   */
  async create(createRestaurantDto: CreateRestaurantDto) {
    const { categoryIds, ...data } = createRestaurantDto;

    // Generar slug si no se proporciona
    const slug = data.slug || this.generateSlug(data.name);

    // Verificar que el slug no exista
    const existing = await this.prisma.restaurant.findUnique({
      where: { slug },
    });

    if (existing) {
      throw new ConflictException(
        `Ya existe un restaurante con el slug: ${slug}`,
      );
    }

    // Crear restaurante con categorias
    const restaurant = await this.prisma.restaurant.create({
      data: {
        ...data,
        slug,
        categories: categoryIds?.length
          ? {
              create: categoryIds.map((categoryId, index) => ({
                categoryId,
                isPrimary: index === 0,
              })),
            }
          : undefined,
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    return this.formatRestaurant(restaurant);
  }

  /**
   * Obtener todos los restaurantes con filtros y paginacion
   */
  async findAll(query: QueryRestaurantDto) {
    const {
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      order = 'desc',
      search,
      city,
      category,
      priceRange,
      ratingMin,
      isActive,
    } = query;

    const where: any = {};

    // Filtro de busqueda
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Filtro por ciudad
    if (city) {
      where.addresses = {
        some: { city: { contains: city, mode: 'insensitive' } },
      };
    }

    // Filtro por categoria
    if (category) {
      where.categories = {
        some: { category: { slug: category } },
      };
    }

    // Filtro por rango de precios
    if (priceRange) {
      where.priceRange = priceRange;
    }

    // Filtro por rating minimo
    if (ratingMin !== undefined) {
      where.rating = { gte: ratingMin };
    }

    // Filtro por estado activo
    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    // Contar total
    const total = await this.prisma.restaurant.count({ where });

    // Obtener registros
    const restaurants = await this.prisma.restaurant.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { [sortBy]: order },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        addresses: {
          where: { isMain: true },
          take: 1,
        },
      },
    });

    const formattedRestaurants = restaurants.map((r) =>
      this.formatRestaurant(r),
    );

    return new PaginatedResponseDto(formattedRestaurants, page, limit, total);
  }

  /**
   * Obtener restaurante por ID
   */
  async findOne(id: string) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        addresses: true,
        products: {
          where: { isActive: true },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!restaurant) {
      throw new NotFoundException(`Restaurante con ID ${id} no encontrado`);
    }

    return this.formatRestaurantDetailed(restaurant);
  }

  /**
   * Obtener restaurante por slug
   */
  async findBySlug(slug: string) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { slug },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        addresses: true,
        products: {
          where: { isActive: true },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!restaurant) {
      throw new NotFoundException(`Restaurante con slug ${slug} no encontrado`);
    }

    return this.formatRestaurantDetailed(restaurant);
  }

  /**
   * Actualizar restaurante
   */
  async update(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    const { categoryIds, ...data } = updateRestaurantDto;

    // Verificar que existe
    await this.findOne(id);

    // Si cambia el slug, verificar que no exista
    if (data.slug) {
      const existing = await this.prisma.restaurant.findFirst({
        where: {
          slug: data.slug,
          NOT: { id },
        },
      });

      if (existing) {
        throw new ConflictException(
          `Ya existe un restaurante con el slug: ${data.slug}`,
        );
      }
    }

    // Actualizar con transaccion si hay categorias
    const restaurant = await this.prisma.$transaction(async (tx) => {
      // Si se proporcionan categorias, actualizar
      if (categoryIds !== undefined) {
        // Eliminar categorias existentes
        await tx.restaurantCategory.deleteMany({
          where: { restaurantId: id },
        });

        // Agregar nuevas categorias
        if (categoryIds.length > 0) {
          await tx.restaurantCategory.createMany({
            data: categoryIds.map((categoryId, index) => ({
              restaurantId: id,
              categoryId,
              isPrimary: index === 0,
            })),
          });
        }
      }

      // Actualizar restaurante
      return tx.restaurant.update({
        where: { id },
        data,
        include: {
          categories: {
            include: {
              category: true,
            },
          },
        },
      });
    });

    return this.formatRestaurant(restaurant);
  }

  /**
   * Eliminar restaurante
   */
  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.restaurant.delete({
      where: { id },
    });

    return { message: 'Restaurante eliminado exitosamente' };
  }

  // ============================================
  // METODOS PRIVADOS
  // ============================================

  /**
   * Generar slug a partir del nombre
   */
  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remover acentos
      .replace(/[^a-z0-9\s-]/g, '') // Solo letras, numeros, espacios y guiones
      .replace(/\s+/g, '-') // Espacios a guiones
      .replace(/-+/g, '-') // Multiples guiones a uno
      .trim();
  }

  /**
   * Formatear restaurante para respuesta basica
   */
  private formatRestaurant(restaurant: any) {
    return {
      id: restaurant.id,
      name: restaurant.name,
      slug: restaurant.slug,
      description: restaurant.description,
      phone: restaurant.phone,
      email: restaurant.email,
      website: restaurant.website,
      logoUrl: restaurant.logoUrl,
      coverImageUrl: restaurant.coverImageUrl,
      rating: parseFloat(restaurant.rating?.toString() || '0'),
      priceRange: restaurant.priceRange,
      isActive: restaurant.isActive,
      openingYear: restaurant.openingYear,
      categories: restaurant.categories?.map((rc: any) => ({
        id: rc.category.id,
        name: rc.category.name,
        slug: rc.category.slug,
        isPrimary: rc.isPrimary,
      })),
      address: restaurant.addresses?.[0]
        ? {
            streetAddress: restaurant.addresses[0].streetAddress,
            city: restaurant.addresses[0].city,
            stateProvince: restaurant.addresses[0].stateProvince,
            postalCode: restaurant.addresses[0].postalCode,
            country: restaurant.addresses[0].country,
          }
        : null,
      createdAt: restaurant.createdAt,
      updatedAt: restaurant.updatedAt,
    };
  }

  /**
   * Formatear restaurante para respuesta detallada
   */
  private formatRestaurantDetailed(restaurant: any) {
    return {
      ...this.formatRestaurant(restaurant),
      addresses: restaurant.addresses?.map((a: any) => ({
        id: a.id,
        streetAddress: a.streetAddress,
        city: a.city,
        stateProvince: a.stateProvince,
        postalCode: a.postalCode,
        country: a.country,
        latitude: a.latitude ? parseFloat(a.latitude.toString()) : null,
        longitude: a.longitude ? parseFloat(a.longitude.toString()) : null,
        isMain: a.isMain,
      })),
      products: restaurant.products?.map((p: any) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: parseFloat(p.price.toString()),
        imageUrl: p.imageUrl,
        category: p.category,
        isAvailable: p.isAvailable,
      })),
    };
  }
}
