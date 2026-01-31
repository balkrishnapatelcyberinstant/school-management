import mongoose, { Schema, Document } from 'mongoose';

// Teacher Salary Structure
export interface ITeacherSalaryStructure extends Document {
  teacher_id: mongoose.Types.ObjectId;
  salary_type: 'fixed_monthly' | 'per_lecture' | 'hourly' | 'percentage' | 'hybrid';
  pay_frequency: 'monthly' | 'weekly' | 'bi_weekly' | 'per_session';
  currency: string;
  basic_salary?: number;
  hra?: number;
  da?: number;
  conveyance_allowance?: number;
  medical_allowance?: number;
  per_lecture_rate?: number;
  hourly_rate?: number;
  revenue_percentage?: number;
  incentive_amount?: number;
  bonus_amount?: number;
  max_lectures_per_month?: number;
  max_hours_per_month?: number;
  pf_applicable: boolean;
  pf_percentage?: number;
  tds_applicable: boolean;
  tds_percentage?: number;
  other_deductions?: Array<{ name: string; amount: number }>;
  effective_from: Date;
  effective_to?: Date;
  approved_by?: mongoose.Types.ObjectId;
  approved_at?: Date;
  remarks?: string;
  status: 'active' | 'inactive' | 'archived';
  archived_at?: Date;
  created_at: Date;
  updated_at: Date;
}

const TeacherSalaryStructureSchema = new Schema<ITeacherSalaryStructure>({
  teacher_id: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  salary_type: { 
    type: String, 
    enum: ['fixed_monthly', 'per_lecture', 'hourly', 'percentage', 'hybrid'], 
    required: true 
  },
  pay_frequency: { 
    type: String, 
    enum: ['monthly', 'weekly', 'bi_weekly', 'per_session'], 
    required: true 
  },
  currency: { type: String, required: true, default: 'INR' },
  basic_salary: { type: Number },
  hra: { type: Number },
  da: { type: Number },
  conveyance_allowance: { type: Number },
  medical_allowance: { type: Number },
  per_lecture_rate: { type: Number },
  hourly_rate: { type: Number },
  revenue_percentage: { type: Number },
  incentive_amount: { type: Number },
  bonus_amount: { type: Number },
  max_lectures_per_month: { type: Number },
  max_hours_per_month: { type: Number },
  pf_applicable: { type: Boolean, default: false },
  pf_percentage: { type: Number },
  tds_applicable: { type: Boolean, default: false },
  tds_percentage: { type: Number },
  other_deductions: [{
    name: { type: String, required: true },
    amount: { type: Number, required: true }
  }],
  effective_from: { type: Date, required: true },
  effective_to: { type: Date },
  approved_by: { type: Schema.Types.ObjectId, ref: 'InstituteAdmin' },
  approved_at: { type: Date },
  remarks: { type: String },
  status: { type: String, enum: ['active', 'inactive', 'archived'], required: true, default: 'active' },
  archived_at: { type: Date },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

TeacherSalaryStructureSchema.index({ teacher_id: 1, effective_from: -1 });

// Teacher Salary Transactions
export interface ITeacherSalaryTransaction extends Document {
  teacher_id: mongoose.Types.ObjectId;
  amount: number;
  payment_month: string;
  payment_date?: Date;
  payment_mode?: 'bank_transfer' | 'upi' | 'cash';
  reference_id?: string;
  status: 'pending' | 'paid' | 'failed';
  created_at: Date;
  updated_at: Date;
}

const TeacherSalaryTransactionSchema = new Schema<ITeacherSalaryTransaction>({
  teacher_id: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  amount: { type: Number, required: true },
  payment_month: { type: String, required: true },
  payment_date: { type: Date },
  payment_mode: { type: String, enum: ['bank_transfer', 'upi', 'cash'] },
  reference_id: { type: String },
  status: { type: String, enum: ['pending', 'paid', 'failed'], required: true, default: 'pending' },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

TeacherSalaryTransactionSchema.index({ teacher_id: 1, payment_month: 1 });

// Teacher Attendance
export interface ITeacherAttendance extends Document {
  teacher_id: mongoose.Types.ObjectId;
  date: Date;
  status: 'present' | 'absent' | 'half_day' | 'leave';
  check_in_time?: Date;
  check_out_time?: Date;
  remarks?: string;
  created_at: Date;
  updated_at: Date;
}

const TeacherAttendanceSchema = new Schema<ITeacherAttendance>({
  teacher_id: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['present', 'absent', 'half_day', 'leave'], required: true },
  check_in_time: { type: Date },
  check_out_time: { type: Date },
  remarks: { type: String },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

TeacherAttendanceSchema.index({ teacher_id: 1, date: 1 }, { unique: true });

// Teacher Leaves
export interface ITeacherLeave extends Document {
  teacher_id: mongoose.Types.ObjectId;
  leave_type: 'casual' | 'sick' | 'paid' | 'unpaid';
  from_date: Date;
  to_date: Date;
  reason?: string;
  status: 'pending' | 'approved' | 'rejected';
  approved_by?: mongoose.Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

const TeacherLeaveSchema = new Schema<ITeacherLeave>({
  teacher_id: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  leave_type: { type: String, enum: ['casual', 'sick', 'paid', 'unpaid'], required: true },
  from_date: { type: Date, required: true },
  to_date: { type: Date, required: true },
  reason: { type: String },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], required: true, default: 'pending' },
  approved_by: { type: Schema.Types.ObjectId, ref: 'InstituteAdmin' },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

TeacherLeaveSchema.index({ teacher_id: 1, from_date: 1 });

export const TeacherSalaryStructure = mongoose.models.TeacherSalaryStructure || mongoose.model<ITeacherSalaryStructure>('TeacherSalaryStructure', TeacherSalaryStructureSchema);
export const TeacherSalaryTransaction = mongoose.models.TeacherSalaryTransaction || mongoose.model<ITeacherSalaryTransaction>('TeacherSalaryTransaction', TeacherSalaryTransactionSchema);
export const TeacherAttendance = mongoose.models.TeacherAttendance || mongoose.model<ITeacherAttendance>('TeacherAttendance', TeacherAttendanceSchema);
export const TeacherLeave = mongoose.models.TeacherLeave || mongoose.model<ITeacherLeave>('TeacherLeave', TeacherLeaveSchema);
