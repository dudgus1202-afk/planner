'use client';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Bell, Search } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const today = new Date();

  return (
    <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="검색..."
            className="pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-48"
          />
        </div>
        <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full" />
        </button>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-700">
            {format(today, 'M월 d일', { locale: ko })}
          </p>
          <p className="text-xs text-gray-400">
            {format(today, 'EEEE', { locale: ko })}
          </p>
        </div>
      </div>
    </header>
  );
}
