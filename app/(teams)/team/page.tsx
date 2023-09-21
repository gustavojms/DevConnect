'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LuSearch } from 'react-icons/lu';
import { RiHome5Fill, RiCodeSSlashFill } from 'react-icons/ri';
import { MdGroups } from 'react-icons/md';
import { BiGroup } from 'react-icons/bi';
import { IoSettingsOutline } from 'react-icons/io5';
import { Separator } from '@/components/ui/separator';
 import { useState } from 'react';

export default function Team() {
   const [formData, setFormData] = useState({
     nome: '',
     description: '',
   })
   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
     const { name, value } = e.target;
     setFormData({
       ...formData,
       [name]: value,
     });
   }
   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     console.log('Dados do formulário:', formData);
   };

  return (
    <header className="bg-gray-1000 h-14 flex relative">
      <aside className="bg-gray-1000 p-6 fixed h-full max-w-[250px]">
        <h1 className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-violet-500 to-lilac">
          DevConnect
        </h1>
        <nav className="mt-10">
          <Button className="bg-midnight-blue px-14 mb-16">
            <LuSearch className="mr-2 h-4 w-4" />
            Buscar
          </Button>

          <Link
            href="/"
            className="bg-inherit flex py-4 text-gray-ba font-semibold"
          >
            <RiHome5Fill className="mr-2 h-5 w-5" />
            Página inicial
          </Link>
          <Link
            href="/comunidades"
            className="flex py-4 bg-inherit text-gray-ba font-semibold"
          >
            <MdGroups className="mr-2 h-6 w-6" />
            Comunidades
          </Link>
          <Link
            href="/projetos"
            className="flex py-4 bg-inherit text-gray-ba font-semibold"
          >
            <RiCodeSSlashFill className="mr-2 h-6 w-6" />
            Projetos
          </Link>
          <Link
            href="/team"
            className="flex py-4 bg-inherit text-gray-ba font-semibold"
          >
            <BiGroup className="mr-2 h-6 w-6" />
            Equipes
          </Link>
          <Link
            href="/configuracoes"
            className="flex py-4 bg-inherit text-gray-ba font-semibold"
          >
            <IoSettingsOutline className="mr-2 h-6 w-6" />
            Configurações
          </Link>
        </nav>
        <Separator className="mt-5 bg-gray-600" />
        <h1 className="text-gray-ba text-lg mt-5">Meus projetos</h1>
        <nav className="mt-5 gap-5 grid">
          <Link
            href="/projetos/1"
            className="flex justify-center py-2 bg-midnight-blue rounded-md text-gray-ba font-semibold"
          >
            Projeto 1
          </Link>
          <Link
            href="/projetos/2"
            className="flex justify-center py-2 bg-midnight-blue rounded-md text-gray-ba font-semibold"
          >
            Projeto 2
          </Link>
          <Link
            href="/projetos/3"
            className="flex justify-center py-2 bg-midnight-blue rounded-md text-gray-ba font-semibold"
          >
            Projeto 3
          </Link>
        </nav>
      </aside>

      <div className="m-auto p-20 w-full static">
        <div className="bg-midnight-blue p-6 rounded-lg shadow-md w-1/2 mx-auto flex-col justify-items-center ">
          <div>
            <h1 className="text-bold mb-5 text-gray-ba ">
              Crie a sua equipe e melhore a comunicação entre os membros
            </h1>
          </div>
          <div className="flex-none">
            <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="nome" className="block text-gray-ba font-semibold mb-2">
          Nome da equipe:
        <input
          type="text"
          id="nome"
          name="nome"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          value={formData.nome}
          onChange={handleChange}
          />
          </label>
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-ba font-semibold mb-2">
          Descrição
        <textarea
          name="description"
          id="description"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          placeholder="O que a sua equipe faz?"
          value={formData.description}
          onChange={handleChange}
          />
          </label>
      </div>

      <button
        type="submit"
        className="mx-auto w-full bg-gradient-to-r from-blue-violet-500 to-lilac hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
      >
        Criar
      </button>
    </form>
          </div>
        </div>
      </div>

      <div className="text-white w-50% items-center flex justify-end absolute right-2 top-5">
        <h1>Gustavo</h1>
      </div>
    </header>
  );
}
