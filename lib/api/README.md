# API Layer Documentation

This directory contains the complete API layer for the School Management System with a clean, organized structure using the Fetch API.

## 📁 Folder Structure

```
lib/api/
├── client.ts                      # Generic API client with fetch
├── config.ts                      # API configuration and endpoints
├── types.ts                       # TypeScript type definitions
├── index.ts                       # Main export file
├── services/                      # API service modules
│   ├── auth.service.ts           # Authentication APIs
│   ├── teacher.service.ts        # Teacher management APIs
│   ├── student.service.ts        # Student management APIs
│   ├── attendance.service.ts     # Attendance APIs (teacher & student)
│   ├── assessment.service.ts     # Assessment & exam APIs
│   ├── class.service.ts          # Class & subject APIs
│   ├── salary-leave.service.ts   # Salary & leave APIs
│   ├── homework-notice.service.ts # Homework & notice APIs
│   ├── dashboard.service.ts      # Dashboard statistics APIs
│   └── index.ts                  # Services export file
└── README.md                      # This file
```

## 🚀 Quick Start

### 1. Configuration

Set your API base URL in environment variables:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

### 2. Basic Usage

```typescript
import { authService, teacherService } from '@/lib/api';

// Login
const loginUser = async () => {
  try {
    const response = await authService.login({
      email: 'user@example.com',
      password: 'password123',
    });
    
    console.log('Logged in:', response.data.user);
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Get all teachers
const getTeachers = async () => {
  try {
    const response = await teacherService.getAll({
      page: 1,
      limit: 10,
    });
    
    console.log('Teachers:', response.data);
  } catch (error) {
    console.error('Failed to fetch teachers:', error);
  }
};
```

## 📚 API Services

### Authentication Service

```typescript
import { authService } from '@/lib/api';

// Login
await authService.login({ email, password });

// Register
await authService.register({ name, email, password, role });

// Logout
await authService.logout();

// Forgot password
await authService.forgotPassword(email);

// Reset password
await authService.resetPassword(token, newPassword);

// Change password
await authService.changePassword(oldPassword, newPassword);

// Get current user
await authService.getCurrentUser();
```

### Teacher Service

```typescript
import { teacherService } from '@/lib/api';

// Get all teachers
await teacherService.getAll({ page: 1, limit: 10 });

// Get teacher by ID
await teacherService.getById(teacherId);

// Create teacher
await teacherService.create(teacherData);

// Update teacher
await teacherService.update(teacherId, updatedData);

// Delete teacher
await teacherService.delete(teacherId);

// Search teachers
await teacherService.search('John Doe');

// Get teachers by class
await teacherService.getByClass(classId);

// Upload document
await teacherService.uploadDocument(teacherId, file, 'resume');
```

### Student Service

```typescript
import { studentService } from '@/lib/api';

// Get all students
await studentService.getAll({ page: 1, limit: 10 });

// Get student by ID
await studentService.getById(studentId);

// Create student
await studentService.create(studentData);

// Update student
await studentService.update(studentId, updatedData);

// Delete student
await studentService.delete(studentId);

// Get students by class
await studentService.getByClass(classId);

// Upload photo
await studentService.uploadPhoto(studentId, file);
```

### Attendance Service

```typescript
import { attendanceService } from '@/lib/api';

// Teacher Attendance
await attendanceService.teacher.getAll();
await attendanceService.teacher.mark({ date, attendances });
await attendanceService.teacher.getByTeacher(teacherId);
await attendanceService.teacher.getReport({ startDate, endDate });

// Student Attendance
await attendanceService.student.getAll();
await attendanceService.student.mark({ date, attendances });
await attendanceService.student.markBulk({ classId, date, attendances });
await attendanceService.student.getByStudent(studentId);
await attendanceService.student.getByClass(classId, date);
```

### Assessment Service

