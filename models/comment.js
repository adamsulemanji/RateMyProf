const mongoose = require('mongoose');


const CommentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    course: {
        type: String,
        required: true
    },
    professor: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    letterGrade: {
        type: String,
        required: true
    }
} , { timestamps: true });


module.exports = Comment = mongoose.model('comment', CommentSchema);