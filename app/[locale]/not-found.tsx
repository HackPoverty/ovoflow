import Link from "next-intl/link";
import styles from "@/styles/background.module.css";
import { getTranslator } from "next-intl/server";
import { useTranslations } from "next-intl";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslator(params.locale, "NotFound")
  return {
    title: t("title")
  }
}

export default function NotFound() {
  const t = useTranslations("NotFound")
  return <div className={`min-h-screen flex flex-col items-center justify-center gap-6 ${styles.fancy}`}>
    <h1 className="text-white">{t("title")}</h1>
    <p>{t("message")}</p>
    <Link href="/" className="btn btn-secondary">{t("back")}</Link>
  </div>
}