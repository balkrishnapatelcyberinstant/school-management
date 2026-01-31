'use client';

import { useApi, useMutation } from './use-api';
import { studentService } from '../api/services';
import type { Student, CreateStudentRequest, UpdateStudentRequest } from '../api/types';

export function useStudents() {
  return useApi<Student[]>(
    'students',
    () => studentService.getAll()
  );
}

export function useStudent(id: string | null) {
  return useApi<Student>(
    id ? `student-${id}` : null,
    () => studentService.getById(id!)
  );
}

export function useStudentsByClass(classId: string | null) {
  return useApi<Student[]>(
    classId ? `students-class-${classId}` : null,
    () => studentService.getByClass(classId!)
  );
}

export function useCreateStudent() {
  const { mutate, isLoading, error } = useMutation<Student, CreateStudentRequest>();

  const createStudent = mutate(async (data) => {
    return studentService.create(data);
  });

  return { createStudent, isLoading, error };
}

export function useUpdateStudent() {
  const { mutate, isLoading, error } = useMutation<Student, { id: string; data: UpdateStudentRequest }>();

  const updateStudent = mutate(async ({ id, data }) => {
    return studentService.update(id, data);
  });

  return { updateStudent, isLoading, error };
}

export function useDeleteStudent() {
  const { mutate, isLoading, error } = useMutation<void, string>();

  const deleteStudent = mutate(async (id) => {
    return studentService.delete(id);
  });

  return { deleteStudent, isLoading, error };
}
