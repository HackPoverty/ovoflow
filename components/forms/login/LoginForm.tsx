import { useNavigatorOnline } from "@/hooks/useNavigatorOnline";
import { TECHNICIAN_ROLE, decodeToken } from "@/lib/user";
import { setCookie } from "cookies-next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

const AUTH_URL = `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jwt/token?_format=json`;

type LoginData = {
  username: string;
  password: string;
};

function useLogin() {
  const t = useTranslations("Login");
  const [error, setError] = useState("");
  const router = useRouter();
  const [isLoggingIn, startTransition] = useTransition();

  const login = async (data: LoginData) => {
    const response = await fetch(AUTH_URL, {
      headers: {
        Authorization: `Basic ${btoa(`${data.username}:${data.password}`)}`,
      },
    });
    if (!response.ok) {
      const status = response.status;
      setError(status === 401 || status === 403 ? t("incorrect") : t("error"));
      return;
    }
    const payload = await response.json();
    const token = payload.token as string;
    const user = decodeToken(token).user;
    startTransition(() => {
      setCookie("token", token, { secure: true });
      setCookie("uid", user.uid, { secure: true });
      if (user.role === TECHNICIAN_ROLE) router.replace("/technician");
      else router.replace("/dashboard");
    });
  };

  return {
    error,
    login,
    isLoggingIn,
  };
}

export default function LoginForm() {
  const t = useTranslations("Login");
  const isOnline = useNavigatorOnline();
  const offline = useTranslations("Offline");
  const { error, login, isLoggingIn } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(async (data) => {
        if (isOnline) await login(data);
      })}
    >
      {!isOnline && (
        <div className="alert alert-error text-sm">
          <span>{offline("no internet")}</span>
        </div>
      )}
      {error && !isSubmitting && (
        <div className="alert alert-error text-sm">
          <span>{error}</span>
        </div>
      )}
      <input
        {...register("username")}
        className="input"
        placeholder={t("username")}
        type="text"
        required
      />
      <input
        {...register("password")}
        className="input"
        placeholder={t("password")}
        type="password"
        required
      />
      <button
        className="btn-secondary btn disabled:btn-disabled"
        type="submit"
        disabled={isSubmitting || isLoggingIn}
      >
        {isSubmitting ? <span className="loading loading-spinner" /> : t("login")}
      </button>
    </form>
  );
}
