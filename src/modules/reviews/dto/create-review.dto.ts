import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsInt,
  IsUUID,
  IsDateString,
  Min,
  Max,
  MaxLength,
} from 'class-validator';

/**
 * DTO para crear una nueva resena
 */
export class CreateReviewDto {
  @ApiProperty({
    description: 'UUID del usuario que realiza la resena',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Calificacion (1-5 estrellas)',
    example: 4,
    minimum: 1,
    maximum: 5,
  })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiPropertyOptional({
    description: 'Titulo de la resena',
    example: 'Excelente experiencia',
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
}
