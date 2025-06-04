'use client';

import { useDispatch } from 'react-redux';
import { logout } from '@/store/slices/authSlice';
import { Button } from '@heroui/button'; // если используешь HeroUI

type LogoutButtonProps = {
  className?: string;
};

export default function LogoutButton({ className }: LogoutButtonProps) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Button onClick={handleLogout} className={className}>
      Выйти
    </Button>
  );
}
