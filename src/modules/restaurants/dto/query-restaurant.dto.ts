import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsBoolean,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { PaginationDto } from '../../../common/dto';

/**
 * DTO para consultar restaurantes con filtros y paginacion
 * Extiende PaginationDto para heredar parametros de paginacion comunes
 */
export class QueryRestaurantDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Busqueda por nombre o descripcion',
    example: 'pizza',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por ciudad',
    example: 'CDMX',
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por categoria (slug)',
    example: 'italiana',
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por rango de precios',
    example: '$$',
  })
  @IsOptional()
  @IsString()
  priceRange?: string;

  @ApiPropertyOptional({
    description: 'Rating minimo',
    example: 4.0,
    minimum: 0,
    maximum: 5,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(5)
  ratingMin?: number;

  @ApiPropertyOptional({
    description: 'Filtrar solo activos',
    example: true,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isActive?: boolean;
}
