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

  function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <>
      {props.cardType === "entrar" ? (
        <>
          <CardContent className="flex flex-col justify-center gap-5 px-[68px] mt-5">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usuário</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="Usuário" />
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
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" placeholder="Senha" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="bg-pale-blue w-[334px] hover:bg-blue-violet-600"
                >
                  Entrar
                </Button>
              </form>
            </Form>
            <Link
              href="/reset_password"
              className="text-pale-blue text-sm hover:underline"
            >
              Esqueceu a senha?
            </Link>
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
                Aceito os{" "}
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
