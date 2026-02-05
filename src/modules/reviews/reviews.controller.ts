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
import { ReviewsService } from './reviews.service';
import { CreateReviewDto, UpdateReviewDto } from './dto';

/**
 * Controlador para gestionar resenas de restaurantes
 * Las resenas pertenecen a un restaurante y son creadas por usuarios
 * Ruta base: /restaurants/:restaurantId/reviews
 */
@ApiTags('Reseñas')
@Controller('restaurants/:restaurantId/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  /**
   * Crear nueva resena para un restaurante
   */
  @Post()
  @ApiOperation({ summary: 'Crear resena para restaurante' })
  @ApiParam({ name: 'restaurantId', description: 'UUID del restaurante' })
  @ApiResponse({ status: 201, description: 'Resena creada exitosamente' })
  @ApiResponse({ status: 404, description: 'Restaurante no encontrado' })
  @ApiResponse({ status: 422, description: 'Error de validacion' })
  async create(
    @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    const review = await this.reviewsService.create(restaurantId, createReviewDto);
    return { data: review };
  }

  /**
   * Listar resenas de un restaurante con filtros y paginacion
   */
  @Get()
  @ApiOperation({ summary: 'Listar resenas de un restaurante' })
  @ApiParam({ name: 'restaurantId', description: 'UUID del restaurante' })
  @ApiQuery({ name: 'page', required: false, description: 'Numero de pagina' })
  @ApiQuery({ name: 'limit', required: false, description: 'Elementos por pagina' })
  @ApiQuery({ name: 'rating', required: false, description: 'Filtrar por calificacion (1-5)' })
  @ApiQuery({ name: 'isVisible', required: false, description: 'Filtrar por visibilidad' })
  @ApiQuery({ name: 'sortBy', required: false, description: 'Campo para ordenar' })
  @ApiQuery({ name: 'order', required: false, description: 'Direccion del orden (asc, desc)' })
  @ApiResponse({ status: 200, description: 'Lista de resenas paginada' })
  @ApiResponse({ status: 404, description: 'Restaurante no encontrado' })
  async findAll(
    @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('rating') rating?: number,
    @Query('isVisible') isVisible?: string,
    @Query('sortBy') sortBy?: string,
    @Query('order') order?: 'asc' | 'desc',
  ) {
    return this.reviewsService.findAll(restaurantId, {
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      rating: rating ? Number(rating) : undefined,
      isVisible: isVisible !== undefined ? isVisible === 'true' : undefined,
      sortBy,
      order,
    });
  }

  /**
   * Obtener resena por ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Obtener resena por ID' })
  @ApiParam({ name: 'restaurantId', description: 'UUID del restaurante' })
  @ApiParam({ name: 'id', description: 'UUID de la resena' })
  @ApiResponse({ status: 200, description: 'Resena encontrada' })
  @ApiResponse({ status: 404, description: 'Resena no encontrada' })
  async findOne(
    @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const review = await this.reviewsService.findOne(restaurantId, id);
    return { data: review };
  }

  /**
   * Actualizar resena existente
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar resena' })
  @ApiParam({ name: 'restaurantId', description: 'UUID del restaurante' })
  @ApiParam({ name: 'id', description: 'UUID de la resena' })
  @ApiResponse({ status: 200, description: 'Resena actualizada exitosamente' })
  @ApiResponse({ status: 404, description: 'Resena no encontrada' })
  async update(
    @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    const review = await this.reviewsService.update(restaurantId, id, updateReviewDto);
    return { data: review };
  }

  /**
   * Eliminar resena
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar resena' })
  @ApiParam({ name: 'restaurantId', description: 'UUID del restaurante' })
  @ApiParam({ name: 'id', description: 'UUID de la resena' })
  @ApiResponse({ status: 204, description: 'Resena eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Resena no encontrada' })
  async remove(
    @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    await this.reviewsService.remove(restaurantId, id);
  }
}
