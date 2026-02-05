import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsInt,
  MinLength,
  MaxLength,
  Min,
  Max,
} from 'class-validator';

/**
 * DTO para crear una nueva mesa
 * Las mesas representan los espacios fisicos de un restaurante
 */
export class CreateTableDto {
  @ApiProperty({
    description: 'Numero o identificador de la mesa',
    example: 'A-01',
    minLength: 1,
    maxLength: 20,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  tableNumber: string;

  @ApiProperty({
    description: 'Capacidad de personas de la mesa',
    example: 4,
    minimum: 1,
    maximum: 50,
  })
  @IsInt()
  @Min(1)
  @Max(50)
  capacity: number;

  @ApiPropertyOptional({
    description: 'Ubicacion de la mesa en el restaurante',
    example: 'Terraza exterior',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  location?: string;

  @ApiPropertyOptional({
    description: 'Indica si la mesa esta disponible para reservas',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @ApiPropertyOptional({
    description: 'Indica si la mesa esta activa (visible en el sistema)',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
