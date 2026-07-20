"use client";

import { useMutation } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";

import { useAuth } from "@/context/auth-context";
import { categories } from "@/data/tasks";
import { db } from "@/lib/firebase";
import type { CategoryId } from "@/types/app";

export function CategorySelector() {
  const { currentUser, userProfile, refreshUserProfile } = useAuth();

  const [selectedCategories, setSelectedCategories] = useState<CategoryId[]>(
    userProfile?.selectedCategories ?? [],
  );

  const updateCategoriesMutation = useMutation({
    mutationFn: async (categoryIds: CategoryId[]) => {
      if (!currentUser) {
        throw new Error("Kullanıcı bulunamadı.");
      }

      const userRef = doc(db, "users", currentUser.uid);

      await updateDoc(userRef, {
        selectedCategories: categoryIds,
      });
    },
    onSuccess: async () => {
      await refreshUserProfile();
    },
  });

  function toggleCategory(categoryId: CategoryId) {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      }

      return [...prev, categoryId];
    });
  }

  return (
    <section className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-500">
          Kategori seçimi
        </p>

        <h2 className="mt-2 text-2xl font-bold text-slate-950">
          Hangi alanlarda gelişmek istiyorsun?
        </h2>

        <p className="mt-2 text-sm text-slate-600">
          Bir veya birden fazla kategori seçebilirsin. Günlük görevler bu
          seçimlere göre gösterilecek.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category.id);

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => toggleCategory(category.id)}
              className={`rounded-2xl border p-4 text-left transition ${
                isSelected
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-slate-200 bg-white hover:border-indigo-200 hover:bg-slate-50"
              }`}
            >
              <span className="text-3xl">{category.emoji}</span>

              <h3 className="mt-3 font-semibold text-slate-950">
                {category.name}
              </h3>

              <p className="mt-1 text-sm text-slate-600">
                {category.description}
              </p>
            </button>
          );
        })}
      </div>

      {updateCategoriesMutation.isError && (
        <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
          Kategoriler kaydedilemedi. Lütfen tekrar dene.
        </p>
      )}

      {updateCategoriesMutation.isSuccess && (
        <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-600">
          Kategoriler kaydedildi.
        </p>
      )}

      <button
        type="button"
        onClick={() => updateCategoriesMutation.mutate(selectedCategories)}
        disabled={
          updateCategoriesMutation.isPending || selectedCategories.length === 0
        }
        className="mt-5 w-full rounded-2xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
      >
        {updateCategoriesMutation.isPending
          ? "Kaydediliyor..."
          : "Kategorileri kaydet"}
      </button>
    </section>
  );
}