"use server";

import { createClient } from "@/lib/supabase/server";
import { GetTasksParams, GetTasksResponse, Task } from "@/interface/task";

export async function getTasks({
  page,
  pageSize,
  search,
  status,
  priority,
}: GetTasksParams): Promise<GetTasksResponse> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("No estás autenticado");
    }

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from("tasks")
      .select("*", { count: "exact" })
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    if (priority && priority !== "all") {
      query = query.eq("priority", priority);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Error fetching tasks:", error);
      throw new Error("Error al obtener las tareas");
    }

    const formattedTasks: Task[] = (data || []).map((task) => ({
      ...task,
      created_at: new Date(task.created_at).getTime(),
    }));

    return {
      tasks: formattedTasks,
      hasMore: count ? from + formattedTasks.length < count : false,
    };
  } catch (error) {
    console.error("error getTasks:", error);
    return { tasks: [], hasMore: false };
  }
}
