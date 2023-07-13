import { getLocaleStaticsProps } from "@/lib/i18n";
import styles from "@/styles/background.module.css";
import { WifiOff } from "lucide-react";
import { useTranslations } from "next-intl";
import Head from "next/head";
import Link from "next/link";

export default function Offline() {
  const t = useTranslations("Offline")
  return <>
    <Head>
      <title>{t("title")}</title>
    </Head>
    <div className={`min-h-screen flex flex-col items-center justify-center gap-6 ${styles.fancy}`}>
      <WifiOff className="w-10 h-10 text-white" />
      <h1 className="text-white">{t("title")}</h1>
      <p>{t("message")}</p>
      <Link href="/" className="btn btn-secondary">{t("try again")}</Link>
    </div>
  </>
}

export const getStaticProps = getLocaleStaticsProps()

