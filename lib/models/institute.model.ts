import mongoose, { Schema, Document } from 'mongoose';

// Institute Master
export interface IInstitute extends Document {
  institute_code: string;
  institute_name: string;
  institute_type: 'school' | 'coaching' | 'both';
  application_reference_id?: string;
  status: 'pending_activation' | 'trial' | 'active' | 'suspended' | 'blocked' | 'expired' | 'archived';
  created_at: Date;
  updated_at: Date;
}

const InstituteSchema = new Schema<IInstitute>({
  institute_code: { type: String, required: true, unique: true },
  institute_name: { type: String, required: true },
  institute_type: { type: String, enum: ['school', 'coaching', 'both'], required: true },
  application_reference_id: { type: String },
  status: { 
    type: String, 
    enum: ['pending_activation', 'trial', 'active', 'suspended', 'blocked', 'expired', 'archived'], 
    required: true,
    default: 'pending_activation'
  },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

InstituteSchema.index({ institute_code: 1 }, { unique: true });
InstituteSchema.index({ institute_type: 1 });
InstituteSchema.index({ status: 1 });

// Institute Basic Information
export interface IInstituteBasicInfo extends Document {
  institute_id: mongoose.Types.ObjectId;
  owner_name: string;
  designation?: string;
  email: string;
  mobile: string;
  address?: string;
  email_verified: boolean;
  mobile_verified: boolean;
  created_at: Date;
  updated_at: Date;
}

const InstituteBasicInfoSchema = new Schema<IInstituteBasicInfo>({
  institute_id: { type: Schema.Types.ObjectId, ref: 'Institute', required: true, unique: true },
  owner_name: { type: String, required: true },
  designation: { type: String },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String },
  email_verified: { type: Boolean, default: false },
  mobile_verified: { type: Boolean, default: false },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// Institute Details
export interface IInstituteDetails extends Document {
  institute_id: mongoose.Types.ObjectId;
  school_board?: string;
  school_type?: 'private' | 'government' | 'public';
  classes_offered?: string[];
  courses_offered?: string[];
  medium?: 'english' | 'hindi' | 'other';
  approx_students_range?: '1-100' | '101-250' | '251-500' | '500-1000' | '1000+';
  created_at: Date;
  updated_at: Date;
}

const InstituteDetailsSchema = new Schema<IInstituteDetails>({
  institute_id: { type: Schema.Types.ObjectId, ref: 'Institute', required: true, unique: true },
  school_board: { type: String },
  school_type: { type: String, enum: ['private', 'government', 'public'] },
  classes_offered: [{ type: String }],
  courses_offered: [{ type: String }],
  medium: { type: String, enum: ['english', 'hindi', 'other'] },
  approx_students_range: { type: String, enum: ['1-100', '101-250', '251-500', '500-1000', '1000+'] },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// Institute Identity Documents
export interface IInstituteIdentityDocument extends Document {
  institute_id: mongoose.Types.ObjectId;
  document_type: 'aadhaar' | 'pan';
  document_number: string;
  masked_number?: string;
  verification_status: 'pending' | 'approved' | 'rejected';
  verified_by?: mongoose.Types.ObjectId;
  rejection_reason?: string;
  created_at: Date;
  updated_at: Date;
}

const InstituteIdentityDocumentSchema = new Schema<IInstituteIdentityDocument>({
  institute_id: { type: Schema.Types.ObjectId, ref: 'Institute', required: true },
  document_type: { type: String, enum: ['aadhaar', 'pan'], required: true },
  document_number: { type: String, required: true },
  masked_number: { type: String },
  verification_status: { type: String, enum: ['pending', 'approved', 'rejected'], required: true, default: 'pending' },
  verified_by: { type: Schema.Types.ObjectId, ref: 'InstituteAdmin' },
  rejection_reason: { type: String },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

InstituteIdentityDocumentSchema.index({ institute_id: 1, document_type: 1 }, { unique: true });

// Institute Documents
export interface IInstituteDocument extends Document {
  institute_id: mongoose.Types.ObjectId;
  document_type: 'registration_certificate' | 'affiliation_certificate' | 'gst_certificate' | 'logo';
  file_url: string;
  verification_status: 'pending' | 'approved' | 'rejected';
  verified_by?: mongoose.Types.ObjectId;
  rejection_reason?: string;
  created_at: Date;
  updated_at: Date;
}

const InstituteDocumentSchema = new Schema<IInstituteDocument>({
  institute_id: { type: Schema.Types.ObjectId, ref: 'Institute', required: true },
  document_type: { 
    type: String, 
    enum: ['registration_certificate', 'affiliation_certificate', 'gst_certificate', 'logo'], 
    required: true 
  },
  file_url: { type: String, required: true },
  verification_status: { type: String, enum: ['pending', 'approved', 'rejected'], required: true, default: 'pending' },
  verified_by: { type: Schema.Types.ObjectId, ref: 'InstituteAdmin' },
  rejection_reason: { type: String },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// Institute Subscription Transactions
export interface IInstituteSubscriptionTransaction extends Document {
  institute_id: mongoose.Types.ObjectId;
  subscription_plan_variant_id: mongoose.Types.ObjectId;
  amount: number;
  payment_status: 'success' | 'failed' | 'refunded';
  payment_gateway?: string;
  transaction_id?: string;
  receipt_url?: string;
  paid_at?: Date;
  created_at: Date;
  updated_at: Date;
}

const InstituteSubscriptionTransactionSchema = new Schema<IInstituteSubscriptionTransaction>({
  institute_id: { type: Schema.Types.ObjectId, ref: 'Institute', required: true },
  subscription_plan_variant_id: { type: Schema.Types.ObjectId, ref: 'SubscriptionPlanVariant', required: true },
  amount: { type: Number, required: true, min: 0 },
  payment_status: { type: String, enum: ['success', 'failed', 'refunded'], required: true },
  payment_gateway: { type: String },
  transaction_id: { type: String },
  receipt_url: { type: String },
  paid_at: { type: Date },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// Institute Admins
export interface IInstituteAdmin extends Document {
  institute_id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  mobile: string;
  password_hash: string;
  password_key?: string;
  is_first_login: boolean;
  last_login_at?: Date;
  status: 'active' | 'blocked' | 'disabled';
  created_at: Date;
  updated_at: Date;
}

const InstituteAdminSchema = new Schema<IInstituteAdmin>({
  institute_id: { type: Schema.Types.ObjectId, ref: 'Institute', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  password_hash: { type: String, required: true },
  password_key: { type: String },
  is_first_login: { type: Boolean, default: true },
  last_login_at: { type: Date },
  status: { type: String, enum: ['active', 'blocked', 'disabled'], required: true, default: 'active' },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

InstituteAdminSchema.index({ email: 1 }, { unique: true });
InstituteAdminSchema.index({ mobile: 1 });

export const Institute = mongoose.models.Institute || mongoose.model<IInstitute>('Institute', InstituteSchema);
export const InstituteBasicInfo = mongoose.models.InstituteBasicInfo || mongoose.model<IInstituteBasicInfo>('InstituteBasicInfo', InstituteBasicInfoSchema);
export const InstituteDetails = mongoose.models.InstituteDetails || mongoose.model<IInstituteDetails>('InstituteDetails', InstituteDetailsSchema);
export const InstituteIdentityDocument = mongoose.models.InstituteIdentityDocument || mongoose.model<IInstituteIdentityDocument>('InstituteIdentityDocument', InstituteIdentityDocumentSchema);
export const InstituteDocument = mongoose.models.InstituteDocument || mongoose.model<IInstituteDocument>('InstituteDocument', InstituteDocumentSchema);
export const InstituteSubscriptionTransaction = mongoose.models.InstituteSubscriptionTransaction || mongoose.model<IInstituteSubscriptionTransaction>('InstituteSubscriptionTransaction', InstituteSubscriptionTransactionSchema);
export const InstituteAdmin = mongoose.models.InstituteAdmin || mongoose.model<IInstituteAdmin>('InstituteAdmin', InstituteAdminSchema);
