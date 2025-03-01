// models/Team.js
const mongoose = require('mongoose');
const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    coach: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to coach

    // players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }]
});
module.exports = mongoose.model('Team', teamSchema);
