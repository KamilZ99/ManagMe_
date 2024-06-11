const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
  projectId: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['todo', 'doing', 'done'], required: true },
  ownerId: { type: String, required: true },
  assignedUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Story', StorySchema);
