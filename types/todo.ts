export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  createdAt: Date;
  updatedAt: Date;
}

export type SortOption = 'priority' | 'createdAt' | 'title';
export type FilterOption = 'all' | 'active' | 'completed';

export interface TodoContextType {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTodo: (id: string, todo: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  reorderTodos: (sourceIndex: number, destinationIndex: number) => void;
  filterOption: FilterOption;
  setFilterOption: (option: FilterOption) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
}