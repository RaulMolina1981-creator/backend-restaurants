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
import { TablesService } from './tables.service';
import { CreateTableDto, UpdateTableDto } from './dto';
import { Public } from '../../common/decorators';

/**
 * Controlador para gestionar mesas de restaurantes
 * Las mesas estan anidadas bajo la ruta de restaurantes
 */
@ApiTags('Mesas')
@Controller('restaurants/:restaurantId/tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  /**
   * Crear una nueva mesa para un restaurante
   */
  @Post()
  @ApiOperation({ summary: 'Crear nueva mesa para un restaurante' })
  @ApiParam({ name: 'restaurantId', description: 'UUID del restaurante' })
  @ApiResponse({ status: 201, description: 'Mesa creada exitosamente' })
  @ApiResponse({ status: 404, description: 'Restaurante no encontrado' })
  @ApiResponse({ status: 409, description: 'Ya existe una mesa con ese numero' })
  @ApiResponse({ status: 422, description: 'Error de validacion' })
  async create(
    @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
    @Body() createTableDto: CreateTableDto,
  ) {
    const table = await this.tablesService.create(restaurantId, createTableDto);
    return { data: table };
  }

  /**
   * Consultar disponibilidad de mesas
   */
  @Public()
  @Get('availability')
  @ApiOperation({ summary: 'Consultar disponibilidad de mesas' })
  @ApiParam({ name: 'restaurantId', description: 'UUID del restaurante' })
  @ApiQuery({ name: 'date', required: true, description: 'Fecha (YYYY-MM-DD)' })
  @ApiQuery({ name: 'time', required: true, description: 'Hora (HH:MM)' })
  @ApiQuery({ name: 'partySize', required: false, description: 'Numero de personas' })
  @ApiResponse({ status: 200, description: 'Disponibilidad de mesas' })
  @ApiResponse({ status: 404, description: 'Restaurante no encontrado' })
  async checkAvailability(
    @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
    @Query('date') date: string,
    @Query('time') time: string,
    @Query('partySize') partySize?: number,
  ) {
    const availability = await this.tablesService.checkAvailability(
      restaurantId,
      date,
      time,
      partySize ? Number(partySize) : undefined,
    );
    return { data: availability };
  }

  /**
   * Listar todas las mesas de un restaurante
   */
  @Public()
  @Get()
  @ApiOperation({ summary: 'Listar mesas de un restaurante' })
  @ApiParam({ name: 'restaurantId', description: 'UUID del restaurante' })
  @ApiResponse({ status: 200, description: 'Lista de mesas del restaurante' })
  @ApiResponse({ status: 404, description: 'Restaurante no encontrado' })
  async findAll(@Param('restaurantId', ParseUUIDPipe) restaurantId: string) {
    const tables = await this.tablesService.findAll(restaurantId);
    return { data: tables };
  }

  /**
   * Obtener una mesa especifica por ID
   */
  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Obtener mesa por ID' })
  @ApiParam({ name: 'restaurantId', description: 'UUID del restaurante' })
  @ApiParam({ name: 'id', description: 'UUID de la mesa' })
  @ApiResponse({ status: 200, description: 'Mesa encontrada' })
  @ApiResponse({ status: 404, description: 'Mesa o restaurante no encontrado' })
  async findOne(
    @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const table = await this.tablesService.findOne(restaurantId, id);
    return { data: table };
  }

  /**
   * Actualizar una mesa existente
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar mesa existente' })
  @ApiParam({ name: 'restaurantId', description: 'UUID del restaurante' })
  @ApiParam({ name: 'id', description: 'UUID de la mesa' })
  @ApiResponse({ status: 200, description: 'Mesa actualizada exitosamente' })
  @ApiResponse({ status: 404, description: 'Mesa o restaurante no encontrado' })
  @ApiResponse({ status: 409, description: 'Ya existe una mesa con ese numero' })
  async update(
    @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTableDto: UpdateTableDto,
  ) {
    const table = await this.tablesService.update(restaurantId, id, updateTableDto);
    return { data: table };
  }

  /**
   * Eliminar una mesa
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar mesa' })
  @ApiParam({ name: 'restaurantId', description: 'UUID del restaurante' })
  @ApiParam({ name: 'id', description: 'UUID de la mesa' })
  @ApiResponse({ status: 204, description: 'Mesa eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Mesa o restaurante no encontrado' })
  async remove(
    @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    await this.tablesService.remove(restaurantId, id);
  }
}
