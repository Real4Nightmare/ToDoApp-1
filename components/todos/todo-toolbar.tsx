'use client';

import { useTodo } from '@/contexts/todo-context';
import { FilterOption, SortOption } from '@/types/todo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function TodoToolbar() {
  const { 
    filterOption, 
    setFilterOption, 
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption
  } = useTodo();

  return (
    <div className="flex flex-col gap-4 mb-4 sm:flex-row">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden sm:flex sm:items-center sm:gap-1">
          <Button
            variant={filterOption === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterOption('all')}
            className="h-9"
          >
            All
          </Button>
          <Button
            variant={filterOption === 'active' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterOption('active')}
            className="h-9"
          >
            Active
          </Button>
          <Button
            variant={filterOption === 'completed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterOption('completed')}
            className="h-9"
          >
            Completed
          </Button>
        </div>

        <div className="block sm:hidden w-full">
          <Select
            value={filterOption}
            onValueChange={(value) => setFilterOption(value as FilterOption)}
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Select
          value={sortOption}
          onValueChange={(value) => setSortOption(value as SortOption)}
        >
          <SelectTrigger className="h-9">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="priority">Priority</SelectItem>
            <SelectItem value="createdAt">Date Added</SelectItem>
            <SelectItem value="title">Alphabetical</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}