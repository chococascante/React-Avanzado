export const TASK_STATUSES = {
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  DONE: "done",
} as const;

export const TASK_PRIORITIES = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
} as const;

// Tipos derivados de las constantes — así evitamos duplicar definiciones
export type TaskStatus = (typeof TASK_STATUSES)[keyof typeof TASK_STATUSES];
export type TaskPriority =
  (typeof TASK_PRIORITIES)[keyof typeof TASK_PRIORITIES];

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  project: string;
  createdAt: string;
}

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Diseñar wireframes",
    description: "Crear los wireframes del dashboard principal",
    status: TASK_STATUSES.DONE,
    priority: TASK_PRIORITIES.HIGH,
    project: "TaskFlow UI",
    createdAt: "2026-04-01",
  },
  {
    id: "2",
    title: "Implementar autenticación",
    description: "Login con email y contraseña",
    status: TASK_STATUSES.IN_PROGRESS,
    priority: TASK_PRIORITIES.HIGH,
    project: "TaskFlow Backend",
    createdAt: "2026-04-02",
  },
  {
    id: "3",
    title: "Escribir tests unitarios",
    description: "Tests para el módulo de tareas",
    status: TASK_STATUSES.TODO,
    priority: TASK_PRIORITIES.MEDIUM,
    project: "TaskFlow UI",
    createdAt: "2026-04-03",
  },
  {
    id: "4",
    title: "Configurar CI/CD",
    description: "Pipeline de despliegue automático",
    status: TASK_STATUSES.TODO,
    priority: TASK_PRIORITIES.LOW,
    project: "TaskFlow DevOps",
    createdAt: "2026-04-03",
  },
  {
    id: "5",
    title: "Code review del sprint",
    description: "Revisar PRs pendientes",
    status: TASK_STATUSES.IN_PROGRESS,
    priority: TASK_PRIORITIES.MEDIUM,
    project: "TaskFlow UI",
    createdAt: "2026-04-04",
  },
];
