import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  otp?: string | null;
  otpExpiry?: Date | null;
  googleId?: string | null;
  name?: string | null;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    otp: { type: String, default: null },
    otpExpiry: { type: Date, default: null },
    googleId: { type: String, default: null },  
    name: { type: String, default: null },      
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
