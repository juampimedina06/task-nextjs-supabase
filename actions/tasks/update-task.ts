"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateTask(formData: FormData) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("No estás autenticado");
    }

    const taskId = formData.get("taskId") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const status = formData.get("status") as string;
    const priority = formData.get("priority") as string;
    const imageFile = formData.get("image") as File | null;
    const removeImage = formData.get("removeImage") === "true";
    const existingImageUrl = formData.get("existingImage") as string;

    let imageUrl = existingImageUrl || null;

    // Función auxiliar para extraer el path del storage de la URL pública
    const getStoragePathFromUrl = (url: string) => {
      const parts = url.split("task-images/");
      return parts.length > 1 ? parts[1] : null;
    };

    // Manejo de eliminación o reemplazo de imagen
    if (removeImage || (imageFile && imageFile.size > 0)) {
      if (existingImageUrl) {
        const oldPath = getStoragePathFromUrl(existingImageUrl);
        if (oldPath) {
          await supabase.storage.from("task-images").remove([oldPath]);
        }
        imageUrl = null;
      }
    }

    // Subir nueva imagen si existe
    if (imageFile && imageFile.size > 0) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("task-images")
        .upload(filePath, imageFile);

      if (uploadError) {
        throw new Error("Error al subir la nueva imagen");
      }

      const { data: { publicUrl } } = supabase.storage
        .from("task-images")
        .getPublicUrl(filePath);
      
      imageUrl = publicUrl;
    }

    const { data, error } = await supabase
      .from("tasks")
      .update({
        title,
        description,
        status,
        priority,
        image: imageUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("id", taskId)
      .eq("user_id", user.id) // Seguridad extra
      .select()
      .single();

    if (error) {
      console.error("Error updating task:", error);
      throw new Error("Error al actualizar la tarea");
    }

    revalidatePath("/dashboard");
    return { success: true, data };
  } catch (error: any) {
    console.error("error updateTask:", error);
    return { success: false, error: error.message };
  }
}
