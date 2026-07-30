"use client";

import { useMutation } from "@tanstack/react-query";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FormEvent, useState } from "react";

import { useAuth } from "@/context/auth-context";
import { categories } from "@/data/tasks";
import { db } from "@/lib/firebase";
import type { CategoryId } from "@/types/app";

export function CustomTaskForm() {
  const { currentUser, userProfile } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<CategoryId>(
    userProfile?.selectedCategories[0] ?? "ders",
  );
  const [points, setPoints] = useState(10);

  const createCustomTaskMutation = useMutation({
    mutationFn: async () => {
      if (!currentUser) {
        throw new Error("Kullanıcı bulunamadı.");
      }

      await addDoc(collection(db, "customTasks"), {
        userId: currentUser.uid,
        title,
        description,
        categoryId,
        points,
        completed: false,
        createdAt: serverTimestamp(),
      });
    },
    onSuccess: () => {
      setTitle("");
      setDescription("");
      setPoints(10);
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createCustomTaskMutation.mutate();
  }

  const availableCategories =
    userProfile?.selectedCategories && userProfile.selectedCategories.length > 0
      ? categories.filter((category) =>
          userProfile.selectedCategories.includes(category.id),
        )
      : categories;

  return (
    <section className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-500">
          Kendi görevin
        </p>

        <h2 className="mt-2 text-2xl font-bold text-slate-950">
          Bugün için kendi görevini oluştur
        </h2>

        <p className="mt-2 text-sm text-slate-600">
          Hazır görevlerin dışında kendine özel bir görev ekleyebilirsin.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Görev başlığı
          </span>

          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            placeholder="Örn: 20 dakika İngilizce çalış"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Açıklama</span>

          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="mt-2 min-h-24 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            placeholder="Bu görevi nasıl tamamlayacağını kısaca yaz."
            required
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Kategori</span>

            <select
              value={categoryId}
              onChange={(event) => setCategoryId(event.target.value as CategoryId)}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            >
              {availableCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Puan</span>

            <select
              value={points}
              onChange={(event) => setPoints(Number(event.target.value))}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            >
              <option value={10}>10 puan - Kolay</option>
              <option value={20}>20 puan - Orta</option>
              <option value={30}>30 puan - Zor</option>
            </select>
          </label>
        </div>

        {createCustomTaskMutation.isError && (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
            Görev oluşturulamadı. Lütfen tekrar dene.
          </p>
        )}

        {createCustomTaskMutation.isSuccess && (
          <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-600">
            Görev oluşturuldu.
          </p>
        )}

        <button
          type="submit"
          disabled={createCustomTaskMutation.isPending}
          className="rounded-2xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
        >
          {createCustomTaskMutation.isPending
            ? "Oluşturuluyor..."
            : "Görev oluştur"}
        </button>
      </form>
    </section>
  );
}