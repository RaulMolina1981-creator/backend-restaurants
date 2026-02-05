import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

/**
 * Modulo de autenticacion
 *
 * ============================================
 * TODO: CONFIGURAR DEPENDENCIAS DE AUTENTICACION
 * ============================================
 *
 * Para implementar la autenticacion completa, agregar:
 *
 * 1. JwtModule:
 *    ```typescript
 *    JwtModule.registerAsync({
 *      imports: [ConfigModule],
 *      inject: [ConfigService],
 *      useFactory: (config: ConfigService) => ({
 *        secret: config.get('JWT_SECRET'),
 *        signOptions: { expiresIn: '1h' },
 *      }),
 *    })
 *    ```
 *
 * 2. PassportModule:
 *    ```typescript
 *    PassportModule.register({ defaultStrategy: 'jwt' })
 *    ```
 *
 * 3. Estrategias de Passport:
 *    - JwtStrategy: Valida tokens JWT en cada request
 *    - LocalStrategy: Valida credenciales en login
 *
 * 4. Importar UsersModule para acceder a datos de usuarios
 *
 * DEPENDENCIAS NPM NECESARIAS:
 * ```bash
 * npm install @nestjs/jwt @nestjs/passport passport passport-jwt passport-local bcrypt
 * npm install -D @types/bcrypt @types/passport-jwt @types/passport-local
 * ```
 *
 * VARIABLES DE ENTORNO NECESARIAS:
 * - JWT_SECRET: Clave secreta para firmar tokens
 * - JWT_EXPIRATION: Tiempo de expiracion (ej: '1h', '7d')
 * - REFRESH_TOKEN_SECRET: Clave para refresh tokens
 * - REFRESH_TOKEN_EXPIRATION: Tiempo de expiracion del refresh token
 */
@Module({
  imports: [
    // TODO: Descomentar cuando se instalen las dependencias
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => ({
    //     secret: config.get('JWT_SECRET'),
    //     signOptions: { expiresIn: config.get('JWT_EXPIRATION', '1h') },
    //   }),
    // }),

    // TODO: Agregar PassportModule
    // PassportModule.register({ defaultStrategy: 'jwt' }),

    // TODO: Importar UsersModule para validar usuarios
    // UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    // TODO: Agregar estrategias de Passport
    // JwtStrategy,
    // LocalStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
