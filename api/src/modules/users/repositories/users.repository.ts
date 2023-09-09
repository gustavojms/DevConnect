import { PrismaService } from 'src/database/prisma.service';
import { UsersInterfaceRepository } from './users.interface.repository';
import { Inject } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';

/**
 * @description
 * Aqui vai todos os métodos que serão implementados
 */
export class UsersRepository implements UsersInterfaceRepository {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async create(user: CreateUserDto): Promise<CreateUserDto> {
    const userCreated = await this.prisma.user.create({
      data: {
        ...user,
      },
    });

    return userCreated;
  }
}
