"use client";

import { useAuth } from "@/context/auth-context";
import { badgeDefinitions, getUnlockedBadges } from "@/lib/badges";

export function Badges() {
  const { userProfile } = useAuth();

  const totalPoints = userProfile?.totalPoints ?? 0;
  const storedBadges = userProfile?.badges ?? [];
  const unlockedBadgeIds = getUnlockedBadges(totalPoints, storedBadges).map(
    (badge) => badge.id,
  );

  return (
    <section className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-500">
          Basarilarim
        </p>

        <h2 className="mt-2 text-2xl font-bold text-slate-950">
          Kazandigin rozetler
        </h2>

        <p className="mt-2 text-sm text-slate-600">
          Gorevleri tamamladikca rozetlerin burada acilacak.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {badgeDefinitions.map((badge) => {
          const isUnlocked = unlockedBadgeIds.includes(badge.id);

          return (
            <article
              key={badge.id}
              className={`rounded-2xl border p-5 transition ${
                isUnlocked
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-slate-200 bg-slate-50 opacity-70"
              }`}
            >
              <div className="text-4xl">{badge.emoji}</div>

              <h3 className="mt-4 font-semibold text-slate-950">
                {badge.title}
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                {badge.description}
              </p>

              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em]">
                {isUnlocked ? "Kazanildi" : "Kilitli"}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
