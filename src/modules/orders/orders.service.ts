import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { PaginatedResponseDto } from '../../common/dto';

/**
 * Servicio para gestionar pedidos
 */
@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crear nuevo pedido
   * Genera automaticamente el numero de orden (ORD-XXXXXX)
   */
  async create(createOrderDto: CreateOrderDto) {
    const { restaurantId, ...orderData } = createOrderDto;

    await this.verifyRestaurantExists(restaurantId);

    // Generar numero de orden unico
    const orderNumber = await this.generateOrderNumber();

    // Calcular subtotales de items y totales del pedido
    const items = orderData.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      subtotal: item.quantity * item.unitPrice,
      notes: item.notes,
    }));

    const subtotal = items.reduce((acc, item) => acc + item.subtotal, 0);
    const tax = subtotal * 0.16; // IVA 16%
    const total = subtotal + tax;

    const order = await this.prisma.order.create({
      data: {
        restaurantId,
        userId: orderData.userId,
        tableId: orderData.tableId,
        orderNumber,
        status: 'pending',
        subtotal,
        tax,
        total,
        notes: orderData.notes,
        items: {
          create: items,
        },
      },
      include: {
        items: true,
      },
    });

    return this.formatOrder(order);
  }

  /**
   * Obtener todos los pedidos con paginacion y filtros
   */
  async findAll(query: {
    page?: number;
    limit?: number;
    restaurantId?: string;
    userId?: string;
    status?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
  }) {
    const {
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      order = 'desc',
      restaurantId,
      userId,
      status,
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

    const total = await this.prisma.order.count({ where });

    const orders = await this.prisma.order.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { [sortBy]: order },
      include: {
        items: true,
      },
    });

    const formattedOrders = orders.map((o) => this.formatOrder(o));

    return new PaginatedResponseDto(formattedOrders, page, limit, total);
  }

  /**
   * Obtener pedido por ID
   */
  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });

    if (!order) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    }

    return this.formatOrder(order);
  }

  /**
   * Actualizar estado del pedido
   */
  async update(id: string, updateOrderDto: UpdateOrderDto) {
    await this.findOne(id);

    const order = await this.prisma.order.update({
      where: { id },
      data: updateOrderDto,
      include: {
        items: true,
      },
    });

    return this.formatOrder(order);
  }

  /**
   * Cancelar pedido (soft delete - cambia estado a cancelled)
   */
  async remove(id: string) {
    await this.findOne(id);

    const order = await this.prisma.order.update({
      where: { id },
      data: { status: 'cancelled' },
      include: {
        items: true,
      },
    });

    return this.formatOrder(order);
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
   * Generar numero de orden unico (ORD-XXXXXX)
   */
  private async generateOrderNumber(): Promise<string> {
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
    const orderNumber = `ORD-${randomPart}`;

    // Verificar que no exista ya este numero de orden
    const existing = await this.prisma.order.findUnique({
      where: { orderNumber },
    });

    if (existing) {
      // Si existe, generar uno nuevo recursivamente
      return this.generateOrderNumber();
    }

    return orderNumber;
  }

  /**
   * Formatear pedido para respuesta de la API
   */
  private formatOrder(order: any) {
    return {
      id: order.id,
      restaurantId: order.restaurantId,
      userId: order.userId,
      tableId: order.tableId,
      orderNumber: order.orderNumber,
      status: order.status,
      subtotal: parseFloat(order.subtotal.toString()),
      tax: parseFloat(order.tax.toString()),
      total: parseFloat(order.total.toString()),
      notes: order.notes,
      items: order.items?.map((item: any) => ({
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: parseFloat(item.unitPrice.toString()),
        subtotal: parseFloat(item.subtotal.toString()),
        notes: item.notes,
      })),
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }
}
