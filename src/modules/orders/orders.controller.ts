import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderDto } from './dto';

/**
 * Controlador para gestionar pedidos
 * Ruta base: /orders
 */
@ApiTags('Pedidos')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  /**
   * Crear nuevo pedido
   */
  @Post()
  @ApiOperation({ summary: 'Crear pedido' })
  @ApiResponse({ status: 201, description: 'Pedido creado exitosamente' })
  @ApiResponse({ status: 404, description: 'Restaurante no encontrado' })
  @ApiResponse({ status: 422, description: 'Error de validacion' })
  async create(@Body() createOrderDto: CreateOrderDto) {
    const order = await this.ordersService.create(createOrderDto);
    return { data: order };
  }

  /**
   * Obtener mis pedidos (del usuario autenticado)
   */
  @Get('my-orders')
  @ApiOperation({ summary: 'Obtener mis pedidos' })
  @ApiQuery({ name: 'page', required: false, description: 'Numero de pagina' })
  @ApiQuery({ name: 'limit', required: false, description: 'Elementos por pagina' })
  @ApiQuery({ name: 'status', required: false, description: 'Filtrar por estado' })
  @ApiResponse({ status: 200, description: 'Lista de pedidos del usuario' })
  async getMyOrders(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('status') status?: string,
    @Query('userId') userId?: string,
  ) {
    // En produccion, userId vendria del token JWT
    // Por ahora se pasa como query param para testing
    return this.ordersService.findAll({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      userId,
      status,
    });
  }

  /**
   * Listar pedidos con filtros y paginacion
   */
  @Get()
  @ApiOperation({ summary: 'Listar pedidos' })
  @ApiQuery({ name: 'page', required: false, description: 'Numero de pagina' })
  @ApiQuery({ name: 'limit', required: false, description: 'Elementos por pagina' })
  @ApiQuery({ name: 'restaurantId', required: false, description: 'Filtrar por restaurante' })
  @ApiQuery({ name: 'userId', required: false, description: 'Filtrar por usuario' })
  @ApiQuery({ name: 'status', required: false, description: 'Filtrar por estado (pending, preparing, ready, delivered, cancelled)' })
  @ApiQuery({ name: 'sortBy', required: false, description: 'Campo para ordenar' })
  @ApiQuery({ name: 'order', required: false, description: 'Direccion del orden (asc, desc)' })
  @ApiResponse({ status: 200, description: 'Lista de pedidos paginada' })
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('restaurantId') restaurantId?: string,
    @Query('userId') userId?: string,
    @Query('status') status?: string,
    @Query('sortBy') sortBy?: string,
    @Query('order') order?: 'asc' | 'desc',
  ) {
    return this.ordersService.findAll({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      restaurantId,
      userId,
      status,
      sortBy,
      order,
    });
  }

  /**
   * Obtener pedido por ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Obtener pedido por ID' })
  @ApiParam({ name: 'id', description: 'UUID del pedido' })
  @ApiResponse({ status: 200, description: 'Pedido encontrado' })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const order = await this.ordersService.findOne(id);
    return { data: order };
  }

  /**
   * Actualizar estado del pedido
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar estado del pedido' })
  @ApiParam({ name: 'id', description: 'UUID del pedido' })
  @ApiResponse({ status: 200, description: 'Pedido actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    const order = await this.ordersService.update(id, updateOrderDto);
    return { data: order };
  }

  /**
   * Cancelar pedido (endpoint especifico)
   */
  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancelar pedido' })
  @ApiParam({ name: 'id', description: 'UUID del pedido' })
  @ApiResponse({ status: 200, description: 'Pedido cancelado exitosamente' })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  async cancel(@Param('id', ParseUUIDPipe) id: string) {
    const order = await this.ordersService.remove(id);
    return { data: order, message: 'Pedido cancelado exitosamente' };
  }

  /**
   * Eliminar pedido (soft delete - cambia estado a cancelled)
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar pedido' })
  @ApiParam({ name: 'id', description: 'UUID del pedido' })
  @ApiResponse({ status: 200, description: 'Pedido eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const order = await this.ordersService.remove(id);
    return { data: order, message: 'Pedido cancelado exitosamente' };
  }
}
