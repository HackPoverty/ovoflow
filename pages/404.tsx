import { getLocaleStaticsProps } from "@/lib/i18n";
import styles from "@/styles/background.module.css";
import { useTranslations } from "next-intl";
import Head from "next/head";
import Link from "next/link";

export default function NotFound() {
  const t = useTranslations("NotFound")
  return <>
    <Head>
      <title>{t("title")}</title>
    </Head>
    <div className={`min-h-screen flex flex-col items-center justify-center gap-6 ${styles.fancy}`}>
      <h1 className="text-white">{t("title")}</h1>
      <p className="text-white text-sm">{t("message")}</p>
      <Link href="/" className="btn btn-secondary">{t("back")}</Link>
    </div>
  </>
}

export const getStaticProps = getLocaleStaticsProps(["NotFound", "Offline"])