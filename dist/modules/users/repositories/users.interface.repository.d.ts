import { User } from "@prisma/client";
export interface UsersInterfaceRepository {
    create(user: User): Promise<User>;
}
