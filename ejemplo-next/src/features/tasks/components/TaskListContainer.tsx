"use client";

import { useCallback } from "react";
import { useAsync } from "@/hooks/useAsync";
import { useTasks } from "@/hooks/useTasks";
import { useNotifications } from "@/contexts/NotificationContext";
import { taskService } from "@/services/taskService";
import { TaskCard } from "./TaskCard";
import { TaskFilters } from "./TaskFilters";
import { TaskForm } from "./TaskForm";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { ErrorMessage } from "./ErrorMessage";
import type { Task } from "../data/mockData";

interface TaskListContainerProps {
  initialTasks?: Task[];
}

export function TaskListContainer({
  initialTasks = [],
}: TaskListContainerProps) {
  const fetcher = useCallback(
    (signal: AbortSignal) => taskService.fetchTasks(signal),
    [],
  );

  const { data, isLoading, error, refetch } = useAsync<Task[]>(fetcher);
  const { addNotification } = useNotifications();

  // useTasks arranca con lo que llegue del servidor (initialTasks) y, cuando
  // useAsync complete, lo sincronizamos vía el formulario y acciones locales.
  const {
    filteredAndSortedTasks,
    filter,
    stats,
    addTask,
    toggleTask,
    deleteTask,
    setFilter,
    search,
    setSearch,
  } = useTasks(data ?? initialTasks);

  if (isLoading && !data) {
    return <LoadingSkeleton count={6} />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error.message || "Error al cargar tareas"}
        onRetry={() => {
          refetch();
          addNotification("Reintentando...", "info");
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <TaskForm
        onSubmit={(data) => {
          addTask({
            ...data,
            status: "todo",
          } as Omit<Task, "id" | "createdAt" | "completed">);
          addNotification("Tarea creada", "success");
        }}
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-500">
          {stats.completed}/{stats.total} completadas · {stats.pending}{" "}
          pendientes
        </p>
        <TaskFilters
          activeFilter={filter}
          onFilterChange={setFilter}
          search={search}
          setSearch={setSearch}
        />
      </div>

      {filteredAndSortedTasks.length === 0 ? (
        <p className="rounded-lg border border-dashed border-gray-300 p-12 text-center text-gray-400">
          No hay tareas con este filtro.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedTasks.map((task) => (
            <div key={task.id} className="flex flex-col gap-2">
              <TaskCard task={task} onClick={() => toggleTask(task.id)} />
              <button
                type="button"
                onClick={() => {
                  deleteTask(task.id);
                  addNotification("Tarea eliminada", "info");
                }}
                className="self-end text-xs text-gray-400 hover:text-red-500"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
