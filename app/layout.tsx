import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { TodoProvider } from '@/contexts/todo-context';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Todo App - Organize Your Tasks',
  description: 'A comprehensive task management application with CRUD, filtering, and more',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem 
          disableTransitionOnChange
        >
          <TodoProvider>
            {children}
            <Toaster />
          </TodoProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}