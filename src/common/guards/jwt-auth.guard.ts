import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

/**
 * Guard de autenticacion JWT
 *
 * TODO: Implementar la logica de verificacion del token JWT
 * - Verificar que el token exista en el header Authorization
 * - Validar el token con la clave secreta
 * - Decodificar el payload y adjuntar el usuario a la request
 * - Manejar tokens expirados o invalidos
 *
 * Por ahora, este guard permite todas las peticiones para desarrollo
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Verificar si la ruta es publica
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    // TODO: Implementar verificacion real del token JWT
    // const request = context.switchToHttp().getRequest();
    // const token = this.extractTokenFromHeader(request);
    //
    // if (!token) {
    //   throw new UnauthorizedException('Token no proporcionado');
    // }
    //
    // try {
    //   const payload = await this.jwtService.verifyAsync(token);
    //   request.user = payload;
    // } catch {
    //   throw new UnauthorizedException('Token invalido o expirado');
    // }

    // Por ahora permitir todas las peticiones (desarrollo)
    return true;
  }

  // TODO: Descomentar cuando se implemente la autenticacion
  // private extractTokenFromHeader(request: Request): string | undefined {
  //   const [type, token] = request.headers.authorization?.split(' ') ?? [];
  //   return type === 'Bearer' ? token : undefined;
  // }
}
