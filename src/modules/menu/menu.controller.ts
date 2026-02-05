import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { CreateMenuDto, UpdateMenuDto } from './dto';
import { Public } from '../../common/decorators';

/**
 * Controlador para gestionar menus de restaurantes
 * Los menus estan anidados bajo la ruta de restaurantes
 */
@ApiTags('Menús')
@Controller('restaurants/:restaurantId/menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  /**
   * Crear un nuevo menu para un restaurante
   */
  @Post()
  @ApiOperation({ summary: 'Crear nuevo menu para un restaurante' })
  @ApiParam({ name: 'restaurantId', description: 'UUID del restaurante' })
  @ApiResponse({ status: 201, description: 'Menu creado exitosamente' })
  @ApiResponse({ status: 404, description: 'Restaurante no encontrado' })
  @ApiResponse({ status: 409, description: 'Ya existe un menu con ese nombre' })
  @ApiResponse({ status: 422, description: 'Error de validacion' })
  async create(
    @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
    @Body() createMenuDto: CreateMenuDto,
  ) {
    const menu = await this.menuService.create(restaurantId, createMenuDto);
    return { data: menu };
  }

  /**
   * Listar todos los menus de un restaurante
   */
  @Public()
  @Get()
  @ApiOperation({ summary: 'Listar menus de un restaurante' })
  @ApiParam({ name: 'restaurantId', description: 'UUID del restaurante' })
  @ApiResponse({ status: 200, description: 'Lista de menus del restaurante' })
  @ApiResponse({ status: 404, description: 'Restaurante no encontrado' })
  async findAll(@Param('restaurantId', ParseUUIDPipe) restaurantId: string) {
    const menus = await this.menuService.findAll(restaurantId);
    return { data: menus };
  }

  /**
   * Obtener un menu especifico por ID
   */
  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Obtener menu por ID' })
  @ApiParam({ name: 'restaurantId', description: 'UUID del restaurante' })
  @ApiParam({ name: 'id', description: 'UUID del menu' })
  @ApiResponse({ status: 200, description: 'Menu encontrado' })
  @ApiResponse({ status: 404, description: 'Menu o restaurante no encontrado' })
  async findOne(
    @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const menu = await this.menuService.findOne(restaurantId, id);
    return { data: menu };
  }

  /**
   * Actualizar un menu existente
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar menu existente' })
  @ApiParam({ name: 'restaurantId', description: 'UUID del restaurante' })
  @ApiParam({ name: 'id', description: 'UUID del menu' })
  @ApiResponse({ status: 200, description: 'Menu actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Menu o restaurante no encontrado' })
  @ApiResponse({ status: 409, description: 'Ya existe un menu con ese nombre' })
  async update(
    @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMenuDto: UpdateMenuDto,
  ) {
    const menu = await this.menuService.update(restaurantId, id, updateMenuDto);
    return { data: menu };
  }

  /**
   * Eliminar un menu
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar menu' })
  @ApiParam({ name: 'restaurantId', description: 'UUID del restaurante' })
  @ApiParam({ name: 'id', description: 'UUID del menu' })
  @ApiResponse({ status: 204, description: 'Menu eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Menu o restaurante no encontrado' })
  async remove(
    @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    await this.menuService.remove(restaurantId, id);
  }
}
