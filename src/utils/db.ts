import { prisma } from '../lib/prisma';
import type { Todo } from '../types/todo';

export const getTodos = async (): Promise<Todo[]> => {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: 'desc' },
  });
  
  return todos.map(todo => ({
    ...todo,
    dueDate: todo.dueDate ? todo.dueDate.toISOString() : '',
    createdAt: todo.createdAt.toISOString(),
  }));
};

export const createTodo = async (todo: Omit<Todo, 'id' | 'createdAt'>): Promise<Todo> => {
  const newTodo = await prisma.todo.create({
    data: {
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      dueDate: todo.dueDate ? new Date(todo.dueDate) : null,
      completed: todo.completed,
    },
  });

  return {
    ...newTodo,
    dueDate: newTodo.dueDate ? newTodo.dueDate.toISOString() : '',
    createdAt: newTodo.createdAt.toISOString(),
  };
};

export const updateTodo = async (id: string, data: Partial<Todo>): Promise<Todo> => {
  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: {
      ...data,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
    },
  });

  return {
    ...updatedTodo,
    dueDate: updatedTodo.dueDate ? updatedTodo.dueDate.toISOString() : '',
    createdAt: updatedTodo.createdAt.toISOString(),
  };
};

export const deleteTodo = async (id: string): Promise<void> => {
  await prisma.todo.delete({
    where: { id },
  });
};