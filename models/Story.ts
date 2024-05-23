import mongoose, { Schema, Document } from 'mongoose';

interface IStory extends Document {
  name: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  projectId: mongoose.Types.ObjectId;
  creationDate: Date;
  status: 'todo' | 'doing' | 'done';
  ownerId: mongoose.Types.ObjectId;
}

const StorySchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
  projectId: { type: mongoose.Types.ObjectId, required: true, ref: 'Project' },
  creationDate: { type: Date, required: true },
  status: { type: String, enum: ['todo', 'doing', 'done'], required: true },
  ownerId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

export default mongoose.model<IStory>('Story', StorySchema);
