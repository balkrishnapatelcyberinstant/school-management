import mongoose, { Schema, Document } from 'mongoose';

// Subjects Master
export interface ISubject extends Document {
  institute_id: mongoose.Types.ObjectId;
  subject_name: string;
  subject_code?: string;
  subject_type: 'school' | 'coaching' | 'both';
  class_levels?: string[];
  stream?: 'science' | 'commerce' | 'arts';
  exam_type?: string[];
  description?: string;
  status: 'active' | 'inactive' | 'archived';
  created_at: Date;
  updated_at: Date;
}

const SubjectSchema = new Schema<ISubject>({
  institute_id: { type: Schema.Types.ObjectId, ref: 'Institute', required: true },
  subject_name: { type: String, required: true },
  subject_code: { type: String },
  subject_type: { type: String, enum: ['school', 'coaching', 'both'], required: true },
  class_levels: [{ type: String }],
  stream: { type: String, enum: ['science', 'commerce', 'arts'] },
  exam_type: [{ type: String }],
  description: { type: String },
  status: { type: String, enum: ['active', 'inactive', 'archived'], required: true, default: 'active' },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

SubjectSchema.index({ institute_id: 1, subject_name: 1 });

// Teacher Subjects (Junction Table)
export interface ITeacherSubject extends Document {
  teacher_id: mongoose.Types.ObjectId;
  subject_id: mongoose.Types.ObjectId;
  is_primary: boolean;
  created_at: Date;
  updated_at: Date;
}

const TeacherSubjectSchema = new Schema<ITeacherSubject>({
  teacher_id: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  subject_id: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
  is_primary: { type: Boolean, default: false },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

TeacherSubjectSchema.index({ teacher_id: 1, subject_id: 1 }, { unique: true });

// Classes Master (for both school and coaching)
export interface IClass extends Document {
  institute_id: mongoose.Types.ObjectId;
  class_name: string;
  class_type: 'school' | 'coaching';
  class_level?: string;
  stream?: 'science' | 'commerce' | 'arts';
  academic_year: string;
  status: 'active' | 'inactive' | 'archived';
  created_at: Date;
  updated_at: Date;
}

const ClassSchema = new Schema<IClass>({
  institute_id: { type: Schema.Types.ObjectId, ref: 'Institute', required: true },
  class_name: { type: String, required: true },
  class_type: { type: String, enum: ['school', 'coaching'], required: true },
  class_level: { type: String },
  stream: { type: String, enum: ['science', 'commerce', 'arts'] },
  academic_year: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive', 'archived'], required: true, default: 'active' },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

ClassSchema.index({ institute_id: 1, class_name: 1, academic_year: 1 });

// Sections (for schools)
export interface ISection extends Document {
  class_id: mongoose.Types.ObjectId;
  section_name: string;
  class_teacher_id?: mongoose.Types.ObjectId;
  max_students?: number;
  status: 'active' | 'inactive';
  created_at: Date;
  updated_at: Date;
}

const SectionSchema = new Schema<ISection>({
  class_id: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
  section_name: { type: String, required: true },
  class_teacher_id: { type: Schema.Types.ObjectId, ref: 'Teacher' },
  max_students: { type: Number },
  status: { type: String, enum: ['active', 'inactive'], required: true, default: 'active' },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

SectionSchema.index({ class_id: 1, section_name: 1 }, { unique: true });

// Batches (for coaching)
export interface IBatch extends Document {
  institute_id: mongoose.Types.ObjectId;
  class_id?: mongoose.Types.ObjectId;
  batch_name: string;
  batch_code?: string;
  batch_type: 'regular' | 'crash_course' | 'weekend' | 'online';
  start_date: Date;
  end_date?: Date;
  max_students?: number;
  faculty_ids?: mongoose.Types.ObjectId[];
  status: 'active' | 'completed' | 'cancelled';
  created_at: Date;
  updated_at: Date;
}

const BatchSchema = new Schema<IBatch>({
  institute_id: { type: Schema.Types.ObjectId, ref: 'Institute', required: true },
  class_id: { type: Schema.Types.ObjectId, ref: 'Class' },
  batch_name: { type: String, required: true },
  batch_code: { type: String },
  batch_type: { type: String, enum: ['regular', 'crash_course', 'weekend', 'online'], required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date },
  max_students: { type: Number },
  faculty_ids: [{ type: Schema.Types.ObjectId, ref: 'Teacher' }],
  status: { type: String, enum: ['active', 'completed', 'cancelled'], required: true, default: 'active' },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

BatchSchema.index({ institute_id: 1, batch_code: 1 }, { unique: true, sparse: true });

export const Subject = mongoose.models.Subject || mongoose.model<ISubject>('Subject', SubjectSchema);
export const TeacherSubject = mongoose.models.TeacherSubject || mongoose.model<ITeacherSubject>('TeacherSubject', TeacherSubjectSchema);
export const Class = mongoose.models.Class || mongoose.model<IClass>('Class', ClassSchema);
export const Section = mongoose.models.Section || mongoose.model<ISection>('Section', SectionSchema);
export const Batch = mongoose.models.Batch || mongoose.model<IBatch>('Batch', BatchSchema);
