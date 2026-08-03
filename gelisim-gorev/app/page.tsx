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
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
        <AuthForm />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 px-4 py-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="rounded-[2rem] bg-white/80 p-6 shadow-xl shadow-pink-100 backdrop-blur">
  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-400">
        Günlük Gelişim
      </p>

      <h1 className="mt-2 text-3xl font-bold text-slate-950">
         Merhaba, bugün kendin için güzel bir yer açalım 🌸
      </h1>

      <p className="mt-2 text-sm text-slate-600">
      Görevlerini seç, tamamla ve gelişimini profilinde takip et.
</p>
    </div>

    <div className="flex gap-3">
      <Link
        href="/profile"
        className="rounded-2xl bg-pink-100 px-4 py-3 font-semibold text-pink-700 transition hover:bg-pink-200"
      >
        Profilim
      </Link>

      <button
        type="button"
        onClick={logout}
        className="rounded-2xl bg-slate-950 px-4 py-3 font-semibold text-white transition hover:bg-slate-800"
      >
        Çıkış yap
      </button>
    </div>
  </div>
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
          className="rounded-2xl bg-slate-950 px-4 py-3 font-semibold text-white transition hover:bg-slate-800"
        >
          Görevlere dön
        </button>
      )}

    <CategorySelector onSaved={() => setIsEditingCategories(false)} />
  </div>
) : (
 <div className="space-y-6">
  

  <nav className="flex flex-wrap gap-3 rounded-3xl bg-white/80 p-3 shadow-xl shadow-pink-100 backdrop-blur">
    <button
      type="button"
      onClick={() => setActiveSection("tasks")}
      className={`rounded-2xl px-4 py-3 font-semibold transition ${
        activeSection === "tasks"
          ? "bg-purple-500 text-white shadow-lg shadow-purple-100"
         : "bg-pink-50 text-slate-700 hover:bg-pink-100"
      }`}
    >
      Görevlerim
    </button>

    <button
      type="button"
      onClick={() => setActiveSection("custom-task")}
      className={`rounded-2xl px-4 py-3 font-semibold transition ${
        activeSection === "custom-task"
          ? "bg-indigo-600 text-white"
          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
      }`}
    >
      Kendi Görevim
    </button>

    <button
      type="button"
      onClick={() => setActiveSection("badges")}
      className={`rounded-2xl px-4 py-3 font-semibold transition ${
        activeSection === "badges"
          ? "bg-indigo-600 text-white"
          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
      }`}
    >
      Başarılarım
    </button>

    <button
      type="button"
      onClick={() => setActiveSection("leaderboard")}
      className={`rounded-2xl px-4 py-3 font-semibold transition ${
        activeSection === "leaderboard"
          ? "bg-indigo-600 text-white"
          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
      }`}
    >
      Leaderboard
    </button>

    <button
      type="button"
      onClick={() => setIsEditingCategories(true)}
      className="ml-auto rounded-2xl bg-slate-950 px-4 py-3 font-semibold text-white transition hover:bg-slate-800"
    >
      Kategorileri değiştir
    </button>
  </nav>

  {activeSection === "tasks" && (
    <DailyTaskList selectedCategories={userProfile.selectedCategories} />
  )}

  {activeSection === "custom-task" && <CustomTaskForm />}

  {activeSection === "badges" && <Badges />}

  {activeSection === "leaderboard" && <Leaderboard />}
</div>
)}
      </div>
    </main>
  );
}

// Kullanıcı giriş yapmamışsa AuthForm gösteriliyor.
// Kullanıcı giriş yaptıysa dashboard benzeri ana alan gösteriliyor.
// CategorySelector ile kategori seçiliyor.
// Kategoriler Firestore’daki users/{uid} dokümanına kaydediliyor.
// React Query useMutation ile kayıt işleminin loading/error/success durumları yönetiliyor.