import LoginForm from "@/components/forms/login/LoginForm";
import LanguageDropdown from "@/components/language/LangaugeDropdown";
import PublicRoute from "@/components/layouts/PublicRoute";
import styles from "@/styles/background.module.css";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import Head from "next/head";
import Image from "next/image";

export default function Login() {
  // const role = getAuthRole();
  // if (role === TECHNICIAN_ROLE) redirect("/farmers");
  // if (role === FARMER_ROLE) redirect("/dashboard");
  const t = useTranslations("Login")

  return <PublicRoute>
    <Head>
      <title>{t("login")}</title>
    </Head>
    <main className={`${styles.fancy} p-6 min-h-screen flex flex-col`}>
      <div className="self-end">
        <LanguageDropdown />
      </div>
      <div className="flex-auto gap-4 flex flex-col items-center justify-center">
        <div className="h-[150px] relative aspect-square">
          <Image src="/assets/ui/logo.svg" alt="Ovoflow Logo" fill />
        </div>
        <h1 className="text-3xl font-bold text-white">ovoflow</h1>
        <div className="self-stretch">
          <LoginForm />
        </div>
      </div>
    </main>
  </PublicRoute>
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default
    }
  };
}