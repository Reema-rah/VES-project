// models/iterationSchema.js
const mongoose = require('mongoose');

const iterationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  objective: { type: String, required: true },
  userStories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'userStory' }],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'team' }],
  status: { type: String, enum: ['Start', 'Complete', 'Completed'], required: true },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], required: true },
});

const iteration = mongoose.model('iteration', iterationSchema);

module.exports = iteration;