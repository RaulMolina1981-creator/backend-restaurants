import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsDateString,
  MinLength,
  MaxLength,
  IsUrl,
} from 'class-validator';

/**
 * DTO para crear un nuevo usuario
 *
 * TODO: Agregar validaciones adicionales cuando se implemente:
 * - Validacion de fortaleza de contrasena
 * - Validacion de telefono con expresion regular
 * - Validacion de mayoria de edad
 */
export class CreateUserDto {
  @ApiProperty({
    description: 'Correo electronico del usuario',
    example: 'usuario@ejemplo.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contrasena del usuario',
    example: 'MiContrasena123!',
    minLength: 8,
    maxLength: 100,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password: string;

  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  firstName: string;

  @ApiProperty({
    description: 'Apellido del usuario',
    example: 'Perez',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  lastName: string;

  @ApiPropertyOptional({
    description: 'Telefono del usuario',
    example: '+52 55 1234 5678',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @ApiPropertyOptional({
    description: 'URL del avatar del usuario',
    example: 'https://example.com/avatars/user.jpg',
  })
  @IsOptional()
  @IsUrl()
  avatarUrl?: string;

  @ApiPropertyOptional({
    description: 'Fecha de nacimiento (formato ISO)',
    example: '1990-01-15',
  })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;
}
