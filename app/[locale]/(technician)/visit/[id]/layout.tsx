import BackButton from "@/components/navigation/BackButton";
import NavigationBar from "@/components/navigation/NavigationBar";
import { pick } from "lodash";
import { AbstractIntlMessages, NextIntlClientProvider, useLocale, useMessages } from "next-intl";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const locale = useLocale()
  const errorMessages = pick(useMessages(), "TechnicianVisit.Error")

  return <NextIntlClientProvider locale={locale} messages={errorMessages as AbstractIntlMessages}>
    <NavigationBar title="Technician Visit" button={<BackButton />} />
    {children}
  </NextIntlClientProvider>
}