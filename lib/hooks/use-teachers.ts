'use client';

import { useApi, useMutation } from './use-api';
import { teacherService } from '../api/services';
import type { Teacher, CreateTeacherRequest, UpdateTeacherRequest } from '../api/types';

export function useTeachers() {
  return useApi<Teacher[]>(
    'teachers',
    () => teacherService.getAll()
  );
}

export function useTeacher(id: string | null) {
  return useApi<Teacher>(
    id ? `teacher-${id}` : null,
    () => teacherService.getById(id!)
  );
}

export function useCreateTeacher() {
  const { mutate, isLoading, error } = useMutation<Teacher, CreateTeacherRequest>();

  const createTeacher = mutate(async (data) => {
    return teacherService.create(data);
  });

  return { createTeacher, isLoading, error };
}

export function useUpdateTeacher() {
  const { mutate, isLoading, error } = useMutation<Teacher, { id: string; data: UpdateTeacherRequest }>();

  const updateTeacher = mutate(async ({ id, data }) => {
    return teacherService.update(id, data);
  });

  return { updateTeacher, isLoading, error };
}

export function useDeleteTeacher() {
  const { mutate, isLoading, error } = useMutation<void, string>();

  const deleteTeacher = mutate(async (id) => {
    return teacherService.delete(id);
  });

  return { deleteTeacher, isLoading, error };
}
