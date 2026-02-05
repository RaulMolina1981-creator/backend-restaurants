import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

// Modulos de infraestructura
import { PrismaModule } from './prisma/prisma.module';

// Modulos de autenticacion (estructura sin logica)
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AdminModule } from './modules/admin/admin.module';

// Modulos funcionales (CRUD completo)
import { RestaurantsModule } from './modules/restaurants/restaurants.module';
import { AddressesModule } from './modules/addresses/addresses.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { MenuModule } from './modules/menu/menu.module';
import { ProductsModule } from './modules/products/products.module';
import { TablesModule } from './modules/tables/tables.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ReviewsModule } from './modules/reviews/reviews.module';

@Module({
  imports: [
    // Configuracion global
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),

    // Rate Limiting (Throttler)
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.get<number>('THROTTLE_TTL', 60) * 1000,
          limit: config.get<number>('THROTTLE_LIMIT', 100),
        },
      ],
    }),

    // Base de datos
    PrismaModule,

    // ============================================
    // MODULOS SIN LOGICA (estructura para practica)
    // ============================================
    AuthModule,   // TODO: Implementar autenticacion JWT
    UsersModule,  // TODO: Implementar gestion de usuarios
    AdminModule,  // TODO: Implementar panel de administracion

    // ============================================
    // MODULOS FUNCIONALES (CRUD completo)
    // ============================================
    RestaurantsModule,
    AddressesModule,
    CategoriesModule,
    MenuModule,
    ProductsModule,
    TablesModule,
    ReservationsModule,
    OrdersModule,
    ReviewsModule,
  ],
  providers: [
    // Aplicar Rate Limiting globalmente
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
