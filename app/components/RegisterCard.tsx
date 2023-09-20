import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { submitData } from '../services/ApiService';
import { signIn } from 'next-auth/react';

export default function RegisterCard() {
  const form = useForm();
  const router = useRouter();

  async function onSubmit(data: any) {
    const response = await submitData(data);
    console.log(response);
    const signInResponse = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (signInResponse?.error) {
      console.log(signInResponse);
    } else {
      router.replace('/home');
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel className="text-gray-250 text-opacity-70">
                Usuário
              </FormLabel>
              <FormControl>
                <Input {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-250 text-opacity-70">
                Email
              </FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-250 text-opacity-70">
                Senha
              </FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-pale-blue hover:bg-blue-violet-600 w-[286px] mt-5"
        >
          Cadastrar
        </Button>
      </form>
    </Form>
  );
}
