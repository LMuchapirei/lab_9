import { Todo } from '../types/todo';

const STORAGE_KEY = 'todos';

export const getTodos = (): Todo[] => {
  const todos = localStorage.getItem(STORAGE_KEY);
  return todos ? JSON.parse(todos) : [];
};

export const saveTodos = (todos: Todo[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};