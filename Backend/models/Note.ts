import mongoose, { Schema, Document } from "mongoose";

export interface INote extends Document {
  userId: string;
  content: string;
}

const NoteSchema = new Schema<INote>(
  {
    userId: { type: String, required: true, index: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<INote>("Note", NoteSchema);
