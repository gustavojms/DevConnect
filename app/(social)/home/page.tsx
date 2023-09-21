'use client';

import { SessionInterface } from '@/app/types/SessionType';
import { getSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [userSession, setUserSession] = useState<SessionInterface | null>(null);

  useEffect(() => {
    async function getUser() {
      const session = (await getSession()) as SessionInterface;
      setUserSession(session);
    }
    getUser();
  }, []);

  async function handleLogout() {
    await signOut({ redirect: true, callbackUrl: '/' });
  }

  return (
    <div className="text-white">
      <h1>
        Home da rede social, usuário:{' '}
        {userSession ? userSession.payload.username : 'Nenhum usuário logado'}
      </h1>
      {userSession && (
        <button type="button" onClick={() => handleLogout()}>
          Logout
        </button>
      )}
    </div>
  );
}
