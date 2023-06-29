"use client"

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type LoginData = {
  username: string,
  password: string,
}

export default function LoginForm() {
  const t = useTranslations("Login")
  const { replace } = useRouter();
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<LoginData>({
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
      setError((status === 401 || status === 403) ? t("incorrect") : t("error"))
      return;
    }
    setError("")
    replace("/")
  }

  return <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
    {error && !isSubmitting && <div className="alert alert-error text-sm"><span>{error}</span></div>}
    <input {...register("username")} className="input" placeholder={t("username")} type="text" required />
    <input {...register("password")} className="input" placeholder={t("password")} type="password" required />
    <button className="btn btn-secondary disabled:btn-disabled" type="submit" disabled={isSubmitting}>
      {isSubmitting ? <span className="loading loading-spinner" /> : t("login")}
    </button>
  </form>
}