'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/store/slices/authSlice';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { Card, CardBody } from '@heroui/card';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Имитация создания пользователя
    const fakeToken = 'token_abc123';
    const user = { email };

    // Сохраняем пользователя в Redux
    dispatch(loginSuccess({ token: fakeToken, user }));

    // Переход на dashboard
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="max-w-md w-full shadow-lg bg-content2 backdrop-blur border border-default-100">
        <CardBody className="space-y-6 p-8">
          <h2 className="text-center text-2xl font-semibold text-foreground">Регистрация</h2>

          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              isRequired
              label="Email"
              placeholder="Введите email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-foreground"
            />

            <Input
              isRequired
              label="Пароль"
              placeholder="Введите пароль"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-foreground"
            />

            <Button type="submit" color="primary" fullWidth>
              Зарегистрироваться
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
