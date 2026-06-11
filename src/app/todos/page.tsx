'use client';
import { useState } from 'react';
import { useTodos } from '@/hooks/useTodos';
import TodoItem from '@/components/todos/TodoItem';
import TodoModal from '@/components/todos/TodoModal';
import Header from '@/components/layout/Header';
import { Todo } from '@/types';
import { Plus, Search, Filter } from 'lucide-react';
import clsx from 'clsx';

type FilterStatus = 'all' | 'active' | 'completed';
type FilterPriority = 'all' | 'high' | 'medium' | 'low';

const CATEGORIES = ['전체', '업무', '개인', '공부', '건강', '기타'];

export default function TodosPage() {
  const { todos, addTodo, updateTodo, deleteTodo, toggleTodo } = useTodos();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [filterPriority, setFilterPriority] = useState<FilterPriority>('all');
  const [filterCategory, setFilterCategory] = useState('전체');

  const filtered = todos.filter(t => {
    if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterStatus === 'active' && t.completed) return false;
    if (filterStatus === 'completed' && !t.completed) return false;
    if (filterPriority !== 'all' && t.priority !== filterPriority) return false;
    if (filterCategory !== '전체' && t.category !== filterCategory) return false;
    return true;
  });

  const handleSave = (data: Omit<Todo, 'id' | 'createdAt'>) => {
    if (editingTodo) {
      updateTodo(editingTodo.id, data);
    } else {
      addTodo(data);
    }
    setEditingTodo(null);
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTodo(null);
  };

  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div>
      <Header
        title="할 일"
        subtitle={`${completedCount}/${todos.length}개 완료`}
        action={
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            <Plus size={16} />
            새 할 일
          </button>
        }
      />

      <div className="p-6 space-y-4">
        {/* Search & Filter */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="할 일 검색..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1">
              <Filter size={14} className="text-gray-400" />
              {(['all', 'active', 'completed'] as FilterStatus[]).map(s => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={clsx(
                    'px-3 py-1 rounded-lg text-xs font-medium transition-colors',
                    filterStatus === s ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  )}
                >
                  {s === 'all' ? '전체' : s === 'active' ? '진행중' : '완료'}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1">
              {(['all', 'high', 'medium', 'low'] as FilterPriority[]).map(p => (
                <button
                  key={p}
                  onClick={() => setFilterPriority(p)}
                  className={clsx(
                    'px-3 py-1 rounded-lg text-xs font-medium transition-colors',
                    filterPriority === p ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  )}
                >
                  {p === 'all' ? '전체' : p === 'high' ? '높음' : p === 'medium' ? '보통' : '낮음'}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => setFilterCategory(c)}
                className={clsx(
                  'px-3 py-1 rounded-full text-xs font-medium transition-colors',
                  filterCategory === c ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        {todos.length > 0 && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>전체 진행률</span>
              <span className="font-medium">{Math.round((completedCount / todos.length) * 100)}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-700"
                style={{ width: `${(completedCount / todos.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Todo list */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
            <p className="text-gray-400 text-sm">
              {todos.length === 0 ? '할 일을 추가해보세요!' : '조건에 맞는 할 일이 없습니다.'}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={() => toggleTodo(todo.id)}
                onEdit={() => handleEdit(todo)}
                onDelete={() => deleteTodo(todo.id)}
              />
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <TodoModal
          todo={editingTodo}
          onSave={handleSave}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
