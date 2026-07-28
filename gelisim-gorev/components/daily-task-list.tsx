"use client";

import { useMutation } from "@tanstack/react-query";
import { doc, increment, updateDoc } from "firebase/firestore";
import { useState } from "react";

import { useAuth } from "@/context/auth-context";
import { dailyTasks } from "@/data/tasks";
import { db } from "@/lib/firebase";
import type { CategoryId } from "@/types/app";

interface DailyTaskListProps {
  selectedCategories: CategoryId[];
}

export function DailyTaskList({ selectedCategories }: DailyTaskListProps) {
  const { currentUser, refreshUserProfile } = useAuth();
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);

  const completeTaskMutation = useMutation({
    mutationFn: async (task: (typeof dailyTasks)[number]) => {
      if (!currentUser) {
        throw new Error("Kullanıcı bulunamadı.");
      }

      const userRef = doc(db, "users", currentUser.uid);

      await updateDoc(userRef, {
        totalPoints: increment(task.points),
      });

      return task;
    },
    onSuccess: async (task) => {
      setCompletedTaskIds((prev) => [...prev, task.id]);
      await refreshUserProfile();
    },
  });

  const filteredTasks = dailyTasks.filter((task) =>
    selectedCategories.includes(task.categoryId),
  );

  if (selectedCategories.length === 0) {
    return (
      <section className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200">
        <h2 className="text-2xl font-bold text-slate-950">Günlük görevler</h2>

        <p className="mt-2 text-sm text-slate-600">
          Görevleri görebilmek için önce en az bir kategori seçmelisin.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-500">
          Bugünün görevleri
        </p>

        <h2 className="mt-2 text-2xl font-bold text-slate-950">
          Seçtiğin kategorilere göre görevler
        </h2>

        <p className="mt-2 text-sm text-slate-600">
          Bu görevleri tamamladıkça puan kazanacaksın.
        </p>
      </div>

      {completeTaskMutation.isError && (
        <p className="mb-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
          Görev tamamlanamadı. Lütfen tekrar dene.
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {filteredTasks.map((task) => {
          const isCompleted = completedTaskIds.includes(task.id);

          return (
            <article
              key={task.id}
              className={`rounded-2xl border p-5 transition ${
                isCompleted
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-slate-950">
                    {task.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-600">
                    {task.description}
                  </p>
                </div>

                <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
                  +{task.points}
                </span>
              </div>

              <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                {task.categoryId} / {task.difficulty}
              </p>

              <button
                type="button"
                onClick={() => completeTaskMutation.mutate(task)}
                disabled={isCompleted || completeTaskMutation.isPending}
                className="mt-4 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {isCompleted ? "Tamamlandı" : "Görevi tamamla"}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}