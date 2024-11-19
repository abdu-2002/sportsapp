// routes/fixture.js
const express = require('express');
const auth = require('../middleware/auth');
const Fixture = require('../model/Fixture');
const Team = require('../model/Team');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}));


// Create a new fixture (coach only)
router.post('/:teamId', auth('coach'), async (req, res) => {
    const { opponent, date, location } = req.body;
    try {
        const team = await Team.findById(req.params.teamId);
        if (!team) return res.status(404).json({ message: 'Team not found' });

        const fixture = new Fixture({ opponent, date, location, team: team._id });
        await fixture.save();

        res.status(201).json(fixture);
    } catch (error) {
        res.status(500).json({ message: 'Error creating fixture', error: error.message });
    }
});

// Get all fixtures for a team
router.get('/:teamId', auth(), async (req, res) => {
    try {
        const fixtures = await Fixture.find({ team: req.params.teamId });
        res.json(fixtures);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching fixtures', error: error.message });
    }
});

// Update a fixture (coach only)
router.put('/:teamId/:fixtureId', auth('coach'), async (req, res) => {
    const { opponent, date, location } = req.body;
    try {
        const fixture = await Fixture.findByIdAndUpdate(
            req.params.fixtureId,
            { opponent, date, location },
            { new: true }
        );
        if (!fixture) return res.status(404).json({ message: 'Fixture not found' });

        res.json(fixture);
    } catch (error) {
        res.status(500).json({ message: 'Error updating fixture', error: error.message });
    }
});

// Delete a fixture (coach only)
router.delete('/:teamId/:fixtureId', auth('coach'), async (req, res) => {
    try {
        const fixture = await Fixture.findByIdAndDelete(req.params.fixtureId);
        if (!fixture) return res.status(404).json({ message: 'Fixture not found' });

        res.json({ message: 'Fixture deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting fixture', error: error.message });
    }
});

module.exports = router;
