import { useTranslations } from "next-intl"
import Link from "next/link"
import styles from "@/styles/background.module.css";
import { GetStaticPropsContext } from "next";

export default function NotFound() {
  const t = useTranslations("NotFound")
  return <div className={`min-h-screen flex flex-col items-center justify-center gap-6 ${styles.fancy}`}>
    <h1 className="text-white">{t("title")}</h1>
    <p className="text-white">{t("message")}</p>
    <Link href="/" className="btn btn-secondary">{t("back")}</Link>
  </div>
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default
    }
  };
}