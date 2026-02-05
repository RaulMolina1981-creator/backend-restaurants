import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';

/**
 * DTO para actualizar una categoria existente
 * Todos los campos son opcionales (hereda de CreateCategoryDto con PartialType)
 */
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
