const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
  storyId: { type: String, required: true },
  estimatedTime: { type: Number, required: true },
  status: { type: String, enum: ['todo', 'doing', 'done'], default: 'todo', required: true },
  creationDate: { type: Date, default: Date.now },
  startDate: { type: Date },
  endDate: { type: Date },
  ownerId: { type: String, required: true },
  assignedUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } 
});

module.exports = mongoose.model('Task', TaskSchema);
