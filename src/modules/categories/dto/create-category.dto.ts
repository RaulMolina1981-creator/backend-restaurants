import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsUrl,
  MinLength,
  MaxLength,
} from 'class-validator';

/**
 * DTO para crear una nueva categoria
 * Las categorias representan tipos de cocina o clasificaciones de restaurantes
 */
export class CreateCategoryDto {
  @ApiProperty({
    description: 'Nombre de la categoria',
    example: 'Italiana',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({
    description: 'Slug unico para URL (se genera automaticamente si no se proporciona)',
    example: 'italiana',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  slug?: string;

  @ApiPropertyOptional({
    description: 'Descripcion de la categoria',
    example: 'Cocina tradicional italiana con pastas, pizzas y mas',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'URL del icono de la categoria',
    example: 'https://example.com/icons/italiana.png',
  })
  @IsOptional()
  @IsUrl()
  iconUrl?: string;
}
