import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsInt,
  IsBoolean,
  IsDateString,
  Min,
  Max,
  MaxLength,
} from 'class-validator';

/**
 * DTO para actualizar una resena existente
 */
export class UpdateReviewDto {
  @ApiPropertyOptional({
    description: 'Calificacion (1-5 estrellas)',
    example: 5,
    minimum: 1,
    maximum: 5,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;

  @ApiPropertyOptional({
    description: 'Titulo de la resena',
    example: 'Muy recomendado',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @ApiPropertyOptional({
    description: 'Comentario de la resena',
    example: 'La comida estuvo deliciosa y el servicio fue muy bueno',
    maxLength: 2000,
  })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  comment?: string;

  @ApiPropertyOptional({
    description: 'Fecha de la visita al restaurante (formato ISO 8601)',
    example: '2024-12-20',
  })
  @IsOptional()
  @IsDateString()
  visitDate?: string;

  @ApiPropertyOptional({
    description: 'Visibilidad de la resena',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isVisible?: boolean;
}
