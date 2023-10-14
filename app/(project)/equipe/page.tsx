'use client';

import { submitTeam } from '@/app/services/ApiService';
import { useForm } from 'react-hook-form';
import { getSession } from 'next-auth/react';
import { SessionInterface } from '@/app/types/SessionType';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Team() {
  const form = useForm();

  async function onSubmit(data: any) {
    const userId = (await getSession()) as SessionInterface;
    const response = await submitTeam({
      teamName: data.teamName,
      description: data.description,
      leaderId: userId.payload.sub,
    }).then(() => {
      form.reset();
    });

    return response;
  }

  return (
    <div className="m-auto p-20 w-full static">
      <div className="bg-midnight-blue p-6 rounded-lg shadow-md w-1/2 mx-auto flex-col justify-items-center ">
        <div>
          <h1 className="text-bold mb-5 text-gray-ba ">
            Crie a sua equipe e melhore a comunicação entre os membros
          </h1>
        </div>
        <div className="flex-none">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="teamName"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel className="text-gray-250 text-opacity-70">
                      Nome da equipe
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="text" className="w-56" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel className="text-gray-250 text-opacity-70">
                      Descrição
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="text" className="w-56" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="mx-auto bg-gradient-to-r from-blue-violet-500 to-lilac hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
              >
                Criar
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
