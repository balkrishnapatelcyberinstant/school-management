import mongoose, { Schema, Document } from 'mongoose';

// Onboarding Basic Information
export interface IOnboardingBasicInfo extends Document {
  institute_name: string;
  institute_type: 'school' | 'coaching' | 'both';
  owner_name: string;
  designation?: string;
  email: string;
  mobile: string;
  address: string;
  mobile_number_verified: boolean;
  is_active: boolean;
  is_archived: boolean;
  archived_at?: Date;
  created_at: Date;
  updated_at: Date;
}

const OnboardingBasicInfoSchema = new Schema<IOnboardingBasicInfo>({
  institute_name: { type: String, required: true },
  institute_type: { type: String, enum: ['school', 'coaching', 'both'], required: true },
  owner_name: { type: String, required: true },
  designation: { type: String },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  mobile_number_verified: { type: Boolean, default: false },
  is_active: { type: Boolean, default: true },
  is_archived: { type: Boolean, default: false },
  archived_at: { type: Date },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// Onboarding Institute Details
export interface IOnboardingInstituteDetails extends Document {
  onboarding_basic_info_id: mongoose.Types.ObjectId;
  school_board?: string;
  school_type?: 'private' | 'government' | 'public';
  classes_offered: string[];
  medium: 'english' | 'hindi' | 'other';
  courses_offered?: string[];
  approx_students_range: '1-100' | '101-250' | '251-500' | '500-1000' | '1000+';
  created_at: Date;
  updated_at: Date;
}

const OnboardingInstituteDetailsSchema = new Schema<IOnboardingInstituteDetails>({
  onboarding_basic_info_id: { type: Schema.Types.ObjectId, ref: 'OnboardingBasicInfo', required: true },
  school_board: { type: String },
  school_type: { type: String, enum: ['private', 'government', 'public'] },
  classes_offered: [{ type: String, required: true }],
  medium: { type: String, enum: ['english', 'hindi', 'other'], required: true },
  courses_offered: [{ type: String }],
  approx_students_range: { 
    type: String, 
    enum: ['1-100', '101-250', '251-500', '500-1000', '1000+'], 
    required: true 
  },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// Onboarding Application Transactions
export interface IOnboardingApplicationTransaction extends Document {
  reference_id: string;
  onboarding_basic_info_id: mongoose.Types.ObjectId;
  subscription_plan_variant_id: mongoose.Types.ObjectId;
  amount: number;
  currency?: string;
  payment_gateway?: string;
  payment_transaction_id?: string;
  payment_status: 'pending' | 'success' | 'failed' | 'refunded';
  application_status: 'payment_received' | 'documents_under_review' | 'approved' | 'rejected' | 'account_activated';
  receipt_url?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

const OnboardingApplicationTransactionSchema = new Schema<IOnboardingApplicationTransaction>({
  reference_id: { type: String, required: true, unique: true },
  onboarding_basic_info_id: { type: Schema.Types.ObjectId, ref: 'OnboardingBasicInfo', required: true },
  subscription_plan_variant_id: { type: Schema.Types.ObjectId, ref: 'SubscriptionPlanVariant', required: true },
  amount: { type: Number, required: true, min: 0 },
  currency: { type: String, default: 'INR' },
  payment_gateway: { type: String },
  payment_transaction_id: { type: String },
  payment_status: { type: String, enum: ['pending', 'success', 'failed', 'refunded'], required: true, default: 'pending' },
  application_status: { 
    type: String, 
    enum: ['payment_received', 'documents_under_review', 'approved', 'rejected', 'account_activated'], 
    required: true,
    default: 'payment_received'
  },
  receipt_url: { type: String },
  is_active: { type: Boolean, default: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

OnboardingApplicationTransactionSchema.index({ reference_id: 1 }, { unique: true });

export const OnboardingBasicInfo = mongoose.models.OnboardingBasicInfo || mongoose.model<IOnboardingBasicInfo>('OnboardingBasicInfo', OnboardingBasicInfoSchema);
export const OnboardingInstituteDetails = mongoose.models.OnboardingInstituteDetails || mongoose.model<IOnboardingInstituteDetails>('OnboardingInstituteDetails', OnboardingInstituteDetailsSchema);
export const OnboardingApplicationTransaction = mongoose.models.OnboardingApplicationTransaction || mongoose.model<IOnboardingApplicationTransaction>('OnboardingApplicationTransaction', OnboardingApplicationTransactionSchema);
