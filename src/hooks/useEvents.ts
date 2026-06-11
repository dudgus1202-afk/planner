'use client';

import { useState, useEffect, useCallback } from 'react';
import { CalendarEvent } from '@/types';

const STORAGE_KEY = 'smart-planner-events';

export function useEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setEvents(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load events', e);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    }
  }, [events, loaded]);

  const addEvent = useCallback((event: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...event,
      id: crypto.randomUUID(),
    };
    setEvents(prev => [newEvent, ...prev]);
    return newEvent;
  }, []);

  const updateEvent = useCallback((id: string, updates: Partial<CalendarEvent>) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  }, []);

  const deleteEvent = useCallback((id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  }, []);

  return { events, addEvent, updateEvent, deleteEvent };
}
