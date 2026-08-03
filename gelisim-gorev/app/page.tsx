"use client";

import { AuthForm } from "@/components/auth-form";
import { CategorySelector } from "@/components/category-selector";
import { DailyTaskList } from "@/components/daily-task-list";
import { CustomTaskForm } from "@/components/custom-task-form";
import { useAuth } from "@/context/auth-context";
import { useState } from "react";
import { Leaderboard } from "@/components/leaderboard";
import { Badges } from "@/components/badges";
import Link from "next/link";


export default function Home() {
  const { currentUser, loading, logout, userProfile } = useAuth();
  const [isEditingCategories, setIsEditingCategories] = useState(false);
  const [activeSection, setActiveSection] = useState<
  "tasks" | "custom-task" | "badges" | "leaderboard"
>("tasks");

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <p className="text-slate-600">Yükleniyor...</p>
      </main>
    );
  }

 if (!currentUser) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 px-4 py-10">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-5xl items-center gap-8 lg:grid-cols-[1fr_420px]">
        <section className="rounded-[2rem] bg-white/70 p-8 shadow-2xl shadow-purple-100 backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-500">
            Günlük Gelişim
          </p>

          <h1 className="mt-5 text-4xl font-bold leading-tight text-purple-950 md:text-5xl">
            Tek bir küçük görev,
            <br />
            gününü güzelleştirebilir.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-purple-700">
            Kategorini seç, sana uygun günlük görevleri tamamla ve gelişimini
            tatlı bir puan sistemiyle takip et. Burada amaç mükemmel olmak
            değil; kendine düzenli küçük alanlar açmak.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-purple-100 p-4">
              <p className="text-2xl">🌸</p>
              <p className="mt-2 text-sm font-semibold text-purple-900">
                Samimi takip
              </p>
            </div>

            <div className="rounded-2xl bg-pink-100 p-4">
              <p className="text-2xl">✨</p>
              <p className="mt-2 text-sm font-semibold text-purple-900">
                Günlük görevler
              </p>
            </div>

            <div className="rounded-2xl bg-fuchsia-100 p-4">
              <p className="text-2xl">🏆</p>
              <p className="mt-2 text-sm font-semibold text-purple-900">
                Puan ve rozet
              </p>
            </div>
          </div>
        </section>

        <AuthForm />
      </div>
    </main>
  );
}

 return (
  <main className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 px-4 py-6">
    <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl gap-6 rounded-[2rem] bg-white/80 p-4 shadow-2xl shadow-purple-100 backdrop-blur lg:grid-cols-[240px_1fr]">
      <aside className="rounded-[1.5rem] bg-purple-950 p-5 text-white">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-200">
            GrowMe
          </p>
          <h2 className="mt-2 text-xl font-bold">Gelişim Paneli</h2>
        </div>

        <nav className="space-y-2">
          <button
            type="button"
            onClick={() => setActiveSection("tasks")}
            className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
              activeSection === "tasks"
                ? "bg-white text-purple-950"
                : "text-purple-100 hover:bg-white/10"
            }`}
          >
            Görevlerim
          </button>

          <button
            type="button"
            onClick={() => setActiveSection("custom-task")}
            className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
              activeSection === "custom-task"
                ? "bg-white text-purple-950"
                : "text-purple-100 hover:bg-white/10"
            }`}
          >
            Kendi Görevim
          </button>

          <button
            type="button"
            onClick={() => setActiveSection("badges")}
            className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
              activeSection === "badges"
                ? "bg-white text-purple-950"
                : "text-purple-100 hover:bg-white/10"
            }`}
          >
            Başarılarım
          </button>

          <button
            type="button"
            onClick={() => setActiveSection("leaderboard")}
            className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
              activeSection === "leaderboard"
                ? "bg-white text-purple-950"
                : "text-purple-100 hover:bg-white/10"
            }`}
          >
            Leaderboard
          </button>
        </nav>

        <div className="mt-8 space-y-2">
          <Link
            href="/profile"
            className="block rounded-2xl bg-purple-100 px-4 py-3 text-sm font-semibold text-purple-900 transition hover:bg-purple-200"
          >
            Profilim
          </Link>

          <button
            type="button"
            onClick={logout}
            className="w-full rounded-2xl bg-white/10 px-4 py-3 text-left text-sm font-semibold text-purple-100 transition hover:bg-white/20"
          >
            Çıkış yap
          </button>
        </div>
      </aside>

      <section className="space-y-6 p-2 lg:p-4">
        <header className="rounded-[1.5rem] bg-gradient-to-r from-purple-100 to-pink-100 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-500">
            Ana sayfa
          </p>

          <h1 className="mt-3 text-3xl font-bold text-purple-950">
            Merhaba, bugün kendin için minik ama değerli bir adım atalım ✨
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-purple-700">
            Görevlerini seç, tamamladıkça puan kazan ve gelişim yolculuğunu
            profilinden takip et.
          </p>
        </header>

        {!userProfile?.selectedCategories ||
        userProfile.selectedCategories.length === 0 ||
        isEditingCategories ? (
          <div className="space-y-4">
            {userProfile?.selectedCategories &&
              userProfile.selectedCategories.length > 0 && (
                <button
                  type="button"
                  onClick={() => setIsEditingCategories(false)}
                  className="rounded-2xl bg-purple-600 px-4 py-3 font-semibold text-white transition hover:bg-purple-700"
                >
                  Görevlere dön
                </button>
              )}

            <CategorySelector onSaved={() => setIsEditingCategories(false)} />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsEditingCategories(true)}
                className="rounded-2xl bg-purple-600 px-4 py-3 font-semibold text-white transition hover:bg-purple-700"
              >
                Kategorileri değiştir
              </button>
            </div>

            {activeSection === "tasks" && (
              <DailyTaskList selectedCategories={userProfile.selectedCategories} />
            )}

            {activeSection === "custom-task" && <CustomTaskForm />}

            {activeSection === "badges" && <Badges />}

            {activeSection === "leaderboard" && <Leaderboard />}
          </div>
        )}
      </section>
    </div>
  </main>
);
}

// Kullanıcı giriş yapmamışsa AuthForm gösteriliyor.
// Kullanıcı giriş yaptıysa dashboard benzeri ana alan gösteriliyor.
// CategorySelector ile kategori seçiliyor.
// Kategoriler Firestore’daki users/{uid} dokümanına kaydediliyor.
// React Query useMutation ile kayıt işleminin loading/error/success durumları yönetiliyor.