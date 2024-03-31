// Define Comment Schema
const commentSchema = new mongoose.Schema({
    text: String,
    user: String,
    date: { type: Date, default: Date.now }, // Remove http:// from Date.now
    replies: [{
        text: String,
        user: String,
        date: { type: Date, default: Date.now } // Remove http:// from Date.now
    }]
});

// Define Comment model
const Comment = mongoose.model('Comment', commentSchema);
