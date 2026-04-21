export type TaskStatus = "todo" | "in-progress" | "review" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  created_at: number; // We'll convert DB timestamp to number for TaskCard
  updated_at?: string;
  user_id: string;
  image: string | null;
}

export interface GetTasksParams {
  page: number;
  pageSize: number;
  search?: string;
  status?: string;
  priority?: string;
}

export interface GetTasksResponse {
  tasks: Task[];
  hasMore: boolean;
}
