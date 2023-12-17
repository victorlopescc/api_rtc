const express = require('express');
const router = express.Router();
const EventController = require('../controllers/EventController');
const authMiddleware = require('../utils/authMiddleware');

router.post('/create', authMiddleware, EventController.create);
router.get('/list', EventController.list);
router.get('/:eventId', EventController.getById);

module.exports = router;
