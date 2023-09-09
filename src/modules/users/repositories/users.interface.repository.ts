import { User } from "@prisma/client";

export interface UsersInterfaceRepository {
  /**
   * @description
   * Aqui vai a definição de todos os métodos que serão implementados
   */

  create(user: User): Promise<User>;

}
