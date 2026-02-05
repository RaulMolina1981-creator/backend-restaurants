import { PartialType } from '@nestjs/swagger';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateRestaurantDto } from './create-restaurant.dto';

/**
 * DTO para actualizar un restaurante existente
 * Todos los campos son opcionales, incluye campo adicional isActive
 */
export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {
  @ApiPropertyOptional({
    description: 'Estado activo del restaurante',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
