'use client';
import { Listbox, ListboxItem } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className="w-60 h-screen border-r border-gray-200 p-4">
      <Listbox aria-label="Sidebar Navigation" variant="flat">
        <ListboxItem
          key="profile"
          onClick={() => router.push('/profile')}
        >
          Профиль
        </ListboxItem>
      </Listbox>
    </aside>
  );
};
