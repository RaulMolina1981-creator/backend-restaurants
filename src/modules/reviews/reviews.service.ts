import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateReviewDto, UpdateReviewDto } from './dto';
import { PaginatedResponseDto } from '../../common/dto';

/**
 * Servicio para gestionar resenas de restaurantes
 * Las resenas pertenecen a un restaurante y son creadas por usuarios
 */
@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crear nueva resena para un restaurante
   */
  async create(restaurantId: string, createReviewDto: CreateReviewDto) {
    await this.verifyRestaurantExists(restaurantId);

    const reviewData: any = {
      restaurantId,
      userId: createReviewDto.userId,
      rating: createReviewDto.rating,
      title: createReviewDto.title,
      comment: createReviewDto.comment,
      isVisible: true,
    };

    // Convertir fecha de visita si viene en el DTO
    if (createReviewDto.visitDate) {
      reviewData.visitDate = new Date(createReviewDto.visitDate);
    }

    const review = await this.prisma.review.create({
      data: reviewData,
    });

    return this.formatReview(review);
  }

  /**
   * Obtener todas las resenas de un restaurante con paginacion
   */
  async findAll(
    restaurantId: string,
    query: {
      page?: number;
      limit?: number;
      rating?: number;
      isVisible?: boolean;
      sortBy?: string;
      order?: 'asc' | 'desc';
    },
  ) {
    await this.verifyRestaurantExists(restaurantId);

    const {
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      order = 'desc',
      rating,
      isVisible,
    } = query;

    const where: any = { restaurantId };

    // Filtro por calificacion
    if (rating !== undefined) {
      where.rating = rating;
    }

    // Filtro por visibilidad
    if (isVisible !== undefined) {
      where.isVisible = isVisible;
    }

    const total = await this.prisma.review.count({ where });

    const reviews = await this.prisma.review.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { [sortBy]: order },
    });

    const formattedReviews = reviews.map((r) => this.formatReview(r));

    return new PaginatedResponseDto(formattedReviews, page, limit, total);
  }

  /**
   * Obtener resena por ID
   */
  async findOne(restaurantId: string, id: string) {
    await this.verifyRestaurantExists(restaurantId);

    const review = await this.prisma.review.findFirst({
      where: { id, restaurantId },
    });

    if (!review) {
      throw new NotFoundException(`Resena con ID ${id} no encontrada`);
    }

    return this.formatReview(review);
  }

  /**
   * Actualizar resena existente
   */
  async update(
    restaurantId: string,
    id: string,
    updateReviewDto: UpdateReviewDto,
  ) {
    await this.findOne(restaurantId, id);

    const updateData: any = { ...updateReviewDto };

    // Convertir fecha de visita si viene en el DTO
    if (updateReviewDto.visitDate) {
      updateData.visitDate = new Date(updateReviewDto.visitDate);
    }

    const review = await this.prisma.review.update({
      where: { id },
      data: updateData,
    });

    return this.formatReview(review);
  }

  /**
   * Eliminar resena (hard delete)
   */
  async remove(restaurantId: string, id: string) {
    await this.findOne(restaurantId, id);

    await this.prisma.review.delete({
      where: { id },
    });

    return { message: 'Resena eliminada exitosamente' };
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
   * Formatear resena para respuesta de la API
   */
  private formatReview(review: any) {
    return {
      id: review.id,
      restaurantId: review.restaurantId,
      userId: review.userId,
      rating: review.rating,
      title: review.title,
      comment: review.comment,
      visitDate: review.visitDate,
      isVisible: review.isVisible,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    };
  }
}
