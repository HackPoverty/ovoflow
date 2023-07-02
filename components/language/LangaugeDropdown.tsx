"use client"

import { useLocale, useTranslations } from "next-intl"
import { usePathname } from "next-intl/client"
import { useRouter } from "next/navigation"

const LANGS = ["en", "pt"] as const

export default function LanguageDropdown() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations("Language")
  // @ts-ignore
  const current = t(locale)

  const onLangagugeChange = (locale: string) => {
    router.replace(`/${locale}${pathname}`);
  }

  return <div className="dropdown dropdown-bottom dropdown-end">
    <label tabIndex={0} className="select select-sm select-primary select-bordered select-ghost items-center m-1">
      {current}
    </label>
    <ul tabIndex={0} className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box">
      {
        LANGS.map(lang => <li key={lang} onClick={() => onLangagugeChange(lang)} className="text-right">
          <a>{t(lang)}</a>
        </li>)
      }
    </ul>
  </div>
}