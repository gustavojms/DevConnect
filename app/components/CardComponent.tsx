import { Dispatch, SetStateAction } from 'react';
import LoginCard from './LoginCard';
import RegisterCard from './RegisterCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type CardProps = {
  cardType: string;
  setCardType: Dispatch<SetStateAction<string>>;
};

export default function CardComponent(props: CardProps) {
  const handleButtonClick = (type: string) => {
    props.setCardType(type);
  };

  return (
    <Card className="bg-midnight-blue border-none w-[470px] h-[470px] mt-10">
      <CardHeader className="mt-10">
        <CardTitle className="flex justify-evenly">
          <Button
            onClick={() => handleButtonClick('entrar')}
            className={`w-36 font-bold ${
              props.cardType === 'entrar'
                ? 'bg-pale-blue text-white hover:bg-blue-violet-600'
                : 'text-pale-blue bg-pale-blue-transparent'
            }`}
          >
            Entrar
          </Button>
          <Button
            onClick={() => handleButtonClick('cadastrar')}
            className={`w-36 font-bold ${
              props.cardType === 'cadastrar'
                ? 'bg-pale-blue hover:bg-blue-violet-600'
                : 'text-pale-blue bg-pale-blue-transparent'
            }`}
          >
            Cadastrar
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {props.cardType === 'entrar' ? <LoginCard /> : <RegisterCard />}
      </CardContent>
    </Card>
  );
}
