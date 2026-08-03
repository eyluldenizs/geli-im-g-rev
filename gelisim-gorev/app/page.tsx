"use client";

import { AuthForm } from "@/components/auth-form";
import { CategorySelector } from "@/components/category-selector";
import { DailyTaskList } from "@/components/daily-task-list";
import { CustomTaskForm } from "@/components/custom-task-form";
import { useAuth } from "@/context/auth-context";
import { useState } from "react";
import { Leaderboard } from "@/components/leaderboard";
import { Badges } from "@/components/badges";


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
  <div className="grid gap-4 md:grid-cols-3">
    <div className="rounded-3xl bg-white p-5 shadow-xl shadow-slate-200">
      <p className="text-sm text-slate-500">Toplam puan</p>
      <p className="mt-2 text-3xl font-bold text-slate-950">
        {userProfile.totalPoints}
      </p>
    </div>

    <div className="rounded-3xl bg-white p-5 shadow-xl shadow-slate-200">
      <p className="text-sm text-slate-500">Seçili kategori</p>
      <p className="mt-2 text-3xl font-bold text-slate-950">
        {userProfile.selectedCategories.length}
      </p>
    </div>

    <div className="rounded-3xl bg-white p-5 shadow-xl shadow-slate-200">
      <p className="text-sm text-slate-500">Rozet</p>
      <p className="mt-2 text-3xl font-bold text-slate-950">
        {userProfile.badges.length}
      </p>
    </div>
  </div>

  <nav className="flex flex-wrap gap-3 rounded-3xl bg-white p-3 shadow-xl shadow-slate-200">
    <button
      type="button"
      onClick={() => setActiveSection("tasks")}
      className={`rounded-2xl px-4 py-3 font-semibold transition ${
        activeSection === "tasks"
          ? "bg-indigo-600 text-white"
          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
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