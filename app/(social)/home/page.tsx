'use client';

import { getSession } from 'next-auth/react';
import Dropdown from '@/app/components/DropDown';
import DropdownEquipe from '@/app/components/DropDownEquipe';
import { criaPost, getAllPosts } from '@/app/services/ApiService';
import { SessionInterface } from '@/app/types/SessionType';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import { LuSearch } from 'react-icons/lu';
import { MdGroups } from 'react-icons/md';
import { RiHome5Fill } from 'react-icons/ri';

export default function Home() {
  const [userSession, setUserSession] = useState<SessionInterface | null>(null);
  const [projetos] = useState([] as any);
  const [posts, setPosts] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    content: '',
    userId: 1,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // console.log('handleInputChange acionada:', value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await criaPost(formData);
      console.log(response);
      // console.log('Post enviado com sucesso:', response.data);
    } catch (error) {
      // console.log('Post não enviado com sucesso');
    }
    window.location.reload();
  };

  useEffect(() => {
    async function getUser() {
      const session = (await getSession()) as SessionInterface;
      setUserSession(session);
    }
    getUser();
  }, []);

  useEffect(() => {
    async function getPosts() {
      try {
        const response = await getAllPosts();
        // console.log(response);
        if (Array.isArray(response)) {
          setPosts(response);
        } else {
          // console.error('Resposta inesperada:', response);
        }
      } catch (error) {
        // console.error('Erro ao obter projetos:', error);
      }
    }

    getPosts();
  }, []);

  // async function handleLogout() {
  //   await signOut({ redirect: true, callbackUrl: '/' });
  // }

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
              href="/home"
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
            <Dropdown
              campo1="Criar Projeto"
              campo2="Ver Projetos"
              campo3="Tarefas Finalizadas"
            />
            <DropdownEquipe campo1="Criar Equipe" campo2="Ver Equipes" />
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
            {projetos?.map((projeto: any) => (
              <Link
                href={`/projeto/${projeto?.projectId}`}
                className="cursor-pointer h-10 flex justify-center items-center capitalize bg-midnight-blue rounded-md text-gray-ba font-semibold"
              >
                {projeto?.title}
              </Link>
            ))}
          </nav>
        </aside>
        <h1 className="text-white w-full items-center flex justify-end">
          <p className="mr-5 capitalize">{userSession?.payload.username}</p>
        </h1>
      </header>
      <div className="flex flex-col justify-center items-center">
        <div className="bg-gray-900 h-2/3 w-2/3 flex flex-col justify-center mt-10 rounded-sm">
          {/* <div className="flex flex-col items-end"> */}
          <form className="flex flex-col items-end" onSubmit={handleSubmit}>
            <textarea
              name="content"
              className="bg-midnight-blue p-4 text-white h-16 w-10/12 m-6 rounded-sm"
              placeholder="Pensando em algo?"
              value={formData.content}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="bg-blue-600 w-24 p-1 text-white font-semibold mr-6 mb-4 rounded-sm"
            >
              Publicar
            </button>
          </form>
          {/* </div> */}
        </div>
        {posts
          .slice()
          .reverse()
          .map((post) => (
            <div
              key={post.id}
              className="bg-gray-900 m-6 h-2/3 w-2/3 rounded-sm"
            >
              <div className="m-4">
                <h1 className="text-white">Usuario: {post.userId}</h1>
                <div className="bg-midnight-blue h-24 rounded-sm mt-4">
                  <p className="text-white p-8">{post.content}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
