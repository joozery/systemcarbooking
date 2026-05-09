import mongoose, { Schema, Document } from 'mongoose';

export interface IAuditLog extends Document {
  user: mongoose.Types.ObjectId; // ผู้กระทำ
  userModel: 'Staff' | 'Partner'; 
  action: string; // การกระทำ เช่น 'APPROVE_STAFF', 'LOGIN', 'DELETE_PARTNER'
  target: string; // เป้าหมาย เช่น ชื่อพนักงานที่ถูกอนุมัติ
  details: string; // รายละเอียดเพิ่มเติม
  ipAddress?: string;
  createdAt: Date;
}

const AuditLogSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    refPath: 'userModel',
    required: true
  },
  userModel: {
    type: String,
    required: true,
    enum: ['Staff', 'Partner']
  },
  action: {
    type: String,
    required: true
  },
  target: {
    type: String
  },
  details: {
    type: String
  },
  ipAddress: {
    type: String
  }
}, {
  timestamps: { createdAt: true, updatedAt: false }
});

export default mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);
