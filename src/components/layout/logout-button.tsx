'use client';

import { signOut } from 'next-auth/react';

export function LogoutButton() {
  return <div onClick={() => signOut()}>Logout</div>;
}
