'use client';
import { useState } from 'react';
import { useGoals } from '@/hooks/useGoals';
import GoalCard from './GoalCard';
import GoalModal from './GoalModal';
import { Goal } from '@/types';
import { Plus } from 'lucide-react';

export default function GoalList() {
  const { goals, addGoal, updateGoal, deleteGoal, addMilestone, toggleMilestone, deleteMilestone } = useGoals();
  const [showModal, setShowModal] = useState(false);
  const [editGoal, setEditGoal] = useState<Goal | null>(null);
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = ['all', ...Array.from(new Set(goals.map(g => g.category)))];
  const filtered = filterCategory === 'all' ? goals : goals.filter(g => g.category === filterCategory);

  const handleSave = (data: Omit<Goal, 'id' | 'createdAt' | 'milestones'>) => {
    if (editGoal) {
      updateGoal(editGoal.id, data);
    } else {
      addGoal({ ...data, milestones: [] });
    }
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 flex-wrap">
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
        <button
          onClick={() => { setEditGoal(null); setShowModal(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus size={16} />
          새 목표
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">목표가 없습니다</p>
          <p className="text-sm mt-1">새 목표를 추가해보세요!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(goal => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onEdit={() => { setEditGoal(goal); setShowModal(true); }}
              onDelete={() => deleteGoal(goal.id)}
              onAddMilestone={(title) => addMilestone(goal.id, { title, completed: false })}
              onToggleMilestone={(milestoneId) => toggleMilestone(goal.id, milestoneId)}
              onDeleteMilestone={(milestoneId) => deleteMilestone(goal.id, milestoneId)}
            />
          ))}
        </div>
      )}

      {showModal && (
        <GoalModal
          goal={editGoal}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditGoal(null); }}
        />
      )}
    </div>
  );
}
