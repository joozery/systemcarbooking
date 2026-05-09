import mongoose, { Schema, Document } from 'mongoose';

export interface IPartner extends Document {
  // 1. Personal
  firstName: string;
  lastName: string;
  nickname: string;
  phone: string;
  phoneSecondary?: string;
  lineId: string;
  // Auth
  username: string;
  password: string;
  // 2. Vehicle
  vehicleTypes: string[];
  vehicleModel: string;
  licensePlate: string;
  plateProvince: string;
  extraEquipment: string[];
  // 3. Zone
  baseProvince: string;
  baseDistrict: string;
  serviceScope: string;
  availableTime: string;
  // 4. Payment
  bank: string;
  accountNo: string;
  accountName: string;
  // 5. Documents (URLs from R2)
  documents: {
    idCardUrl?: string;
    driverLicenseUrl?: string;
    carFrontUrl?: string;
    carSideUrl?: string;
    bankBookUrl?: string;
    insuranceUrl?: string;
  };
  // Status
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

const PartnerSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  nickname: { type: String, required: true },
  phone: { type: String, required: true },
  phoneSecondary: { type: String },
  lineId: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  vehicleTypes: [{ type: String }],
  vehicleModel: { type: String, required: true },
  licensePlate: { type: String, required: true },
  plateProvince: { type: String, required: true },
  extraEquipment: [{ type: String }],
  baseProvince: { type: String, required: true },
  baseDistrict: { type: String, required: true },
  serviceScope: { type: String, required: true },
  availableTime: { type: String, required: true },
  bank: { type: String, required: true },
  accountNo: { type: String, required: true },
  accountName: { type: String, required: true },
  documents: {
    idCardUrl: { type: String },
    driverLicenseUrl: { type: String },
    carFrontUrl: { type: String },
    carSideUrl: { type: String },
    bankBookUrl: { type: String },
    insuranceUrl: { type: String },
  },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IPartner>('Partner', PartnerSchema);
