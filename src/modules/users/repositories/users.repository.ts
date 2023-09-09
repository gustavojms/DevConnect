import { PrismaService } from 'src/database/prisma.service';
import { UsersInterfaceRepository } from './users.interface.repository';
import { Inject } from '@nestjs/common';
import { User } from '@prisma/client';

/**
 * @description
 * Aqui vai todos os métodos que serão implementados
 */
export class UsersRepository implements UsersInterfaceRepository {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    return this.prisma.user.create({ data: user });
  }  

}