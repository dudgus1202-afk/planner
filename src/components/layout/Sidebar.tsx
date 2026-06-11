'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, CheckSquare, Calendar, Target, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: '대시보드', icon: LayoutDashboard },
  { href: '/todos', label: '할 일', icon: CheckSquare },
  { href: '/calendar', label: '캘린더', icon: Calendar },
  { href: '/goals', label: '목표', icon: Target },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 bg-[#1e1b4b] flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-tight">스마트</h1>
            <p className="text-indigo-300 text-xs">플래너</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group',
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50'
                  : 'text-indigo-200 hover:bg-white/10 hover:text-white'
              )}
            >
              <Icon className={cn('w-5 h-5', isActive ? 'text-white' : 'text-indigo-300 group-hover:text-white')} />
              <span className="font-medium">{label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">U</span>
          </div>
          <div>
            <p className="text-white text-sm font-medium">사용자</p>
            <p className="text-indigo-300 text-xs">내 플래너</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
