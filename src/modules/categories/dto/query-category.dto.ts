import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../common/dto';

/**
 * DTO para consultar categorias con filtros y paginacion
 * Extiende PaginationDto para heredar parametros de paginacion comunes
 */
export class QueryCategoryDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Busqueda por nombre o descripcion',
    example: 'italiana',
  })
  @IsOptional()
  @IsString()
  search?: string;
}
