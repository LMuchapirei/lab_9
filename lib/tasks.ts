import { Task, TaskFormData } from './types';

// Simulating a database with local storage
const STORAGE_KEY = 'todo-tasks';

export function getTasks(): Task[] {
  if (typeof window === 'undefined') return [];
  const tasks = localStorage.getItem(STORAGE_KEY);
  return tasks ? JSON.parse(tasks) : [];
}

export function addTask(taskData: TaskFormData): Task {
  const tasks = getTasks();
  const newTask: Task = {
    ...taskData,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  const updatedTasks = [...tasks, newTask];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
  return newTask;
}

export function updateTask(id: string, taskData: Partial<TaskFormData>): Task | null {
  const tasks = getTasks();
  const taskIndex = tasks.findIndex(task => task.id === id);
  
  if (taskIndex === -1) return null;
  
  const updatedTask: Task = {
    ...tasks[taskIndex],
    ...taskData,
    updatedAt: new Date().toISOString(),
  };
  
  tasks[taskIndex] = updatedTask;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  return updatedTask;
}

export function deleteTask(id: string): boolean {
  const tasks = getTasks();
  const updatedTasks = tasks.filter(task => task.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
  return tasks.length !== updatedTasks.length;
}