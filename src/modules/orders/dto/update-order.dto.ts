import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsIn, MaxLength } from 'class-validator';

/**
 * DTO para actualizar un pedido existente
 * Solo permite actualizar el estado y las notas
 */
export class UpdateOrderDto {
  @ApiPropertyOptional({
    description: 'Estado del pedido',
    example: 'preparing',
    enum: ['pending', 'preparing', 'ready', 'delivered', 'cancelled'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['pending', 'preparing', 'ready', 'delivered', 'cancelled'])
  status?: string;

  @ApiPropertyOptional({
    description: 'Notas adicionales del pedido',
    example: 'Cliente pidio cambio de mesa',
    maxLength: 1000,
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;
}
