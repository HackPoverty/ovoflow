import { OVOFLOW_JOURNAL_KEY, OVOFLOW_TECHNICIAN_VISIT_KEY, useLocalStorage } from "@/hooks/useLocalStorage";
import { getLocaleStaticsProps } from "@/lib/i18n";
import { deleteCookie } from "cookies-next";
import { useTranslations } from "next-intl";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useTransition } from "react";

export default function Logout() {
  const t = useTranslations("Navigation")
  const router = useRouter();
  const [_, startTransition] = useTransition()
  const { removeValue: removeJournal } = useLocalStorage(OVOFLOW_JOURNAL_KEY)
  const { removeValue: removeChecklist } = useLocalStorage(OVOFLOW_TECHNICIAN_VISIT_KEY)

  useEffect(() => {
    startTransition(() => {
      deleteCookie("token")
      deleteCookie("uid")
      removeJournal()
      removeChecklist()
      router.replace("/login")
    })
  }, [removeChecklist, removeJournal, router])

  return <>
    <Head>
      <title>{t("logout")}</title>
    </Head>
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <span className="loading loading-spinner loading-lg"></span>
      <p>{t("logout")}</p>
    </div>
  </>
}

export const getStaticProps = getLocaleStaticsProps(["Navigation"])