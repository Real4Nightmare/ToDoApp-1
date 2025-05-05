'use client';

import { useMemo } from 'react';
import { useTodo } from '@/contexts/todo-context';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { PieChart, Cell, Pie, ResponsiveContainer, Tooltip } from 'recharts';

export default function TodoStats() {
  const { todos } = useTodo();

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;
    const completionPercentage = total > 0 
      ? Math.round((completed / total) * 100) 
      : 0;

    const priorityCounts = {
      low: todos.filter(todo => todo.priority === 'low').length,
      medium: todos.filter(todo => todo.priority === 'medium').length,
      high: todos.filter(todo => todo.priority === 'high').length,
    };

    return {
      total,
      completed,
      active,
      completionPercentage,
      priorityCounts
    };
  }, [todos]);

  const pieData = [
    { name: 'High', value: stats.priorityCounts.high, color: 'hsl(var(--destructive))' },
    { name: 'Medium', value: stats.priorityCounts.medium, color: 'hsl(var(--chart-4))' },
    { name: 'Low', value: stats.priorityCounts.low, color: 'hsl(var(--chart-2))' },
  ].filter(item => item.value > 0);

  if (stats.total === 0) {
    return null;
  }

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Completion</span>
              <span className="font-medium">{stats.completionPercentage}%</span>
            </div>
            <Progress value={stats.completionPercentage} className="h-2" />
            
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="rounded-md border p-2 text-center">
                <div className="text-2xl font-bold">{stats.active}</div>
                <div className="text-xs text-muted-foreground">Active</div>
              </div>
              <div className="rounded-md border p-2 text-center">
                <div className="text-2xl font-bold">{stats.completed}</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
            </div>
          </div>
          
          <div className="h-[140px]">
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="name"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                No priority data
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}