'use client';

import { Task } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';
import { Edit2, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggleComplete: (taskId: string, completed: boolean) => void;
}

const priorityColors = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

export function TaskList({ tasks, onEdit, onDelete, onToggleComplete }: TaskListProps) {
  if (!tasks.length) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No tasks yet. Click the "Add Task" button to create one.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id} className={task.completed ? 'opacity-60' : ''}>
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div className="flex items-start space-x-2">
              <Checkbox
                checked={task.completed}
                onCheckedChange={(checked) => onToggleComplete(task.id, checked as boolean)}
              />
              <div>
                <CardTitle className={cn('text-xl', task.completed && 'line-through')}>
                  {task.title}
                </CardTitle>
                {task.description && (
                  <p className="mt-1 text-sm text-muted-foreground">{task.description}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className={priorityColors[task.priority]}>
                {task.priority}
              </Badge>
              <Button size="icon" variant="ghost" onClick={() => onEdit(task)}>
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => onDelete(task.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              {task.dueDate && (
                <p>Due: {format(new Date(task.dueDate), 'PPP')}</p>
              )}
              <p>Created: {format(new Date(task.createdAt), 'PPP')}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}