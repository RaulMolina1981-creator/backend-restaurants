import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

/**
 * DTO para registro de nuevo usuario
 *
 * TODO: Agregar validaciones adicionales cuando se implemente:
 * - Validacion de fortaleza de contrasena
 * - Confirmacion de contrasena
 * - Terminos y condiciones aceptados
 */
export class CreateAuthDto {
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
}

/**
 * DTO para inicio de sesion
 */
export class LoginDto {
  @ApiProperty({
    description: 'Correo electronico del usuario',
    example: 'usuario@ejemplo.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contrasena del usuario',
    example: 'MiContrasena123!',
  })
  @IsString()
  password: string;
}
