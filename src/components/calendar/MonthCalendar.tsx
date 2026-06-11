'use client';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isToday } from 'date-fns';
import { CalendarEvent } from '@/types';
import clsx from 'clsx';

interface MonthCalendarProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDateClick: (date: string) => void;
  onEventClick: (event: CalendarEvent) => void;
}

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

export default function MonthCalendar({ currentDate, events, onDateClick, onEventClick }: MonthCalendarProps) {
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });
  const startPad = getDay(start);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="grid grid-cols-7 border-b border-gray-100">
        {DAYS.map(d => (
          <div key={d} className="py-3 text-center text-xs font-semibold text-gray-500">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {Array.from({ length: startPad }).map((_, i) => (
          <div key={`pad-${i}`} className="h-24 border-b border-r border-gray-50" />
        ))}
        {days.map(day => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const dayEvents = events.filter(e => e.date === dateStr);
          const today = isToday(day);
          return (
            <div
              key={dateStr}
              onClick={() => onDateClick(dateStr)}
              className="h-24 border-b border-r border-gray-100 p-1 cursor-pointer hover:bg-indigo-50 transition-colors group"
            >
              <div className={clsx(
                'w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium mb-1 transition-colors',
                today ? 'bg-indigo-600 text-white' : 'text-gray-700 group-hover:bg-indigo-100'
              )}>
                {format(day, 'd')}
              </div>
              <div className="space-y-0.5">
                {dayEvents.slice(0, 2).map(event => (
                  <div
                    key={event.id}
                    onClick={e => { e.stopPropagation(); onEventClick(event); }}
                    className="text-xs px-1 py-0.5 rounded truncate text-white cursor-pointer hover:opacity-80"
                    style={{ backgroundColor: event.color }}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-xs text-gray-400 px-1">+{dayEvents.length - 2}개 더</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
