import mongoose, { Schema, Document } from 'mongoose';

// Teachers Master
export interface ITeacher extends Document {
  institute_id: mongoose.Types.ObjectId;
  teacher_code: string;
  teacher_type: 'school' | 'coaching';
  full_name: string;
  gender: 'male' | 'female' | 'other';
  date_of_birth: Date;
  marital_status?: 'single' | 'married' | 'divorced' | 'widowed';
  employment_type: 'full_time' | 'part_time' | 'contract' | 'visiting';
  joining_date?: Date;
  status: 'active' | 'inactive' | 'blocked' | 'archived';
  archived_at?: Date;
  spouse_name?: string;
  blood_group?: string;
  created_at: Date;
  updated_at: Date;
}

const TeacherSchema = new Schema<ITeacher>({
  institute_id: { type: Schema.Types.ObjectId, ref: 'Institute', required: true },
  teacher_code: { type: String, required: true },
  teacher_type: { type: String, enum: ['school', 'coaching'], required: true },
  full_name: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  date_of_birth: { type: Date, required: true },
  marital_status: { type: String, enum: ['single', 'married', 'divorced', 'widowed'] },
  employment_type: { type: String, enum: ['full_time', 'part_time', 'contract', 'visiting'], required: true },
  joining_date: { type: Date },
  status: { type: String, enum: ['active', 'inactive', 'blocked', 'archived'], required: true, default: 'active' },
  archived_at: { type: Date },
  spouse_name: { type: String },
  blood_group: { type: String },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

TeacherSchema.index({ institute_id: 1, teacher_code: 1 }, { unique: true });

// Teacher Contact Information
export interface ITeacherContact extends Document {
  teacher_id: mongoose.Types.ObjectId;
  mobile: string;
  email: string;
  alternate_mobile?: string;
  email_verified: boolean;
  mobile_verified: boolean;
  created_at: Date;
  updated_at: Date;
}

const TeacherContactSchema = new Schema<ITeacherContact>({
  teacher_id: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true, unique: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  alternate_mobile: { type: String },
  email_verified: { type: Boolean, default: false },
  mobile_verified: { type: Boolean, default: false },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// Teacher Addresses
export interface ITeacherAddress extends Document {
  teacher_id: mongoose.Types.ObjectId;
  address_type: 'current' | 'permanent';
  address: string;
  city?: string;
  state?: string;
  pincode?: string;
  created_at: Date;
  updated_at: Date;
}

const TeacherAddressSchema = new Schema<ITeacherAddress>({
  teacher_id: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  address_type: { type: String, enum: ['current', 'permanent'], required: true },
  address: { type: String, required: true },
  city: { type: String },
  state: { type: String },
  pincode: { type: String },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// Teacher Identity Documents
export interface ITeacherIdentityDocument extends Document {
  teacher_id: mongoose.Types.ObjectId;
  document_type: 'pan_card' | 'address_card' | 'photo';
  document_number: string;
  masked_number?: string;
  verification_status: 'pending' | 'approved' | 'rejected';
  file_url: string;
  verified_by?: mongoose.Types.ObjectId;
  rejection_reason?: string;
  created_at: Date;
  updated_at: Date;
}

const TeacherIdentityDocumentSchema = new Schema<ITeacherIdentityDocument>({
  teacher_id: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  document_type: { type: String, enum: ['pan_card', 'address_card', 'photo'], required: true },
  document_number: { type: String, required: true },
  masked_number: { type: String },
  verification_status: { type: String, enum: ['pending', 'approved', 'rejected'], required: true, default: 'pending' },
  file_url: { type: String, required: true },
  verified_by: { type: Schema.Types.ObjectId, ref: 'InstituteAdmin' },
  rejection_reason: { type: String },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

TeacherIdentityDocumentSchema.index({ teacher_id: 1, document_type: 1 }, { unique: true });

// Teacher Qualification Details
export interface ITeacherQualification extends Document {
  teacher_id: mongoose.Types.ObjectId;
  qualification: string;
  specialization?: string;
  file_url: string;
  institute_name?: string;
  passing_year?: Date;
  created_at: Date;
  updated_at: Date;
}

const TeacherQualificationSchema = new Schema<ITeacherQualification>({
  teacher_id: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  qualification: { type: String, required: true },
  specialization: { type: String },
  file_url: { type: String, required: true },
  institute_name: { type: String },
  passing_year: { type: Date },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// Teacher Experience
export interface ITeacherExperience extends Document {
  teacher_id: mongoose.Types.ObjectId;
  organization_name: string;
  role?: string;
  from_date?: Date;
  to_date?: Date;
  is_current: boolean;
  created_at: Date;
  updated_at: Date;
}

const TeacherExperienceSchema = new Schema<ITeacherExperience>({
  teacher_id: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  organization_name: { type: String, required: true },
  role: { type: String },
  from_date: { type: Date },
  to_date: { type: Date },
  is_current: { type: Boolean, default: false },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// Teacher Bank Details
export interface ITeacherBankDetails extends Document {
  teacher_id: mongoose.Types.ObjectId;
  account_holder_name: string;
  bank_name?: string;
  account_number: string;
  ifsc_code: string;
  upi_id?: string;
  is_primary: boolean;
  created_at: Date;
  updated_at: Date;
}

const TeacherBankDetailsSchema = new Schema<ITeacherBankDetails>({
  teacher_id: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  account_holder_name: { type: String, required: true },
  bank_name: { type: String },
  account_number: { type: String, required: true },
  ifsc_code: { type: String, required: true },
  upi_id: { type: String },
  is_primary: { type: Boolean, default: false },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// Teacher Emergency Contacts
export interface ITeacherEmergencyContact extends Document {
  teacher_id: mongoose.Types.ObjectId;
  name: string;
  relation: string;
  mobile: string;
  created_at: Date;
  updated_at: Date;
}

const TeacherEmergencyContactSchema = new Schema<ITeacherEmergencyContact>({
  teacher_id: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  name: { type: String, required: true },
  relation: { type: String, required: true },
  mobile: { type: String, required: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// Teacher Auth
export interface ITeacherAuth extends Document {
  teacher_id: mongoose.Types.ObjectId;
  email: string;
  mobile?: string;
  password_hash: string;
  password_key?: string;
  is_first_login: boolean;
  last_login_at?: Date;
  status: 'active' | 'blocked' | 'disabled';
  created_at: Date;
  updated_at: Date;
}

const TeacherAuthSchema = new Schema<ITeacherAuth>({
  teacher_id: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true, unique: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String },
  password_hash: { type: String, required: true },
  password_key: { type: String },
  is_first_login: { type: Boolean, default: true },
  last_login_at: { type: Date },
  status: { type: String, enum: ['active', 'blocked', 'disabled'], required: true, default: 'active' },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

TeacherAuthSchema.index({ email: 1 }, { unique: true });

// School Teacher Roles
export interface ISchoolTeacherRole extends Document {
  teacher_id: mongoose.Types.ObjectId;
  role_type: 'principal' | 'vice_principal' | 'class_teacher' | 'subject_teacher' | 'lab_assistant';
  assigned_class?: string;
  assigned_section?: string;
  section?: string;
  subjects?: string[];
  created_at: Date;
  updated_at: Date;
}

const SchoolTeacherRoleSchema = new Schema<ISchoolTeacherRole>({
  teacher_id: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  role_type: { 
    type: String, 
    enum: ['principal', 'vice_principal', 'class_teacher', 'subject_teacher', 'lab_assistant'], 
    required: true 
  },
  assigned_class: { type: String },
  assigned_section: { type: String },
  section: { type: String },
  subjects: [{ type: String }],
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// Coaching Teacher Details
export interface ICoachingTeacherDetails extends Document {
  teacher_id: mongoose.Types.ObjectId;
  role: 'mentor' | 'faculty' | 'guest_faculty' | 'counsellor';
  subjects?: string[];
  batch_ids?: mongoose.Types.ObjectId[];
  payout_model?: 'fixed' | 'percentage';
  created_at: Date;
  updated_at: Date;
}

const CoachingTeacherDetailsSchema = new Schema<ICoachingTeacherDetails>({
  teacher_id: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true, unique: true },
  role: { type: String, enum: ['mentor', 'faculty', 'guest_faculty', 'counsellor'], required: true },
  subjects: [{ type: String }],
  batch_ids: [{ type: Schema.Types.ObjectId }],
  payout_model: { type: String, enum: ['fixed', 'percentage'] },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export const Teacher = mongoose.models.Teacher || mongoose.model<ITeacher>('Teacher', TeacherSchema);
export const TeacherContact = mongoose.models.TeacherContact || mongoose.model<ITeacherContact>('TeacherContact', TeacherContactSchema);
export const TeacherAddress = mongoose.models.TeacherAddress || mongoose.model<ITeacherAddress>('TeacherAddress', TeacherAddressSchema);
export const TeacherIdentityDocument = mongoose.models.TeacherIdentityDocument || mongoose.model<ITeacherIdentityDocument>('TeacherIdentityDocument', TeacherIdentityDocumentSchema);
export const TeacherQualification = mongoose.models.TeacherQualification || mongoose.model<ITeacherQualification>('TeacherQualification', TeacherQualificationSchema);
export const TeacherExperience = mongoose.models.TeacherExperience || mongoose.model<ITeacherExperience>('TeacherExperience', TeacherExperienceSchema);
export const TeacherBankDetails = mongoose.models.TeacherBankDetails || mongoose.model<ITeacherBankDetails>('TeacherBankDetails', TeacherBankDetailsSchema);
export const TeacherEmergencyContact = mongoose.models.TeacherEmergencyContact || mongoose.model<ITeacherEmergencyContact>('TeacherEmergencyContact', TeacherEmergencyContactSchema);
export const TeacherAuth = mongoose.models.TeacherAuth || mongoose.model<ITeacherAuth>('TeacherAuth', TeacherAuthSchema);
export const SchoolTeacherRole = mongoose.models.SchoolTeacherRole || mongoose.model<ISchoolTeacherRole>('SchoolTeacherRole', SchoolTeacherRoleSchema);
export const CoachingTeacherDetails = mongoose.models.CoachingTeacherDetails || mongoose.model<ICoachingTeacherDetails>('CoachingTeacherDetails', CoachingTeacherDetailsSchema);
