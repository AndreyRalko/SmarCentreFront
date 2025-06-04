// components/LanguageSwitcher.tsx
"use client";

import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <select
      value={i18n.language}
      onChange={(e) => changeLanguage(e.target.value)}
      className="bg-zinc-800 text-white px-3 py-1 rounded"
    >
      <option value="ru">Русский</option>
      <option value="en">English</option>
    </select>
  );
}
