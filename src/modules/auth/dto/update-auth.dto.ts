import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

/**
 * DTO para actualizar credenciales de autenticacion
 *
 * TODO: Implementar cuando se agregue funcionalidad de:
 * - Cambio de contrasena
 * - Recuperacion de contrasena
 * - Actualizacion de tokens de refresco
 */
export class UpdateAuthDto {
  @ApiPropertyOptional({
    description: 'Contrasena actual del usuario',
    example: 'ContrasenaActual123!',
  })
  @IsOptional()
  @IsString()
  currentPassword?: string;

  @ApiPropertyOptional({
    description: 'Nueva contrasena del usuario',
    example: 'NuevaContrasena123!',
    minLength: 8,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  newPassword?: string;
}

/**
 * DTO para solicitar recuperacion de contrasena
 */
export class ForgotPasswordDto {
  @ApiPropertyOptional({
    description: 'Correo electronico para recuperacion',
    example: 'usuario@ejemplo.com',
  })
  @IsOptional()
  @IsString()
  email?: string;
}

/**
 * DTO para restablecer contrasena con token
 */
export class ResetPasswordDto {
  @ApiPropertyOptional({
    description: 'Token de recuperacion',
    example: 'abc123xyz',
  })
  @IsOptional()
  @IsString()
  token?: string;

  @ApiPropertyOptional({
    description: 'Nueva contrasena',
    example: 'NuevaContrasena123!',
    minLength: 8,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  newPassword?: string;
}
