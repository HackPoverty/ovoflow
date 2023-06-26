/* eslint-disable @next/next/no-img-element */
"use client"

import LangaugeSwitcher from "@/components/LangaugeSwitcher";
import styles from "@/styles/Login.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"

type LoginData = {
  username: string,
  password: string,
}

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const { register, handleSubmit, formState } = useForm<LoginData>({
    defaultValues: {
      username: "",
      password: ""
    },
  });

  const onSubmit = async (data: LoginData) => {
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      setError(true);
    } else {
      router.replace("/");
    }
  }

  return <main className={`${styles.fancy} px-6 min-h-screen flex flex-col gap-6 items-center justify-center`}>
    <div className="flex flex-col items-center gap-4">
      <img src="/assets/ui/logo.svg" alt="Ovoflow Logo" />
      <h1 className="text-3xl font-bold text-white">ovoflow</h1>
    </div>
    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} className="input" placeholder="Username" type="text" required />
      <input {...register("password")} className="input" placeholder="Password" type="password" required />
      <button className="btn btn-secondary" type="submit" disabled={formState.isSubmitting}>Login</button>
    </form>
    <LangaugeSwitcher />
  </main>
}