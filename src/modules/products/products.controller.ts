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
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto, QueryProductDto } from './dto';
import { Public } from '../../common/decorators';

/**
 * Controlador para gestionar productos de restaurantes
 * Los productos pertenecen directamente a un restaurante
 * Ruta base: /restaurants/:restaurantId/products
 */
@ApiTags('Productos')
@Controller('restaurants/:restaurantId/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * Crear nuevo producto para un restaurante
   */
  @Post()
  @ApiOperation({ summary: 'Crear producto para restaurante' })
  @ApiParam({ name: 'restaurantId', description: 'UUID del restaurante' })
  @ApiResponse({ status: 201, description: 'Producto creado exitosamente' })
  @ApiResponse({ status: 404, description: 'Restaurante no encontrado' })
  @ApiResponse({ status: 422, description: 'Error de validacion' })
  async create(
    @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
    @Body() createProductDto: CreateProductDto,
  ) {
    const product = await this.productsService.create(
      restaurantId,
      createProductDto,
    );
    return { data: product };
  }

  /**
   * Listar productos de un restaurante con filtros y paginacion
   */
  @Public()
  @Get()
  @ApiOperation({ summary: 'Listar productos de un restaurante' })
  @ApiParam({ name: 'restaurantId', description: 'UUID del restaurante' })
  @ApiResponse({ status: 200, description: 'Lista de productos paginada' })
  @ApiResponse({ status: 404, description: 'Restaurante no encontrado' })
  async findAll(
    @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
    @Query() query: QueryProductDto,
  ) {
    return this.productsService.findAll(restaurantId, query);
  }

  /**
   * Obtener producto por ID
   */
  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Obtener producto por ID' })
  @ApiParam({ name: 'restaurantId', description: 'UUID del restaurante' })
  @ApiParam({ name: 'id', description: 'UUID del producto' })
  @ApiResponse({ status: 200, description: 'Producto encontrado' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async findOne(
    @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const product = await this.productsService.findOne(restaurantId, id);
    return { data: product };
  }

  /**
   * Actualizar producto existente
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar producto' })
  @ApiParam({ name: 'restaurantId', description: 'UUID del restaurante' })
  @ApiParam({ name: 'id', description: 'UUID del producto' })
  @ApiResponse({ status: 200, description: 'Producto actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async update(
    @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productsService.update(
      restaurantId,
      id,
      updateProductDto,
    );
    return { data: product };
  }

  /**
   * Eliminar producto
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar producto' })
  @ApiParam({ name: 'restaurantId', description: 'UUID del restaurante' })
  @ApiParam({ name: 'id', description: 'UUID del producto' })
  @ApiResponse({ status: 204, description: 'Producto eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async remove(
    @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    await this.productsService.remove(restaurantId, id);
  }
}
