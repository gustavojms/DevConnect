import { CreateUserDto } from '../dto/create-user.dto';

export interface UsersInterfaceRepository {
  /**
   * @description
   * Aqui vai a definição de todos os métodos que serão implementados
   */
  create(user: CreateUserDto): Promise<CreateUserDto>;
}
