const express = require('express');
const router = express.Router();
const charactersController = require('../controllers/charactersController');

router.get('/', async (req, res) => {
    try {
        const filters = req.query;
        const characters = await charactersController.getCharacters(filters);
        res.json(characters);
    } catch (error) {
        console.error('Error fetching characters:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;