import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  dateCreated: Date;
  role: string;
  _id: mongoose.Types.ObjectId; 
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dateCreated: { type: Date, default: Date.now },
  role: { type: String, default: 'user' }
});

export default mongoose.model<IUser>('User', UserSchema);
