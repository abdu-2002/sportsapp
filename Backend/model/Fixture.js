// models/Fixture.js
const mongoose = require('mongoose');

const fixtureSchema = new mongoose.Schema({
    opponent: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    
});

module.exports = mongoose.model('Fixture', fixtureSchema);
