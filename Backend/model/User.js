// models/User.js
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNo: {type:Number},
    role: { type: String, enum: ['coach', 'player'], required: true }
});
module.exports = mongoose.model('User', userSchema);
