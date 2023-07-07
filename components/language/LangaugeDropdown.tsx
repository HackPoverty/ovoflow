import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from 'next/router';

export default function LanguageDropdown() {
  const { locales, locale, route } = useRouter()
  const t = useTranslations("Language")
  // @ts-ignore
  const current = t(locale)

  return <div className="dropdown dropdown-bottom dropdown-end">
    <label tabIndex={0} className="select select-sm select-primary select-bordered select-ghost items-center m-1">
      {current}
    </label>
    <ul tabIndex={0} className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box">
      {
        locales?.map(lang => <li key={lang} className="text-right">
          {/* @ts-ignore */}
          <Link href={route} locale={lang}>{t(lang)}</Link>
        </li>)
      }
    </ul>
  </div>
}