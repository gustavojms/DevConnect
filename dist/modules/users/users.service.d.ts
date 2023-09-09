import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: UsersRepository);
    create(createUserDto: CreateUserDto): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        photoUrl: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
