import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Decorador para marcar rutas como publicas (sin autenticacion)
 * Uso: @Public() en el controlador o metodo
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
