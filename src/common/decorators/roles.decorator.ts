import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

/**
 * Decorador para especificar roles permitidos en una ruta
 * Uso: @Roles('admin', 'owner') en el controlador o metodo
 *
 * TODO: Implementar la logica de verificacion en el RolesGuard
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
