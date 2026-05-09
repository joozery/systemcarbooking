import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  serviceType: string;
  reason: string;
  engineStatus: string;
  movementStatus: string;
  origin: string;
  destination: string;
  notes?: string;
  customerName: string;      // Added
  customerPhone: string;     // Added
  customerLineId?: string;   // Added
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  customerId?: string;
  partnerId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema = new Schema(
  {
    serviceType: { type: String, required: true },
    reason: { type: String, required: true },
    engineStatus: { type: String, required: true },
    movementStatus: { type: String, required: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    notes: { type: String },
    customerName: { type: String, required: true },  // Added
    customerPhone: { type: String, required: true }, // Added
    customerLineId: { type: String },                // Added
    status: { 
      type: String, 
      enum: ['pending', 'assigned', 'in_progress', 'completed', 'cancelled'], 
      default: 'pending' 
    },
    customerId: { type: String }, 
    partnerId: { type: Schema.Types.ObjectId, ref: 'Partner' },
  },
  { timestamps: true }
);

export default mongoose.model<IBooking>("Booking", BookingSchema);
