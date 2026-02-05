import { Injectable, NotFoundException } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAddressDto, UpdateAddressDto } from './dto';

// Interfaz para el tipo Address de la base de datos
interface AddressRecord {
  id: string;
  restaurantId: string;
  streetAddress: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  latitude: Decimal | null;
  longitude: Decimal | null;
  isMain: boolean;
  createdAt: Date;
}

/**
 * Servicio para gestionar direcciones de restaurantes
 * Proporciona operaciones CRUD completas
 */
@Injectable()
export class AddressesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crear nueva direccion para un restaurante
   * Si se marca como principal, desmarca las otras direcciones del mismo restaurante
   */
  async create(restaurantId: string, createAddressDto: CreateAddressDto) {
    // Verificar que el restaurante existe
    await this.verifyRestaurantExists(restaurantId);

    // Si es direccion principal, desmarcar otras
    if (createAddressDto.isMain) {
      await this.prisma.address.updateMany({
        where: { restaurantId, isMain: true },
        data: { isMain: false },
      });
    }

    const address = await this.prisma.address.create({
      data: {
        ...createAddressDto,
        restaurantId,
      },
    });

    return this.formatAddress(address);
  }

  /**
   * Obtener todas las direcciones de un restaurante
   * Ordenadas por direccion principal primero, luego por fecha de creacion
   */
  async findAll(restaurantId: string) {
    await this.verifyRestaurantExists(restaurantId);

    const addresses = await this.prisma.address.findMany({
      where: { restaurantId },
      orderBy: [{ isMain: 'desc' }, { createdAt: 'desc' }],
    });

    return addresses.map((address: AddressRecord) => this.formatAddress(address));
  }

  /**
   * Obtener una direccion especifica por ID
   */
  async findOne(restaurantId: string, id: string) {
    await this.verifyRestaurantExists(restaurantId);

    const address = await this.prisma.address.findFirst({
      where: { id, restaurantId },
    });

    if (!address) {
      throw new NotFoundException(`Direccion con ID ${id} no encontrada`);
    }

    return this.formatAddress(address);
  }

  /**
   * Actualizar direccion existente
   * Si se marca como principal, desmarca las otras direcciones
   */
  async update(
    restaurantId: string,
    id: string,
    updateAddressDto: UpdateAddressDto,
  ) {
    await this.findOne(restaurantId, id);

    // Si se marca como principal, desmarcar otras
    if (updateAddressDto.isMain) {
      await this.prisma.address.updateMany({
        where: { restaurantId, isMain: true, NOT: { id } },
        data: { isMain: false },
      });
    }

    const address = await this.prisma.address.update({
      where: { id },
      data: updateAddressDto,
    });

    return this.formatAddress(address);
  }

  /**
   * Eliminar direccion
   */
  async remove(restaurantId: string, id: string) {
    await this.findOne(restaurantId, id);

    await this.prisma.address.delete({
      where: { id },
    });

    return { message: 'Direccion eliminada exitosamente' };
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
   * Formatear direccion para respuesta de la API
   */
  private formatAddress(address: AddressRecord) {
    return {
      id: address.id,
      restaurantId: address.restaurantId,
      streetAddress: address.streetAddress,
      city: address.city,
      stateProvince: address.stateProvince,
      postalCode: address.postalCode,
      country: address.country,
      latitude: address.latitude
        ? parseFloat(address.latitude.toString())
        : null,
      longitude: address.longitude
        ? parseFloat(address.longitude.toString())
        : null,
      isMain: address.isMain,
      createdAt: address.createdAt,
    };
  }
}
