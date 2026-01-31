import mongoose, { Schema, Document } from 'mongoose';

// Assessments (MCQ & Short Answer Tests)
export interface IAssessment extends Document {
  institute_id: mongoose.Types.ObjectId;
  teacher_id: mongoose.Types.ObjectId;
  title: string;
  class_id: mongoose.Types.ObjectId;
  subject_id: mongoose.Types.ObjectId;
  assessment_type: 'mcq' | 'short_answer' | 'mixed';
  duration_minutes: number;
  total_marks: number;
  instructions?: string;
  scheduled_date?: Date;
  deadline?: Date;
  status: 'draft' | 'published' | 'ongoing' | 'completed' | 'archived';
  created_at: Date;
  updated_at: Date;
}

const AssessmentSchema = new Schema<IAssessment>({
  institute_id: { type: Schema.Types.ObjectId, ref: 'Institute', required: true },
  teacher_id: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  title: { type: String, required: true },
  class_id: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
  subject_id: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
  assessment_type: { type: String, enum: ['mcq', 'short_answer', 'mixed'], required: true },
  duration_minutes: { type: Number, required: true },
  total_marks: { type: Number, required: true },
  instructions: { type: String },
  scheduled_date: { type: Date },
  deadline: { type: Date },
  status: { type: String, enum: ['draft', 'published', 'ongoing', 'completed', 'archived'], required: true, default: 'draft' },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

AssessmentSchema.index({ institute_id: 1, class_id: 1 });
AssessmentSchema.index({ teacher_id: 1 });

// Assessment Questions
export interface IAssessmentQuestion extends Document {
  assessment_id: mongoose.Types.ObjectId;
  question_number: number;
  question_text: string;
  question_type: 'mcq' | 'short_answer';
  options?: string[];
  correct_answer?: number | string;
  marks: number;
  explanation?: string;
  created_at: Date;
  updated_at: Date;
}

const AssessmentQuestionSchema = new Schema<IAssessmentQuestion>({
  assessment_id: { type: Schema.Types.ObjectId, ref: 'Assessment', required: true },
  question_number: { type: Number, required: true },
  question_text: { type: String, required: true },
  question_type: { type: String, enum: ['mcq', 'short_answer'], required: true },
  options: [{ type: String }],
  correct_answer: { type: Schema.Types.Mixed },
  marks: { type: Number, required: true },
  explanation: { type: String },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

AssessmentQuestionSchema.index({ assessment_id: 1, question_number: 1 }, { unique: true });

// Student Assessment Attempts
export interface IStudentAssessmentAttempt extends Document {
  assessment_id: mongoose.Types.ObjectId;
  student_id: mongoose.Types.ObjectId;
  started_at: Date;
  submitted_at?: Date;
  time_taken_minutes?: number;
  status: 'in_progress' | 'submitted' | 'evaluated' | 'expired';
  total_score?: number;
  percentage?: number;
  created_at: Date;
  updated_at: Date;
}

const StudentAssessmentAttemptSchema = new Schema<IStudentAssessmentAttempt>({
  assessment_id: { type: Schema.Types.ObjectId, ref: 'Assessment', required: true },
  student_id: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  started_at: { type: Date, required: true },
  submitted_at: { type: Date },
  time_taken_minutes: { type: Number },
  status: { type: String, enum: ['in_progress', 'submitted', 'evaluated', 'expired'], required: true, default: 'in_progress' },
  total_score: { type: Number },
  percentage: { type: Number },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

StudentAssessmentAttemptSchema.index({ assessment_id: 1, student_id: 1 });

// Student Answers
export interface IStudentAnswer extends Document {
  attempt_id: mongoose.Types.ObjectId;
  question_id: mongoose.Types.ObjectId;
  answer: number | string;
  is_correct?: boolean;
  marks_awarded?: number;
  created_at: Date;
  updated_at: Date;
}

const StudentAnswerSchema = new Schema<IStudentAnswer>({
  attempt_id: { type: Schema.Types.ObjectId, ref: 'StudentAssessmentAttempt', required: true },
  question_id: { type: Schema.Types.ObjectId, ref: 'AssessmentQuestion', required: true },
  answer: { type: Schema.Types.Mixed, required: true },
  is_correct: { type: Boolean },
  marks_awarded: { type: Number },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

StudentAnswerSchema.index({ attempt_id: 1, question_id: 1 }, { unique: true });

// Homework
export interface IHomework extends Document {
  institute_id: mongoose.Types.ObjectId;
  teacher_id: mongoose.Types.ObjectId;
  class_id: mongoose.Types.ObjectId;
  subject_id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  assigned_date: Date;
  due_date: Date;
  attachment_urls?: string[];
  max_marks?: number;
  status: 'active' | 'expired' | 'archived';
  created_at: Date;
  updated_at: Date;
}

const HomeworkSchema = new Schema<IHomework>({
  institute_id: { type: Schema.Types.ObjectId, ref: 'Institute', required: true },
  teacher_id: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  class_id: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
  subject_id: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  assigned_date: { type: Date, required: true },
  due_date: { type: Date, required: true },
  attachment_urls: [{ type: String }],
  max_marks: { type: Number },
  status: { type: String, enum: ['active', 'expired', 'archived'], required: true, default: 'active' },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

HomeworkSchema.index({ institute_id: 1, class_id: 1 });

// Student Homework Submissions
export interface IStudentHomeworkSubmission extends Document {
  homework_id: mongoose.Types.ObjectId;
  student_id: mongoose.Types.ObjectId;
  submission_text?: string;
  attachment_urls?: string[];
  submitted_at: Date;
  marks_obtained?: number;
  feedback?: string;
  status: 'submitted' | 'evaluated' | 'late_submission';
  created_at: Date;
  updated_at: Date;
}

const StudentHomeworkSubmissionSchema = new Schema<IStudentHomeworkSubmission>({
  homework_id: { type: Schema.Types.ObjectId, ref: 'Homework', required: true },
  student_id: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  submission_text: { type: String },
  attachment_urls: [{ type: String }],
  submitted_at: { type: Date, required: true },
  marks_obtained: { type: Number },
  feedback: { type: String },
  status: { type: String, enum: ['submitted', 'evaluated', 'late_submission'], required: true, default: 'submitted' },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

StudentHomeworkSubmissionSchema.index({ homework_id: 1, student_id: 1 }, { unique: true });

// Notices
export interface INotice extends Document {
  institute_id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  notice_type: 'general' | 'urgent' | 'event' | 'holiday' | 'exam';
  target_audience: 'all' | 'students' | 'teachers' | 'parents';
  class_ids?: mongoose.Types.ObjectId[];
  attachment_urls?: string[];
  published_date: Date;
  expiry_date?: Date;
  status: 'active' | 'expired' | 'archived';
  created_by: mongoose.Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

const NoticeSchema = new Schema<INotice>({
  institute_id: { type: Schema.Types.ObjectId, ref: 'Institute', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  notice_type: { type: String, enum: ['general', 'urgent', 'event', 'holiday', 'exam'], required: true },
  target_audience: { type: String, enum: ['all', 'students', 'teachers', 'parents'], required: true },
  class_ids: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
  attachment_urls: [{ type: String }],
  published_date: { type: Date, required: true },
  expiry_date: { type: Date },
  status: { type: String, enum: ['active', 'expired', 'archived'], required: true, default: 'active' },
  created_by: { type: Schema.Types.ObjectId, ref: 'InstituteAdmin', required: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

NoticeSchema.index({ institute_id: 1, published_date: -1 });

export const Assessment = mongoose.models.Assessment || mongoose.model<IAssessment>('Assessment', AssessmentSchema);
export const AssessmentQuestion = mongoose.models.AssessmentQuestion || mongoose.model<IAssessmentQuestion>('AssessmentQuestion', AssessmentQuestionSchema);
export const StudentAssessmentAttempt = mongoose.models.StudentAssessmentAttempt || mongoose.model<IStudentAssessmentAttempt>('StudentAssessmentAttempt', StudentAssessmentAttemptSchema);
export const StudentAnswer = mongoose.models.StudentAnswer || mongoose.model<IStudentAnswer>('StudentAnswer', StudentAnswerSchema);
export const Homework = mongoose.models.Homework || mongoose.model<IHomework>('Homework', HomeworkSchema);
export const StudentHomeworkSubmission = mongoose.models.StudentHomeworkSubmission || mongoose.model<IStudentHomeworkSubmission>('StudentHomeworkSubmission', StudentHomeworkSubmissionSchema);
export const Notice = mongoose.models.Notice || mongoose.model<INotice>('Notice', NoticeSchema);
