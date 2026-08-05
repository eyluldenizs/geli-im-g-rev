"use client";

import Link from "next/link";

import { Badges } from "@/components/badges";
import { useAuth } from "@/context/auth-context";
import { getUnlockedBadges } from "@/lib/badges";

export default function ProfilePage() {
  const { currentUser, loading, logout, userProfile } = useAuth();
  const unlockedBadgeCount = getUnlockedBadges(
    userProfile?.totalPoints ?? 0,
    userProfile?.badges ?? [],
  ).length;

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-pink-50 px-4">
        <p className="text-slate-600">Yükleniyor...</p>
      </main>
    );
  }

  if (!currentUser) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-pink-50 px-4">
        <div className="rounded-3xl bg-white p-8 text-center shadow-xl">
          <h1 className="text-2xl font-bold text-slate-950">
            Profilini görmek için giriş yapmalısın.
          </h1>

          <Link
            href="/"
            className="mt-5 inline-block rounded-2xl bg-pink-400 px-5 py-3 font-semibold text-white transition hover:bg-pink-500"
          >
            Giriş sayfasına dön
          </Link>
        </div>
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
    Profilim
  </p>

  <h1 className="mt-2 text-3xl font-bold text-slate-950">
    Hesap ve gelişim bilgilerim
  </h1>

  <p className="mt-2 text-sm text-slate-600">
    Puanlarını, seçili kategorilerini ve kazandığın rozetleri buradan takip edebilirsin.
  </p>
</div>

            <div className="flex gap-3">
              <Link
                href="/"
                className="rounded-2xl bg-purple-100 px-4 py-3 font-semibold text-purple-700 transition hover:bg-purple-200"
              >
                Dashboard
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

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-white/80 p-5 shadow-xl shadow-pink-100">
            <p className="text-sm text-slate-500">Toplam puan</p>
            <p className="mt-2 text-3xl font-bold text-purple-700">
              {userProfile?.totalPoints ?? 0}
            </p>
          </div>

          <div className="rounded-3xl bg-white/80 p-5 shadow-xl shadow-pink-100">
            <p className="text-sm text-slate-500">Seçili kategori</p>
            <p className="mt-2 text-3xl font-bold text-pink-500">
              {userProfile?.selectedCategories.length ?? 0}
            </p>
          </div>

          <div className="rounded-3xl bg-white/80 p-5 shadow-xl shadow-pink-100">
            <p className="text-sm text-slate-500">Rozet</p>
            <p className="mt-2 text-3xl font-bold text-indigo-500">
              {unlockedBadgeCount}
            </p>
          </div>
        </section>
<section className="rounded-[2rem] bg-white/80 p-6 shadow-xl shadow-pink-100 backdrop-blur">
  <div className="mb-5">
    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-400">
      Bilgilerim
    </p>

    <h2 className="mt-2 text-2xl font-bold text-slate-950">
      Profil özeti
    </h2>

    <p className="mt-2 text-sm text-slate-600">
      Gelişim yolculuğundaki temel bilgilerin burada görünür.
    </p>
  </div>

  <div className="grid gap-4 md:grid-cols-2">
    <div className="rounded-2xl border border-pink-100 bg-pink-50/70 p-5">
      <p className="text-sm text-slate-500">Email</p>
      <p className="mt-2 font-semibold text-slate-950">
        {userProfile?.email}
      </p>
    </div>

    <div className="rounded-2xl border border-purple-100 bg-purple-50/70 p-5">
      <p className="text-sm text-slate-500">Seçili kategoriler</p>
      <p className="mt-2 font-semibold text-slate-950">
        {userProfile?.selectedCategories.length
          ? userProfile.selectedCategories.join(", ")
          : "Henüz kategori seçilmedi"}
      </p>
    </div>

    <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-5">
      <p className="text-sm text-slate-500">Streak</p>
      <p className="mt-2 font-semibold text-slate-950">
        {userProfile?.streak ?? 0} gün
      </p>
    </div>

    <div className="rounded-2xl border border-rose-100 bg-rose-50/70 p-5">
      <p className="text-sm text-slate-500">Başarı sayısı</p>
      <p className="mt-2 font-semibold text-slate-950">
        {unlockedBadgeCount} rozet
      </p>
    </div>
  </div>
</section>
        

        <Badges />
      </div>
    </main>
  );
}
