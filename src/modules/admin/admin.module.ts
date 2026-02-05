import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

/**
 * Modulo de administracion
 * Gestiona las funcionalidades administrativas del sistema
 *
 * TODO: Implementar las siguientes funcionalidades:
 * - Dashboard con estadisticas en tiempo real
 * - Gestion de usuarios (CRUD completo)
 * - Gestion de roles y permisos
 * - Logs de auditoria
 * - Configuracion del sistema
 * - Reportes y exportacion de datos
 *
 * TODO: Agregar las siguientes importaciones cuando se implementen:
 * - UsersModule (para acceder al servicio de usuarios)
 * - RestaurantsModule (para estadisticas)
 * - OrdersModule (para estadisticas de pedidos)
 */
@Module({
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
