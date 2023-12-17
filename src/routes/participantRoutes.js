const express = require('express');
const router = express.Router();
const participantController = require('../controllers/participantController');

router.post('/add', participantController.addParticipant);

module.exports = router;
