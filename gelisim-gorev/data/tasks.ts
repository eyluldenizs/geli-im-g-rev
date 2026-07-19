import type { Category, DailyTask } from "@/types/app";//app.ts dosyasındakiler kullanılıyor,yanlış kategori veya yanlış alan yazılırsa TypeScript uyarır.


export const categories: Category[] = [
  {
    id: "ders",
    name: "Ders",
    description: "Düzenli tekrar, okuma ve çalışma alışkanlığı kazan.",
    emoji: "📚",
  },
  {
    id: "spor",
    name: "Spor",
    description: "Günlük hareket, egzersiz ve sağlıklı yaşam hedefleri.",
    emoji: "🏃",
  },
  {
    id: "oyun",
    name: "Oyun",
    description: "Oyun gelişimi, strateji ve kontrollü oyun süresi.",
    emoji: "🎮",
  },
  {
    id: "is",
    name: "İş",
    description: "Planlama, üretkenlik ve kariyer gelişimi görevleri.",
    emoji: "💼",
  },
];

export const dailyTasks: DailyTask[] = [
  {
    id: "ders-1",
    title: "30 dakika tekrar yap",
    description: "Bugün öğrendiğin konuları kısa notlarla tekrar et.",
    categoryId: "ders",
    difficulty: "medium",
    points: 20,
  },
  {
    id: "ders-2",
    title: "10 soru çöz",
    description: "Seçtiğin dersten en az 10 soru çöz ve yanlışlarını incele.",
    categoryId: "ders",
    difficulty: "easy",
    points: 10,
  },
  {
    id: "spor-1",
    title: "20 dakika yürüyüş yap",
    description: "Tempo fark etmez, amaç bugün hareket etmiş olmak.",
    categoryId: "spor",
    difficulty: "easy",
    points: 10,
  },
  {
    id: "spor-2",
    title: "15 dakika esneme yap",
    description: "Boyun, omuz, bel ve bacak odaklı kısa bir esneme rutini yap.",
    categoryId: "spor",
    difficulty: "easy",
    points: 10,
  },
  {
    id: "oyun-1",
    title: "1 maç analiz et",
    description: "Oynadığın veya izlediğin bir maçta yaptığın hataları not al.",
    categoryId: "oyun",
    difficulty: "medium",
    points: 20,
  },
  {
    id: "oyun-2",
    title: "Kontrollü oyun süresi belirle",
    description: "Bugün oyun için kendine bir süre sınırı koy ve buna uy.",
    categoryId: "oyun",
    difficulty: "easy",
    points: 10,
  },
  {
    id: "is-1",
    title: "Günün 3 önceliğini yaz",
    description: "Bugün bitirmen gereken en önemli 3 işi listele.",
    categoryId: "is",
    difficulty: "easy",
    points: 10,
  },
  {
    id: "is-2",
    title: "25 dakika odak çalışması yap",
    description: "Telefonu uzaklaştırıp tek bir işe 25 dakika odaklan.",
    categoryId: "is",
    difficulty: "medium",
    points: 20,
  },
];