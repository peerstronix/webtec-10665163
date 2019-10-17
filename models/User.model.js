const mongoose = require('mongoose');

// Create User Schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    userID: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    isAdmin: {
        type: String,
        enum: ['0', '1'],
        required: true
    },

    date: {
        type: String,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;