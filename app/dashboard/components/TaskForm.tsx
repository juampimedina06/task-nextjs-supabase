"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

import { createTask } from "@/actions/tasks/create-tasks";
import { updateTask } from "@/actions/tasks/update-task";
import { Task, TaskStatus } from "@/interface/task";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileInput } from "@/components/FileInput";

// --- Esquema ---

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onSuccess: () => void;
}

const taskSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  description: z.string().optional(),
  status: z.enum(["todo", "in-progress", "review", "done"] as const),
  priority: z.enum(["low", "medium", "high"] as const),
});

type TaskFormValues = z.infer<typeof taskSchema>;

export function TaskForm({ isOpen, onClose, task, onSuccess }: TaskFormProps) {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [removeImage, setRemoveImage] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
    },
  });

  // Observamos los valores de Select para que React Hook Form se entere de los cambios
  const statusValue = watch("status");
  const priorityValue = watch("priority");

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description || "",
        status: task.status,
        priority: task.priority,
      });
      setSelectedFile(null);
      setRemoveImage(false);
    } else {
      reset({
        title: "",
        description: "",
        status: "todo",
        priority: "medium",
      });
      setSelectedFile(null);
      setRemoveImage(false);
    }
  }, [task, reset, isOpen]);

  const onSubmit = async (data: TaskFormValues) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description || "");
      formData.append("status", data.status);
      formData.append("priority", data.priority);

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      let result;
      if (task) {
        formData.append("taskId", task.id);
        formData.append("existingImage", task.image || "");
        if (removeImage) formData.append("removeImage", "true");
        
        result = await updateTask(formData);
      } else {
        result = await createTask(formData);
      }

      if (result.success) {
        toast.success(task ? "Tarea actualizada correctamente" : "Tarea creada correctamente");
        onSuccess();
        onClose();
      } else {
        toast.error(result.error || "Ocurrió un error al guardar la tarea");
      }
    } catch (error) {
      console.error("Error saving task:", error);
      toast.error("Error inesperado al guardar la tarea");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{task ? "Editar Tarea" : "Nueva Tarea"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-4">
          {/* Título */}
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="Título de la tarea"
              disabled={loading}
            />
            {errors.title && (
              <p className="text-xs text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Describe lo que hay que hacer..."
              rows={3}
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Estado */}
            <div className="space-y-2">
              <Label>Estado</Label>
              <Select
                value={statusValue}
                onValueChange={(val: TaskStatus) => setValue("status", val)}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">Pendiente</SelectItem>
                  <SelectItem value="in-progress">En curso</SelectItem>
                  <SelectItem value="review">En revisión</SelectItem>
                  <SelectItem value="done">Completado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Prioridad */}
            <div className="space-y-2">
              <Label>Prioridad</Label>
              <Select
                value={priorityValue}
                onValueChange={(val: "low" | "medium" | "high") =>
                  setValue("priority", val)
                }
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baja</SelectItem>
                  <SelectItem value="medium">Media</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Imagen / Archivo */}
          <div className="space-y-2">
            <Label>Imagen adjunta</Label>
            <FileInput
              accept="image/jpeg, image/png, image/gif, image/webp"
              multiple={false}
              onFilesSelected={(files) => {
                if (files.length > 0) {
                  setSelectedFile(files[0] as File);
                  setRemoveImage(false);
                } else {
                  setSelectedFile(null);
                  if (task?.image) setRemoveImage(true);
                }
              }}
              initialImageUrl={task?.image || undefined}
            />
          </div>

          <DialogFooter className="pt-6">
            <div className="flex justify-end gap-3 w-full">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {task ? "Actualizar" : "Crear"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
