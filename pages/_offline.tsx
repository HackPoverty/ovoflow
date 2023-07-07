import styles from "@/styles/background.module.css";
import { WifiOff } from "lucide-react";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import Head from "next/head";
import Link from "next/link";

export default function Offline() {
  const t = useTranslations("Offline")
  return <>
    <Head>
      <title>Offline</title>
    </Head>
    <div className={`min-h-screen flex flex-col items-center justify-center gap-6 ${styles.fancy}`}>
      <WifiOff className="w-10 h-10 text-white" />
      <h1 className="text-white">Offline</h1>
      <Link href="/" className="btn btn-secondary">Home</Link>
    </div>
  </>
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default
    }
  };
}

