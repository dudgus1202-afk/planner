export interface Todo {
  id: string;
  title: string;
  description?: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  dueDate?: string;
  completed: boolean;
  createdAt: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: string; // YYYY-MM-DD
  startTime?: string; // HH:mm
  endTime?: string; // HH:mm
  color: string;
  allDay: boolean;
}

export interface Goal {
  id: string;
  title: string;
  description?: string;
  category: string;
  targetDate?: string;
  milestones: Milestone[];
  createdAt: string;
}

export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
}
