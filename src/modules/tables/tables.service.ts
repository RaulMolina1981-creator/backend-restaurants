import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTableDto, UpdateTableDto } from './dto';

/**
 * Servicio para gestionar mesas de restaurantes
 * Proporciona operaciones CRUD completas
 */
@Injectable()
export class TablesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crear una nueva mesa para un restaurante
   * @param restaurantId - ID del restaurante
   * @param createTableDto - Datos de la mesa a crear
   */
  async create(restaurantId: string, createTableDto: CreateTableDto) {
    // Verificar que el restaurante existe
    await this.validateRestaurantExists(restaurantId);

    // Verificar que no exista una mesa con el mismo numero en el restaurante
    const existingTable = await this.prisma.table.findFirst({
      where: {
        restaurantId,
        tableNumber: createTableDto.tableNumber,
      },
    });

    if (existingTable) {
      throw new ConflictException(
        `Ya existe una mesa con el numero "${createTableDto.tableNumber}" en este restaurante`,
      );
    }

    const table = await this.prisma.table.create({
      data: {
        ...createTableDto,
        restaurantId,
      },
    });

    return this.formatTable(table);
  }

  /**
   * Obtener todas las mesas de un restaurante
   * @param restaurantId - ID del restaurante
   */
  async findAll(restaurantId: string) {
    // Verificar que el restaurante existe
    await this.validateRestaurantExists(restaurantId);

    const tables = await this.prisma.table.findMany({
      where: { restaurantId },
      orderBy: { tableNumber: 'asc' },
    });

    return tables.map((table) => this.formatTable(table));
  }

  /**
   * Obtener una mesa por ID
   * @param restaurantId - ID del restaurante
   * @param id - ID de la mesa
   */
  async findOne(restaurantId: string, id: string) {
    const table = await this.prisma.table.findFirst({
      where: {
        id,
        restaurantId,
      },
    });

    if (!table) {
      throw new NotFoundException(
        `Mesa con ID ${id} no encontrada en el restaurante`,
      );
    }

    return this.formatTable(table);
  }

  /**
   * Actualizar una mesa existente
   * @param restaurantId - ID del restaurante
   * @param id - ID de la mesa
   * @param updateTableDto - Datos a actualizar
   */
  async update(restaurantId: string, id: string, updateTableDto: UpdateTableDto) {
    // Verificar que la mesa existe
    await this.findOne(restaurantId, id);

    // Si se cambia el numero de mesa, verificar que no exista otra con ese numero
    if (updateTableDto.tableNumber) {
      const existingTable = await this.prisma.table.findFirst({
        where: {
          restaurantId,
          tableNumber: updateTableDto.tableNumber,
          NOT: { id },
        },
      });

      if (existingTable) {
        throw new ConflictException(
          `Ya existe una mesa con el numero "${updateTableDto.tableNumber}" en este restaurante`,
        );
      }
    }

    const table = await this.prisma.table.update({
      where: { id },
      data: updateTableDto,
    });

    return this.formatTable(table);
  }

  /**
   * Consultar disponibilidad de mesas para una fecha y hora
   * @param restaurantId - ID del restaurante
   * @param date - Fecha de la consulta (YYYY-MM-DD)
   * @param time - Hora de la consulta (HH:MM)
   * @param partySize - Numero de personas (opcional)
   */
  async checkAvailability(
    restaurantId: string,
    date: string,
    time: string,
    partySize?: number,
  ) {
    await this.validateRestaurantExists(restaurantId);

    // Obtener todas las mesas activas del restaurante
    const whereClause: any = {
      restaurantId,
      isActive: true,
    };

    // Si se especifica partySize, filtrar por capacidad
    if (partySize) {
      whereClause.capacity = { gte: partySize };
    }

    const tables = await this.prisma.table.findMany({
      where: whereClause,
      orderBy: { tableNumber: 'asc' },
    });

    // Buscar reservaciones para esa fecha y hora
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const reservations = await this.prisma.reservation.findMany({
      where: {
        restaurantId,
        reservationDate: {
          gte: startDate,
          lte: endDate,
        },
        reservationTime: time,
        status: { in: ['pending', 'confirmed'] },
      },
      select: { tableId: true },
    });

    const reservedTableIds = new Set(
      reservations.map((r) => r.tableId).filter(Boolean),
    );

    // Marcar disponibilidad de cada mesa
    const tablesWithAvailability = tables.map((table) => ({
      ...this.formatTable(table),
      availableForTime: !reservedTableIds.has(table.id),
    }));

    const availableTables = tablesWithAvailability.filter(
      (t) => t.availableForTime,
    );

    return {
      date,
      time,
      partySize: partySize || null,
      totalTables: tables.length,
      availableCount: availableTables.length,
      tables: tablesWithAvailability,
    };
  }

  /**
   * Eliminar una mesa
   * @param restaurantId - ID del restaurante
   * @param id - ID de la mesa
   */
  async remove(restaurantId: string, id: string) {
    // Verificar que la mesa existe
    await this.findOne(restaurantId, id);

    await this.prisma.table.delete({
      where: { id },
    });

    return { message: 'Mesa eliminada exitosamente' };
  }

  // ============================================
  // METODOS PRIVADOS
  // ============================================

  /**
   * Validar que el restaurante existe
   * @param restaurantId - ID del restaurante
   */
  private async validateRestaurantExists(restaurantId: string) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: restaurantId },
    });

    if (!restaurant) {
      throw new NotFoundException(
        `Restaurante con ID ${restaurantId} no encontrado`,
      );
    }
  }

  /**
   * Formatear mesa para respuesta de la API
   * @param table - Mesa a formatear
   */
  private formatTable(table: any) {
    return {
      id: table.id,
      restaurantId: table.restaurantId,
      tableNumber: table.tableNumber,
      capacity: table.capacity,
      location: table.location,
      isAvailable: table.isAvailable,
      isActive: table.isActive,
    };
  }
}
