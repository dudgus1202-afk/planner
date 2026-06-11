'use client';
import { CalendarEvent } from '@/types';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Plus } from 'lucide-react';

interface DayViewProps {
  date: string;
  events: CalendarEvent[];
  onAddEvent: () => void;
  onEventClick: (event: CalendarEvent) => void;
}

export default function DayView({ date, events, onAddEvent, onEventClick }: DayViewProps) {
  const dayEvents = events
    .filter(e => e.date === date)
    .sort((a, b) => (a.startTime || '00:00').localeCompare(b.startTime || '00:00'));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">
          {format(parseISO(date), 'MM월 dd일 EEEE', { locale: ko })}
        </h3>
        <button
          onClick={onAddEvent}
          className="flex items-center gap-1 text-xs px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus size={12} />
          일정 추가
        </button>
      </div>
      {dayEvents.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-6">이 날 일정이 없습니다</p>
      ) : (
        <div className="space-y-2">
          {dayEvents.map(event => (
            <div
              key={event.id}
              onClick={() => onEventClick(event)}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div
                className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                style={{ backgroundColor: event.color }}
              />
              <div className="flex-1">
                <p className="font-medium text-gray-800 text-sm">{event.title}</p>
                {!event.allDay && event.startTime && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {event.startTime}{event.endTime ? ` - ${event.endTime}` : ''}
                  </p>
                )}
                {event.allDay && (
                  <p className="text-xs text-gray-400 mt-0.5">하루 종일</p>
                )}
                {event.description && (
                  <p className="text-xs text-gray-400 mt-1">{event.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
