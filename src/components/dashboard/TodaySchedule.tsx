'use client';
import { CalendarEvent } from '@/types';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Clock } from 'lucide-react';

interface TodayScheduleProps {
  events: CalendarEvent[];
}

export default function TodaySchedule({ events }: TodayScheduleProps) {
  const today = format(new Date(), 'yyyy-MM-dd');
  const todayEvents = events
    .filter(e => e.date === today)
    .sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Clock size={18} className="text-indigo-600" />
        오늘의 일정
      </h3>
      {todayEvents.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-4">오늘 일정이 없습니다</p>
      ) : (
        <div className="space-y-3">
          {todayEvents.map(event => (
            <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
              <div
                className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                style={{ backgroundColor: event.color }}
              />
              <div>
                <p className="font-medium text-gray-800 text-sm">{event.title}</p>
                {event.startTime && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {event.startTime}{event.endTime ? ` - ${event.endTime}` : ''}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
