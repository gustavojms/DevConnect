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
import Link from 'next/link';
import { useForm } from 'react-hook-form';

export default function LoginCard() {
  const form = useForm();

  async function onSubmit() {}

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
