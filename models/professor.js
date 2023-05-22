const mongoose = require('mongoose');


const ProfessorSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }, 
    phone: {
        type: String,
        required: true
    },
    sumRatings: {
        type: Number,
        required: true
    },
    numRatings: {
        type: Number,
        required: true
    }
});


module.exports = Professor = mongoose.model('professor', ProfessorSchema);