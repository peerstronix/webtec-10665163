const mongoose = require('mongoose');

// Create Room Schema
const RoomSchema = new mongoose.Schema({

    roomID: {
        type: String,
        require: true
    },

    hallID: {
        type: mongoose.Schema.ObjectId,
        ref: Hall
    },

    date: {
        type: String,
        default: Date.now
    }
});

const room = mongoose.model('Room', RoomSchema);

module.exports = room;