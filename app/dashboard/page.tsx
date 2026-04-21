"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { AvatarBadge } from "@/components/AvatarBadge";
import { useAuth } from "@/context/AuthContext";
import { getImagenUrl } from "@/lib/utils";
import { LayoutGrid, Plus, Loader2, ListTodo } from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";

// Actions & Interfaces
import { getTasks } from "@/actions/tasks/get-task";
import { deleteTask } from "@/actions/tasks/delete-tasks";
import { Task } from "@/interface/task";

// Components
import { TaskFilters } from "./components/TaskFilters";
import { TaskCard } from "./components/TaskCard";
import { TaskForm } from "./components/TaskForm";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 10;

export default function DashboardPage() {
  const { user } = useAuth();
  
  // State for Tasks & Pagination
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  // State for Filters
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    priority: "all",
  });

  // State for Modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Observer for Infinite Scroll
  const observer = useRef<IntersectionObserver | null>(null);
  const lastTaskRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // Fetch Tasks
  const fetchTasksData = async (pageNum: number, currentFilters: typeof filters, isNewSearch = false) => {
    setLoading(true);
    try {
      const response = await getTasks({
        page: pageNum,
        pageSize: PAGE_SIZE,
        search: currentFilters.search,
        status: currentFilters.status,
        priority: currentFilters.priority,
      });

      if (isNewSearch) {
        setTasks(response.tasks);
      } else {
        setTasks((prev) => [...prev, ...response.tasks]);
      }
      
      setHasMore(response.hasMore);
    } catch (error) {
      console.error("Error loading tasks:", error);
      toast.error("Error al cargar las tareas");
    } finally {
      setLoading(false);
    }
  };

  // Effect: Reset list on Filter change
  useEffect(() => {
    setPage(1);
    setTasks([]);
    setHasMore(true);
    fetchTasksData(1, filters, true);
  }, [filters]);

  // Effect: Load more on Page change
  useEffect(() => {
    if (page > 1) {
      fetchTasksData(page, filters);
    }
  }, [page]);

  // Handlers
  const handleSearchChange = (search: string) => setFilters((f) => ({ ...f, search }));
  const handleStatusChange = (status: string) => setFilters((f) => ({ ...f, status }));
  const handlePriorityChange = (priority: string) => setFilters((f) => ({ ...f, priority }));

  const handleCreateTask = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleDeleteTask = async (task: Task) => {
    if (!confirm(`¿Estás seguro de que querés eliminar la tarea "${task.title}"?`)) return;

    try {
      const result = await deleteTask(task.id);
      if (result.success) {
        toast.success("Tarea eliminada");
        setTasks((prev) => prev.filter((t) => t.id !== task.id));
      } else {
        toast.error(result.error || "No se pudo eliminar la tarea");
      }
    } catch (error) {
      toast.error("Error al eliminar la tarea");
    }
  };

  const handleFormSuccess = () => {
    // Si es edición, actualizamos localmente o recargamos la página 1
    // Para simplificar y asegurar consistencia con filtros, recargamos la lista
    setPage(1);
    fetchTasksData(1, filters, true);
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="flex justify-between items-center px-6 py-4 bg-background border-b sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-lg text-primary-foreground">
            <LayoutGrid size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Mis Tareas</h1>
        </div>

        <div className="flex items-center gap-4">
          <Button onClick={handleCreateTask} size="sm" className="gap-2">
            <Plus size={18} />
            <span className="hidden sm:inline">Nueva Tarea</span>
          </Button>

          {user && (
            <Link href="/profile">
              <AvatarBadge
                name={user.name || "Usuario"}
                avatar_url={getImagenUrl(user.avatar_url || "")}
              />
            </Link>
          )}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <TaskFilters
          currentFilters={filters}
          onSearchChange={handleSearchChange}
          onStatusChange={handleStatusChange}
          onPriorityChange={handlePriorityChange}
        />

        {/* Task Grid */}
        {tasks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tasks.map((task, index) => {
              if (tasks.length === index + 1) {
                return (
                  <div ref={lastTaskRef} key={task.id}>
                    <TaskCard
                      task={task}
                      onEdit={handleEditTask}
                      onDelete={handleDeleteTask}
                    />
                  </div>
                );
              }
              return (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                />
              );
            })}
          </div>
        ) : !loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground bg-card rounded-2xl border-2 border-dashed border-border/50">
            <ListTodo size={64} className="mb-4 opacity-20" />
            <h3 className="text-lg font-medium">No se encontraron tareas</h3>
            <p className="text-sm">Probá cambiando los filtros o creá una nueva tarea.</p>
            <Button variant="link" onClick={handleCreateTask} className="mt-2">
              Crear mi primera tarea
            </Button>
          </div>
        ) : null}

        {/* Loading State for Infinite Scroll */}
        {loading && (
          <div className="flex justify-center items-center py-10 w-full">
            <Loader2 className="animate-spin text-primary" size={32} />
            <span className="ml-2 text-sm text-muted-foreground font-medium">Cargando tareas...</span>
          </div>
        )}

        {/* End of list message */}
        {!hasMore && tasks.length > 0 && (
          <div className="text-center py-10 text-muted-foreground text-sm font-medium">
            ✨ Has llegado al final de la lista
          </div>
        )}
      </main>

      {/* Task form Modal */}
      <TaskForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingTask(null);
        }}
        task={editingTask}
        onSuccess={handleFormSuccess}
      />
    </div>
  );
}
