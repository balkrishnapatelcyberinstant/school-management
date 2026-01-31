import mongoose, { Schema, Document } from 'mongoose';

// Subscription Plan Master
export interface ISubscriptionPlanMaster extends Document {
  plan_name: string;
  plan_type: string;
  duration_months: number;
  description?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

const SubscriptionPlanMasterSchema = new Schema<ISubscriptionPlanMaster>({
  plan_name: { type: String, required: true, unique: true },
  plan_type: { type: String, required: true },
  duration_months: { type: Number, required: true, min: 1 },
  description: { type: String },
  is_active: { type: Boolean, default: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

SubscriptionPlanMasterSchema.index({ is_active: 1 });

// Subscription Plan Variants
export interface ISubscriptionPlanVariant extends Document {
  plan_master_id: mongoose.Types.ObjectId;
  applicable_for: 'school' | 'coaching' | 'both';
  price: number;
  discount_percentage?: number;
  features?: Record<string, any>;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

const SubscriptionPlanVariantSchema = new Schema<ISubscriptionPlanVariant>({
  plan_master_id: { type: Schema.Types.ObjectId, ref: 'SubscriptionPlanMaster', required: true },
  applicable_for: { type: String, enum: ['school', 'coaching', 'both'], required: true },
  price: { type: Number, required: true, min: 0 },
  discount_percentage: { type: Number, min: 0, max: 100 },
  features: { type: Schema.Types.Mixed },
  is_active: { type: Boolean, default: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

SubscriptionPlanVariantSchema.index({ plan_master_id: 1, applicable_for: 1 }, { unique: true });
SubscriptionPlanVariantSchema.index({ applicable_for: 1 });
SubscriptionPlanVariantSchema.index({ is_active: 1 });

export const SubscriptionPlanMaster = mongoose.models.SubscriptionPlanMaster || mongoose.model<ISubscriptionPlanMaster>('SubscriptionPlanMaster', SubscriptionPlanMasterSchema);
export const SubscriptionPlanVariant = mongoose.models.SubscriptionPlanVariant || mongoose.model<ISubscriptionPlanVariant>('SubscriptionPlanVariant', SubscriptionPlanVariantSchema);
