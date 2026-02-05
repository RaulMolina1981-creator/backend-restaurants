import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

/**
 * Guard de autorizacion por roles
 *
 * TODO: Implementar la logica de verificacion de roles
 * - Obtener los roles requeridos del decorador @Roles()
 * - Verificar que el usuario tenga al menos uno de los roles requeridos
 * - Denegar acceso si no tiene los permisos necesarios
 *
 * Por ahora, este guard permite todas las peticiones para desarrollo
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Obtener roles requeridos del decorador
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // Si no hay roles requeridos, permitir acceso
    if (!requiredRoles) {
      return true;
    }

    // TODO: Implementar verificacion real de roles
    // const { user } = context.switchToHttp().getRequest();
    //
    // if (!user) {
    //   return false;
    // }
    //
    // return requiredRoles.some((role) => user.role === role);

    // Por ahora permitir todas las peticiones (desarrollo)
    return true;
  }
}
