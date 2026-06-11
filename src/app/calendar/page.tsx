'use client';
import { useState } from 'react';
import { useEvents } from '@/hooks/useEvents';
import Header from '@/components/layout/Header';
import MonthCalendar from '@/components/calendar/MonthCalendar';
import DayView from '@/components/calendar/DayView';
import EventModal from '@/components/calendar/EventModal';
import { CalendarEvent } from '@/types';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { format, addMonths, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function CalendarPage() {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [showModal, setShowModal] = useState(false);
  const [editEvent, setEditEvent] = useState<CalendarEvent | null>(null);
  const [defaultDate, setDefaultDate] = useState('');

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  const handleAddEvent = (date?: string) => {
    setEditEvent(null);
    setDefaultDate(date || selectedDate);
    setShowModal(true);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setEditEvent(event);
    setShowModal(true);
  };

  const handleSave = (data: Omit<CalendarEvent, 'id'>) => {
    if (editEvent) {
      updateEvent(editEvent.id, data);
    } else {
      addEvent(data);
    }
  };

  return (
    <div>
      <Header
        title="일정 관리"
        subtitle="월간 캘린더로 일정을 확인하세요"
        action={
          <button
            onClick={() => handleAddEvent()}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus size={16} />
            새 일정
          </button>
        }
      />
      <div className="p-6 space-y-6">
        {/* Month Navigation */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentDate(d => subMonths(d, 1))}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-lg font-semibold text-gray-900 min-w-32 text-center">
            {format(currentDate, 'yyyy년 MM월', { locale: ko })}
          </h2>
          <button
            onClick={() => setCurrentDate(d => addMonths(d, 1))}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="text-sm px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600"
          >
            오늘
          </button>
        </div>

        <MonthCalendar
          currentDate={currentDate}
          events={events}
          onDateClick={handleDateClick}
          onEventClick={handleEventClick}
        />

        <DayView
          date={selectedDate}
          events={events}
          onAddEvent={() => handleAddEvent(selectedDate)}
          onEventClick={handleEventClick}
        />
      </div>

      {showModal && (
        <EventModal
          event={editEvent}
          defaultDate={defaultDate}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditEvent(null); }}
          onDelete={editEvent ? () => deleteEvent(editEvent.id) : undefined}
        />
      )}
    </div>
  );
}
