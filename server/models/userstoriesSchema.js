// models/userStorySchema.js
const mongoose = require('mongoose');
const teamSchema = require('./teamsSchema');

const userStorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['To Do', 'Doing', 'Done', 'To Test', 'Failed', 'Passed'], required: true },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], required: true },
  storyPoints: { type: Number, min: 1, max: 8 },
  blocked: { type: Boolean, default: false },
  assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'team' }],
});

const userStory = mongoose.model('userStory', userStorySchema);

module.exports = userStory;