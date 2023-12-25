"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to '/upload' when the component mounts
    router.push('/upload');
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-white"></div>

    </main>
  );
}
