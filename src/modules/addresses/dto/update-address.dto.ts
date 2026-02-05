import { PartialType } from '@nestjs/swagger';
import { CreateAddressDto } from './create-address.dto';

/**
 * DTO para actualizar una direccion existente
 * Todos los campos son opcionales (hereda de CreateAddressDto con PartialType)
 */
export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
