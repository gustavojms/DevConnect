import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { CardContents } from "./CardContent.tsx"

export function CardComponent() {
  return (
     <Card className="bg-midnight-blue border-none w-[470px] h-[470px] mt-10">
            <CardHeader className="mt-10">
              <CardTitle className="flex justify-evenly">
                <Button className="bg-pale-blue-transparent text-pale-blue w-36 font-bold hover:bg-blue-violet-600">Entrar</Button>
                <Button className="bg-pale-blue w-36 font-bold">Cadastrar</Button>
              </CardTitle>
            </CardHeader>
      <CardContents />
      </Card>
  )
}
