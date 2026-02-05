import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

/**
 * Servicio de administracion
 * Proporciona funcionalidades administrativas del sistema
 *
 * TODO: Implementar logica de negocio para todas las funcionalidades
 */
@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Obtener estadisticas del dashboard de administracion
   */
  async getDashboardStats() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Ejecutar consultas en paralelo para optimizar rendimiento
    const [
      totalUsers,
      totalRestaurants,
      totalOrders,
      totalReservations,
      revenueResult,
      newUsersThisMonth,
      newRestaurantsThisMonth,
      ordersByStatus,
      reservationsByStatus,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.restaurant.count({ where: { isActive: true } }),
      this.prisma.order.count(),
      this.prisma.reservation.count(),
      this.prisma.order.aggregate({
        _sum: { total: true },
        where: { status: { not: 'cancelled' } },
      }),
      this.prisma.user.count({ where: { createdAt: { gte: startOfMonth } } }),
      this.prisma.restaurant.count({ where: { createdAt: { gte: startOfMonth } } }),
      this.prisma.order.groupBy({
        by: ['status'],
        _count: { status: true },
      }),
      this.prisma.reservation.groupBy({
        by: ['status'],
        _count: { status: true },
      }),
    ]);

    const revenue = revenueResult._sum.total
      ? parseFloat(revenueResult._sum.total.toString())
      : 0;

    return {
      totalUsers,
      totalRestaurants,
      totalOrders,
      totalReservations,
      revenue,
      newUsersThisMonth,
      newRestaurantsThisMonth,
      ordersByStatus: ordersByStatus.reduce(
        (acc, item) => ({ ...acc, [item.status]: item._count.status }),
        {},
      ),
      reservationsByStatus: reservationsByStatus.reduce(
        (acc, item) => ({ ...acc, [item.status]: item._count.status }),
        {},
      ),
    };
  }

  /**
   * Listar todos los usuarios del sistema con paginacion
   */
  async listUsers(query?: {
    page?: number;
    limit?: number;
    role?: string;
    search?: string;
  }) {
    const { page = 1, limit = 20, role, search } = query || {};

    const where: any = {};

    if (role) {
      where.role = role;
    }

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data: users,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Cambiar el rol de un usuario
   */
  async updateUserRole(userId: string, newRole: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }

    const validRoles = ['USER', 'ADMIN', 'RESTAURANT_OWNER'];
    if (!validRoles.includes(newRole)) {
      throw new BadRequestException(
        `Rol no valido. Roles permitidos: ${validRoles.join(', ')}`,
      );
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        updatedAt: true,
      },
    });

    return updatedUser;
  }

  /**
   * Cambiar el estado activo de un usuario
   */
  async updateUserStatus(userId: string, isActive: boolean) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { isActive },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        updatedAt: true,
      },
    });

    return updatedUser;
  }

  /**
   * Cambiar el estado de un restaurante
   */
  async updateRestaurantStatus(restaurantId: string, isActive: boolean) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: restaurantId },
    });

    if (!restaurant) {
      throw new NotFoundException(
        `Restaurante con ID ${restaurantId} no encontrado`,
      );
    }

    const updated = await this.prisma.restaurant.update({
      where: { id: restaurantId },
      data: { isActive },
    });

    return {
      id: updated.id,
      name: updated.name,
      isActive: updated.isActive,
      updatedAt: updated.updatedAt,
    };
  }
}
