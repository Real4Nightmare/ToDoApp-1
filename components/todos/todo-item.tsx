'use client';

import { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Edit, 
  Grip, 
  MoreVertical, 
  Trash
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Todo } from '@/types/todo';
import { useTodo } from '@/contexts/todo-context';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import TodoEditForm from './todo-edit-form';

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, deleteTodo } = useTodo();
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return <TodoEditForm todo={todo} onDone={() => setIsEditing(false)} />;
  }

  const priorityColors = {
    low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  return (
    <Card className={cn(
      'transition-all duration-200 group hover:shadow-md',
      todo.completed ? 'opacity-75' : 'opacity-100'
    )}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 pt-1">
            <Checkbox 
              checked={todo.completed}
              onCheckedChange={() => toggleTodo(todo.id)}
              className="data-[state=checked]:bg-green-600"
            />
          </div>
          
          <div className="flex-grow min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className={cn(
                "text-lg font-medium line-clamp-1",
                todo.completed && "line-through text-muted-foreground"
              )}>
                {todo.title}
              </h3>
              
              <div className="flex items-center gap-2">
                <Badge className={priorityColors[todo.priority]}>
                  {todo.priority}
                </Badge>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setIsEditing(true)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-destructive focus:text-destructive" 
                      onClick={() => deleteTodo(todo.id)}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            {todo.description && (
              <p className={cn(
                "text-sm text-muted-foreground mt-1",
                todo.completed && "line-through"
              )}>
                {todo.description}
              </p>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-4 py-2 border-t flex justify-between text-xs text-muted-foreground">
        <div className="flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          <span>
            {formatDistanceToNow(todo.createdAt, { addSuffix: true })}
          </span>
        </div>
        
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <Grip className="h-3 w-3" />
        </div>
      </CardFooter>
    </Card>
  );
}