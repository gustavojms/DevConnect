'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { SessionInterface } from '@/app/types/SessionType';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import {
  deleteUser,
  fetchOneUser,
  updateUser,
} from '@/app/services/ApiService';
import { useRouter } from 'next/navigation';
import { Label } from '@radix-ui/react-label';
import { ConfirmDeleteAccountDialog } from '@/app/components/ConfirmDeleteAccountDialog';

export default function Configuracoes() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [userSession, setUserSession] = useState<SessionInterface | null>(null);
  const [userData, setUserData] = useState({} as any);
  const [dialogOpen, setDialogOpen] = useState(false);

  const onSubmit = async (data: any) => {
    const updatedData = {
      ...data,
      userId: userSession?.payload.sub,
      username: data.username || userData.username,
      email: data.email || userData.email,
    };
    await updateUser(updatedData);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const deleteAccount = async () => {
    await deleteUser(userSession?.payload.sub!);
    router.replace('/');
  };

  const info = async () => {
    const session = (await getSession()) as SessionInterface;
    setUserSession(session);
    const r = await fetchOneUser(session.payload.sub!);
    setUserData(r);
  };

  useEffect(() => {
    if (userSession == null && userData.username == null) {
      info();
    }
  });

  return (
    <div className="flex items-center justify-center h- m-auto">
      <div>
        <h1 className="text-center text-white text-3xl mt-10">Configurações</h1>
        <Card className="bg-midnight-blue border-none w-[480px] h-[480px] mt-10">
          <CardHeader className="mt-2">
            <h1 className="text-left text-white">Informações básicas</h1>
            <p className="text-left text-white text-opacity-70 text-sm">
              Atualize suas informações
            </p>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col justify-center"
            >
              <Label className="text-white"> Nome </Label>
              <Input
                {...register('username')}
                defaultValue={userData.username}
                type="text"
                placeholder="Nome de usuário"
                className="w-[400px] h-[50px] mt-2 mb-5"
              />
              <Label className="text-white "> Email </Label>
              <Input
                {...register('email')}
                defaultValue={userData.email}
                type="email"
                placeholder="E-mail"
                className="w-[400px] h-[50px] mt-2 mb-5"
              />
              <Label className="text-white "> Senha </Label>
              <Input
                {...register('password')}
                type="password"
                placeholder="Nova Senha"
                className="w-[400px] h-[50px] mt-2 mb-5"
                pattern=".{8,}"
                required
                title="8 characters minimum"
              />
              <div className="flex-row p-2">
                <Button
                  type="submit"
                  className="bg-pale-blue hover:bg-blue-violet-500  w-[170px] m-auto mr-2"
                >
                  Salvar alterações
                </Button>
                <Button
                  onClick={() => setDialogOpen(true)}
                  className="bg-red-500 hover:bg-red-700  w-[170px] m-auto ml-2"
                >
                  Deletar conta
                </Button>

                <ConfirmDeleteAccountDialog
                  onClose={() => setDialogOpen(false)}
                  onDelete={() => deleteAccount()}
                  open={dialogOpen}
                />
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
