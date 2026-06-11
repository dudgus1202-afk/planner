import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color: 'indigo' | 'green' | 'yellow' | 'red' | 'purple';
  trend?: { value: number; label: string };
}

const colorMap = {
  indigo: {
    bg: 'bg-indigo-50',
    icon: 'bg-indigo-500',
    text: 'text-indigo-600',
  },
  green: {
    bg: 'bg-green-50',
    icon: 'bg-green-500',
    text: 'text-green-600',
  },
  yellow: {
    bg: 'bg-yellow-50',
    icon: 'bg-yellow-500',
    text: 'text-yellow-600',
  },
  red: {
    bg: 'bg-red-50',
    icon: 'bg-red-500',
    text: 'text-red-600',
  },
  purple: {
    bg: 'bg-purple-50',
    icon: 'bg-purple-500',
    text: 'text-purple-600',
  },
};

export function StatsCard({ title, value, subtitle, icon: Icon, color }: StatsCardProps) {
  const colors = colorMap[color];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center', colors.icon)}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}
