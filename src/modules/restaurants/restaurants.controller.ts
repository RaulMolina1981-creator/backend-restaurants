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
} from '@nestjs/swagger';
import { RestaurantsService } from './restaurants.service';
import {
  CreateRestaurantDto,
  UpdateRestaurantDto,
  QueryRestaurantDto,
} from './dto';
import { Public } from '../../common/decorators';

/**
 * Controlador para gestionar restaurantes
 * Proporciona endpoints CRUD con soporte para paginacion y filtros
 */
@ApiTags('Restaurantes')
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  /**
   * Crear nuevo restaurante
   */
  @Post()
  @ApiOperation({ summary: 'Crear nuevo restaurante' })
  @ApiResponse({ status: 201, description: 'Restaurante creado exitosamente' })
  @ApiResponse({ status: 409, description: 'Slug ya existe' })
  @ApiResponse({ status: 422, description: 'Error de validacion' })
  async create(@Body() createRestaurantDto: CreateRestaurantDto) {
    const restaurant =
      await this.restaurantsService.create(createRestaurantDto);
    return { data: restaurant };
  }

  /**
   * Listar restaurantes con filtros y paginacion
   */
  @Public()
  @Get()
  @ApiOperation({ summary: 'Listar restaurantes con filtros y paginacion' })
  @ApiResponse({ status: 200, description: 'Lista de restaurantes paginada' })
  async findAll(@Query() query: QueryRestaurantDto) {
    return this.restaurantsService.findAll(query);
  }

  /**
   * Obtener restaurante por slug
   */
  @Public()
  @Get('slug/:slug')
  @ApiOperation({ summary: 'Obtener restaurante por slug' })
  @ApiParam({ name: 'slug', description: 'Slug unico del restaurante' })
  @ApiResponse({ status: 200, description: 'Restaurante encontrado' })
  @ApiResponse({ status: 404, description: 'Restaurante no encontrado' })
  async findBySlug(@Param('slug') slug: string) {
    const restaurant = await this.restaurantsService.findBySlug(slug);
    return { data: restaurant };
  }

  /**
   * Obtener restaurante por ID
   */
  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Obtener restaurante por ID' })
  @ApiParam({ name: 'id', description: 'UUID del restaurante' })
  @ApiResponse({ status: 200, description: 'Restaurante encontrado' })
  @ApiResponse({ status: 404, description: 'Restaurante no encontrado' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const restaurant = await this.restaurantsService.findOne(id);
    return { data: restaurant };
  }

  /**
   * Actualizar restaurante
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar restaurante existente' })
  @ApiParam({ name: 'id', description: 'UUID del restaurante' })
  @ApiResponse({ status: 200, description: 'Restaurante actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Restaurante no encontrado' })
  @ApiResponse({ status: 409, description: 'Slug ya existe' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    const restaurant = await this.restaurantsService.update(
      id,
      updateRestaurantDto,
    );
    return { data: restaurant };
  }

  /**
   * Eliminar restaurante
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar restaurante' })
  @ApiParam({ name: 'id', description: 'UUID del restaurante' })
  @ApiResponse({ status: 204, description: 'Restaurante eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Restaurante no encontrado' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.restaurantsService.remove(id);
  }
}
