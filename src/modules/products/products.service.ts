import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto, QueryProductDto } from './dto';
import { PaginatedResponseDto } from '../../common/dto';

/**
 * Servicio para gestionar productos de restaurantes
 * Los productos pertenecen directamente a un restaurante (no a un menu)
 */
@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crear nuevo producto para un restaurante
   */
  async create(restaurantId: string, createProductDto: CreateProductDto) {
    await this.verifyRestaurantExists(restaurantId);

    const product = await this.prisma.product.create({
      data: {
        ...createProductDto,
        restaurantId,
      },
    });

    return this.formatProduct(product);
  }

  /**
   * Obtener todos los productos de un restaurante con filtros y paginacion
   */
  async findAll(restaurantId: string, query: QueryProductDto) {
    await this.verifyRestaurantExists(restaurantId);

    const {
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      order = 'desc',
      search,
      category,
      isAvailable,
      isActive,
      priceMin,
      priceMax,
    } = query;

    const where: any = { restaurantId };

    // Filtro de busqueda por nombre o descripcion
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Filtro por categoria
    if (category) {
      where.category = { contains: category, mode: 'insensitive' };
    }

    // Filtro por disponibilidad
    if (isAvailable !== undefined) {
      where.isAvailable = isAvailable;
    }

    // Filtro por estado activo
    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    // Filtro por rango de precios
    if (priceMin !== undefined || priceMax !== undefined) {
      where.price = {};
      if (priceMin !== undefined) {
        where.price.gte = priceMin;
      }
      if (priceMax !== undefined) {
        where.price.lte = priceMax;
      }
    }

    const total = await this.prisma.product.count({ where });

    const products = await this.prisma.product.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { [sortBy]: order },
    });

    const formattedProducts = products.map((p) => this.formatProduct(p));

    return new PaginatedResponseDto(formattedProducts, page, limit, total);
  }

  /**
   * Obtener producto por ID
   */
  async findOne(restaurantId: string, id: string) {
    await this.verifyRestaurantExists(restaurantId);

    const product = await this.prisma.product.findFirst({
      where: { id, restaurantId },
    });

    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    return this.formatProduct(product);
  }

  /**
   * Actualizar producto existente
   */
  async update(
    restaurantId: string,
    id: string,
    updateProductDto: UpdateProductDto,
  ) {
    await this.findOne(restaurantId, id);

    const product = await this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });

    return this.formatProduct(product);
  }

  /**
   * Eliminar producto
   */
  async remove(restaurantId: string, id: string) {
    await this.findOne(restaurantId, id);

    await this.prisma.product.delete({
      where: { id },
    });

    return { message: 'Producto eliminado exitosamente' };
  }

  // ============================================
  // METODOS PRIVADOS
  // ============================================

  /**
   * Verificar que el restaurante existe
   */
  private async verifyRestaurantExists(restaurantId: string) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: restaurantId },
    });

    if (!restaurant) {
      throw new NotFoundException(
        `Restaurante con ID ${restaurantId} no encontrado`,
      );
    }

    return restaurant;
  }

  /**
   * Formatear producto para respuesta de la API
   */
  private formatProduct(product: any) {
    return {
      id: product.id,
      restaurantId: product.restaurantId,
      name: product.name,
      description: product.description,
      price: parseFloat(product.price.toString()),
      imageUrl: product.imageUrl,
      category: product.category,
      isAvailable: product.isAvailable,
      isActive: product.isActive,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
