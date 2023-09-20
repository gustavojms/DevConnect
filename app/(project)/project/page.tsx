'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LuSearch } from 'react-icons/lu';
import { RiHome5Fill, RiCodeSSlashFill } from 'react-icons/ri';
import { MdGroups } from 'react-icons/md';
import { IoSettingsOutline } from 'react-icons/io5';
import { Separator } from '@/components/ui/separator';
import { useEffect } from 'react';
import { fetchProjects } from '@/app/services/ApiService';

export default function Project() {
  useEffect(() => {
    async function projects() {
      const response = await fetchProjects();
      console.log(response);
    }

    projects();
  }, []);
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
          <div>
            <div className="flex">
              <Link
                href="/projetos"
                className="flex py-4 bg-inherit text-gray-ba font-semibold"
              >
                <RiCodeSSlashFill className="mr-2 h-6 w-6" />
                Projetos
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#e5e5e5"
                className="w-6 h-6 mt-4 ml-4 cursor-pointer hover:bg-violet-900 rounded-full"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
            <Button className="flex py-4 bg-inherit text-violet-900 font-semibold">
              Criar Projetos
            </Button>
          </div>
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
      <h1 className="text-white w-full items-center flex justify-end">
        Gustavo
      </h1>
    </header>
  );
}
