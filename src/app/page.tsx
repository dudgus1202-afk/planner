'use client';
import { useTodos } from '@/hooks/useTodos';
import { useEvents } from '@/hooks/useEvents';
import { useGoals } from '@/hooks/useGoals';
import StatsCard from '@/components/dashboard/StatsCard';
import TodaySchedule from '@/components/dashboard/TodaySchedule';
import Header from '@/components/layout/Header';
import { CheckSquare, Calendar, Target, TrendingUp } from 'lucide-react';
import { format, isAfter, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function DashboardPage() {
  const { todos } = useTodos();
  const { events } = useEvents();
  const { goals } = useGoals();

  const completedTodos = todos.filter(t => t.completed).length;
  const today = format(new Date(), 'yyyy-MM-dd');
  const upcomingEvents = events.filter(e => e.date >= today).length;
  const activeGoals = goals.filter(g => {
    if (!g.targetDate) return true;
    return isAfter(parseISO(g.targetDate), new Date());
  }).length;

  const overdueTodos = todos.filter(t => !t.completed && t.dueDate && t.dueDate < today);
  const upcomingTodos = todos
    .filter(t => !t.completed && t.dueDate && t.dueDate >= today)
    .sort((a, b) => (a.dueDate || '').localeCompare(b.dueDate || ''))
    .slice(0, 5);

  const priorityColor: Record<string, string> = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-green-100 text-green-700',
  };
  const priorityLabel: Record<string, string> = {
    high: '높음',
    medium: '보통',
    low: '낮음',
  };

  return (
    <div>
      <Header
        title="대시보드"
        subtitle={format(new Date(), 'yyyy년 MM월 dd일 EEEE', { locale: ko })}
      />
      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="완료된 할 일"
            value={completedTodos}
            subtitle={`전체 ${todos.length}개 중`}
            icon={<CheckSquare size={22} className="text-white" />}
            color="bg-indigo-500"
          />
          <StatsCard
            title="다가오는 일정"
            value={upcomingEvents}
            subtitle="오늘 포함"
            icon={<Calendar size={22} className="text-white" />}
            color="bg-purple-500"
          />
          <StatsCard
            title="진행 중인 목표"
            value={activeGoals}
            subtitle={`전체 ${goals.length}개`}
            icon={<Target size={22} className="text-white" />}
            color="bg-pink-500"
          />
          <StatsCard
            title="기한 초과"
            value={overdueTodos.length}
            subtitle="미완료 할 일"
            icon={<TrendingUp size={22} className="text-white" />}
            color="bg-orange-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Schedule */}
          <TodaySchedule events={events} />

          {/* Upcoming todos */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CheckSquare size={18} className="text-indigo-600" />
              다가오는 할 일
            </h3>
            {upcomingTodos.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-4">예정된 할 일이 없습니다</p>
            ) : (
              <div className="space-y-2">
                {upcomingTodos.map(todo => (
                  <div key={todo.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColor[todo.priority]}`}>
                      {priorityLabel[todo.priority]}
                    </span>
                    <span className="text-sm text-gray-800 flex-1">{todo.title}</span>
                    {todo.dueDate && (
                      <span className="text-xs text-gray-400">{todo.dueDate}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Goals Progress */}
        {goals.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Target size={18} className="text-indigo-600" />
              목표 진행 상황
            </h3>
            <div className="space-y-4">
              {goals.slice(0, 4).map(goal => {
                const total = goal.milestones.length;
                const done = goal.milestones.filter(m => m.completed).length;
                const pct = total === 0 ? 0 : Math.round((done / total) * 100);
                return (
                  <div key={goal.id}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-800">{goal.title}</span>
                      <span className="text-sm text-gray-500">{pct}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
