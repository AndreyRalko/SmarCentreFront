'use client';

import { useCallback } from 'react';

type UserData = {
  login: string;
  userMicroserviceAccess: string[];
  tokenExpMills: number;
};

const USER_KEY = 'user';

export default function useUserDetails() {
  // Сохранение пользователя
  const storeUser = useCallback((data: UserData) => {
    localStorage.setItem(USER_KEY, JSON.stringify(data));
  }, []);

  // Получение пользователя
  const getUser = useCallback((): UserData | null => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }, []);

  // Очистка (например, при logout)
  const clearUser = useCallback(() => {
    localStorage.removeItem(USER_KEY);
  }, []);

  return { storeUser, getUser, clearUser };
}
