import React, { useState, useEffect } from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { Todo } from './types/todo';
import { getTodos as getStoredTodos, saveTodos } from './utils/storage';
import { CheckSquare } from 'lucide-react';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = () => {
    try {
      const loadedTodos = getStoredTodos();
      setTodos(loadedTodos);
    } catch (error) {
      console.error('Failed to load todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = (newTodo: Omit<Todo, 'id' | 'createdAt'>) => {
    try {
      const todo: Todo = {
        ...newTodo,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      const updatedTodos = [todo, ...todos];
      setTodos(updatedTodos);
      saveTodos(updatedTodos);
    } catch (error) {
      console.error('Failed to create todo:', error);
    }
  };

  const handleToggle = (id: string) => {
    try {
      const updatedTodos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(updatedTodos);
      saveTodos(updatedTodos);
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  };

  const handleDelete = (id: string) => {
    try {
      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
      saveTodos(updatedTodos);
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  const handleEdit = (id: string) => {
    // Implement edit functionality in a future update
    console.log('Edit todo:', id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <CheckSquare className="text-blue-500 w-8 h-8 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">Todo List</h1>
          </div>
          
          <div className="mb-8">
            <TodoForm onAdd={handleAddTodo} />
          </div>

          <div className="space-y-4">
            <TodoList
              todos={todos}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}