"use client";

import { AuthForm } from "@/components/auth-form";
import { CategorySelector } from "@/components/category-selector";
import { DailyTaskList } from "@/components/daily-task-list";
import { useAuth } from "@/context/auth-context";

export default function Home() {
  const { currentUser, loading, logout, userProfile } = useAuth();

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <p className="text-slate-600">Yükleniyor...</p>
      </main>
    );
  }

  if (!currentUser) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
        <AuthForm />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="flex flex-col gap-4 rounded-3xl bg-slate-950 p-6 text-white shadow-xl shadow-slate-300 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-indigo-300">
              Günlük Gelişim
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Merhaba, {userProfile?.email}
            </h1>

            <p className="mt-2 text-sm text-slate-300">
              Toplam puanın: {userProfile?.totalPoints ?? 0}
            </p>
          </div>

          <button
            type="button"
            onClick={logout}
            className="rounded-2xl bg-white px-4 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Çıkış yap
          </button>
        </header>

        <CategorySelector />

        <DailyTaskList selectedCategories={userProfile?.selectedCategories ?? []} />
      </div>
    </main>
  );
}

// Kullanıcı giriş yapmamışsa AuthForm gösteriliyor.
// Kullanıcı giriş yaptıysa dashboard benzeri ana alan gösteriliyor.
// CategorySelector ile kategori seçiliyor.
// Kategoriler Firestore’daki users/{uid} dokümanına kaydediliyor.
// React Query useMutation ile kayıt işleminin loading/error/success durumları yönetiliyor.