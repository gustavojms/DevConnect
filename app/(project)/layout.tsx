'use client';

import Dropdown from '@/app/components/DropDown';
import { fetchProjects } from '@/app/services/ApiService';
import { SessionInterface } from '@/app/types/SessionType';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import { BiGroup } from 'react-icons/bi';
import { IoSettingsOutline } from 'react-icons/io5';
import { LuSearch } from 'react-icons/lu';
import { MdGroups } from 'react-icons/md';
import { RiHome5Fill } from 'react-icons/ri';

type ProjectLayoutProps = {
  children: ReactNode;
};

export default function ProjectLayout({ children }: ProjectLayoutProps) {
  const [userSession, setUserSession] = useState<SessionInterface | null>(null);
  const [projetos, setProjetos] = useState([] as any);

  async function getUserProjects() {
    const session = (await getSession()) as SessionInterface;
    setUserSession(session);
    const response = await fetchProjects(session.payload.sub!);
    setProjetos(response);
  }

  useEffect(() => {
    getUserProjects();
  }, []);

  return (
    <>
      <header className="bg-gray-1000 h-14 flex relative z-40">
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
            <Dropdown campo1="Criar Projeto" campo2="Ver Projetos" />
            <Link
              href="/equipe"
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
            {projetos.map((projeto: any) => (
              <Link
                href={`/projeto/${projeto.projectId}`}
                className="cursor-pointer h-10 flex justify-center items-center capitalize bg-midnight-blue rounded-md text-gray-ba font-semibold"
              >
                {projeto.title}
              </Link>
            ))}
          </nav>
        </aside>
        <h1 className="text-white w-full items-center flex justify-end">
          <p className="mr-5 capitalize">{userSession?.payload.username}</p>
        </h1>
      </header>
      <main className="flex justify-center">{children}</main>
    </>
  );
}
