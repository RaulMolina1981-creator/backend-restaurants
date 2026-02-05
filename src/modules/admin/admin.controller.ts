import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AdminService } from './admin.service';

/**
 * Controlador de administracion
 * Proporciona endpoints para funcionalidades administrativas
 *
 * TODO: Agregar guards de autenticacion y autorizacion
 * TODO: Implementar decorador @Roles('ADMIN') para proteger todos los endpoints
 * TODO: Agregar DTOs de validacion para los endpoints
 */
@ApiTags('Administración')
@ApiBearerAuth()
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  /**
   * Obtener estadisticas del dashboard de administracion
   */
  @Get('dashboard')
  @ApiOperation({ summary: 'Obtener estadisticas del dashboard' })
  @ApiResponse({ status: 200, description: 'Estadisticas del dashboard' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async getDashboardStats() {
    const stats = await this.adminService.getDashboardStats();
    return { data: stats };
  }

  /**
   * Listar todos los usuarios del sistema
   */
  @Get('users')
  @ApiOperation({ summary: 'Listar usuarios del sistema' })
  @ApiQuery({ name: 'page', required: false, description: 'Numero de pagina' })
  @ApiQuery({ name: 'limit', required: false, description: 'Elementos por pagina' })
  @ApiQuery({ name: 'role', required: false, description: 'Filtrar por rol' })
  @ApiQuery({ name: 'search', required: false, description: 'Buscar por nombre o email' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios paginada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async listUsers(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('role') role?: string,
    @Query('search') search?: string,
  ) {
    return this.adminService.listUsers({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      role,
      search,
    });
  }

  /**
   * Cambiar el rol de un usuario
   */
  @Patch('users/:id/role')
  @ApiOperation({ summary: 'Cambiar rol de usuario' })
  @ApiParam({ name: 'id', description: 'UUID del usuario' })
  @ApiResponse({ status: 200, description: 'Rol de usuario actualizado' })
  @ApiResponse({ status: 400, description: 'Rol no valido' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async updateUserRole(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: { role: string },
  ) {
    const result = await this.adminService.updateUserRole(id, body.role);
    return { data: result };
  }

  /**
   * Cambiar el estado activo de un usuario
   */
  @Patch('users/:id/status')
  @ApiOperation({ summary: 'Cambiar estado de usuario (activo/inactivo)' })
  @ApiParam({ name: 'id', description: 'UUID del usuario' })
  @ApiResponse({ status: 200, description: 'Estado de usuario actualizado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async updateUserStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: { isActive: boolean },
  ) {
    const result = await this.adminService.updateUserStatus(id, body.isActive);
    return { data: result };
  }

  /**
   * Cambiar el estado de un restaurante
   */
  @Patch('restaurants/:id/status')
  @ApiOperation({ summary: 'Cambiar estado de restaurante (activo/inactivo)' })
  @ApiParam({ name: 'id', description: 'UUID del restaurante' })
  @ApiResponse({ status: 200, description: 'Estado de restaurante actualizado' })
  @ApiResponse({ status: 404, description: 'Restaurante no encontrado' })
  async updateRestaurantStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: { isActive: boolean },
  ) {
    const result = await this.adminService.updateRestaurantStatus(id, body.isActive);
    return { data: result };
  }
}
