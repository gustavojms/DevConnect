import { PrismaService } from 'src/database/prisma.service';
import { UsersInterfaceRepository } from './users.interface.repository';
import { User } from '@prisma/client';
export declare class UsersRepository implements UsersInterfaceRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(user: User): Promise<User>;
}
