import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEmail,
  IsUrl,
  IsEnum,
  IsInt,
  Min,
  Max,
  MinLength,
  MaxLength,
  IsArray,
  IsUUID,
} from 'class-validator';

/**
 * Enum para rango de precios del restaurante
 */
export enum PriceRange {
  LOW = '$',
  MEDIUM = '$$',
  HIGH = '$$$',
  PREMIUM = '$$$$',
}

/**
 * DTO para crear un nuevo restaurante
 */
export class CreateRestaurantDto {
  @ApiProperty({
    description: 'Nombre del restaurante',
    example: 'La Trattoria',
    minLength: 2,
    maxLength: 255,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({
    description: 'Slug unico para URL (se genera automaticamente si no se proporciona)',
    example: 'la-trattoria',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  slug?: string;

  @ApiPropertyOptional({
    description: 'Descripcion del restaurante',
    example: 'Autentica cocina italiana en el corazon de la ciudad',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Telefono de contacto',
    example: '+52 55 1234 5678',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @ApiPropertyOptional({
    description: 'Correo electronico',
    example: 'info@latrattoria.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'Sitio web',
    example: 'https://latrattoria.com',
  })
  @IsOptional()
  @IsUrl()
  website?: string;

  @ApiPropertyOptional({
    description: 'Rango de precios',
    enum: PriceRange,
    example: '$$',
  })
  @IsOptional()
  @IsEnum(PriceRange)
  priceRange?: PriceRange;

  @ApiPropertyOptional({
    description: 'Ano de apertura',
    example: 2020,
    minimum: 1900,
  })
  @IsOptional()
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  openingYear?: number;

  @ApiPropertyOptional({
    description: 'IDs de categorias a asignar',
    type: [String],
    example: ['uuid-categoria-1', 'uuid-categoria-2'],
  })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  categoryIds?: string[];
}
