const mongoose = require('mongoose');

// Create Student Schema
const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },

    stuID: {
        type: String,
        require: true
    },

    password: {
        type: String,
        require: true
    },

    date: {
        type: String,
        default: Date.now
    }
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;