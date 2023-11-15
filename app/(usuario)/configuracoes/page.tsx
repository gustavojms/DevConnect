'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { SessionInterface } from '@/app/types/SessionType';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { fetchOneUser, updateUser } from '@/app/services/ApiService';

export default function Configuracoes() {
  const { register, handleSubmit } = useForm();
  const [userSession, setUserSession] = useState<SessionInterface | null>(null);
  const [userData, setUserData] = useState({} as any);

  const onSubmit = async (data: any) => {
    const updatedData = {
      ...data,
      userId: userSession?.payload.sub,
      username: data.username || userData.username,
      email: data.email || userData.email,
    };
    await updateUser(updatedData);
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
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1 className="text-center text-white text-3xl mt-10">Configurações</h1>
        <Card className="bg-midnight-blue border-none w-[470px] h-[470px] mt-10">
          <CardHeader className="mt-2">
            <h1 className="text-left text-white">Informações básicas</h1>
            <p className="text-left text-white text-opacity-70 text-sm">
              Atualize suas informações
            </p>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col justify-center items-center"
            >
              <Input
                {...register('username')}
                defaultValue={userData.username}
                type="text"
                placeholder="Nome de usuário"
                className="w-[400px] h-[50px] mt-10"
              />
              <Input
                {...register('email')}
                defaultValue={userData.email}
                type="text"
                placeholder="E-mail"
                className="w-[400px] h-[50px] mt-10"
              />
              <Input
                {...register('password')}
                type="text"
                placeholder="Nova Senha ou Senha Atual"
                className="w-[400px] h-[50px] mt-10"
              />
              <Button
                type="submit"
                className="bg-pale-blue hover:bg-blue-violet-600 w-[286px] mt-5"
              >
                Salvar alterações
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
