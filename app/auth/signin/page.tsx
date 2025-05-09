
'use client';

import { signIn } from 'next-auth/react';

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={() => signIn('google')}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg"
      >
        Sign in with Google
      </button>
    </div>
  );
}
