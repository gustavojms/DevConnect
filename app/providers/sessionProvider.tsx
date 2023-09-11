'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

type SessionProviderProps = {
  children: ReactNode;
};

export default function NextAuthSessionProvider({
  children,
}: SessionProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
