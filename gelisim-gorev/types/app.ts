export type CategoryId = "ders" | "spor" | "oyun" | "is";

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  emoji: string;
}

export type TaskDifficulty = "easy" | "medium" | "hard";

export interface DailyTask {
  id: string;
  title: string;
  description: string;
  categoryId: CategoryId;
  difficulty: TaskDifficulty;
  points: number;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  selectedCategories: CategoryId[];
  totalPoints: number;
  streak: number;
  badges: string[];
  createdAt: string;
}

export interface UserTask {
  id: string;
  userId: string;
  taskId: string;
  title: string;
  categoryId: CategoryId;
  points: number;
  completed: boolean;
  assignedDate: string;
  completedAt?: string;
}