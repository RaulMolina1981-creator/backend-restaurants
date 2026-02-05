import { PartialType } from '@nestjs/swagger';
import { CreateTableDto } from './create-table.dto';

/**
 * DTO para actualizar una mesa existente
 * Todos los campos son opcionales (hereda de CreateTableDto con PartialType)
 */
export class UpdateTableDto extends PartialType(CreateTableDto) {}
