import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsInt,
  IsUUID,
  IsIn,
  IsDateString,
  Min,
  Max,
  MaxLength,
  Matches,
} from 'class-validator';

/**
 * DTO para actualizar una reservacion existente
 */
export class UpdateReservationDto {
  @ApiPropertyOptional({
    description: 'UUID de la mesa a reservar',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsUUID()
  tableId?: string;

  @ApiPropertyOptional({
    description: 'Numero de personas',
    example: 4,
    minimum: 1,
    maximum: 50,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(50)
  partySize?: number;

  @ApiPropertyOptional({
    description: 'Fecha de la reservacion (formato ISO 8601)',
    example: '2024-12-25',
  })
  @IsOptional()
  @IsDateString()
  reservationDate?: string;

  @ApiPropertyOptional({
    description: 'Hora de la reservacion (formato HH:MM)',
    example: '19:30',
  })
  @IsOptional()
  @IsString()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'La hora debe estar en formato HH:MM',
  })
  reservationTime?: string;

  @ApiPropertyOptional({
    description: 'Estado de la reservacion',
    example: 'confirmed',
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['pending', 'confirmed', 'cancelled', 'completed'])
  status?: string;

  @ApiPropertyOptional({
    description: 'Solicitudes especiales del cliente',
    example: 'Mesa cerca de la ventana',
    maxLength: 1000,
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  specialRequests?: string;
}
