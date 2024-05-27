import mongoose, { Schema, Document } from 'mongoose';

interface IProject extends Document {
  name: string;
  description: string;
  ownerId: mongoose.Types.ObjectId;
}

const ProjectSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  ownerId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

export default mongoose.model<IProject>('Project', ProjectSchema);
