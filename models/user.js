const mongoose = require('../config/db');

// Company Schema
const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is must required']
        },
        password: {
            type: String,
            required: [true, 'MC_SYS_ID is must required']
        },
        role: {
            type: String,
            required: [true, 'role is must required']
        }
    },
    {
        timestamps: true
    }
);

const User = new mongoose.model('User', UserSchema);

module.exports = User;