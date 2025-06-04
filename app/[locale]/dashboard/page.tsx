'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store'; // проверь путь, может быть '@store' или '../../../store'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/Sidebar';

export default function Dashboard() {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {// добавить !isAuthenticated когда сделают бэк авторизации
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">        
        <div>
          <h1 className="text-2xl font-bold">Добро пожаловать, {user?.email}!</h1>
        </div>        
      </main>
    </div>
  );
}
