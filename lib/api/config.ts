/**
 * API Configuration
 * Central configuration for all API endpoints and settings
 */

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;

/**
 * API Endpoints
 * All API endpoints organized by module
 */
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    REFRESH_TOKEN: '/auth/refresh-token',
    CHANGE_PASSWORD: '/auth/change-password',
    ME: '/auth/me',
  },

  // Onboarding
  ONBOARDING: {
    GET_STEPS: '/onboarding/steps',
    SAVE_STEP: '/onboarding/save',
    COMPLETE: '/onboarding/complete',
    GET_PROGRESS: '/onboarding/progress',
  },

  // Subscription
  SUBSCRIPTION: {
    GET_PLANS: '/subscription/plans',
    GET_CURRENT: '/subscription/current',
    SUBSCRIBE: '/subscription/subscribe',
    CANCEL: '/subscription/cancel',
    UPDATE: '/subscription/update',
    GET_HISTORY: '/subscription/history',
  },

  // Institute
  INSTITUTE: {
    GET: '/institute',
    UPDATE: '/institute',
    GET_SETTINGS: '/institute/settings',
    UPDATE_SETTINGS: '/institute/settings',
    UPLOAD_LOGO: '/institute/logo',
  },

  // Teachers
  TEACHERS: {
    LIST: '/teachers',
    GET: (id: string) => `/teachers/${id}`,
    CREATE: '/teachers',
    UPDATE: (id: string) => `/teachers/${id}`,
    DELETE: (id: string) => `/teachers/${id}`,
    SEARCH: '/teachers/search',
    GET_BY_CLASS: (classId: string) => `/teachers/class/${classId}`,
    GET_BY_SUBJECT: (subjectId: string) => `/teachers/subject/${subjectId}`,
    UPLOAD_DOCUMENT: (id: string) => `/teachers/${id}/documents`,
  },

  // Teacher Attendance
  TEACHER_ATTENDANCE: {
    LIST: '/teachers/attendance',
    GET: (id: string) => `/teachers/attendance/${id}`,
    MARK: '/teachers/attendance/mark',
    UPDATE: (id: string) => `/teachers/attendance/${id}`,
    GET_BY_TEACHER: (teacherId: string) => `/teachers/attendance/teacher/${teacherId}`,
    GET_BY_DATE: (date: string) => `/teachers/attendance/date/${date}`,
    GET_REPORT: '/teachers/attendance/report',
  },

  // Teacher Salary
  SALARY: {
    LIST: '/salary',
    GET: (id: string) => `/salary/${id}`,
    CREATE: '/salary',
    UPDATE: (id: string) => `/salary/${id}`,
    DELETE: (id: string) => `/salary/${id}`,
    GET_BY_TEACHER: (teacherId: string) => `/salary/teacher/${teacherId}`,
    GET_HISTORY: (teacherId: string) => `/salary/teacher/${teacherId}/history`,
    GENERATE_SLIP: (id: string) => `/salary/${id}/slip`,
  },

  // Teacher Leaves
  LEAVES: {
    LIST: '/leaves',
    GET: (id: string) => `/leaves/${id}`,
    CREATE: '/leaves',
    UPDATE: (id: string) => `/leaves/${id}`,
    DELETE: (id: string) => `/leaves/${id}`,
    APPROVE: (id: string) => `/leaves/${id}/approve`,
    REJECT: (id: string) => `/leaves/${id}/reject`,
    GET_BY_TEACHER: (teacherId: string) => `/leaves/teacher/${teacherId}`,
    GET_PENDING: '/leaves/pending',
  },

  // Students
  STUDENTS: {
    LIST: '/students',
    GET: (id: string) => `/students/${id}`,
    CREATE: '/students',
    UPDATE: (id: string) => `/students/${id}`,
    DELETE: (id: string) => `/students/${id}`,
    SEARCH: '/students/search',
    GET_BY_CLASS: (classId: string) => `/students/class/${classId}`,
    GET_BY_SECTION: (sectionId: string) => `/students/section/${sectionId}`,
    UPLOAD_DOCUMENT: (id: string) => `/students/${id}/documents`,
    UPLOAD_PHOTO: (id: string) => `/students/${id}/photo`,
  },

  // Student Attendance
  STUDENT_ATTENDANCE: {
    LIST: '/students/attendance',
    GET: (id: string) => `/students/attendance/${id}`,
    MARK: '/students/attendance/mark',
    MARK_BULK: '/students/attendance/mark-bulk',
    UPDATE: (id: string) => `/students/attendance/${id}`,
    GET_BY_STUDENT: (studentId: string) => `/students/attendance/student/${studentId}`,
    GET_BY_CLASS: (classId: string, date: string) => `/students/attendance/class/${classId}/date/${date}`,
    GET_REPORT: '/students/attendance/report',
  },

  // Classes
  CLASSES: {
    LIST: '/classes',
    GET: (id: string) => `/classes/${id}`,
    CREATE: '/classes',
    UPDATE: (id: string) => `/classes/${id}`,
    DELETE: (id: string) => `/classes/${id}`,
    GET_STUDENTS: (id: string) => `/classes/${id}/students`,
    GET_TEACHERS: (id: string) => `/classes/${id}/teachers`,
    ASSIGN_TEACHER: (id: string) => `/classes/${id}/assign-teacher`,
  },

  // Subjects
  SUBJECTS: {
    LIST: '/subjects',
    GET: (id: string) => `/subjects/${id}`,
    CREATE: '/subjects',
    UPDATE: (id: string) => `/subjects/${id}`,
    DELETE: (id: string) => `/subjects/${id}`,
    GET_BY_CLASS: (classId: string) => `/subjects/class/${classId}`,
  },

  // Sections
  SECTIONS: {
    LIST: '/sections',
    GET: (id: string) => `/sections/${id}`,
    CREATE: '/sections',
    UPDATE: (id: string) => `/sections/${id}`,
    DELETE: (id: string) => `/sections/${id}`,
    GET_BY_CLASS: (classId: string) => `/sections/class/${classId}`,
  },

  // Batches
  BATCHES: {
    LIST: '/batches',
    GET: (id: string) => `/batches/${id}`,
    CREATE: '/batches',
    UPDATE: (id: string) => `/batches/${id}`,
    DELETE: (id: string) => `/batches/${id}`,
  },

  // Timetable
  TIMETABLE: {
    LIST: '/timetable',
    GET: (id: string) => `/timetable/${id}`,
    CREATE: '/timetable',
    UPDATE: (id: string) => `/timetable/${id}`,
    DELETE: (id: string) => `/timetable/${id}`,
    GET_BY_CLASS: (classId: string) => `/timetable/class/${classId}`,
    GET_BY_TEACHER: (teacherId: string) => `/timetable/teacher/${teacherId}`,
  },

  // Assessments
  ASSESSMENTS: {
    LIST: '/assessments',
    GET: (id: string) => `/assessments/${id}`,
    CREATE: '/assessments',
    UPDATE: (id: string) => `/assessments/${id}`,
    DELETE: (id: string) => `/assessments/${id}`,
    PUBLISH: (id: string) => `/assessments/${id}/publish`,
    GET_BY_CLASS: (classId: string) => `/assessments/class/${classId}`,
    GET_RESULTS: (id: string) => `/assessments/${id}/results`,
    SUBMIT: (id: string) => `/assessments/${id}/submit`,
    EVALUATE: (id: string) => `/assessments/${id}/evaluate`,
  },

  // Exams
  EXAMS: {
    LIST: '/exams',
    GET: (id: string) => `/exams/${id}`,
    CREATE: '/exams',
    UPDATE: (id: string) => `/exams/${id}`,
    DELETE: (id: string) => `/exams/${id}`,
    GET_BY_CLASS: (classId: string) => `/exams/class/${classId}`,
  },

  // Marks
  MARKS: {
    LIST: '/marks',
    GET: (id: string) => `/marks/${id}`,
    CREATE: '/marks',
    UPDATE: (id: string) => `/marks/${id}`,
    DELETE: (id: string) => `/marks/${id}`,
    GET_BY_STUDENT: (studentId: string) => `/marks/student/${studentId}`,
    GET_BY_EXAM: (examId: string) => `/marks/exam/${examId}`,
    BULK_UPLOAD: '/marks/bulk-upload',
    GENERATE_REPORT: (studentId: string) => `/marks/student/${studentId}/report`,
  },

  // Homework
  HOMEWORK: {
    LIST: '/homework',
    GET: (id: string) => `/homework/${id}`,
    CREATE: '/homework',
    UPDATE: (id: string) => `/homework/${id}`,
    DELETE: (id: string) => `/homework/${id}`,
    GET_BY_CLASS: (classId: string) => `/homework/class/${classId}`,
    GET_BY_SUBJECT: (subjectId: string) => `/homework/subject/${subjectId}`,
    SUBMIT: (id: string) => `/homework/${id}/submit`,
    EVALUATE: (id: string) => `/homework/${id}/evaluate`,
  },

  // Notices
  NOTICES: {
    LIST: '/notices',
    GET: (id: string) => `/notices/${id}`,
    CREATE: '/notices',
    UPDATE: (id: string) => `/notices/${id}`,
    DELETE: (id: string) => `/notices/${id}`,
    GET_BY_TYPE: (type: string) => `/notices/type/${type}`,
  },

  // Dashboard
  DASHBOARD: {
    TEACHER: '/dashboard/teacher',
    STUDENT: '/dashboard/student',
    ADMIN: '/dashboard/admin',
    STATS: '/dashboard/stats',
  },

  // Reports
  REPORTS: {
    ATTENDANCE: '/reports/attendance',
    PERFORMANCE: '/reports/performance',
    SALARY: '/reports/salary',
    STUDENT_PROGRESS: (studentId: string) => `/reports/student/${studentId}/progress`,
  },

  // Profile
  PROFILE: {
    GET: '/profile',
    UPDATE: '/profile',
    UPLOAD_PHOTO: '/profile/photo',
    CHANGE_PASSWORD: '/profile/change-password',
  },
} as const;

/**
 * HTTP Methods
 */
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

/**
 * Response Status Codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
