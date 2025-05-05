import { FileText } from 'lucide-react';
import { useTodo } from '@/contexts/todo-context';

export default function TodoEmptyState() {
  const { filterOption, searchQuery } = useTodo();

  let message = 'No tasks found';
  let description = 'You haven\'t created any tasks yet. Start by adding a new task above.';

  if (searchQuery) {
    message = 'No matching tasks';
    description = `No tasks match your search "${searchQuery}". Try another search term.`;
  } else if (filterOption === 'active') {
    message = 'No active tasks';
    description = 'All of your tasks are completed. Great job!';
  } else if (filterOption === 'completed') {
    message = 'No completed tasks';
    description = 'You haven\'t completed any tasks yet.';
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
        <FileText className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium">{message}</h3>
      <p className="text-sm text-muted-foreground mt-1 max-w-sm">{description}</p>
    </div>
  );
}