import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';

/**
 * Modulo de base de datos
 * Centraliza la configuracion de acceso a datos
 */
@Module({
  imports: [PrismaModule],
  exports: [PrismaModule],
})
export class DatabaseModule {}
