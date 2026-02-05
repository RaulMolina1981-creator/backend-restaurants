import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

/**
 * DTO para actualizar un producto existente
 * Todos los campos son opcionales (hereda de CreateProductDto con PartialType)
 */
export class UpdateProductDto extends PartialType(CreateProductDto) {}
