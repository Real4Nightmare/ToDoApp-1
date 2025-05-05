import ThemeToggle from '@/components/theme/theme-toggle';
import TodoForm from '@/components/todos/todo-form';
import TodoList from '@/components/todos/todo-list';
import TodoStats from '@/components/todos/todo-stats';
import TodoToolbar from '@/components/todos/todo-toolbar';
import { CheckSquare } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen py-8 px-4 md:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary text-primary-foreground">
              <CheckSquare className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold">TodoApp</h1>
          </div>
          <ThemeToggle />
        </div>

        {/* Main Content */}
        <div>
          <TodoStats />
          <TodoForm />
          <TodoToolbar />
          <TodoList />
        </div>
        
        {/* Footer */}
        <div className="mt-12 pt-4 border-t text-center text-sm text-muted-foreground">
          <p>TodoApp — Built with Next.js, Tailwind CSS and shadcn/ui</p>
        </div>
      </div>
    </main>
  );
}