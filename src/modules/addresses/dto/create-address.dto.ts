import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  MinLength,
  MaxLength,
  Min,
  Max,
} from 'class-validator';

/**
 * DTO para crear una nueva direccion
 * Contiene todos los campos necesarios para registrar una direccion de restaurante
 */
export class CreateAddressDto {
  @ApiProperty({
    description: 'Direccion de la calle',
    example: 'Av. Reforma 123, Col. Centro',
    minLength: 5,
    maxLength: 255,
  })
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  streetAddress: string;

  @ApiProperty({
    description: 'Ciudad',
    example: 'Ciudad de Mexico',
    maxLength: 100,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  city: string;

  @ApiProperty({
    description: 'Estado o provincia',
    example: 'CDMX',
    maxLength: 100,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  stateProvince: string;

  @ApiProperty({
    description: 'Codigo postal',
    example: '06600',
    maxLength: 20,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  postalCode: string;

  @ApiPropertyOptional({
    description: 'Pais',
    example: 'Mexico',
    default: 'Mexico',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  country?: string;

  @ApiPropertyOptional({
    description: 'Latitud para geolocalizacion',
    example: 19.4326,
    minimum: -90,
    maximum: 90,
  })
  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude?: number;

  @ApiPropertyOptional({
    description: 'Longitud para geolocalizacion',
    example: -99.1332,
    minimum: -180,
    maximum: 180,
  })
  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude?: number;

  @ApiPropertyOptional({
    description: 'Es la direccion principal',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isMain?: boolean;
}
