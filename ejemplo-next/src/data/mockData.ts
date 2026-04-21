/**
 * Datos mock para DevBoard (Proyecto Final — React Avanzado).
 * Alineado al enunciado: proyectos, tickets Kanban, prioridad, etiqueta y responsable.
 * Los contadores de tickets abiertos y el progreso se pueden derivar con los helpers exportados.
 *
 * Prioridades: se reutilizan `TASK_PRIORITIES` y `TaskPriority` del feature de tareas
 * (`features/tasks/data/mockData`) — mismos valores `low` | `medium` | `high`.
 *
 * Columnas Kanban: el enunciado pide cuatro columnas (Backlog → Completado). Eso no
 * coincide con `TaskStatus` del demo de tareas (`todo` | `in_progress` | `done`), por
 * eso los tickets DevBoard usan `column: KanbanColumnId` aparte de `status` en `Task`.
 */

import {
  TASK_PRIORITIES,
  type TaskPriority,
} from "@/features/tasks/data/mockData";

export { TASK_PRIORITIES, type TaskPriority };

export const KANBAN_COLUMNS = {
  BACKLOG: "backlog",
  IN_PROGRESS: "in_progress",
  IN_REVIEW: "in_review",
  COMPLETED: "completed",
} as const;

export type KanbanColumnId =
  (typeof KANBAN_COLUMNS)[keyof typeof KANBAN_COLUMNS];

export interface Project {
  id: string;
  name: string;
  description: string;
}

export interface Ticket {
  id: string;
  projectId: string;
  title: string;
  description: string;
  column: KanbanColumnId;
  priority: TaskPriority;
  /** Etiqueta funcional (ej. bug, feature, docs). */
  label: string;
  /** Nombre del responsable asignado. */
  assignee: string;
  createdAt: string;
}

export const mockProjects: Project[] = [
  {
    id: "proj-1",
    name: "DevBoard Web",
    description:
      "Panel de gestión de proyectos en el cliente: proyectos, Kanban y filtros con persistencia en localStorage.",
  },
  {
    id: "proj-2",
    name: "API de facturación interna",
    description:
      "Servicios REST para conciliación y reportes; integración con el ERP y pruebas de carga.",
  },
  {
    id: "proj-3",
    name: "App móvil de campo",
    description:
      "Captura offline-first para técnicos; sincronización y autenticación sin backend externo en el prototipo.",
  },
];

