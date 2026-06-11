'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, CheckSquare, Calendar, Target } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { href: '/', icon: LayoutDashboard, label: '대시보드' },
  { href: '/todos', icon: CheckSquare, label: '할 일' },
  { href: '/calendar', icon: Calendar, label: '일정' },
  { href: '/goals', icon: Target, label: '목표' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col" style={{ backgroundColor: '#1e1b4b' }}>
      <div className="p-6 border-b border-indigo-800">
        <h1 className="text-white text-xl font-bold">📋 스마트 플래너</h1>
        <p className="text-indigo-300 text-sm mt-1">생산성을 높이세요</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
              pathname === href
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
            )}
          >
            <Icon size={20} />
            <span className="font-medium">{label}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-indigo-800">
        <p className="text-indigo-400 text-xs text-center">Smart Planner v1.0</p>
      </div>
    </aside>
  );
}
