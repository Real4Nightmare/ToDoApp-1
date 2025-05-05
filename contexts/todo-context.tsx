'use client';

import { useToast } from '@/hooks/use-toast';
import { FilterOption, SortOption, Todo, TodoContextType } from '@/types/todo';
import { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TodoContext = createContext<TodoContextType | undefined>(undefined);

// Helper function to check if localStorage is available
const isLocalStorageAvailable = () => {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();
  const [filterOption, setFilterOption] = useState<FilterOption>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('createdAt');
  const [todos, setTodos] = useState<Todo[]>(() => {
    // Load initial todos from localStorage
    if (!isLocalStorageAvailable()) return [];

    try {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        const parsedTodos = JSON.parse(savedTodos);
        // Convert string dates back to Date objects
        return parsedTodos.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt),
        }));
      }
      return [];
    } catch (error) {
      console.error('Error loading todos from localStorage:', error);
      return [];
    }
  });

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (!isLocalStorageAvailable()) return;

    try {
      // Convert Date objects to ISO strings before saving
      const todosToSave = todos.map(todo => ({
        ...todo,
        createdAt: todo.createdAt.toISOString(),
        updatedAt: todo.updatedAt.toISOString()
      }));
      localStorage.setItem('todos', JSON.stringify(todosToSave));
    } catch (error) {
      console.error('Error saving todos to localStorage:', error);
      toast({
        title: 'Error',
        description: 'Failed to save tasks. Your changes may not persist after refresh.',
        variant: 'destructive',
      });
    }
  }, [todos, toast]);

  // Save filter option to localStorage
  useEffect(() => {
    if (!isLocalStorageAvailable()) return;
    try {
      localStorage.setItem('filterOption', filterOption);
    } catch (error) {
      console.error('Error saving filter option to localStorage:', error);
    }
  }, [filterOption]);

  // Save search query to localStorage
  useEffect(() => {
    if (!isLocalStorageAvailable()) return;
    try {
      localStorage.setItem('searchQuery', searchQuery);
    } catch (error) {
      console.error('Error saving search query to localStorage:', error);
    }
  }, [searchQuery]);

  // Save sort option to localStorage
  useEffect(() => {
    if (!isLocalStorageAvailable()) return;
    try {
      localStorage.setItem('sortOption', sortOption);
    } catch (error) {
      console.error('Error saving sort option to localStorage:', error);
    }
  }, [sortOption]);

  const addTodo = (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTodo: Todo = {
      ...todo,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    
    toast({
      title: 'Task added',
      description: `"${todo.title}" has been added to your list.`,
    });
  };

  const updateTodo = (id: string, updatedFields: Partial<Todo>) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, ...updatedFields, updatedAt: new Date() }
          : todo
      )
    );

    toast({
      title: 'Task updated',
      description: 'Your task has been updated successfully.',
    });
  };

  const deleteTodo = (id: string) => {
    const todoToDelete = todos.find(todo => todo.id === id);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    
    toast({
      title: 'Task deleted',
      description: todoToDelete 
        ? `"${todoToDelete.title}" has been removed.`
        : 'Task has been removed.',
      variant: 'destructive',
    });
  };

  const toggleTodo = (id: string) => {
    const todoToToggle = todos.find(todo => todo.id === id);
    
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
          : todo
      )
    );

    if (todoToToggle) {
      toast({
        title: todoToToggle.completed ? 'Task reopened' : 'Task completed',
        description: `"${todoToToggle.title}" is now ${todoToToggle.completed ? 'active' : 'marked as complete'}.`,
      });
    }
  };

  const reorderTodos = (sourceIndex: number, destinationIndex: number) => {
    setTodos((prevTodos) => {
      const result = [...prevTodos];
      const [removed] = result.splice(sourceIndex, 1);
      result.splice(destinationIndex, 0, removed);
      return result;
    });
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleTodo,
        reorderTodos,
        filterOption,
        setFilterOption,
        searchQuery,
        setSearchQuery,
        sortOption,
        setSortOption,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};