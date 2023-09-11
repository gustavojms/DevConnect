'use client';

import { signOut, useSession } from 'next-auth/react';

export default function Home() {
  const session = useSession();

  async function handleLogout() {
    await signOut({ redirect: true, callbackUrl: '/' });
  }
  return (
    <div>
      <h1>Home da rede social, usuario: {session?.data?.user?.email}</h1>
      <button type="button" onClick={handleLogout}>
        Sair
      </button>
    </div>
  );
}
