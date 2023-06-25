import LangaugeSwitcher from "@/components/LangaugeSwitcher"
import Image from "next/image"
import styles from "@/styles/Login.module.css";
import { Metadata } from "next";

export const metedata: Metadata = {
  title: "Ovoflow | Login"
}

export default function Login() {
  return <main className={`${styles.fancy} px-6 min-h-screen flex flex-col gap-6 items-center justify-center`}>
    <div className="flex flex-col items-center gap-4">
      <Image src="/assets/ui/logo.svg" width={120} height={120} alt="Ovoflow Logo" />
      <h1 className="text-3xl font-bold text-white">ovoflow</h1>
    </div>
    <form className="flex flex-col gap-4 w-full">
      <input className="input" placeholder="Username" type="text" />
      <input className="input" placeholder="Password" type="password" />
      <button className="btn btn-secondary" type="button">Login</button>
    </form>
    <LangaugeSwitcher />
  </main>
}