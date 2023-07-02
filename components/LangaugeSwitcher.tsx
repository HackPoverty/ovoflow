"use client"

import { useLocale } from "next-intl";
import { usePathname } from "next-intl/client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useTransition } from "react";

export default function LangaugeSwitcher() {
  const locale = useLocale()
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const onLangagugeChange = (event: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      router.replace(`/${event.target.value}${pathname}`);
    });
  }

  return <div className="rounded-lg bg-base-300 shadow-xl w-full p-2 flex flex-row">
    <label className="flex-1 text-center">
      <input
        name="lang"
        type="radio"
        className="peer hidden"
        value="en"
        checked={locale === "en"}
        onChange={onLangagugeChange} />
      <span className="peer-checked:font-bold">English</span>
    </label>
    <label className="flex-1 text-center">
      <input
        name="lang"
        type="radio" 
        className="peer hidden" 
        value="pt" 
        checked={locale === "pt"}
        onChange={onLangagugeChange} />
      <span className="peer-checked:font-bold">Português</span>
    </label>
  </div>
}