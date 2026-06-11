'use client';
import { Goal } from '@/types';
import { Pencil, Trash2, Plus, Check, X as XIcon, Calendar } from 'lucide-react';
import { useState } from 'react';

interface GoalCardProps {
  goal: Goal;
  onEdit: () => void;
  onDelete: () => void;
  onAddMilestone: (title: string) => void;
  onToggleMilestone: (milestoneId: string) => void;
  onDeleteMilestone: (milestoneId: string) => void;
}

export default function GoalCard({ goal, onEdit, onDelete, onAddMilestone, onToggleMilestone, onDeleteMilestone }: GoalCardProps) {
  const [newMilestone, setNewMilestone] = useState('');
  const [showMilestoneInput, setShowMilestoneInput] = useState(false);

  const total = goal.milestones.length;
  const done = goal.milestones.filter(m => m.completed).length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  const handleAddMilestone = () => {
    if (!newMilestone.trim()) return;
    onAddMilestone(newMilestone.trim());
    setNewMilestone('');
    setShowMilestoneInput(false);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-gray-900">{goal.title}</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-medium">
              {goal.category}
            </span>
          </div>
          {goal.description && (
            <p className="text-sm text-gray-500 mt-1">{goal.description}</p>
          )}
          {goal.targetDate && (
            <div className="flex items-center gap-1 mt-1 text-gray-400">
              <Calendar size={12} />
              <span className="text-xs">목표일: {goal.targetDate}</span>
            </div>
          )}
        </div>
        <div className="flex gap-1 ml-2">
          <button onClick={onEdit} className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
            <Pencil size={14} />
          </button>
          <button onClick={onDelete} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-500">진행률</span>
          <span className="text-xs font-semibold text-indigo-600">{pct}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">{done}/{total} 마일스톤 완료</p>
      </div>

      {/* Milestones */}
      <div className="space-y-1.5">
        {goal.milestones.map(milestone => (
          <div key={milestone.id} className="flex items-center gap-2 group">
            <button
              onClick={() => onToggleMilestone(milestone.id)}
              className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${
                milestone.completed ? 'bg-indigo-500 border-indigo-500' : 'border-gray-300 hover:border-indigo-400'
              }`}
            >
              {milestone.completed && <Check size={10} className="text-white" />}
            </button>
            <span className={`text-sm flex-1 ${milestone.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
              {milestone.title}
            </span>
            <button
              onClick={() => onDeleteMilestone(milestone.id)}
              className="opacity-0 group-hover:opacity-100 p-0.5 text-gray-300 hover:text-red-500 transition-all"
            >
              <XIcon size={12} />
            </button>
          </div>
        ))}

        {showMilestoneInput ? (
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={newMilestone}
              onChange={e => setNewMilestone(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleAddMilestone(); if (e.key === 'Escape') setShowMilestoneInput(false); }}
              className="flex-1 border border-gray-200 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="마일스톤 추가..."
              autoFocus
            />
            <button onClick={handleAddMilestone} className="p-1 text-indigo-600 hover:bg-indigo-50 rounded transition-colors">
              <Check size={14} />
            </button>
            <button onClick={() => setShowMilestoneInput(false)} className="p-1 text-gray-400 hover:bg-gray-50 rounded transition-colors">
              <XIcon size={14} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowMilestoneInput(true)}
            className="flex items-center gap-1 text-xs text-indigo-500 hover:text-indigo-700 mt-1 transition-colors"
          >
            <Plus size={12} />
            마일스톤 추가
          </button>
        )}
      </div>
    </div>
  );
}
