// routes/attendance.js
const express = require('express');
const Attendance = require('../model/Attendance');
const auth = require('../middleware/auth');
const router = express.Router();

// Add attendance for a player in a fixture (coach only)
router.post('/', auth('coach'), async (req, res) => {
    const { playerId, fixtureId, status } = req.body;
    try {
        const attendance = new Attendance({
            player: playerId,
            fixture: fixtureId,
            status
        });
        await attendance.save();
        res.status(201).json(attendance);
    } catch (error) {
        res.status(400).json({ error: 'Error adding attendance record' });
    }
});

// Get attendance for a fixture (viewable by coaches and players)
router.get('/fixture/:fixtureId', auth(['coach', 'player']), async (req, res) => {
    try {
        const attendances = await Attendance.find({ fixture: req.params.fixtureId })
            .populate('player', 'name position')
            .exec();
        res.status(200).json(attendances);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving attendance records' });
    }
});

module.exports = router;
