import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';

/**
 * Controlador de usuarios
 * Proporciona endpoints CRUD y endpoints /me para el usuario actual
 */
@ApiTags('Usuarios')
@Controller('users')
@ApiBearerAuth('JWT-auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Obtener perfil del usuario actual
   */
  @Get('me')
  @ApiOperation({ summary: 'Obtener mi perfil' })
  @ApiResponse({ status: 200, description: 'Perfil del usuario' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  async getMyProfile() {
    // En produccion, userId vendria del token JWT
    // Por ahora retorna un placeholder
    return {
      message: 'Para usar este endpoint, proporcione userId como query param',
      note: 'En produccion, el userId se obtiene del token JWT',
    };
  }

  /**
   * Actualizar perfil del usuario actual
   */
  @Patch('me')
  @ApiOperation({ summary: 'Actualizar mi perfil' })
  @ApiResponse({ status: 200, description: 'Perfil actualizado' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  async updateMyProfile(@Body() updateUserDto: UpdateUserDto) {
    // En produccion, userId vendria del token JWT
    return {
      message: 'Para usar este endpoint, proporcione userId como query param',
      note: 'En produccion, el userId se obtiene del token JWT',
    };
  }

  /**
   * Cambiar mi contrasena
   */
  @Patch('me/password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cambiar mi contrasena' })
  @ApiResponse({ status: 200, description: 'Contrasena cambiada' })
  @ApiResponse({ status: 401, description: 'Contrasena actual incorrecta' })
  async changeMyPassword(
    @Body('currentPassword') currentPassword: string,
    @Body('newPassword') newPassword: string,
  ) {
    // En produccion, userId vendria del token JWT
    return {
      message: 'Para usar este endpoint, proporcione userId como query param',
      note: 'En produccion, el userId se obtiene del token JWT',
    };
  }

  /**
   * Obtener mis direcciones
   */
  @Get('me/addresses')
  @ApiOperation({ summary: 'Obtener mis direcciones' })
  @ApiResponse({ status: 200, description: 'Lista de direcciones del usuario' })
  async getMyAddresses() {
    // En produccion, userId vendria del token JWT
    return {
      message: 'Para usar este endpoint, proporcione userId como query param',
      note: 'En produccion, el userId se obtiene del token JWT',
    };
  }

  /**
   * Obtener mis pedidos
   */
  @Get('me/orders')
  @ApiOperation({ summary: 'Obtener mis pedidos' })
  @ApiResponse({ status: 200, description: 'Lista de pedidos del usuario' })
  async getMyOrders() {
    return {
      message: 'Use GET /orders/my-orders con userId para obtener pedidos',
      redirect: '/orders/my-orders',
    };
  }

  /**
   * Obtener mis reservaciones
   */
  @Get('me/reservations')
  @ApiOperation({ summary: 'Obtener mis reservaciones' })
  @ApiResponse({ status: 200, description: 'Lista de reservaciones del usuario' })
  async getMyReservations() {
    return {
      message: 'Use GET /reservations/my-reservations con userId para obtener reservaciones',
      redirect: '/reservations/my-reservations',
    };
  }

  /**
   * Crear nuevo usuario (solo administradores)
   */
  @Post()
  @ApiOperation({ summary: 'Crear usuario (solo admin)' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Sin permisos de administrador' })
  @ApiResponse({ status: 409, description: 'Email ya registrado' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * Listar todos los usuarios (solo administradores)
   */
  @Get()
  @ApiOperation({ summary: 'Listar usuarios (solo admin)' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Sin permisos de administrador' })
  async findAll() {
    return this.usersService.findAll();
  }

  /**
   * Obtener usuario por ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Obtener usuario por ID' })
  @ApiParam({ name: 'id', description: 'UUID del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  /**
   * Actualizar usuario
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar usuario' })
  @ApiParam({ name: 'id', description: 'UUID del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  /**
   * Cambiar contrasena del usuario
   */
  @Patch(':id/password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cambiar contrasena' })
  @ApiParam({ name: 'id', description: 'UUID del usuario' })
  @ApiResponse({ status: 200, description: 'Contrasena actualizada' })
  @ApiResponse({ status: 401, description: 'Contrasena actual incorrecta' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async changePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('currentPassword') currentPassword: string,
    @Body('newPassword') newPassword: string,
  ) {
    return this.usersService.changePassword(id, currentPassword, newPassword);
  }

  /**
   * Eliminar usuario
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar usuario' })
  @ApiParam({ name: 'id', description: 'UUID del usuario' })
  @ApiResponse({ status: 204, description: 'Usuario eliminado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.usersService.remove(id);
  }
}
