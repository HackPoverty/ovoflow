/* eslint-disable @next/next/no-img-element */
"use client"

import LangaugeSwitcher from "@/components/LangaugeSwitcher";
import styles from "@/styles/background.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type LoginData = {
  username: string,
  password: string,
}

export default function Login() {
  const { replace } = useRouter();
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: {isSubmitting} } = useForm<LoginData>({
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
      const status = response.status;
      setError((status >= 400 && status < 500) ? "Incorrect username or password" : "Something went wrong, try again later")
      return;
    }
    setError("")
    replace("/")
  }

  return <main className={`${styles.fancy} px-6 min-h-screen flex flex-col gap-6 items-center justify-center`}>
    <div className="flex flex-col items-center gap-4">
      <img src="/assets/ui/logo.svg" alt="Ovoflow Logo" className="h-[120px]" />
      <h1 className="text-3xl font-bold text-white">ovoflow</h1>
    </div>
    {error && !isSubmitting && <div className="alert alert-error text-sm"><span>{error}</span></div>}
    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} className="input" placeholder="Username" type="text" required />
      <input {...register("password")} className="input" placeholder="Password" type="password" required />
      <button className="btn btn-secondary disabled:btn-disabled" type="submit" disabled={isSubmitting}>
        {isSubmitting ? <span className="loading loading-spinner" /> : "Login"}
      </button>
    </form>
    <LangaugeSwitcher />
  </main>
}