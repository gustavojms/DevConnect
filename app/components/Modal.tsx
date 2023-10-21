import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { submitProject } from '@/app/services/ApiService';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getSession } from 'next-auth/react';
import { SessionInterface } from '../types/SessionType';

interface ModalProps {
  isvisible: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isvisible, onClose }) => {
  const form = useForm();

  async function onSubmit(data: any) {
    const userId = (await getSession()) as SessionInterface;
    const response = await submitProject({
      title: data.title,
      description: data.description,
      projectOwner: userId.payload.sub,
    }).then(() => {
      form.reset();
    });

    return response;
  }

  if (!isvisible) return null;
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
      <div className="w-[400px] flex flex-col">
        <span
          className="text-white text-xl place-self-end cursor-pointer"
          onClick={onClose}
        >
          X
        </span>
        <div className="bg-slate-950 p-2 rounded text-white">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel className="text-gray-250 text-opacity-70">
                      Nome Do Projeto
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="w-full text-black"
                      />
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
                      <Textarea {...field} className="w-full text-black" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="mx-auto w-full bg-gradient-to-r from-blue-violet-500 to-lilac hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
              >
                Criar
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
