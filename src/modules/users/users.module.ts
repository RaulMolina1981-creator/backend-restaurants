import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

/**
 * Modulo de usuarios
 *
 * ============================================
 * TODO: COMPLETAR CONFIGURACION DEL MODULO
 * ============================================
 *
 * Cuando se implemente la funcionalidad completa:
 *
 * 1. Exportar UsersService para que AuthModule pueda usarlo:
 *    - Buscar usuario por email para login
 *    - Crear usuario en registro
 *
 * 2. Importar dependencias adicionales:
 *    - ConfigModule para configuracion
 *    - StorageModule para subida de avatares (opcional)
 *
 * 3. Agregar guards de autenticacion/autorizacion:
 *    - JwtAuthGuard para rutas protegidas
 *    - RolesGuard para rutas de admin
 *
 * INTEGRACION CON AUTHMODULE:
 * - AuthModule importa UsersModule
 * - AuthService usa UsersService.findByEmail() para login
 * - AuthService usa UsersService.create() para registro
 */
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Exportar para AuthModule
})
export class UsersModule {}
