"use client";

import { dailyTasks } from "@/data/tasks";
import type { CategoryId } from "@/types/app";

interface DailyTaskListProps {
  selectedCategories: CategoryId[];
}

export function DailyTaskList({ selectedCategories }: DailyTaskListProps) {
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

      <div className="grid gap-4 md:grid-cols-2">
        {filteredTasks.map((task) => (
          <article
            key={task.id}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-slate-950">{task.title}</h3>

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
          </article>
        ))}
      </div>
    </section>
  );
}