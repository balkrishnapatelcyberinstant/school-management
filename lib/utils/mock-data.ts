import type { Teacher, Student, Assessment, Class, Subject } from '../api/types';

/**
 * Mock Teachers Data
 */
export const mockTeachers: Teacher[] = [
  {
    _id: '1',
    instituteId: 'inst1',
    teacherId: 'TCH001',
    firstName: 'Rajesh',
    lastName: 'Kumar',
    email: 'rajesh.kumar@vidhyakendra.com',
    phone: '+91-9876543210',
    dateOfBirth: '1985-05-15',
    gender: 'Male',
    qualification: 'M.Sc. Mathematics, B.Ed',
    experience: 10,
    joiningDate: '2015-06-01',
    subjects: ['Mathematics', 'Physics'],
    classes: ['Class 10', 'Class 12'],
    employmentType: 'full-time',
    status: 'active',
    address: {
      street: '123 MG Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      country: 'India',
    },
    createdAt: '2015-06-01T00:00:00Z',
    updatedAt: '2024-01-26T00:00:00Z',
  },
  {
    _id: '2',
    instituteId: 'inst1',
    teacherId: 'TCH002',
    firstName: 'Priya',
    lastName: 'Sharma',
    email: 'priya.sharma@vidhyakendra.com',
    phone: '+91-9876543211',
    dateOfBirth: '1990-08-22',
    gender: 'Female',
    qualification: 'M.A. English, B.Ed',
    experience: 7,
    joiningDate: '2018-07-15',
    subjects: ['English', 'Hindi'],
    classes: ['Class 8', 'Class 9', 'Class 10'],
    employmentType: 'full-time',
    status: 'active',
    address: {
      street: '456 Park Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400002',
      country: 'India',
    },
    createdAt: '2018-07-15T00:00:00Z',
    updatedAt: '2024-01-26T00:00:00Z',
  },
];

/**
 * Mock Students Data
 */
export const mockStudents: Student[] = [
  {
    _id: 's1',
    instituteId: 'inst1',
    admissionNumber: 'ADM2024001',
    rollNumber: '001',
    firstName: 'Amit',
    lastName: 'Patel',
    email: 'amit.patel@student.com',
    phone: '+91-9876543220',
    dateOfBirth: '2010-03-15',
    gender: 'Male',
    bloodGroup: 'O+',
    classId: 'class10',
    className: 'Class 10',
    sectionId: 'sec10a',
    sectionName: 'A',
    admissionDate: '2024-04-01',
    status: 'active',
    address: {
      street: '789 Station Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400003',
      country: 'India',
    },
    guardians: [
      {
        name: 'Suresh Patel',
        relation: 'Father',
        phone: '+91-9876543230',
        email: 'suresh.patel@gmail.com',
        occupation: 'Business',
      },
    ],
    createdAt: '2024-04-01T00:00:00Z',
    updatedAt: '2024-01-26T00:00:00Z',
  },
  {
    _id: 's2',
    instituteId: 'inst1',
    admissionNumber: 'ADM2024002',
    rollNumber: '002',
    firstName: 'Sneha',
    lastName: 'Desai',
    email: 'sneha.desai@student.com',
    phone: '+91-9876543221',
    dateOfBirth: '2010-07-22',
    gender: 'Female',
    bloodGroup: 'A+',
    classId: 'class10',
    className: 'Class 10',
    sectionId: 'sec10a',
    sectionName: 'A',
    admissionDate: '2024-04-01',
    status: 'active',
    address: {
      street: '321 Hill Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400004',
      country: 'India',
    },
    guardians: [
      {
        name: 'Ramesh Desai',
        relation: 'Father',
        phone: '+91-9876543231',
        email: 'ramesh.desai@gmail.com',
        occupation: 'Engineer',
      },
    ],
    createdAt: '2024-04-01T00:00:00Z',
    updatedAt: '2024-01-26T00:00:00Z',
  },
];

/**
 * Mock Assessments Data
 */
export const mockAssessments: Assessment[] = [
  {
    _id: 'asmt1',
    instituteId: 'inst1',
    title: 'Mathematics - Chapter 5 Test',
    description: 'Test on Quadratic Equations',
    classId: 'class10',
    className: 'Class 10',
    subjectId: 'math',
    subjectName: 'Mathematics',
    teacherId: '1',
    teacherName: 'Rajesh Kumar',
    type: 'mcq',
    duration: 45,
    totalMarks: 50,
    passingMarks: 20,
    questions: [
      {
        question: 'What is the standard form of a quadratic equation?',
        type: 'mcq',
        options: ['ax² + bx + c = 0', 'ax + b = 0', 'ax³ + bx² + c = 0', 'None'],
        correctAnswer: 0,
        marks: 2,
      },
      {
        question: 'Solve: x² - 5x + 6 = 0',
        type: 'short',
        correctAnswer: 'x = 2, 3',
        marks: 3,
      },
    ],
    status: 'published',
    publishedAt: '2024-01-20T00:00:00Z',
    dueDate: '2024-02-01T00:00:00Z',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
  },
];

/**
 * Mock Classes Data
 */
export const mockClasses = [
  {
    _id: 'class10',
    name: 'Class 10',
    section: 'A',
    academicYear: '2024-25',
    students: 35,
    subjects: ['Mathematics', 'Science', 'English', 'Hindi', 'Social Science'],
  },
  {
    _id: 'class9',
    name: 'Class 9',
    section: 'A',
    academicYear: '2024-25',
    students: 40,
    subjects: ['Mathematics', 'Science', 'English', 'Hindi', 'Social Science'],
  },
];

/**
 * Mock Dashboard Stats
 */
export const mockDashboardStats = {
  totalStudents: 350,
  totalTeachers: 25,
  totalClasses: 12,
  attendanceToday: 92,
  upcomingEvents: 3,
  pendingAssessments: 5,
};

/**
 * Get mock data with delay to simulate API call
 */
export function getMockData<T>(data: T, delay = 500): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
}
