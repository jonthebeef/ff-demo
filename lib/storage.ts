import { Task } from "./types";

const STORAGE_KEY = "startup-tasks-v1";
const DEBOUNCE_MS = 300;

let saveTimeout: NodeJS.Timeout | null = null;

export function loadTasks(): Task[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to load tasks, resetting:", error);
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

export function saveTasks(tasks: Task[]): void {
  if (typeof window === "undefined") return;

  // Clear existing timeout
  if (saveTimeout) {
    clearTimeout(saveTimeout);
  }

  // Debounce the save
  saveTimeout = setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks:", error);
    }
  }, DEBOUNCE_MS);
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
