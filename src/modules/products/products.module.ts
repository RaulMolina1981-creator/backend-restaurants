import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

/**
 * Modulo de productos
 * Gestiona los productos (platillos) de los restaurantes
 * Los productos pertenecen directamente a un restaurante (no a un menu)
 */
@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
