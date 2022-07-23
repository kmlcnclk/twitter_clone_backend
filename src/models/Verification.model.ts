import mongoose from 'mongoose';

export interface VerificationDocument extends mongoose.Document {
  email?: string;
  phone?: string;
  code: number;
  codeExpire: number;
  createdAt: Date;
  updatedAt: Date;
}

const VerificationSchema = new mongoose.Schema(
  {
    email: String,
    phone: String,
    code: Number,
    codeExpire: Number,
  },
  {
    timestamps: true,
  }
);

const Verification = mongoose.model<VerificationDocument>(
  'Verification',
  VerificationSchema
);

export default Verification;
