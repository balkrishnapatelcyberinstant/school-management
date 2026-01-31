import mongoose, { Schema, Document } from 'mongoose';

// Students Master
export interface IStudent extends Document {
  institute_id: mongoose.Types.ObjectId;
  student_code: string;
  student_type: 'school' | 'coaching';
  full_name: string;
  gender: 'male' | 'female' | 'other';
  date_of_birth: Date;
  blood_group?: string;
  status: 'active' | 'inactive' | 'blocked' | 'archived';
  archived_at?: Date;
  created_at: Date;
  updated_at: Date;
}

const StudentSchema = new Schema<IStudent>({
  institute_id: { type: Schema.Types.ObjectId, ref: 'Institute', required: true },
  student_code: { type: String, required: true },
  student_type: { type: String, enum: ['school', 'coaching'], required: true },
  full_name: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  date_of_birth: { type: Date, required: true },
  blood_group: { type: String },
  status: { type: String, enum: ['active', 'inactive', 'blocked', 'archived'], required: true, default: 'active' },
  archived_at: { type: Date },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

StudentSchema.index({ institute_id: 1, student_code: 1 }, { unique: true });

// Student Auth
export interface IStudentAuth extends Document {
  student_id: mongoose.Types.ObjectId;
  username: string;
  password_hash: string;
  password_key?: string;
  is_first_login: boolean;
  last_login_at?: Date;
  status: 'active' | 'blocked' | 'disabled';
  created_at: Date;
  updated_at: Date;
}

const StudentAuthSchema = new Schema<IStudentAuth>({
  student_id: { type: Schema.Types.ObjectId, ref: 'Student', required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  password_key: { type: String },
  is_first_login: { type: Boolean, default: true },
  last_login_at: { type: Date },
  status: { type: String, enum: ['active', 'blocked', 'disabled'], required: true, default: 'active' },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

StudentAuthSchema.index({ username: 1 }, { unique: true });

// Student Contact Information
export interface IStudentContact extends Document {
  student_id: mongoose.Types.ObjectId;
  contact_type: 'student' | 'father' | 'mother' | 'guardian';
  mobile: string;
  email?: string;
  alternate_mobile?: string;
  mobile_verified: boolean;
  email_verified: boolean;
  is_primary: boolean;
  created_at: Date;
  updated_at: Date;
}

const StudentContactSchema = new Schema<IStudentContact>({
  student_id: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  contact_type: { type: String, enum: ['student', 'father', 'mother', 'guardian'], required: true },
  mobile: { type: String, required: true },
  email: { type: String },
  alternate_mobile: { type: String },
  mobile_verified: { type: Boolean, default: false },
  email_verified: { type: Boolean, default: false },
  is_primary: { type: Boolean, default: false },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// Student Addresses
export interface IStudentAddress extends Document {
  student_id: mongoose.Types.ObjectId;
  address_type: 'current' | 'permanent';
  address: string;
  city?: string;
  state?: string;
  pincode?: string;
  created_at: Date;
  updated_at: Date;
}

const StudentAddressSchema = new Schema<IStudentAddress>({
  student_id: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  address_type: { type: String, enum: ['current', 'permanent'], required: true },
  address: { type: String, required: true },
  city: { type: String },
  state: { type: String },
  pincode: { type: String },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// Student Guardians
export interface IStudentGuardian extends Document {
  student_id: mongoose.Types.ObjectId;
  name: string;
  relation: 'father' | 'mother' | 'guardian' | 'grandfather' | 'grandmother' | 'brother' | 'sister' | 'other';
  mobile: string;
  email?: string;
  occupation?: string;
  is_primary: boolean;
  created_at: Date;
  updated_at: Date;
}

const StudentGuardianSchema = new Schema<IStudentGuardian>({
  student_id: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  name: { type: String, required: true },
  relation: { 
    type: String, 
    enum: ['father', 'mother', 'guardian', 'grandfather', 'grandmother', 'brother', 'sister', 'other'], 
    required: true 
  },
  mobile: { type: String, required: true },
  email: { type: String },
  occupation: { type: String },
  is_primary: { type: Boolean, default: false },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// Student Identity Documents
export interface IStudentIdentityDocument extends Document {
  student_id: mongoose.Types.ObjectId;
  document_type: 'birth_certificate' | 'aadhaar_card' | 'pan_card' | 'passport' | 'student_photo';
  file_url: string;
  verification_status: 'pending' | 'approved' | 'rejected';
  remarks?: string;
  created_at: Date;
  updated_at: Date;
}

const StudentIdentityDocumentSchema = new Schema<IStudentIdentityDocument>({
  student_id: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  document_type: { 
    type: String, 
    enum: ['birth_certificate', 'aadhaar_card', 'pan_card', 'passport', 'student_photo'], 
    required: true 
  },
  file_url: { type: String, required: true },
  verification_status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  remarks: { type: String },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// Student Academic Documents
export interface IStudentAcademicDocument extends Document {
  student_id: mongoose.Types.ObjectId;
  document_type: 'transfer_certificate' | 'leaving_certificate' | 'marksheet' | 'migration_certificate' | 'bonafide_certificate' | 'character_certificate';
  academic_year?: string;
  previous_school_name?: string;
  previous_board?: 'CBSE' | 'ICSE' | 'STATE' | 'IB' | 'OTHER';
  class_completed?: string;
  file_url: string;
  verification_status: 'pending' | 'approved' | 'rejected';
  remarks?: string;
  created_at: Date;
  updated_at: Date;
}

const StudentAcademicDocumentSchema = new Schema<IStudentAcademicDocument>({
  student_id: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  document_type: { 
    type: String, 
    enum: ['transfer_certificate', 'leaving_certificate', 'marksheet', 'migration_certificate', 'bonafide_certificate', 'character_certificate'], 
    required: true 
  },
  academic_year: { type: String },
  previous_school_name: { type: String },
  previous_board: { type: String, enum: ['CBSE', 'ICSE', 'STATE', 'IB', 'OTHER'] },
  class_completed: { type: String },
  file_url: { type: String, required: true },
  verification_status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  remarks: { type: String },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// Student Academic Mapping
export interface IStudentAcademicMapping extends Document {
  student_id: mongoose.Types.ObjectId;
  class_id: mongoose.Types.ObjectId;
  section_id?: mongoose.Types.ObjectId;
  batch_id?: mongoose.Types.ObjectId;
  mapping_type: 'school' | 'coaching';
  academic_year: string;
  roll_number?: string;
  joined_at: Date;
  left_at?: Date;
  status: 'active' | 'promoted' | 'completed' | 'dropped';
  created_at: Date;
  updated_at: Date;
}

const StudentAcademicMappingSchema = new Schema<IStudentAcademicMapping>({
  student_id: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  class_id: { type: Schema.Types.ObjectId, required: true },
  section_id: { type: Schema.Types.ObjectId },
  batch_id: { type: Schema.Types.ObjectId },
  mapping_type: { type: String, enum: ['school', 'coaching'], required: true },
  academic_year: { type: String, required: true },
  roll_number: { type: String },
  joined_at: { type: Date, required: true },
  left_at: { type: Date },
  status: { type: String, enum: ['active', 'promoted', 'completed', 'dropped'], required: true, default: 'active' },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// Student Attendance
export interface IStudentAttendance extends Document {
  student_id: mongoose.Types.ObjectId;
  class_id: mongoose.Types.ObjectId;
  section_id?: mongoose.Types.ObjectId;
  batch_id?: mongoose.Types.ObjectId;
  date: Date;
  status: 'present' | 'absent' | 'leave';
  marked_by: mongoose.Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

const StudentAttendanceSchema = new Schema<IStudentAttendance>({
  student_id: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  class_id: { type: Schema.Types.ObjectId, required: true },
  section_id: { type: Schema.Types.ObjectId },
  batch_id: { type: Schema.Types.ObjectId },
  date: { type: Date, required: true },
  status: { type: String, enum: ['present', 'absent', 'leave'], required: true },
  marked_by: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

StudentAttendanceSchema.index({ student_id: 1, date: 1 }, { unique: true });

// Student Status History
export interface IStudentStatusHistory extends Document {
  student_id: mongoose.Types.ObjectId;
  status: 'active' | 'inactive' | 'blocked' | 'archived';
  reason?: string;
  changed_at: Date;
  changed_by: mongoose.Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

const StudentStatusHistorySchema = new Schema<IStudentStatusHistory>({
  student_id: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  status: { type: String, enum: ['active', 'inactive', 'blocked', 'archived'], required: true },
  reason: { type: String },
  changed_at: { type: Date, required: true },
  changed_by: { type: Schema.Types.ObjectId, ref: 'InstituteAdmin', required: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export const Student = mongoose.models.Student || mongoose.model<IStudent>('Student', StudentSchema);
export const StudentAuth = mongoose.models.StudentAuth || mongoose.model<IStudentAuth>('StudentAuth', StudentAuthSchema);
export const StudentContact = mongoose.models.StudentContact || mongoose.model<IStudentContact>('StudentContact', StudentContactSchema);
export const StudentAddress = mongoose.models.StudentAddress || mongoose.model<IStudentAddress>('StudentAddress', StudentAddressSchema);
export const StudentGuardian = mongoose.models.StudentGuardian || mongoose.model<IStudentGuardian>('StudentGuardian', StudentGuardianSchema);
export const StudentIdentityDocument = mongoose.models.StudentIdentityDocument || mongoose.model<IStudentIdentityDocument>('StudentIdentityDocument', StudentIdentityDocumentSchema);
export const StudentAcademicDocument = mongoose.models.StudentAcademicDocument || mongoose.model<IStudentAcademicDocument>('StudentAcademicDocument', StudentAcademicDocumentSchema);
export const StudentAcademicMapping = mongoose.models.StudentAcademicMapping || mongoose.model<IStudentAcademicMapping>('StudentAcademicMapping', StudentAcademicMappingSchema);
export const StudentAttendance = mongoose.models.StudentAttendance || mongoose.model<IStudentAttendance>('StudentAttendance', StudentAttendanceSchema);
export const StudentStatusHistory = mongoose.models.StudentStatusHistory || mongoose.model<IStudentStatusHistory>('StudentStatusHistory', StudentStatusHistorySchema);
