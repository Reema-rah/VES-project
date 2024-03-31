const mongoose = require('mongoose');

// Define Comment Schema
const commentSchema = new mongoose.Schema({
    text: String,
    user: String,
    date: { type: Date, default: Date.now }, // corrected Date.now
    replies: [{
        text: String,
        user: String,
        date: { type: Date, default: Date.now } // corrected Date.now
    }]
});

// Define Comment model
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
