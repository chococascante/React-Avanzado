"use client";

import { useState, useCallback, useMemo } from "react";
import type {
  Task,
  TaskPriority,
  TaskStatus,
} from "@/features/tasks/data/mockData";
import { useDebounce } from "./useDebounce";

export type TaskFilter = "all" | "completed" | "pending" | TaskStatus;
export type TaskSortBy = "dateCreated" | "priority" | "name";

/**
 * useTasks — custom hook implementado con useState (sin useReducer).
 *
 * Encapsula toda la lógica de tareas: estado, filtros, ordenamiento,
 * CRUD y estado derivado (tareas filtradas/ordenadas + stats).
 * Pensado para vivir en el cliente ('use client') y alimentar
 * a contenedores/presentacionales del feature de tareas.
 */
export function useTasks(initialTasks: Task[] = []) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [sortBy, setSortBy] = useState<TaskSortBy>("dateCreated");
  const [search, setSearch] = useState("");
  const [search2, setSearch2] = useState("");
  const debouncedSetSearch = useDebounce(setSearch2);

  const handleChange = useCallback(
    (s: string) => {
      setSearch(() => {
        debouncedSetSearch(s);

        return s;
      });
    },
    [debouncedSetSearch],
  );

  const addTask = useCallback(
    (
      taskData: Omit<Task, "id" | "createdAt" | "completed"> & {
        priority?: TaskPriority;
      },
    ) => {
      const { priority, ...rest } = taskData;
      const newTask: Task = {
        ...rest,
        id: String(Date.now()),
        completed: false,
        createdAt: new Date().toISOString(),
        priority: priority ?? "medium",
      } as Task;
      setTasks((prev) => [newTask, ...prev]);
      return newTask;
    },
    [],
  );

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const completed = !t.completed;
        return {
          ...t,
          completed,
          status: completed ? "done" : t.status === "done" ? "todo" : t.status,
        };
      }),
    );
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    );
  }, []);

  const reorderTasks = useCallback((fromIndex: number, toIndex: number) => {
    setTasks((prev) => {
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  }, []);

  // Estado derivado: filtrado + ordenado (memoizado)
  const filteredAndSortedTasks = useMemo(() => {
    let result = tasks.filter((t) => {
      if (
        search2 !== "" &&
        !t.title.toLowerCase().includes(search2.toLowerCase())
      ) {
        return false;
      }
      if (filter === "all") return true;
      if (filter === "completed") return Boolean(t.completed);
      if (filter === "pending") return !t.completed;
      return t.status === filter;
    });

    result = [...result].sort((a, b) => {
      if (sortBy === "dateCreated") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      if (sortBy === "priority") {
        const order: Record<TaskPriority, number> = {
          high: 0,
          medium: 1,
          low: 2,
        };
        return order[a.priority] - order[b.priority];
      }
      if (sortBy === "name") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return result;
  }, [tasks, search2, filter, sortBy]);

  // Estado derivado: estadísticas
  const stats = useMemo(
    () => ({
      total: tasks.length,
      completed: tasks.filter((t) => t.completed).length,
      pending: tasks.filter((t) => !t.completed).length,
      byPriority: {
        high: tasks.filter((t) => t.priority === "high").length,
        medium: tasks.filter((t) => t.priority === "medium").length,
        low: tasks.filter((t) => t.priority === "low").length,
      },
    }),
    [tasks],
  );

  return {
    // Estado
    tasks,
    filteredAndSortedTasks,
    filter,
    sortBy,
    stats,
    // Acciones
    addTask,
    deleteTask,
    toggleTask,
    updateTask,
    reorderTasks,
    setFilter,
    setSortBy,
    search,
    setSearch: handleChange,
  };
}
