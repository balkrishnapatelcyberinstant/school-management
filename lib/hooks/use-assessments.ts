'use client';

import { useApi, useMutation } from './use-api';
import { assessmentService } from '../api/services';
import type { Assessment, CreateAssessmentRequest, UpdateAssessmentRequest, AssessmentSubmission } from '../api/types';

export function useAssessments() {
  return useApi<Assessment[]>(
    'assessments',
    () => assessmentService.getAll()
  );
}

export function useAssessment(id: string | null) {
  return useApi<Assessment>(
    id ? `assessment-${id}` : null,
    () => assessmentService.getById(id!)
  );
}

export function useAssessmentsByClass(classId: string | null) {
  return useApi<Assessment[]>(
    classId ? `assessments-class-${classId}` : null,
    () => assessmentService.getByClass(classId!)
  );
}

export function useCreateAssessment() {
  const { mutate, isLoading, error } = useMutation<Assessment, CreateAssessmentRequest>();

  const createAssessment = mutate(async (data) => {
    return assessmentService.create(data);
  });

  return { createAssessment, isLoading, error };
}

export function useUpdateAssessment() {
  const { mutate, isLoading, error } = useMutation<Assessment, { id: string; data: UpdateAssessmentRequest }>();

  const updateAssessment = mutate(async ({ id, data }) => {
    return assessmentService.update(id, data);
  });

  return { updateAssessment, isLoading, error };
}

export function useDeleteAssessment() {
  const { mutate, isLoading, error } = useMutation<void, string>();

  const deleteAssessment = mutate(async (id) => {
    return assessmentService.delete(id);
  });

  return { deleteAssessment, isLoading, error };
}

export function usePublishAssessment() {
  const { mutate, isLoading, error } = useMutation<Assessment, string>();

  const publishAssessment = mutate(async (id) => {
    return assessmentService.publish(id);
  });

  return { publishAssessment, isLoading, error };
}
