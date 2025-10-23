export type Task = {
  id: string;
  title: string;
  notes?: string;
  status: "todo" | "done";
  priority?: number;
  createdAt: number;
  updatedAt: number;
};

export type FilterType = "all" | "todo" | "done";
export type SortType = "manual" | "newest" | "oldest";
