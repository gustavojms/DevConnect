import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function LoginCard() {
  const form = useForm();
  const router = useRouter();

  async function onSubmit(data: any) {
    console.log(data);
    const response = await signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false,
    });

    if (response?.error) {
      console.log(response);
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
        <Link
          href="/reset_password"
          className="text-pale-blue text-sm hover:underline mt-2"
        >
          Esqueceu a senha?
        </Link>
        <Button
          type="submit"
          className="bg-pale-blue hover:bg-blue-violet-600 w-[286px] mt-5"
        >
          Entrar
        </Button>
      </form>
    </Form>
  );
}
