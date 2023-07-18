import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/router";

export default function LanguageDropdown() {
  const { locales, locale, route } = useRouter();
  const t = useTranslations("Language");
  // @ts-ignore
  const current = t(locale);

  return (
    <div className="dropdown-bottom dropdown-end dropdown">
      <label
        tabIndex={0}
        className="select-bordered select-ghost select-primary select select-sm m-1 items-center"
      >
        {current}
      </label>
      <ul tabIndex={0} className="dropdown-content menu rounded-box z-[1] bg-base-100 shadow">
        {locales?.map((lang) => (
          <li key={lang} className="text-right">
            <Link href={route} locale={lang}>
              {/* @ts-ignore */}
              {t(lang)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
