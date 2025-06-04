'use client';
import { Sidebar } from '@/components/Sidebar';
import {   Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Divider,
  NextUIProvider,} from '@nextui-org/react';
import { useTranslation } from 'react-i18next';

export default function ProfilePage() {
  const { t } = useTranslation('common');
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <NextUIProvider>
      <div className="flex justify-center items-center min-h-screen bg-black text-white p-4">
        <Card className="max-w-2xl w-full bg-zinc-900 text-white shadow-xl p-4">
          <CardHeader className="flex gap-4">
            <Image
              alt="Логотип"
              height={60}
              radius="md"
              src="https://example.com/agro-logo.png"
              width={60}
            />
            <div className="flex flex-col">
              <p className="text-xl font-bold">{t('title')}</p>
              <p className="text-sm text-gray-400">Аграрная компания</p>
            </div>
          </CardHeader>

          <Divider className="my-2 bg-gray-700" />

          <CardBody className="space-y-3">
            <p>
              <strong>Описание:</strong> ООО «АгроРесурс» специализируется на
              выращивании зерновых культур, поставках сельхозпродукции и
              агрономическом консалтинге. Мы работаем на рынке с 2005 года.
            </p>
            <p>
              <strong>ИНН:</strong> 1234567890
            </p>
            <p>
              <strong>ОГРН:</strong> 1027700132195
            </p>
            <p>
              <strong>Адрес:</strong> Краснодарский край, станица Полтавская,
              ул. Центральная, д. 15
            </p>
            <p>
              <strong>Телефон:</strong> +7 (861) 123-45-67
            </p>
            <p>
              <strong>Email:</strong> info@agroresurs.ru
            </p>
          </CardBody>

          <Divider className="my-2 bg-gray-700" />
        </Card>
      </div>
    </NextUIProvider>
  </div>
  );
}
