import LoginForm from "@/components/forms/login/LoginForm";
import LanguageDropdown from "@/components/language/LangaugeDropdown";
import PublicRoute from "@/components/layouts/PublicRoute";
import { getLocaleStaticsProps } from "@/lib/i18n";
import styles from "@/styles/background.module.css";
import { useTranslations } from "next-intl";
import Head from "next/head";
import Image from "next/image";

export default function Login() {
  const t = useTranslations("Login");

  return (
    <PublicRoute>
      <Head>
        <title>{t("login")}</title>
      </Head>
      <main className={`${styles.fancy} flex min-h-screen flex-col p-6`}>
        <div className="self-end">
          <LanguageDropdown />
        </div>
        <div className="flex flex-auto flex-col items-center justify-center gap-4">
          <Image src="/assets/ui/logo.svg" alt="Ovoflow Logo" width={100} height={200} />
          <h1 className="text-3xl font-bold text-white">ovoflow</h1>
          <div className="self-stretch">
            <LoginForm />
          </div>
        </div>
      </main>
    </PublicRoute>
  );
}

export const getStaticProps = getLocaleStaticsProps(["Login", "Language", "Offline"]);
