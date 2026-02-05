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
import { AddressesService } from './addresses.service';
import { CreateAddressDto, UpdateAddressDto } from './dto';
import { Public } from '../../common/decorators';

/**
 * Controlador para gestionar direcciones de restaurantes
 * Ruta base: /restaurants/:restaurantId/addresses
 */
@ApiTags('Direcciones')
@Controller('restaurants/:restaurantId/addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  /**
   * Crear nueva direccion para un restaurante
   */
  @Post()
  @ApiOperation({ summary: 'Crear direccion para restaurante' })
  @ApiParam({ name: 'restaurantId', description: 'UUID del restaurante' })
  @ApiResponse({ status: 201, description: 'Direccion creada exitosamente' })
  @ApiResponse({ status: 404, description: 'Restaurante no encontrado' })
  @ApiResponse({ status: 422, description: 'Error de validacion' })
  async create(
    @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    const address = await this.addressesService.create(
      restaurantId,
      createAddressDto,
    );
    return { data: address };
  }

  /**
   * Listar direcciones de un restaurante
   */
  @Public()
  @Get()
  @ApiOperation({ summary: 'Listar direcciones de un restaurante' })
  @ApiParam({ name: 'restaurantId', description: 'UUID del restaurante' })
  @ApiResponse({ status: 200, description: 'Lista de direcciones' })
  @ApiResponse({ status: 404, description: 'Restaurante no encontrado' })
  async findAll(@Param('restaurantId', ParseUUIDPipe) restaurantId: string) {
    const addresses = await this.addressesService.findAll(restaurantId);
    return { data: addresses };
  }

  /**
   * Obtener direccion por ID
   */
  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Obtener direccion por ID' })
  @ApiParam({ name: 'restaurantId', description: 'UUID del restaurante' })
  @ApiParam({ name: 'id', description: 'UUID de la direccion' })
  @ApiResponse({ status: 200, description: 'Direccion encontrada' })
  @ApiResponse({ status: 404, description: 'Direccion no encontrada' })
  async findOne(
    @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const address = await this.addressesService.findOne(restaurantId, id);
    return { data: address };
  }

  /**
   * Actualizar direccion
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar direccion' })
  @ApiParam({ name: 'restaurantId', description: 'UUID del restaurante' })
  @ApiParam({ name: 'id', description: 'UUID de la direccion' })
  @ApiResponse({ status: 200, description: 'Direccion actualizada' })
  @ApiResponse({ status: 404, description: 'Direccion no encontrada' })
  async update(
    @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    const address = await this.addressesService.update(
      restaurantId,
      id,
      updateAddressDto,
    );
    return { data: address };
  }

  /**
   * Eliminar direccion
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar direccion' })
  @ApiParam({ name: 'restaurantId', description: 'UUID del restaurante' })
  @ApiParam({ name: 'id', description: 'UUID de la direccion' })
  @ApiResponse({ status: 204, description: 'Direccion eliminada' })
  @ApiResponse({ status: 404, description: 'Direccion no encontrada' })
  async remove(
    @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    await this.addressesService.remove(restaurantId, id);
  }
}
