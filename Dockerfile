# ===========================================
# Dockerfile - Backend Restaurantes (NestJS)
# ===========================================

# Etapa 1: Build
FROM node:20-alpine AS builder

# Instalar pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json pnpm-lock.yaml* ./
COPY prisma ./prisma/

# Instalar dependencias (incluyendo devDependencies para build)
RUN pnpm install

# Copiar código fuente
COPY . .

# Generar cliente Prisma y compilar
RUN npx prisma generate
RUN pnpm run build

# Etapa 2: Producción
FROM node:20-alpine AS production

# Instalar pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json pnpm-lock.yaml* ./
COPY prisma ./prisma/

# Instalar dependencias de producción
RUN pnpm install --prod

# Copiar Prisma Client generado desde builder (evita descargar Prisma 7)
COPY --from=builder /app/node_modules/.pnpm/@prisma+client@5.22.0_prisma@5.22.0/node_modules/@prisma/client ./node_modules/@prisma/client
COPY --from=builder /app/node_modules/.pnpm/@prisma+client@5.22.0_prisma@5.22.0/node_modules/.prisma ./node_modules/.prisma

# Copiar archivos compilados del builder
COPY --from=builder /app/dist ./dist

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=3000

# Exponer puerto
EXPOSE 3000

# Comando para iniciar (sin migrate deploy para evitar Prisma 7)
CMD ["node", "dist/src/main.js"]
