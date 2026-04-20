import { mockTasks, type Task } from '@/features/tasks/data/mockData';

// Fuente "en memoria" que simula la DB.
const database: Task[] = [...mockTasks];

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export const taskService = {
  /** GET /api/tasks */
  async fetchTasks(signal?: AbortSignal): Promise<Task[]> {
    await delay(800);
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
    return [...database];
  },

  /** GET /api/tasks?project=... */
  async fetchTasksByProject(project: string, signal?: AbortSignal): Promise<Task[]> {
    await delay(600);
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
    return database.filter((t) => t.project === project);
  },

  /** POST /api/tasks */
  async createTask(
    taskData: Omit<Task, 'id' | 'createdAt'>,
    signal?: AbortSignal
  ): Promise<Task> {
    await delay(500);
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');

    const newTask: Task = {
      ...taskData,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
    };
    database.unshift(newTask);
    return newTask;
  },

  /** PATCH /api/tasks/:id */
  async updateTask(
    id: string,
    updates: Partial<Task>,
    signal?: AbortSignal
  ): Promise<Task> {
    await delay(400);
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');

    const idx = database.findIndex((t) => t.id === id);
    if (idx < 0) throw new Error('Task not found');
    database[idx] = { ...database[idx], ...updates };
    return database[idx];
  },

  /** DELETE /api/tasks/:id */
  async deleteTask(id: string, signal?: AbortSignal): Promise<void> {
    await delay(300);
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');

    const idx = database.findIndex((t) => t.id === id);
    if (idx >= 0) database.splice(idx, 1);
  },
};
