const mongoose = require('mongoose');


const CommentSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    professor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'professor'
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course'
    },
    comment: {
        type: String,
        required: true
    },
    letterGrade: {
        type: String,
        required: true
    }
});


module.exports = Comment = mongoose.model('comment', CommentSchema);