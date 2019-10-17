const mongoose = require('mongoose');

// Create ResidentialMaster Schema
const ResidentialMasterSchema = new mongoose.Schema({
    name: {
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

const ResidentialMaster = mongoose.model('ResidentialMaster', ResidentialMasterSchema);

module.exports = ResidentialMaster;