import { PrismaService } from 'src/database/prisma.service';
import { UsersInterfaceRepository } from './users.interface.repository';
import { Inject } from '@nestjs/common';

/**
 * @description
 * Aqui vai todos os métodos que serão implementados
 */
export class UsersRepository implements UsersInterfaceRepository {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}
}
