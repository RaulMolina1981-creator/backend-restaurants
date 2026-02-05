import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto';

/**
 * Servicio de usuarios
 *
 * ============================================
 * TODO: IMPLEMENTAR LOGICA DE GESTION DE USUARIOS
 * ============================================
 *
 * Este servicio requiere implementar:
 *
 * 1. CREAR USUARIO:
 *    - Hashear contrasena con bcrypt
 *    - Validar que el email no exista
 *    - Crear registro en base de datos
 *    - Enviar email de verificacion (opcional)
 *
 * 2. BUSCAR USUARIOS:
 *    - Implementar paginacion
 *    - Filtros por rol, estado activo, etc.
 *    - No retornar passwordHash en respuestas
 *
 * 3. BUSCAR POR ID:
 *    - Validar que existe
 *    - Cargar relaciones necesarias
 *
 * 4. BUSCAR POR EMAIL:
 *    - Util para autenticacion
 *    - Incluir passwordHash solo internamente
 *
 * 5. ACTUALIZAR USUARIO:
 *    - Validar permisos (solo admin o el propio usuario)
 *    - No permitir cambiar email sin verificacion
 *    - Validar cambio de rol (solo admin)
 *
 * 6. CAMBIAR CONTRASENA:
 *    - Validar contrasena actual
 *    - Hashear nueva contrasena
 *    - Invalidar sesiones activas (opcional)
 *
 * 7. ELIMINAR USUARIO:
 *    - Soft delete o hard delete segun requerimientos
 *    - Limpiar datos relacionados
 *
 * DEPENDENCIAS NECESARIAS:
 * - bcrypt: Para hasheo de contrasenas
 */
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crear nuevo usuario
   *
   * TODO: Implementar creacion de usuario
   * - Hashear contrasena
   * - Validar email unico
   * - Crear en base de datos
   */
  async create(createUserDto: CreateUserDto) {
    // TODO: Implementar creacion de usuario
    // const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    // const user = await this.prisma.user.create({
    //   data: {
    //     ...createUserDto,
    //     passwordHash: hashedPassword,
    //   },
    // });
    // return this.formatUser(user);

    return {
      message: 'Creacion de usuario - Pendiente de implementar',
      data: null,
    };
  }

  /**
   * Obtener todos los usuarios con paginacion
   *
   * TODO: Implementar listado con paginacion y filtros
   */
  async findAll() {
    // TODO: Implementar listado paginado
    // const users = await this.prisma.user.findMany({
    //   select: {
    //     id: true,
    //     email: true,
    //     firstName: true,
    //     lastName: true,
    //     role: true,
    //     isActive: true,
    //     createdAt: true,
    //   },
    // });
    // return users;

    return {
      message: 'Listado de usuarios - Pendiente de implementar',
      data: [],
    };
  }

  /**
   * Obtener usuario por ID
   *
   * TODO: Implementar busqueda por ID
   */
  async findOne(id: string) {
    // TODO: Implementar busqueda por ID
    // const user = await this.prisma.user.findUnique({
    //   where: { id },
    //   select: {
    //     id: true,
    //     email: true,
    //     firstName: true,
    //     lastName: true,
    //     phone: true,
    //     avatarUrl: true,
    //     dateOfBirth: true,
    //     role: true,
    //     isActive: true,
    //     isVerified: true,
    //     createdAt: true,
    //   },
    // });
    // if (!user) {
    //   throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    // }
    // return user;

    return {
      message: 'Busqueda de usuario por ID - Pendiente de implementar',
      data: null,
    };
  }

  /**
   * Obtener usuario por email (uso interno para autenticacion)
   *
   * TODO: Implementar busqueda por email
   * - Incluir passwordHash para validacion en auth
   */
  async findByEmail(email: string) {
    // TODO: Implementar busqueda por email
    // const user = await this.prisma.user.findUnique({
    //   where: { email },
    // });
    // return user;

    return null;
  }

  /**
   * Actualizar usuario
   *
   * TODO: Implementar actualizacion
   * - Validar permisos
   * - No permitir cambiar email sin verificacion
   */
  async update(id: string, updateUserDto: UpdateUserDto) {
    // TODO: Implementar actualizacion
    // await this.findOne(id); // Verificar que existe
    // const user = await this.prisma.user.update({
    //   where: { id },
    //   data: updateUserDto,
    // });
    // return this.formatUser(user);

    return {
      message: 'Actualizacion de usuario - Pendiente de implementar',
      data: null,
    };
  }

  /**
   * Cambiar contrasena
   *
   * TODO: Implementar cambio de contrasena
   * - Validar contrasena actual
   * - Hashear nueva contrasena
   */
  async changePassword(
    id: string,
    currentPassword: string,
    newPassword: string,
  ) {
    // TODO: Implementar cambio de contrasena
    // const user = await this.prisma.user.findUnique({ where: { id } });
    // if (!user || !await bcrypt.compare(currentPassword, user.passwordHash)) {
    //   throw new UnauthorizedException('Contrasena actual incorrecta');
    // }
    // const hashedPassword = await bcrypt.hash(newPassword, 10);
    // await this.prisma.user.update({
    //   where: { id },
    //   data: { passwordHash: hashedPassword },
    // });

    return {
      message: 'Cambio de contrasena - Pendiente de implementar',
      data: null,
    };
  }

  /**
   * Eliminar usuario
   *
   * TODO: Implementar eliminacion
   * - Decidir entre soft delete o hard delete
   * - Limpiar datos relacionados
   */
  async remove(id: string) {
    // TODO: Implementar eliminacion
    // await this.findOne(id); // Verificar que existe
    // await this.prisma.user.delete({ where: { id } });

    return {
      message: 'Eliminacion de usuario - Pendiente de implementar',
      data: null,
    };
  }

  // ============================================
  // METODOS PRIVADOS
  // ============================================

  /**
   * Formatear usuario para respuesta (sin passwordHash)
   *
   * TODO: Descomentar cuando se implemente
   */
  // private formatUser(user: any) {
  //   const { passwordHash, ...userData } = user;
  //   return userData;
  // }
}
