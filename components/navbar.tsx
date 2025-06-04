'use client';

import React from 'react';

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";

import NextLink from "next/link";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  GithubIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";

import LogoutButton from '@/components/LogoutButton';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

import { User } from "@heroui/user";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";

import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslations, useLocale } from 'next-intl';

export const Navbar = () => {
  const t = useTranslations('Navbar');
  const locale = useLocale();

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);

  // Функция для добавления локали к пути
  const localizedPath = (path: string) => {
    if (path.startsWith('/')) {
      return `/${locale}${path === '/' ? '' : path}`;
    }
    return `/${locale}/${path}`;
  };

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href={localizedPath('/')}>
            <Logo />
            <p className="font-bold text-inherit">ACME</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <LanguageSwitcher />
        <Dropdown>
          <DropdownTrigger>
            <User
              as="button"
              name={user?.email ?? "Jane Doe"}
              description={t('name')}
              avatarProps={{ src: "https://i.pravatar.cc/150?u=a04258114e29026702d" }}
              className="cursor-pointer"
            />
          </DropdownTrigger>

          <DropdownMenu aria-label="User Actions" variant="flat" className="w-44">
            <DropdownItem key="logout" className="p-0">
              <LogoutButton className="w-full text-left rounded-none" />
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.label}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href={localizedPath(item.href)} // <-- вот тут локализация пути
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
