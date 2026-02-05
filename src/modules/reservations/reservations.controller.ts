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
import { ReservationsService } from './reservations.service';
import { CreateReservationDto, UpdateReservationDto } from './dto';

/**
 * Controlador para gestionar reservaciones
 * Ruta base: /reservations
 */
@ApiTags('Reservas')
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  /**
   * Crear nueva reservacion
   */
  @Post()
  @ApiOperation({ summary: 'Crear reservacion' })
  @ApiResponse({ status: 201, description: 'Reservacion creada exitosamente' })
  @ApiResponse({ status: 404, description: 'Restaurante no encontrado' })
  @ApiResponse({ status: 422, description: 'Error de validacion' })
  async create(@Body() createReservationDto: CreateReservationDto) {
    const reservation = await this.reservationsService.create(createReservationDto);
    return { data: reservation };
  }

  /**
   * Obtener mis reservaciones (del usuario autenticado)
   */
  @Get('my-reservations')
  @ApiOperation({ summary: 'Obtener mis reservaciones' })
  @ApiQuery({ name: 'page', required: false, description: 'Numero de pagina' })
  @ApiQuery({ name: 'limit', required: false, description: 'Elementos por pagina' })
  @ApiQuery({ name: 'status', required: false, description: 'Filtrar por estado' })
  @ApiResponse({ status: 200, description: 'Lista de reservaciones del usuario' })
  async getMyReservations(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('status') status?: string,
    @Query('userId') userId?: string,
  ) {
    // En produccion, userId vendria del token JWT
    // Por ahora se pasa como query param para testing
    return this.reservationsService.findAll({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      userId,
      status,
    });
  }

  /**
   * Listar reservaciones con filtros y paginacion
   */
  @Get()
  @ApiOperation({ summary: 'Listar reservaciones' })
  @ApiQuery({ name: 'page', required: false, description: 'Numero de pagina' })
  @ApiQuery({ name: 'limit', required: false, description: 'Elementos por pagina' })
  @ApiQuery({ name: 'restaurantId', required: false, description: 'Filtrar por restaurante' })
  @ApiQuery({ name: 'userId', required: false, description: 'Filtrar por usuario' })
  @ApiQuery({ name: 'status', required: false, description: 'Filtrar por estado (pending, confirmed, cancelled, completed)' })
  @ApiQuery({ name: 'date', required: false, description: 'Filtrar por fecha (YYYY-MM-DD)' })
  @ApiQuery({ name: 'sortBy', required: false, description: 'Campo para ordenar' })
  @ApiQuery({ name: 'order', required: false, description: 'Direccion del orden (asc, desc)' })
  @ApiResponse({ status: 200, description: 'Lista de reservaciones paginada' })
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('restaurantId') restaurantId?: string,
    @Query('userId') userId?: string,
    @Query('status') status?: string,
    @Query('date') date?: string,
    @Query('sortBy') sortBy?: string,
    @Query('order') order?: 'asc' | 'desc',
  ) {
    return this.reservationsService.findAll({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      restaurantId,
      userId,
      status,
      date,
      sortBy,
      order,
    });
  }

  /**
   * Obtener reservacion por ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Obtener reservacion por ID' })
  @ApiParam({ name: 'id', description: 'UUID de la reservacion' })
  @ApiResponse({ status: 200, description: 'Reservacion encontrada' })
  @ApiResponse({ status: 404, description: 'Reservacion no encontrada' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const reservation = await this.reservationsService.findOne(id);
    return { data: reservation };
  }

  /**
   * Actualizar reservacion existente
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar reservacion' })
  @ApiParam({ name: 'id', description: 'UUID de la reservacion' })
  @ApiResponse({ status: 200, description: 'Reservacion actualizada exitosamente' })
  @ApiResponse({ status: 404, description: 'Reservacion no encontrada' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    const reservation = await this.reservationsService.update(id, updateReservationDto);
    return { data: reservation };
  }

  /**
   * Cancelar reservacion (endpoint especifico)
   */
  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancelar reservacion' })
  @ApiParam({ name: 'id', description: 'UUID de la reservacion' })
  @ApiResponse({ status: 200, description: 'Reservacion cancelada exitosamente' })
  @ApiResponse({ status: 404, description: 'Reservacion no encontrada' })
  async cancel(@Param('id', ParseUUIDPipe) id: string) {
    const reservation = await this.reservationsService.remove(id);
    return { data: reservation, message: 'Reservacion cancelada exitosamente' };
  }

  /**
   * Eliminar reservacion (soft delete - cambia estado a cancelled)
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar reservacion' })
  @ApiParam({ name: 'id', description: 'UUID de la reservacion' })
  @ApiResponse({ status: 200, description: 'Reservacion eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Reservacion no encontrada' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const reservation = await this.reservationsService.remove(id);
    return { data: reservation, message: 'Reservacion cancelada exitosamente' };
  }
}
