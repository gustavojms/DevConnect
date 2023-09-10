'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import CardComponent from './components/CardComponent';

export default function Home() {
  const [showCard, setShowCard] = useState<boolean>(false);
  const [cardType, setCardType] = useState<string>('');

  const handleCardClick = (type: string) => {
    setCardType(type);
    setShowCard(true);
  };

  return (
    <main className="grid md:grid-cols-2 max-w-full h-full overflow-hidden">
      <section className="w-full h-full bg-dark-blue flex flex-col justify-center p-4">
        <h1 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-3">
          Aprimorando o Ciclo de Desenvolvimento de Software e Conectando
          Desenvolvedores
        </h1>
        <h2 className="text-blue-gray text-center text-xs sm:text-sm">
          Gerenciamento de Projetos, Colaboração de Equipes e Uma Comunidade
          Abrangente.
          <br /> Impulsionando a Eficiência no Processo de Desenvolvimento.
        </h2>
      </section>
      <section className="max-w-full h-full bg-gray-1000 flex flex-col justify-center items-center p-4">
        <h1 className="text-white text-4xl lg:text-5xl font-bold text-center md:text-start mb-3">
          &lt;Feito para&nbsp;
          <br />
          <span className=" ml-[19px] text-transparent bg-clip-text bg-gradient-to-r from-blue-violet-500 to-lilac">
            Desenvolvedores
          </span>
          /&gt;
        </h1>
        <h2 className="text-blue-gray text-center">
          O ponto de encontro para Desenvolvedores.
          <br />
          <span className="text-center">Conecte-se. Colabore. Realize.</span>
        </h2>
        {!showCard && (
          <div className="flex flex-col gap-10 sm:flex-row mt-11 max-w-full">
            <Button
              onClick={() => handleCardClick('entrar')}
              className="font-semibold bg-pale-blue px-20 hover:bg-blue-violet-600 transition ease-in-out duration-300"
            >
              Entrar
            </Button>
            <Button
              onClick={() => handleCardClick('cadastrar')}
              className="font-semibold bg-pale-blue-transparent px-20 "
            >
              Cadastrar
            </Button>
          </div>
        )}
        {showCard && (
          <CardComponent cardType={cardType} setCardType={setCardType} />
        )}
      </section>
    </main>
  );
}
