const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8 // Requires password to be at least 8 characters
    },
    email: {
        type: String,
        required: true,
        unique: true, // This will ensure that all emails in the User collection are unique
        validate: {
            validator: function(v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        },
    },
    phone: {
        type: String,
        required: true
    },
    gradYear: {
        type: Number,
        required: true
    },
    major: {
        type: String,
        required: true
    },
    classification: {
        type: String,
        required: true
    },
}, { timestamps: true });

UserSchema.plugin(uniqueValidator);

module.exports = User = mongoose.model('user', UserSchema);
