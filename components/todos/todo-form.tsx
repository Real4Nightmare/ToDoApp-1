'use client';

import { useState } from 'react';
import { useTodo } from '@/contexts/todo-context';
import { Todo, Priority } from '@/types/todo';
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
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';

export default function TodoForm() {
  const { addTodo } = useTodo();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    addTodo({
      title: title.trim(),
      description: description.trim() || undefined,
      completed: false,
      priority,
    });

    setTitle('');
    setDescription('');
    setPriority('medium');
    setIsExpanded(false);
  };

  return (
    <Card className="mb-6">
      <form onSubmit={handleSubmit}>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Add New Task</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex gap-2">
              <Input
                placeholder="What needs to be done?"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (!isExpanded && e.target.value) {
                    setIsExpanded(true);
                  }
                }}
                className="flex-1"
              />
              
              {!isExpanded && (
                <Button type="submit" className="shrink-0">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add
                </Button>
              )}
            </div>
            
            {isExpanded && (
              <>
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
              </>
            )}
          </div>
        </CardContent>
        
        {isExpanded && (
          <CardFooter className="flex justify-end gap-2 pt-0">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                setIsExpanded(false);
                setTitle('');
                setDescription('');
                setPriority('medium');
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Add Task</Button>
          </CardFooter>
        )}
      </form>
    </Card>
  );
}