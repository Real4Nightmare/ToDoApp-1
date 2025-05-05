'use client';

import { useState } from 'react';
import { useTodo } from '@/contexts/todo-context';
import { Priority, Todo } from '@/types/todo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

interface TodoEditFormProps {
  todo: Todo;
  onDone: () => void;
}

export default function TodoEditForm({ todo, onDone }: TodoEditFormProps) {
  const { updateTodo } = useTodo();
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || '');
  const [priority, setPriority] = useState<Priority>(todo.priority);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    updateTodo(todo.id, {
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
    });

    onDone();
  };

  return (
    <Card className="mb-3">
      <form onSubmit={handleSubmit}>
        <CardContent className="p-4 space-y-4">
          <div className="grid gap-3">
            <Input
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
              autoFocus
            />
            <Textarea
              placeholder="Add details (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
            <Select 
              value={priority} 
              onValueChange={(value) => setPriority(value as Priority)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end gap-2 px-4 pb-4 pt-0">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onDone}
          >
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </CardFooter>
      </form>
    </Card>
  );
}