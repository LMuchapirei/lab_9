import React from 'react';
import { Trash2, Edit2, CheckCircle, Circle } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md ${todo.completed ? 'opacity-75' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={() => onToggle(todo.id)}>
            {todo.completed ? (
              <CheckCircle className="text-green-500" />
            ) : (
              <Circle className="text-gray-400" />
            )}
          </button>
          <div>
            <h3 className={`text-lg font-medium ${todo.completed ? 'line-through text-gray-500' : ''}`}>
              {todo.title}
            </h3>
            <p className="text-gray-600">{todo.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-sm ${priorityColors[todo.priority]}`}>
            {todo.priority}
          </span>
          {todo.dueDate && (
            <span className="text-sm text-gray-500">
              Due: {new Date(todo.dueDate).toLocaleDateString()}
            </span>
          )}
          <button
            onClick={() => onEdit(todo.id)}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <Edit2 size={18} className="text-gray-600" />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <Trash2 size={18} className="text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
}