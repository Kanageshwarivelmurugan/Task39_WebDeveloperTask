const express = require('express');
const Student = require('../models/studentModel');
const Mentor = require('../models/mentorModel');

const {
  createStudent,
  assignMentorToStudent,
  changeMentorForStudent,
  getStudentsForMentor,
  getPreviousMentorForStudent,getAllStudents,
} = require('../controllers/studentContro');

const router = express.Router();

router.post('/create', createStudent);
router.post('/assign', assignMentorToStudent);
router.post('/change-mentor', changeMentorForStudent);
router.get('/mentor/:mentorId', getStudentsForMentor);
router.get('/all', getAllStudents);
router.get('/previous-mentor/:studentId', getPreviousMentorForStudent);
router.get('/:studentId/mentor', async (req, res) => {
    const { studentId } = req.params;

    try {
        
        const student = await Student.findById(studentId).populate('mentor', 'name email');
        
        if (!student || !student.mentor) {
            return res.status(404).json({ message: 'No mentor assigned to this student' });
        }

        res.status(200).json(student.mentor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving mentor' });
    }
});


// Fetch all students without mentors
router.get('/stuentwithoutmentor', async (req, res) => {
    try {
      // Find students where mentor is null (not assigned)
      const students = await Student.find({ mentor: null });
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching students', error });
    }
  });
  
  /* Fetch all mentors
  router.get('/api/mentors', async (req, res) => {
    try {
      const mentors = await Mentor.find();
      res.json(mentors);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching mentors', error });
    }
  });*/
  
  // Assign a student to a mentor
  router.post('/assign-mentor', async (req, res) => {
    try {
      const { studentIds, mentorId } = req.body;
  
      // Ensure mentor exists
      const mentor = await Mentor.findById(mentorId);
      if (!mentor) {
        return res.status(404).json({ message: 'Mentor not found' });
      }
  
      // Ensure all students exist and do not already have a mentor
      const students = await Student.find({ '_id': { $in: studentIds }, mentor: null });
      if (students.length !== studentIds.length) {
        return res.status(400).json({ message: 'Some students already have mentors' });
      }
  
      // Assign the mentor to all selected students
      await Student.updateMany({ '_id': { $in: studentIds } }, { mentor: mentorId });
  
      res.json({ message: 'Students successfully assigned to mentor' });
    } catch (error) {
      res.status(500).json({ message: 'Error assigning mentor', error });
    }
  });


module.exports = router;
