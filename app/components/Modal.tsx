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
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

interface ModalProps {
  isvisible: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isvisible, onClose }) => {
  const form = useForm();

  async function onSubmit(data: any) {
    if (data.isPublic === '1') {
      data.isPublic = true;
    } else {
      data.isPublic = false;
    }

    const userId = (await getSession()) as SessionInterface;
    const response = await submitProject({
      title: data.title,
      description: data.description,
      projectOwner: userId.payload.sub,
      isPublic: data.isPublic,
    }).then(() => {
      form.reset();
    });

    return response;
  }

  if (!isvisible) return null;
  return (
    <div className=" fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-20">
      <div className="w-[600px] flex flex-col">
        <span
          className="text-white text-xl place-self-end cursor-pointer"
          onClick={onClose}
        >
          X
        </span>
        <div className="bg-midnight-blue p-6 rounded-lg shadow-md w-[600px] mx-auto flex-col">
          <div>
            <h1 className="text-bold mb-5 text-gray-ba ">Crie seu projeto!</h1>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel className="text-gray-ba text-opacity-70">
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
                    <FormLabel className="text-gray-ba text-opacity-70">
                      Descrição
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} className="w-full text-black" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isPublic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-ba">
                      Visibilidade do projeto
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Público</SelectItem>
                        <SelectItem value="0">Privado</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="w-52 bg-gradient-to-r from-blue-violet-500 to-lilac hover:bg-blue-600 text-white py-2 px-4 mt-10 rounded-md transition duration-300 ease-in-out"
                >
                  Criar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
