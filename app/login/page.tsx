import LangaugeSwitcher from "@/components/LangaugeSwitcher";
import LoginForm from "@/components/forms/login/LoginForm";
import { getAuthRole } from "@/lib/user";
import styles from "@/styles/background.module.css";
import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login | Ovoflow"
}

export default function Login() {
  const role = getAuthRole();
  if (role === "TECHNICIAN") redirect("/farmers");
  if (role === "FARMER") redirect("/dashboard");

  return <main className={`${styles.fancy} px-6 min-h-screen flex flex-col gap-6 items-center justify-center`}>
    <div className="flex flex-col items-center gap-4">
      <div className="h-[150px] relative aspect-square">
        <Image src="/assets/ui/logo.svg" alt="Ovoflow Logo" fill />
      </div>
      <h1 className="text-3xl font-bold text-white">ovoflow</h1>
    </div>
    <LoginForm />
    <LangaugeSwitcher />
  </main>
}