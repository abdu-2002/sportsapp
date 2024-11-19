const express = require('express');
const Team = require('../model/Team');
const auth = require('../middleware/auth');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Create a team
router.post('/team', auth('coach'), async (req, res) => {
    try {
        const team = new Team(req.body);
        await team.save();
        res.status(201).json(team);
    } catch (error) {
        console.error("Error creating team:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get all teams
router.get('/team', async (req, res) => {
    try {
        const teams = await Team.find();
        res.json(teams);
    } catch (error) {
        console.error("Error fetching teams:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update a team
router.put('/team/:id', auth('coach'), async (req, res) => {
    try {
        const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!team) return res.status(404).json({ message: 'Team not found' });
        res.json(team);
    } catch (error) {
        console.error("Error updating team:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete a team
router.delete('/team/:id', auth('coach'), async (req, res) => {
    try {
        const team = await Team.findByIdAndDelete(req.params.id);
        if (!team) return res.status(404).json({ message: 'Team not found' });
        res.status(204).json({ message: 'Deleted' });
    } catch (error) {
        console.error("Error deleting team:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
