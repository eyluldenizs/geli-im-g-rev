"use client";

import { FormEvent, useState } from "react";

import { useAuth } from "@/context/auth-context";

export function AuthForm() {
  const { login, register } = useAuth();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      if (isRegisterMode) {
        await register(email, password);
        setSuccessMessage("Kayıt başarılı.");
      } else {
        await login(email, password);
        setSuccessMessage("Giriş başarılı.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("İşlem başarısız oldu. Email veya şifreyi kontrol et.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/90 p-8 shadow-2xl shadow-slate-200">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-500">
          Günlük Gelişim
        </p>

        <h1 className="mt-3 text-3xl font-bold text-slate-950">
          {isRegisterMode ? "Hesap oluştur" : "Giriş yap"}
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          Kategorini seç, günlük görevlerini tamamla ve puan topla.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            placeholder="ornek@mail.com"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Şifre</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            placeholder="En az 6 karakter"
            required
            minLength={6}
          />
        </label>

        {errorMessage && (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {errorMessage}
          </p>
        )}

        {successMessage && (
          <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-600">
            {successMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-2xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
        >
          {isSubmitting
            ? "İşlem yapılıyor..."
            : isRegisterMode
              ? "Kayıt ol"
              : "Giriş yap"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => {
          setIsRegisterMode((prev) => !prev);
          setErrorMessage("");
          setSuccessMessage("");
        }}
        className="mt-5 w-full text-sm font-medium text-indigo-600 hover:text-indigo-700"
      >
        {isRegisterMode
          ? "Zaten hesabın var mı? Giriş yap"
          : "Hesabın yok mu? Kayıt ol"}
      </button>
    </div>
  );
}