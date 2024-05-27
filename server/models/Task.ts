import mongoose, { Schema, Document } from 'mongoose';

interface ITask extends Document {
  name: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  storyId: mongoose.Types.ObjectId;
  estimatedTime: number;
  status: 'todo' | 'doing' | 'done';
  creationDate: Date;
  startDate?: Date;
  endDate?: Date;
  ownerId: mongoose.Types.ObjectId;
}

const TaskSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
  storyId: { type: mongoose.Types.ObjectId, required: true, ref: 'Story' },
  estimatedTime: { type: Number, required: true },
  status: { type: String, enum: ['todo', 'doing', 'done'], required: true },
  creationDate: { type: Date, required: true },
  startDate: { type: Date },
  endDate: { type: Date },
  ownerId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

export default mongoose.model<ITask>('Task', TaskSchema);
