const mongoose = require('mongoose');

// Create Hall Schema
const HallSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },

    hallID: {
        type: String,
        require: true
    },

    date: {
        type: String,
        default: Date.now
    }
});

const Hall = mongoose.model('Hall', HallSchema);

module.exports = Hall;