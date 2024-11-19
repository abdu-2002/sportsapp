// models/Attendance.js
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
    fixture: { type: mongoose.Schema.Types.ObjectId, ref: 'Fixture', required: true },
    status: { type: String, enum: ['present', 'absent'], required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Attendance', attendanceSchema);
