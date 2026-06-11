'use client';

import { useState, useEffect, useCallback } from 'react';
import { Goal, Milestone } from '@/types';

const STORAGE_KEY = 'smart-planner-goals';

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setGoals(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load goals', e);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
    }
  }, [goals, loaded]);

  const addGoal = useCallback((goal: Omit<Goal, 'id' | 'createdAt'>) => {
    const newGoal: Goal = {
      ...goal,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setGoals(prev => [newGoal, ...prev]);
    return newGoal;
  }, []);

  const updateGoal = useCallback((id: string, updates: Partial<Goal>) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, ...updates } : g));
  }, []);

  const deleteGoal = useCallback((id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  }, []);

  const addMilestone = useCallback((goalId: string, milestone: Omit<Milestone, 'id'>) => {
    const newMilestone: Milestone = {
      ...milestone,
      id: crypto.randomUUID(),
    };
    setGoals(prev => prev.map(g =>
      g.id === goalId
        ? { ...g, milestones: [...g.milestones, newMilestone] }
        : g
    ));
  }, []);

  const toggleMilestone = useCallback((goalId: string, milestoneId: string) => {
    setGoals(prev => prev.map(g =>
      g.id === goalId
        ? {
            ...g,
            milestones: g.milestones.map(m =>
              m.id === milestoneId ? { ...m, completed: !m.completed } : m
            )
          }
        : g
    ));
  }, []);

  const deleteMilestone = useCallback((goalId: string, milestoneId: string) => {
    setGoals(prev => prev.map(g =>
      g.id === goalId
        ? { ...g, milestones: g.milestones.filter(m => m.id !== milestoneId) }
        : g
    ));
  }, []);

  return { goals, addGoal, updateGoal, deleteGoal, addMilestone, toggleMilestone, deleteMilestone };
}
