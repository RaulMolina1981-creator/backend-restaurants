import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsInt,
  IsUUID,
  IsEmail,
  IsDateString,
  Min,
  Max,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

/**
 * DTO para crear una nueva reservacion
 */
export class CreateReservationDto {
  @ApiProperty({
    description: 'UUID del restaurante',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  restaurantId: string;

  @ApiPropertyOptional({
    description: 'UUID del usuario que realiza la reservacion',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiPropertyOptional({
    description: 'UUID de la mesa a reservar',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsUUID()
  tableId?: string;

  @ApiProperty({
    description: 'Nombre del invitado',
    example: 'Juan Perez',
    minLength: 2,
    maxLength: 255,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  guestName: string;

  @ApiProperty({
    description: 'Correo electronico del invitado',
    example: 'juan.perez@email.com',
  })
  @IsEmail()
  guestEmail: string;

  @ApiProperty({
    description: 'Telefono del invitado',
    example: '+52 55 1234 5678',
    maxLength: 20,
  })
  @IsString()
  @MaxLength(20)
  guestPhone: string;

  @ApiProperty({
    description: 'Numero de personas',
    example: 4,
    minimum: 1,
    maximum: 50,
  })
  @IsInt()
  @Min(1)
  @Max(50)
  partySize: number;

  @ApiProperty({
    description: 'Fecha de la reservacion (formato ISO 8601)',
    example: '2024-12-25',
  })
  @IsDateString()
  reservationDate: string;

  @ApiProperty({
    description: 'Hora de la reservacion (formato HH:MM)',
    example: '19:30',
  })
  @IsString()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'La hora debe estar en formato HH:MM',
  })
  reservationTime: string;

  @ApiPropertyOptional({
    description: 'Solicitudes especiales del cliente',
    example: 'Mesa cerca de la ventana, celebracion de cumpleanos',
    maxLength: 1000,
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  specialRequests?: string;
}
