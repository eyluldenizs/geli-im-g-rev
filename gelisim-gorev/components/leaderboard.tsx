"use client";

import { useQuery } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import type { CategoryId } from "@/types/app";

interface LeaderboardUser {
  id: string;
  email: string;
  totalPoints: number;
  selectedCategories: CategoryId[];
}

export function Leaderboard() {
  const leaderboardQuery = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const usersRef = collection(db, "users");
      const usersQuery = query(
        usersRef,
        orderBy("totalPoints", "desc"),
        limit(10),
      );

      const snapshot = await getDocs(usersQuery);

      return snapshot.docs.map((document) => {
        const data = document.data();

        return {
          id: document.id,
          email: String(data.email ?? "Bilinmeyen kullanıcı"),
          totalPoints: Number(data.totalPoints ?? 0),
          selectedCategories: Array.isArray(data.selectedCategories)
            ? (data.selectedCategories as CategoryId[])
            : [],
        } satisfies LeaderboardUser;
      });
    },
  });

  return (
    <section className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-500">
          Leaderboard
        </p>

        <h2 className="mt-2 text-2xl font-bold text-slate-950">
          En yüksek puanlı kullanıcılar
        </h2>

        <p className="mt-2 text-sm text-slate-600">
          Kullanıcılar toplam puanlarına göre sıralanır.
        </p>
      </div>

      {leaderboardQuery.isLoading && (
        <p className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
          Leaderboard yükleniyor...
        </p>
      )}

      {leaderboardQuery.isError && (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
          Leaderboard yüklenemedi.
        </p>
      )}

      {leaderboardQuery.data && leaderboardQuery.data.length === 0 && (
        <p className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
          Henüz kullanıcı puanı bulunmuyor.
        </p>
      )}

      {leaderboardQuery.data && leaderboardQuery.data.length > 0 && (
        <div className="space-y-3">
          {leaderboardQuery.data.map((user, index) => (
            <div
              key={user.id}
              className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">
                  #{index + 1}
                </span>

                <div>
                  <p className="font-semibold text-slate-950">{user.email}</p>

                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                    {user.selectedCategories.length > 0
                      ? user.selectedCategories.join(", ")
                      : "kategori yok"}
                  </p>
                </div>
              </div>

              <p className="font-bold text-slate-950">
                {user.totalPoints} puan
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}