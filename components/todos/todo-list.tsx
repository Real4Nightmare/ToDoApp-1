'use client';

import { useMemo } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useTodo } from '@/contexts/todo-context';
import TodoItem from './todo-item';
import TodoEmptyState from './todo-empty-state';
import { FilterOption, Priority, SortOption, Todo } from '@/types/todo';

export default function TodoList() {
  const { 
    todos, 
    reorderTodos,
    filterOption,
    searchQuery,
    sortOption
  } = useTodo();

  const filteredAndSortedTodos = useMemo(() => {
    // First filter by the filter option
    let result = todos.filter((todo) => {
      if (filterOption === 'all') return true;
      if (filterOption === 'active') return !todo.completed;
      if (filterOption === 'completed') return todo.completed;
      return true;
    });

    // Then filter by search query if present
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (todo) =>
          todo.title.toLowerCase().includes(query) ||
          (todo.description && todo.description.toLowerCase().includes(query))
      );
    }

    // Then sort based on sort option
    return result.sort((a, b) => {
      if (sortOption === 'priority') {
        const priorityOrder: Record<Priority, number> = {
          high: 1,
          medium: 2,
          low: 3,
        };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      
      if (sortOption === 'title') {
        return a.title.localeCompare(b.title);
      }
      
      // Default sort by creation date (newest first)
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
  }, [todos, filterOption, searchQuery, sortOption]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    reorderTodos(result.source.index, result.destination.index);
  };

  if (filteredAndSortedTodos.length === 0) {
    return <TodoEmptyState />;
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-3 mt-4"
          >
            {filteredAndSortedTodos.map((todo, index) => (
              <Draggable key={todo.id} draggableId={todo.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TodoItem todo={todo} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}