"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createTask(formData: FormData) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("No estás autenticado");
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const status = formData.get("status") as string;
    const priority = formData.get("priority") as string;
    const imageFile = formData.get("image") as File | null;

    let imageUrl = null;

    if (imageFile && imageFile.size > 0) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("task-images")
        .upload(filePath, imageFile);

      if (uploadError) {
        console.error("Error uploading image:", uploadError);
        throw new Error("Error al subir la imagen");
      }

      const { data: { publicUrl } } = supabase.storage
        .from("task-images")
        .getPublicUrl(filePath);
      
      imageUrl = publicUrl;
    }

    const { data, error } = await supabase
      .from("tasks")
      .insert([
        {
          title,
          description,
          status,
          priority,
          user_id: user.id,
          image: imageUrl,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating task:", error);
      throw new Error("Error al crear la tarea");
    }

    revalidatePath("/dashboard");
    return { success: true, data };
  } catch (error: any) {
    console.error("error createTask:", error);
    return { success: false, error: error.message };
  }
}
