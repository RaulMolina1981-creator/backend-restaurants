import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsInt,
  MinLength,
  MaxLength,
  Min,
} from 'class-validator';

/**
 * DTO para crear un nuevo menu
 * Los menus representan las cartas o listas de platos de un restaurante
 */
export class CreateMenuDto {
  @ApiProperty({
    description: 'Nombre del menu',
    example: 'Menu del Dia',
    minLength: 2,
    maxLength: 255,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({
    description: 'Descripcion del menu',
    example: 'Nuestro menu especial con los mejores platos del dia',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Indica si el menu esta activo',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    description: 'Orden de visualizacion del menu',
    example: 0,
    default: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  displayOrder?: number;
}
