const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Comment Schema
const CommentSchema = new Schema({
    article_id: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', CommentSchema);
