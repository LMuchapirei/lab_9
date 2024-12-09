'use client';

import { useState, useEffect } from 'react';
import { TaskForm } from '@/components/TaskForm';
import { TaskList } from '@/components/TaskList';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { Task, TaskFormData } from '@/lib/types';
import { getTasks, addTask, updateTask, deleteTask } from '@/lib/tasks';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const handleAddTask = (data: TaskFormData) => {
    const newTask = addTask(data);
    setTasks(getTasks());
    setIsFormOpen(false);
    toast({
      title: 'Task added',
      description: 'Your task has been successfully added.',
    });
  };

  const handleUpdateTask = (data: TaskFormData) => {
    if (editingTask) {
      updateTask(editingTask.id, data);
      setTasks(getTasks());
      setEditingTask(null);
      toast({
        title: 'Task updated',
        description: 'Your task has been successfully updated.',
      });
    }
  };

  const handleDeleteTask = (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId);
      setTasks(getTasks());
      toast({
        title: 'Task deleted',
        description: 'Your task has been successfully deleted.',
        variant: 'destructive',
      });
    }
  };

  const handleToggleComplete = (taskId: string, completed: boolean) => {
    updateTask(taskId, { completed });
    setTasks(getTasks());
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Tasks</h1>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
            </DialogHeader>
            <TaskForm onSubmit={handleAddTask} onCancel={() => setIsFormOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <TaskList
        tasks={tasks}
        onEdit={setEditingTask}
        onDelete={handleDeleteTask}
        onToggleComplete={handleToggleComplete}
      />

      <Dialog open={!!editingTask} onOpenChange={() => setEditingTask(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          {editingTask && (
            <TaskForm
              initialData={editingTask}
              onSubmit={handleUpdateTask}
              onCancel={() => setEditingTask(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}