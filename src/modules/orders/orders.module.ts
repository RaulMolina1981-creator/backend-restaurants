import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

/**
 * Modulo de pedidos
 * Gestiona los pedidos de los restaurantes
 * Los pedidos contienen items y pertenecen a un restaurante
 */
@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
