'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { Card, CardBody } from '@heroui/card';
import { signIn } from '@/services/api/admin/admin';
import useUserDetails from '@/hooks/useUserDetails';
import { cfg } from '@/cfg';

export default function LoginPage() {
  const [formData, setFormData] = useState({ login: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { storeUser } = useUserDetails();
  const cookieMaxAgeMills = cfg.COOKIE_MAX_AGE_MILLS;

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await signIn(formData);

    if (res.resStatus === 200 && res.login && res.userMicroserviceAccess.length) {
      storeUser({
        login: res.login,
        userMicroserviceAccess: res.userMicroserviceAccess,
        tokenExpMills: Date.now() + cookieMaxAgeMills,
      });
      router.push('/');
    } else {
      alert(res.resMessage || 'Ошибка авторизации');
      setFormData({ login: '', password: '' });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="max-w-md w-full shadow-lg bg-content2 backdrop-blur border border-default-100">
        <CardBody className="space-y-6 p-8">
          <h2 className="text-center text-2xl font-semibold text-foreground">Вход в систему</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              isRequired
              label="Логин"
              placeholder="Введите логин"
              type="text"
              value={formData.login}
              onChange={(e) => setFormData({ ...formData, login: e.target.value })}
              className="text-foreground"
            />
            <Input
              isRequired
              label="Пароль"
              placeholder="Введите пароль"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="text-foreground"
            />
            <Button type="submit" color="primary" fullWidth isLoading={isLoading}>
              Войти
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
