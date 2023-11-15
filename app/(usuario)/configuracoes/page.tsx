'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

export default function Configuracoes() {
  const form = useForm();

  const onSubmit = (data: any) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1 className="text-center text-white text-3xl mt-10">Configurações</h1>
        <Card className="bg-midnight-blue border-none w-[470px] h-[470px] mt-10">
          <CardHeader className="mt-10">
            <h1 className="text-left text-white">Informações básicas</h1>
            <p className="text-left text-white text-opacity-70 text-sm">
              Atualize suas informações
            </p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col justify-center items-center"
              >
                <Input
                  {...form}
                  value=""
                  type="text"
                  placeholder="Nome"
                  className="w-[400px] h-[50px] mt-10"
                />
                <Input
                  {...form}
                  value=""
                  type="text"
                  placeholder="E-mail"
                  className="w-[400px] h-[50px] mt-10"
                />
                <Input
                  {...form}
                  value=""
                  type="text"
                  placeholder="Senha"
                  className="w-[400px] h-[50px] mt-10"
                />
                <Button
                  {...form}
                  value=""
                  type="submit"
                  className="bg-pale-blue hover:bg-blue-violet-600 w-[286px] mt-5"
                >
                  Salvar alterações
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
