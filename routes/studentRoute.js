const express = require('express');
const {
  createStudent,
  assignMentorToStudent,
  changeMentorForStudent,
  getStudentsForMentor,
  getPreviousMentorForStudent,
} = require('../controllers/studentContro');

const router = express.Router();

router.post('/create', createStudent);
router.post('/assign', assignMentorToStudent);
router.post('/change-mentor', changeMentorForStudent);
router.get('/mentor/:mentorId', getStudentsForMentor);
router.get('/previous-mentor/:studentId', getPreviousMentorForStudent);

module.exports = router;
