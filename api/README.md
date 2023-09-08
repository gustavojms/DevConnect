# DevConnect API

Repositório para a API da plataforma DevConnect, feita com o framework NestJS.

## Instalar dependências

```bash
$ npm install
```

## Rodando a aplicação

```bash
# desenvolvimento
$ npm run start

# modo de observação
$ npm run start:dev

# produção
$ npm run start:prod

# build
$ npm run build
```

# Rotas

## Autenticação e Autorização de Usuário

- `POST /api/register`: Permite aos usuários criar novas contas.
- `POST /api/login`: Lida com o login do usuário.
- `POST /api/logout`: Faz o logout do usuário.
- `POST /api/forgot-password`: Inicia o processo de redefinição de senha.
- `POST /api/reset-password/:token`: Redefine a senha do usuário.

## Gerenciamento de Perfil de Usuário

- `GET /api/user`: Obtém informações do perfil do usuário atual.
- `PUT /api/user`: Atualiza informações do perfil do usuário atual.

## Posts e Comentários

- `GET /api/posts`: Obtém uma lista de posts.
- `GET /api/posts/:id`: Obtém um post específico.
- `POST /api/posts`: Cria um novo post.
- `PUT /api/posts/:id`: Atualiza um post existente.
- `DELETE /api/posts/:id`: Deleta um post.
- `GET /api/posts/:id/comments`: Obtém comentários para um post.
- `POST /api/posts/:id/comments`: Adiciona um novo comentário a um post.
- `PUT /api/comments/:id`: Atualiza um comentário.
- `DELETE /api/comments/:id`: Deleta um comentário.

## Curtidas e Reações

- `POST /api/posts/:id/like`: Adiciona uma curtida a um post.
- `POST /api/posts/:id/unlike`: Remove uma curtida de um post.

## Projetos e Tarefas

- `GET /api/projects`: Obtém uma lista de projetos.
- `GET /api/projects/:id`: Obtém um projeto específico.
- `POST /api/projects`: Cria um novo projeto.
- `PUT /api/projects/:id`: Atualiza um projeto existente.
- `DELETE /api/projects/:id`: Deleta um projeto.
- `GET /api/projects/:id/tasks`: Obtém tarefas para um projeto.
- `POST /api/projects/:id/tasks`: Adiciona uma nova tarefa a um projeto.
- `PUT /api/tasks/:id`: Atualiza uma tarefa.
- `DELETE /api/tasks/:id`: Deleta uma tarefa.

## Times e Associações

- `GET /api/teams`: Obtém uma lista de times.
- `GET /api/teams/:id`: Obtém um time específico.
- `POST /api/teams`: Cria um novo time.
- `PUT /api/teams/:id`: Atualiza um time existente.
- `DELETE /api/teams/:id`: Deleta um time.
- `GET /api/teams/:id/members`: Obtém membros de um time.
- `POST /api/teams/:id/members`: Adiciona um membro a um time.
- `DELETE /api/teams/:id/members/:userId`: Remove um membro de um time.

## Conversas e Mensagens

- `GET /api/chats`: Obtém uma lista de conversas.
- `GET /api/chats/:id`: Obtém mensagens para uma conversa.
- `POST /api/chats/:id`: Envia uma mensagem para uma conversa.

## Conversa

- `GET /api/chat`: Obtém uma lista de conversas disponíveis.
- `GET /api/chat/:id`: Obtém detalhes de uma conversa específica.
- `POST /api/chat`: Cria uma nova conversa.
- `PUT /api/chat/:id`: Atualiza uma conversa existente.
- `DELETE /api/chat/:id`: Deleta uma conversa.

## Membros de Conversa

- `GET /api/chats/:id/members`: Obtém membros de uma conversa.
- `POST /api/chats/:id/members`: Adiciona um membro a uma conversa.
- `DELETE /api/chats/:id/members/:userId`: Remove um membro de uma conversa.

## Conversas Privadas

- `GET /api/private-chats/:userId`: Obtém conversas privadas para um usuário.
- `POST /api/private-chats/:userId`: Inicia uma nova conversa privada com um usuário.
- `GET /api/private-chats/:userId/:chatId`: Obtém mensagens para uma conversa privada.

## Conversas em Grupo

- `GET /api/group-chats`: Obtém uma lista de conversas em grupo.
- `GET /api/group-chats/:id`: Obtém detalhes de uma conversa em grupo específica.
- `POST /api/group-chats`: Cria uma nova conversa em grupo.
- `PUT /api/group-chats/:id`: Atualiza uma conversa em grupo existente.
- `DELETE /api/group-chats/:id`: Deleta uma conversa em grupo.

## Associações de Membros em Conversas em Grupo

- `GET /api/group-chats/:id/members`: Obtém membros de uma conversa em grupo.
- `POST /api/group-chats/:id/members`: Adiciona um membro a uma conversa em grupo.
- `DELETE /api/group-chats/:id/members/:userId`: Remove um membro de uma conversa em grupo.
