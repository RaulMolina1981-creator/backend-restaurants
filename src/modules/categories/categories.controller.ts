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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto, QueryCategoryDto } from './dto';
import { Public } from '../../common/decorators';

/**
 * Controlador para gestionar categorias de restaurantes
 * Proporciona endpoints CRUD con soporte para paginacion y filtros
 */
@ApiTags('Categorías')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  /**
   * Crear nueva categoria
   */
  @Post()
  @ApiOperation({ summary: 'Crear nueva categoria' })
  @ApiResponse({ status: 201, description: 'Categoria creada exitosamente' })
  @ApiResponse({ status: 409, description: 'Slug o nombre ya existe' })
  @ApiResponse({ status: 422, description: 'Error de validacion' })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.categoriesService.create(createCategoryDto);
    return { data: category };
  }

  /**
   * Listar categorias con filtros y paginacion
   */
  @Public()
  @Get()
  @ApiOperation({ summary: 'Listar categorias con filtros y paginacion' })
  @ApiResponse({ status: 200, description: 'Lista de categorias paginada' })
  async findAll(@Query() query: QueryCategoryDto) {
    return this.categoriesService.findAll(query);
  }

  /**
   * Obtener categoria por slug
   */
  @Public()
  @Get('slug/:slug')
  @ApiOperation({ summary: 'Obtener categoria por slug' })
  @ApiParam({ name: 'slug', description: 'Slug unico de la categoria' })
  @ApiResponse({ status: 200, description: 'Categoria encontrada' })
  @ApiResponse({ status: 404, description: 'Categoria no encontrada' })
  async findBySlug(@Param('slug') slug: string) {
    const category = await this.categoriesService.findBySlug(slug);
    return { data: category };
  }

  /**
   * Obtener categoria por ID
   */
  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Obtener categoria por ID' })
  @ApiParam({ name: 'id', description: 'UUID de la categoria' })
  @ApiResponse({ status: 200, description: 'Categoria encontrada' })
  @ApiResponse({ status: 404, description: 'Categoria no encontrada' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const category = await this.categoriesService.findOne(id);
    return { data: category };
  }

  /**
   * Actualizar categoria
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar categoria existente' })
  @ApiParam({ name: 'id', description: 'UUID de la categoria' })
  @ApiResponse({ status: 200, description: 'Categoria actualizada exitosamente' })
  @ApiResponse({ status: 404, description: 'Categoria no encontrada' })
  @ApiResponse({ status: 409, description: 'Slug o nombre ya existe' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const category = await this.categoriesService.update(id, updateCategoryDto);
    return { data: category };
  }

  /**
   * Eliminar categoria
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar categoria' })
  @ApiParam({ name: 'id', description: 'UUID de la categoria' })
  @ApiResponse({ status: 204, description: 'Categoria eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Categoria no encontrada' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.categoriesService.remove(id);
  }
}
