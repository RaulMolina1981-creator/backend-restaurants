import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsArray,
  IsUUID,
  ValidateNested,
  Min,
  ArrayMinSize,
  MaxLength,
} from 'class-validator';

/**
 * DTO para los items de un pedido
 */
export class CreateOrderItemDto {
  @ApiProperty({
    description: 'UUID del producto',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  productId: string;

  @ApiProperty({
    description: 'Cantidad del producto',
    example: 2,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({
    description: 'Precio unitario del producto',
    example: 189.50,
    minimum: 0,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  unitPrice: number;

  @ApiPropertyOptional({
    description: 'Notas especiales para este item',
    example: 'Sin cebolla',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string;
}

/**
 * DTO para crear un nuevo pedido
 * Incluye los items del pedido
 */
export class CreateOrderDto {
  @ApiProperty({
    description: 'UUID del restaurante',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  restaurantId: string;

  @ApiPropertyOptional({
    description: 'UUID del usuario que realiza el pedido',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiPropertyOptional({
    description: 'UUID de la mesa asociada al pedido',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsUUID()
  tableId?: string;

  @ApiPropertyOptional({
    description: 'Notas adicionales del pedido',
    example: 'Entregar en la terraza',
    maxLength: 1000,
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;

  @ApiProperty({
    description: 'Lista de items del pedido',
    type: [CreateOrderItemDto],
    minItems: 1,
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}
