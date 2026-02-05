import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMenuDto, UpdateMenuDto } from './dto';

/**
 * Servicio para gestionar menus de restaurantes
 * Proporciona operaciones CRUD completas
 */
@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crear un nuevo menu para un restaurante
   * @param restaurantId - ID del restaurante
   * @param createMenuDto - Datos del menu a crear
   */
  async create(restaurantId: string, createMenuDto: CreateMenuDto) {
    // Verificar que el restaurante existe
    await this.validateRestaurantExists(restaurantId);

    // Verificar que no exista un menu con el mismo nombre en el restaurante
    const existingMenu = await this.prisma.menu.findFirst({
      where: {
        restaurantId,
        name: createMenuDto.name,
      },
    });

    if (existingMenu) {
      throw new ConflictException(
        `Ya existe un menu con el nombre "${createMenuDto.name}" en este restaurante`,
      );
    }

    const menu = await this.prisma.menu.create({
      data: {
        ...createMenuDto,
        restaurantId,
      },
    });

    return this.formatMenu(menu);
  }

  /**
   * Obtener todos los menus de un restaurante
   * @param restaurantId - ID del restaurante
   */
  async findAll(restaurantId: string) {
    // Verificar que el restaurante existe
    await this.validateRestaurantExists(restaurantId);

    const menus = await this.prisma.menu.findMany({
      where: { restaurantId },
      orderBy: [{ displayOrder: 'asc' }, { name: 'asc' }],
    });

    return menus.map((menu) => this.formatMenu(menu));
  }

  /**
   * Obtener un menu por ID
   * @param restaurantId - ID del restaurante
   * @param id - ID del menu
   */
  async findOne(restaurantId: string, id: string) {
    const menu = await this.prisma.menu.findFirst({
      where: {
        id,
        restaurantId,
      },
    });

    if (!menu) {
      throw new NotFoundException(
        `Menu con ID ${id} no encontrado en el restaurante`,
      );
    }

    return this.formatMenu(menu);
  }

  /**
   * Actualizar un menu existente
   * @param restaurantId - ID del restaurante
   * @param id - ID del menu
   * @param updateMenuDto - Datos a actualizar
   */
  async update(restaurantId: string, id: string, updateMenuDto: UpdateMenuDto) {
    // Verificar que el menu existe
    await this.findOne(restaurantId, id);

    // Si se cambia el nombre, verificar que no exista otro menu con ese nombre
    if (updateMenuDto.name) {
      const existingMenu = await this.prisma.menu.findFirst({
        where: {
          restaurantId,
          name: updateMenuDto.name,
          NOT: { id },
        },
      });

      if (existingMenu) {
        throw new ConflictException(
          `Ya existe un menu con el nombre "${updateMenuDto.name}" en este restaurante`,
        );
      }
    }

    const menu = await this.prisma.menu.update({
      where: { id },
      data: updateMenuDto,
    });

    return this.formatMenu(menu);
  }

  /**
   * Eliminar un menu
   * @param restaurantId - ID del restaurante
   * @param id - ID del menu
   */
  async remove(restaurantId: string, id: string) {
    // Verificar que el menu existe
    await this.findOne(restaurantId, id);

    await this.prisma.menu.delete({
      where: { id },
    });

    return { message: 'Menu eliminado exitosamente' };
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
   * Formatear menu para respuesta de la API
   * @param menu - Menu a formatear
   */
  private formatMenu(menu: any) {
    return {
      id: menu.id,
      restaurantId: menu.restaurantId,
      name: menu.name,
      description: menu.description,
      isActive: menu.isActive,
      displayOrder: menu.displayOrder,
      createdAt: menu.createdAt,
      updatedAt: menu.updatedAt,
    };
  }
}