export const mockTickets: Ticket[] = [
  {
    id: "tck-101",
    projectId: "proj-1",
    title: "Definir tipos TypeScript para proyectos y tickets",
    description: "Modelar Project, Ticket y columnas Kanban en src/data.",
    column: KANBAN_COLUMNS.COMPLETED,
    priority: TASK_PRIORITIES.HIGH,
    label: "feature",
    assignee: "María Solano",
    createdAt: "2026-04-02T10:00:00.000Z",
  },
  {
    id: "tck-102",
    projectId: "proj-1",
    title: "Implementar KanbanBoard como compound component",
    description: "KanbanBoard, KanbanBoard.Column y KanbanBoard.Card.",
    column: KANBAN_COLUMNS.IN_PROGRESS,
    priority: TASK_PRIORITIES.HIGH,
    label: "feature",
    assignee: "Carlos Mora",
    createdAt: "2026-04-03T14:30:00.000Z",
  },
  {
    id: "tck-103",
    projectId: "proj-1",
    title: "Hook useDebounce para búsqueda por título (≥300ms)",
    description: "Encapsular debounce reutilizable para el filtro de texto.",
    column: KANBAN_COLUMNS.IN_REVIEW,
    priority: TASK_PRIORITIES.MEDIUM,
    label: "refactor",
    assignee: "María Solano",
    createdAt: "2026-04-04T09:15:00.000Z",
  },
  {
    id: "tck-104",
    projectId: "proj-1",
    title: "Vista lista de proyectos con resumen y navegación al detalle",
    description: "Cargar datos desde mock JSON/TS y mostrar progreso general.",
    column: KANBAN_COLUMNS.BACKLOG,
    priority: TASK_PRIORITIES.MEDIUM,
    label: "feature",
    assignee: "Ana Jiménez",
    createdAt: "2026-04-05T16:00:00.000Z",
  },
  {
    id: "tck-105",
    projectId: "proj-1",
    title: "FiltersContext: prioridad y responsable compartidos entre vistas",
    description: "Context API para filtros activos según requisitos del curso.",
    column: KANBAN_COLUMNS.BACKLOG,
    priority: TASK_PRIORITIES.LOW,
    label: "docs",
    assignee: "Carlos Mora",
    createdAt: "2026-04-06T11:45:00.000Z",
  },
  {
    id: "tck-201",
    projectId: "proj-2",
    title: "Diseño del contrato OpenAPI para conciliación",
    description: "Versionar esquema y ejemplos de request/response.",
    column: KANBAN_COLUMNS.IN_REVIEW,
    priority: TASK_PRIORITIES.HIGH,
    label: "docs",
    assignee: "Luis Calderón",
    createdAt: "2026-04-01T08:00:00.000Z",
  },
  {
    id: "tck-202",
    projectId: "proj-2",
    title: "Endpoint de reportes mensuales con paginación",
    description: "Cursor-based pagination y filtros por rango de fechas.",
    column: KANBAN_COLUMNS.IN_PROGRESS,
    priority: TASK_PRIORITIES.HIGH,
    label: "feature",
    assignee: "Valeria Rojas",
    createdAt: "2026-04-02T13:20:00.000Z",
  },
  {
    id: "tck-203",
    projectId: "proj-2",
    title: "Corregir cálculo de IVA en notas de crédito",
    description: "Bug reportado en QA para clientes multinacionales.",
    column: KANBAN_COLUMNS.BACKLOG,
    priority: TASK_PRIORITIES.HIGH,
    label: "bug",
    assignee: "Luis Calderón",
    createdAt: "2026-04-04T17:10:00.000Z",
  },
  {
    id: "tck-204",
    projectId: "proj-2",
    title: "Pruebas de carga con k6 (escenario pico de fin de mes)",
    description: "Documentar umbrales y métricas en README del servicio.",
    column: KANBAN_COLUMNS.BACKLOG,
    priority: TASK_PRIORITIES.MEDIUM,
    label: "chore",
    assignee: "Valeria Rojas",
    createdAt: "2026-04-05T10:00:00.000Z",
  },
  {
    id: "tck-301",
    projectId: "proj-3",
    title: "Cola de sincronización cuando vuelve la conexión",
    description: "Reintentos exponenciales y resolución de conflictos simple.",
    column: KANBAN_COLUMNS.IN_PROGRESS,
    priority: TASK_PRIORITIES.HIGH,
    label: "feature",
    assignee: "Ana Jiménez",
    createdAt: "2026-04-03T12:00:00.000Z",
  },
  {
    id: "tck-302",
    projectId: "proj-3",
    title: "Formulario de orden de trabajo con validación accesible",
    description: "Etiquetas, roles ARIA y mensajes de error claros.",
    column: KANBAN_COLUMNS.IN_REVIEW,
    priority: TASK_PRIORITIES.MEDIUM,
    label: "feature",
    assignee: "María Solano",
    createdAt: "2026-04-04T15:30:00.000Z",
  },
  {
    id: "tck-303",
    projectId: "proj-3",
    title: "Pantalla de ajustes: tema claro/oscuro persistido",
    description: "ThemeContext + useLocalStorage según lineamientos.",
    column: KANBAN_COLUMNS.COMPLETED,
    priority: TASK_PRIORITIES.LOW,
    label: "refactor",
    assignee: "Carlos Mora",
    createdAt: "2026-04-01T09:00:00.000Z",
  },
  {
    id: "tck-304",
    projectId: "proj-3",
    title: "Geolocalización opcional en check-in de visita",
    description: "Permisos, fallback y copy para el usuario final.",
    column: KANBAN_COLUMNS.BACKLOG,
    priority: TASK_PRIORITIES.LOW,
    label: "feature",
    assignee: "Ana Jiménez",
    createdAt: "2026-04-06T08:45:00.000Z",
  },
];

export function isTicketOpen(ticket: Ticket): boolean {
  return ticket.column !== KANBAN_COLUMNS.COMPLETED;
}

export function getTicketsForProject(
  projectId: string,
  tickets: Ticket[] = mockTickets,
): Ticket[] {
  return tickets.filter((t) => t.projectId === projectId);
}

/** Tickets abiertos = cualquier columna distinta de Completado. */
export function countOpenTicketsForProject(
  projectId: string,
  tickets: Ticket[] = mockTickets,
): number {
  return getTicketsForProject(projectId, tickets).filter(isTicketOpen).length;
}

/** Progreso general: porcentaje de tickets en columna Completado. */
export function projectProgressPercent(
  projectId: string,
  tickets: Ticket[] = mockTickets,
): number {
  const list = getTicketsForProject(projectId, tickets);
  if (list.length === 0) return 0;
  const done = list.filter((t) => t.column === KANBAN_COLUMNS.COMPLETED).length;
  return Math.round((done / list.length) * 100);
}

/** Lista de responsables únicos (útil para filtros por assignee). */
export function listAssignees(tickets: Ticket[] = mockTickets): string[] {
  return [...new Set(tickets.map((t) => t.assignee))].sort((a, b) =>
    a.localeCompare(b, "es"),
  );
}

export interface ProjectSummary extends Project {
  openTicketsCount: number;
  progressPercent: number;
}

export function toProjectSummaries(
  projects: Project[] = mockProjects,
  tickets: Ticket[] = mockTickets,
): ProjectSummary[] {
  return projects.map((p) => ({
    ...p,
    openTicketsCount: countOpenTicketsForProject(p.id, tickets),
    progressPercent: projectProgressPercent(p.id, tickets),
  }));
}
