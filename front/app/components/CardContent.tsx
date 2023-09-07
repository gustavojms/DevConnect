import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CardContents() {
  return (
    <>
                <CardContent className="flex flex-col justify-center gap-5 px-[68px] mt-5">

              <Input type="text" placeholder="Usuário" />
              <Input type="password" placeholder="Senha" />
              <Link href="/reset_password" className="text-pale-blue text-sm hover:underline">Esqueceu a senha?</Link>
            </CardContent>
            <CardFooter className="flex justify-center mt-5">
              <Button className="bg-pale-blue w-[334px] hover:bg-blue-violet-600">Entrar</Button>
            </CardFooter>
            </>
  )
}
