import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

/**
 * Modulo de resenas
 * Gestiona las resenas de los restaurantes
 * Las resenas son creadas por usuarios y pertenecen a un restaurante
 */
@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