```typescript
import { assessmentService } from '@/lib/api';

// Get all assessments
await assessmentService.getAll();

// Get assessment by ID
await assessmentService.getById(assessmentId);

// Create assessment
await assessmentService.create(assessmentData);

// Update assessment
await assessmentService.update(assessmentId, updatedData);

// Publish assessment
await assessmentService.publish(assessmentId);

// Get assessments by class
await assessmentService.getByClass(classId);

// Submit assessment
await assessmentService.submit(assessmentId, { answers });

// Get results
await assessmentService.getResults(assessmentId);
```

### Class & Subject Service

```typescript
import { classService, subjectService } from '@/lib/api';

// Classes
await classService.getAll();
await classService.getById(classId);
await classService.create(classData);
await classService.getStudents(classId);
await classService.assignTeacher(classId, teacherId);

// Subjects
await subjectService.getAll();
await subjectService.getById(subjectId);
await subjectService.create(subjectData);
await subjectService.getByClass(classId);
```

### Salary & Leave Service

```typescript
import { salaryService, leaveService } from '@/lib/api';

// Salary
await salaryService.getAll();
await salaryService.getByTeacher(teacherId);
await salaryService.getHistory(teacherId);
await salaryService.generateSlip(salaryId);

// Leave
await leaveService.getAll();
await leaveService.create(leaveData);
await leaveService.approve(leaveId);
await leaveService.reject(leaveId, remarks);
await leaveService.getPending();
```

### Homework & Notice Service

```typescript
import { homeworkService, noticeService } from '@/lib/api';

// Homework
await homeworkService.getAll();
await homeworkService.getByClass(classId);
await homeworkService.create(homeworkData);
await homeworkService.submit(homeworkId, file);

// Notice
await noticeService.getAll();
await noticeService.getByType('urgent');
await noticeService.create(noticeData);
```

### Dashboard Service

```typescript
import { dashboardService } from '@/lib/api';

// Get dashboard data based on role
await dashboardService.getTeacherDashboard();
await dashboardService.getStudentDashboard();
await dashboardService.getAdminDashboard();
await dashboardService.getStats();
```

## 🔧 API Client Features

### Automatic Token Management

The API client automatically:
- Stores authentication tokens in localStorage
- Adds tokens to request headers
- Redirects to login on 401 errors

### Error Handling

```typescript
try {
  const response = await teacherService.getAll();
  // Handle success
} catch (error) {
  // Error format:
  // {
  //   message: string,
  //   status: number,
  //   error: string,
  //   details?: any
  // }
  console.error(error.message);
}
```

### Retry Logic

The client automatically retries failed requests up to 3 times with a 1-second delay.

### Timeout

Default timeout is 30 seconds. Configure in `config.ts`:

```typescript
export const API_CONFIG = {
  TIMEOUT: 30000, // 30 seconds
};
```

## 📝 TypeScript Types

All API responses are fully typed. Import types from the API:

```typescript
import type { Teacher, Student, Class, ApiResponse } from '@/lib/api';

const teacher: Teacher = {
  _id: '123',
  firstName: 'John',
  lastName: 'Doe',
  // ... other fields
};
```

## 🎯 Best Practices

1. **Always use try-catch blocks** when calling API services
2. **Handle loading states** in your components
3. **Show user feedback** for errors and success
4. **Use TypeScript types** for type safety
5. **Implement proper error boundaries** in your app

## Example Component

```typescript
'use client';

import { useState, useEffect } from 'react';
import { teacherService, type Teacher } from '@/lib/api';

export default function TeacherList() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await teacherService.getAll({ page: 1, limit: 10 });
      setTeachers(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to load teachers');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {teachers.map((teacher) => (
        <div key={teacher._id}>
          {teacher.firstName} {teacher.lastName}
        </div>
      ))}
    </div>
  );
}
```

## 🔐 Environment Variables

Required environment variables:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

## 📦 Dependencies

This API layer uses only native browser Fetch API - no external dependencies required!
