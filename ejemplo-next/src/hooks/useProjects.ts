'use client';

import { useState, useCallback, useMemo } from 'react';

export interface Project {
  id: number;
  name: string;
  color: string;
  dateCreated: string;
}

export function useProjects(initialProjects: Project[] = []) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  const addProject = useCallback(
    (projectData: Omit<Project, 'id' | 'dateCreated'>) => {
      const newProject: Project = {
        id: Date.now(),
        dateCreated: new Date().toISOString(),
        color: projectData.color || '#3b82f6',
        name: projectData.name,
      };
      setProjects((prev) => [...prev, newProject]);
      return newProject;
    },
    []
  );

  const deleteProject = useCallback(
    (id: number) => {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      if (selectedProjectId === id) setSelectedProjectId(null);
    },
    [selectedProjectId]
  );

  const updateProject = useCallback((id: number, updates: Partial<Project>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  }, []);

  const selectedProject = useMemo(
    () => projects.find((p) => p.id === selectedProjectId) ?? null,
    [projects, selectedProjectId]
  );

  return {
    projects,
    selectedProject,
    selectedProjectId,
    addProject,
    deleteProject,
    updateProject,
    setSelectedProjectId,
  };
}
