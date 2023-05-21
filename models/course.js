const mongoose = require('mongoose');


const CourseSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course'
    },
    name: {
        type: String,
        required: true
    },
    professor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'professor'
    }
});


module.exports = Course = mongoose.model('course', CourseSchema);