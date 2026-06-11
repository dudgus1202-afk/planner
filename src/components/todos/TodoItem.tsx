'use client';
import { Todo } from '@/types';
import { Pencil, Trash2, Calendar } from 'lucide-react';
import clsx from 'clsx';

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const priorityConfig = {
  high: { label: '높음', class: 'bg-red-100 text-red-700' },
  medium: { label: '보통', class: 'bg-yellow-100 text-yellow-700' },
  low: { label: '낮음', class: 'bg-green-100 text-green-700' },
};

export default function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  const today = new Date().toISOString().split('T')[0];
  const isOverdue = !todo.completed && todo.dueDate && todo.dueDate < today;

  return (
    <div className={clsx(
      'flex items-start gap-3 p-4 rounded-xl border transition-all duration-200 group',
      todo.completed ? 'bg-gray-50 border-gray-100' : 'bg-white border-gray-200 hover:shadow-sm'
    )}>
      <button
        onClick={onToggle}
        className={clsx(
          'w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 transition-colors',
          todo.completed ? 'bg-indigo-500 border-indigo-500' : 'border-gray-300 hover:border-indigo-400'
        )}
      >
        {todo.completed && (
          <svg className="w-full h-full text-white p-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 flex-wrap">
          <span className={clsx(
            'text-sm font-medium',
            todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
          )}>
            {todo.title}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityConfig[todo.priority].class}`}>
            {priorityConfig[todo.priority].label}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-medium">
            {todo.category}
          </span>
        </div>
        {todo.description && (
          <p className="text-xs text-gray-400 mt-1">{todo.description}</p>
        )}
        {todo.dueDate && (
          <div className={clsx('flex items-center gap-1 mt-1', isOverdue ? 'text-red-500' : 'text-gray-400')}>
            <Calendar size={11} />
            <span className="text-xs">{todo.dueDate}</span>
            {isOverdue && <span className="text-xs font-medium">(기한 초과)</span>}
          </div>
        )}
      </div>
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={onEdit}
          className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={onDelete}
          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
