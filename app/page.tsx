'use client'; 
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      router.push('/movies');
    } else {
      router.push('/signin');
    }
  }, [router]);

  return (
    <>
    </>
  );
}
