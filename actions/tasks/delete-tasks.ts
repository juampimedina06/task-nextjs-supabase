"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteTask(taskId: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("No estás autenticado");
    }

    // 1. Obtener la tarea para ver si tiene imagen
    const { data: task, error: getError } = await supabase
      .from("tasks")
      .select("image")
      .eq("id", taskId)
      .eq("user_id", user.id)
      .single();

    if (getError) {
      throw new Error("No se pudo encontrar la tarea");
    }

    // 2. Si tiene imagen, borrarla del storage
    if (task?.image) {
      const parts = task.image.split("task-images/");
      const filePath = parts.length > 1 ? parts[1] : null;
      
      if (filePath) {
        await supabase.storage.from("task-images").remove([filePath]);
      }
    }

    // 3. Borrar la tarea
    const { error: deleteError } = await supabase
      .from("tasks")
      .delete()
      .eq("id", taskId)
      .eq("user_id", user.id);

    if (deleteError) {
      throw new Error("Error al eliminar la tarea de la base de datos");
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("error deleteTask:", error);
    return { success: false, error: error.message };
  }
}
