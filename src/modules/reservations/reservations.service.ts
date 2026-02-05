import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateReservationDto, UpdateReservationDto } from './dto';
import { PaginatedResponseDto } from '../../common/dto';

/**
 * Servicio para gestionar reservaciones
 */
@Injectable()
export class ReservationsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crear nueva reservacion
   */
  async create(createReservationDto: CreateReservationDto) {
    const { restaurantId, ...reservationData } = createReservationDto;

    await this.verifyRestaurantExists(restaurantId);

    const reservation = await this.prisma.reservation.create({
      data: {
        restaurantId,
        userId: reservationData.userId,
        tableId: reservationData.tableId,
        guestName: reservationData.guestName,
        guestEmail: reservationData.guestEmail,
        guestPhone: reservationData.guestPhone,
        partySize: reservationData.partySize,
        reservationDate: new Date(reservationData.reservationDate),
        reservationTime: reservationData.reservationTime,
        status: 'pending',
        specialRequests: reservationData.specialRequests,
      },
    });

    return this.formatReservation(reservation);
  }

  /**
   * Obtener todas las reservaciones con paginacion y filtros
   */
  async findAll(query: {
    page?: number;
    limit?: number;
    restaurantId?: string;
    userId?: string;
    status?: string;
    date?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
  }) {
    const {
      page = 1,
      limit = 20,
      sortBy = 'reservationDate',
      order = 'asc',
      restaurantId,
      userId,
      status,
      date,
    } = query;

    const where: any = {};

    // Filtros opcionales
    if (restaurantId) {
      where.restaurantId = restaurantId;
    }
    if (userId) {
      where.userId = userId;
    }
    if (status) {
      where.status = status;
    }

    // Filtro por fecha
    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      where.reservationDate = {
        gte: startDate,
        lte: endDate,
      };
    }

    const total = await this.prisma.reservation.count({ where });

    const reservations = await this.prisma.reservation.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { [sortBy]: order },
    });

    const formattedReservations = reservations.map((r) => this.formatReservation(r));

    return new PaginatedResponseDto(formattedReservations, page, limit, total);
  }

  /**
   * Obtener reservacion por ID
   */
  async findOne(id: string) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id },
    });

    if (!reservation) {
      throw new NotFoundException(`Reservacion con ID ${id} no encontrada`);
    }

    return this.formatReservation(reservation);
  }

  /**
   * Actualizar reservacion existente
   */
  async update(id: string, updateReservationDto: UpdateReservationDto) {
    await this.findOne(id);

    const updateData: any = { ...updateReservationDto };

    // Convertir fecha si viene en el DTO
    if (updateReservationDto.reservationDate) {
      updateData.reservationDate = new Date(updateReservationDto.reservationDate);
    }

    const reservation = await this.prisma.reservation.update({
      where: { id },
      data: updateData,
    });

    return this.formatReservation(reservation);
  }

  /**
   * Cancelar reservacion (soft delete - cambia estado a cancelled)
   */
  async remove(id: string) {
    await this.findOne(id);

    const reservation = await this.prisma.reservation.update({
      where: { id },
      data: { status: 'cancelled' },
    });

    return this.formatReservation(reservation);
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
   * Formatear reservacion para respuesta de la API
   */
  private formatReservation(reservation: any) {
    return {
      id: reservation.id,
      restaurantId: reservation.restaurantId,
      userId: reservation.userId,
      tableId: reservation.tableId,
      guestName: reservation.guestName,
      guestEmail: reservation.guestEmail,
      guestPhone: reservation.guestPhone,
      partySize: reservation.partySize,
      reservationDate: reservation.reservationDate,
      reservationTime: reservation.reservationTime,
      status: reservation.status,
      specialRequests: reservation.specialRequests,
      createdAt: reservation.createdAt,
      updatedAt: reservation.updatedAt,
    };
  }
}
