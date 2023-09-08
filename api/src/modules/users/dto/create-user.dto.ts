/**
 * Aqui vai a definição de todos os campos da tabela de usuários
 */

export class CreateUserDto {
  id: number;
  username: string;
  email: string;
  password: string;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
