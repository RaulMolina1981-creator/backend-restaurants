import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Prefijo global para la API (desde variable de entorno)
  const apiPrefix = process.env.API_PREFIX || 'v1';
  app.setGlobalPrefix(`api/${apiPrefix}`);

  // Habilitar CORS con origenes especificos
  const corsOrigins = process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:4200'];
  app.enableCors({
    origin: corsOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Pipes de validacion global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no definidas en DTOs
      forbidNonWhitelisted: true, // Lanza error si hay propiedades extra
      transform: true, // Transforma tipos automaticamente
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Filtro de excepciones global
  app.useGlobalFilters(new HttpExceptionFilter());

  // Configuracion de Swagger
  const config = new DocumentBuilder()
    .setTitle('Restaurant API')
    .setDescription(
      `
## API REST para Sistema de Restaurantes

Esta API proporciona endpoints para gestionar un sistema completo de restaurantes.

### Modulos Funcionales (CRUD Completo)
- **Restaurantes**: Gestion de restaurantes con filtros y paginacion
- **Direcciones**: Direcciones de restaurantes
- **Categorías**: Categorias de cocina
- **Menús**: Menus de los restaurantes
- **Productos**: Productos/platillos
- **Mesas**: Mesas del restaurante
- **Reservas**: Sistema de reservaciones
- **Pedidos**: Sistema de pedidos
- **Reseñas**: Resenas y calificaciones

### Modulos Pendientes de Implementar
- **Autenticación**: Autenticacion JWT (estructura lista)
- **Usuarios**: Gestion de usuarios (estructura lista)
- **Administración**: Panel de administracion (estructura lista)

### Paginacion
Todos los endpoints de listado soportan:
- \`page\`: Numero de pagina (default: 1)
- \`limit\`: Elementos por pagina (default: 20, max: 100)
- \`sortBy\`: Campo para ordenar
- \`order\`: asc | desc

### Rate Limiting
- Maximo ${process.env.THROTTLE_LIMIT || 100} peticiones por ${process.env.THROTTLE_TTL || 60} segundos
      `,
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Ingresa tu token JWT',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('Restaurantes', 'Gestion de restaurantes')
    .addTag('Direcciones', 'Direcciones de restaurantes')
    .addTag('Categorías', 'Categorias de cocina')
    .addTag('Menús', 'Menus de restaurantes')
    .addTag('Productos', 'Productos/platillos')
    .addTag('Mesas', 'Mesas del restaurante')
    .addTag('Reservas', 'Sistema de reservaciones')
    .addTag('Pedidos', 'Sistema de pedidos')
    .addTag('Reseñas', 'Resenas y calificaciones')
    .addTag('Autenticación', 'Autenticacion JWT')
    .addTag('Usuarios', 'Gestion de usuarios')
    .addTag('Administración', 'Panel de administracion')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  // Iniciar servidor
  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.log(`===========================================`);
  logger.log(`Servidor corriendo en: http://localhost:${port}`);
  logger.log(`Swagger UI: http://localhost:${port}/api/docs`);
  logger.log(`API Prefix: /api/${apiPrefix}`);
  logger.log(`Rate Limit: ${process.env.THROTTLE_LIMIT || 100} req/${process.env.THROTTLE_TTL || 60}s`);
  logger.log(`CORS Origins: ${corsOrigins.join(', ')}`);
  logger.log(`===========================================`);
}

bootstrap();
