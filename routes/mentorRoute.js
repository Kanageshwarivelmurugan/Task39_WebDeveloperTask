const express = require('express');
const { createMentor, getAllMentors } = require('../controllers/mentorContro');

const router = express.Router();

router.post('/create', createMentor);
router.get('/all', getAllMentors);

module.exports = router;
