import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Error interno del servidor';
    let code = 'INTERNAL_ERROR';
    let details: any[] | undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        const res = exceptionResponse as any;
        message = res.message || message;
        code = res.error || this.getErrorCode(status);
        details = Array.isArray(res.message) ? res.message : undefined;
        if (details) {
          message = 'Error de validacion';
        }
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      this.logger.error(`Error no controlado: ${exception.message}`, exception.stack);
    }

    response.status(status).json({
      error: {
        code,
        message,
        details: details?.map((d) => ({
          field: typeof d === 'string' ? undefined : d.property,
          message: typeof d === 'string' ? d : Object.values(d.constraints || {}).join(', '),
        })),
        timestamp: new Date().toISOString(),
      },
    });
  }

  private getErrorCode(status: number): string {
    const codes: Record<number, string> = {
      400: 'BAD_REQUEST',
      401: 'AUTHENTICATION_REQUIRED',
      403: 'INSUFFICIENT_PERMISSIONS',
      404: 'RESOURCE_NOT_FOUND',
      409: 'DUPLICATE_RESOURCE',
      422: 'VALIDATION_ERROR',
      429: 'RATE_LIMIT_EXCEEDED',
      500: 'INTERNAL_ERROR',
      503: 'SERVICE_UNAVAILABLE',
    };
    return codes[status] || 'UNKNOWN_ERROR';
  }
}
