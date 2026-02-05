import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorador para obtener el usuario actual de la request
 * Uso: @CurrentUser() user: User en los parametros del metodo
 *
 * TODO: Implementar cuando se configure la autenticacion JWT
 * El usuario deberia estar disponible en request.user despues de pasar por el JwtAuthGuard
 */
export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    // Si se especifica un campo, devolver solo ese campo
    if (data) {
      return user?.[data];
    }

    return user;
  },
);
