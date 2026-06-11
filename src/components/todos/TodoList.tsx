'use client';
import { useState } from 'react';
import { useTodos } from '@/hooks/useTodos';
import TodoItem from './TodoItem';
import TodoModal from './TodoModal';
import { Todo } from '@/types';
import { Plus, Search, Filter } from 'lucide-react';

const PRIORITIES = ['all', 'high', 'medium', 'low'];
const STATUSES = ['all', 'active', 'completed'];

export default function TodoList() {
  const { todos, addTodo, updateTodo, deleteTodo, toggleTodo } = useTodos();
  const [showModal, setShowModal] = useState(false);
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [search, setSearch] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = ['all', ...Array.from(new Set(todos.map(t => t.category)))];

  const filtered = todos.filter(todo => {
    if (search && !todo.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterPriority !== 'all' && todo.priority !== filterPriority) return false;
    if (filterStatus === 'active' && todo.completed) return false;
    if (filterStatus === 'completed' && !todo.completed) return false;
    if (filterCategory !== 'all' && todo.category !== filterCategory) return false;
    return true;
  });

  const handleSave = (data: Omit<Todo, 'id' | 'createdAt'>) => {
    if (editTodo) {
      updateTodo(editTodo.id, data);
    } else {
      addTodo(data);
    }
  };

  return (
    <div className="p-6 space-y-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="검색..."
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          onClick={() => { setEditTodo(null); setShowModal(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus size={16} />
          새 할 일
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Filter size={14} />
          <span>필터:</span>
        </div>
        <div className="flex gap-1">
          {STATUSES.map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`text-xs px-3 py-1 rounded-full transition-colors ${filterStatus === s ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {s === 'all' ? '전체' : s === 'active' ? '미완료' : '완료'}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          {PRIORITIES.map(p => (
            <button
              key={p}
              onClick={() => setFilterPriority(p)}
              className={`text-xs px-3 py-1 rounded-full transition-colors ${filterPriority === p ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {p === 'all' ? '전체' : p === 'high' ? '높음' : p === 'medium' ? '보통' : '낮음'}
            </button>
          ))}
        </div>
        <div className="flex gap-1 flex-wrap">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setFilterCategory(c)}
              className={`text-xs px-3 py-1 rounded-full transition-colors ${filterCategory === c ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {c === 'all' ? '전체' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Todo List */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg">할 일이 없습니다</p>
            <p className="text-sm mt-1">새 할 일을 추가해보세요!</p>
          </div>
        ) : (
          filtered.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() => toggleTodo(todo.id)}
              onEdit={() => { setEditTodo(todo); setShowModal(true); }}
              onDelete={() => deleteTodo(todo.id)}
            />
          ))
        )}
      </div>

      {showModal && (
        <TodoModal
          todo={editTodo}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditTodo(null); }}
        />
      )}
    </div>
  );
}
