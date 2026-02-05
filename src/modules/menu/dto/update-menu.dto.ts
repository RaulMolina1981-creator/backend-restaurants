import { PartialType } from '@nestjs/swagger';
import { CreateMenuDto } from './create-menu.dto';

/**
 * DTO para actualizar un menu existente
 * Todos los campos son opcionales (hereda de CreateMenuDto con PartialType)
 */
export class UpdateMenuDto extends PartialType(CreateMenuDto) {}
