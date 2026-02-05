import { PartialType, OmitType } from '@nestjs/swagger';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsEnum } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

/**
 * Enum para roles de usuario
 */
export enum UserRole {
  CUSTOMER = 'customer',
  RESTAURANT_OWNER = 'restaurant_owner',
  ADMIN = 'admin',
}

/**
 * DTO para actualizar un usuario existente
 * Omite el campo password (usar endpoint separado para cambiar contrasena)
 *
 * TODO: Implementar validaciones adicionales cuando se agregue:
 * - Verificacion de email al cambiar
 * - Validacion de permisos para cambiar rol
 */
export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password', 'email'] as const),
) {
  @ApiPropertyOptional({
    description: 'Estado activo del usuario',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    description: 'Usuario verificado',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

  @ApiPropertyOptional({
    description: 'Rol del usuario',
    enum: UserRole,
    example: 'customer',
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
