// routes/player.js
const express = require('express');
const auth = require('../middleware/auth');
const Team = require('../model/Team');
const Player = require('../model/Player');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}));


// Add a player to a team (coach only)
router.post('/:teamId', auth('coach'), async (req, res) => {
    const { name, position, age } = req.body;
    try {
        const team = await Team.findById(req.params.teamId);
        if (!team) return res.status(404).json({ message: 'Team not found' });

        const player = new Player({ name, position, age });
        await player.save();

        team.players.push(player._id);
        await team.save();

        res.status(201).json(player);
    } catch (error) {
        res.status(500).json({ message: 'Error adding player', error: error.message });
    }
});

// Get all players in a team
router.get('/:teamId', auth(), async (req, res) => {
    try {
        const team = await Team.findById(req.params.teamId).populate('players');
        if (!team) return res.status(404).json({ message: 'Team not found' });
        
        res.json(team.players);  // Return the list of players
    } catch (error) {
        res.status(500).json({ message: 'Error fetching players', error: error.message });
    }
});

// Update a player in a team (coach only)
router.put('/:teamId/:playerId', auth('coach'), async (req, res) => {
    const { name, position, age } = req.body;
    try {
        const player = await Player.findByIdAndUpdate(req.params.playerId, { name, position, age }, { new: true });
        if (!player) return res.status(404).json({ message: 'Player not found' });
        
        res.json(player);
    } catch (error) {
        res.status(500).json({ message: 'Error updating player', error: error.message });
    }
});

// Delete a player from a team (coach only)
router.delete('/:teamId/:playerId', auth('coach'), async (req, res) => {
    try {
        const team = await Team.findById(req.params.teamId);
        if (!team) return res.status(404).json({ message: 'Team not found' });

        // Remove player from team players array
        team.players = team.players.filter(player => player.toString() !== req.params.playerId);
        await team.save();

        // Remove player from Player collection
        await Player.findByIdAndDelete(req.params.playerId);

        res.json({ message: 'Player deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting player', error: error.message });
    }
});

module.exports = router;
