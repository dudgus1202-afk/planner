'use client';

import { CalendarEvent } from '@/types';
import { format } from 'date-fns';
import { Clock } from 'lucide-react';

interface TodayScheduleProps {
  events: CalendarEvent[];
}

export function TodaySchedule({ events }: TodayScheduleProps) {
  const today = format(new Date(), 'yyyy-MM-dd');
  const todayEvents = events
    .filter(e => e.date === today)
    .sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-4">오늘의 일정</h3>
      {todayEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Clock className="w-10 h-10 text-gray-200 mb-3" />
          <p className="text-gray-400 text-sm">오늘 예정된 일정이 없습니다</p>
        </div>
      ) : (
        <div className="space-y-3">
          {todayEvents.map(event => (
            <div key={event.id} className="flex items-start gap-3">
              <div
                className="w-1 h-full min-h-[2.5rem] rounded-full flex-shrink-0 mt-1"
                style={{ backgroundColor: event.color }}
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 text-sm truncate">{event.title}</p>
                {event.startTime && (
                  <p className="text-xs text-gray-400 mt-0.5">
                    {event.startTime}{event.endTime ? ` - ${event.endTime}` : ''}
                  </p>
                )}
                {event.allDay && <p className="text-xs text-gray-400 mt-0.5">하루 종일</p>}
              </div>
              <div
                className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                style={{ backgroundColor: event.color }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
