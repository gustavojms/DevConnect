import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type CardProps = {
  cardType: string;
};

export function CardContents(props: CardProps) {
  const form = useForm();

  async function onSubmit(data: any) {
    // TODO: implementar a chamada da API
  }

  return (
    <>
      {props.cardType === "entrar" ? (
        <>
          <CardContent className="flex flex-col justify-center px-[68px] mt-5">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="mb-2">
                      <FormLabel className="text-gray-250 text-opacity-70">Usuário</FormLabel>
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
                      <FormLabel className="text-gray-250 text-opacity-70">Senha</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Link
                  href="/reset_password"
                  className="text-pale-blue text-sm hover:underline"
                >
                  Esqueceu a senha?
                </Link>
                <Button
                  type="submit"
                  className="bg-pale-blue w-[334px] hover:bg-blue-violet-600 mt-5"
                >
                  Entrar
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center mt-5"></CardFooter>
        </>
      ) : (
        <>
          <CardContent className="flex flex-col justify-center gap-5 px-[68px] mt-5">
            <Input type="text" placeholder="Usuário" />
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Senha" />
            <div className="flex gap-2 items-center">
              <Checkbox id="terms" className="border-gray-400" />
              <label
                htmlFor="terms"
                className="text-sm text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Aceito os
                <Link href="terms" className="text-pale-blue underline">
                  Termos de Serviço
                </Link>
              </label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center mt-5">
            <Button className="bg-pale-blue w-[334px] hover:bg-blue-violet-600">
              Cadastrar
            </Button>
          </CardFooter>
        </>
      )}
    </>
  );
}
