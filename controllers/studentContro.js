const Student = require('../models/studentModel');
const Mentor = require('../models/mentorModel');

// Create a Student
const createStudent = async (req, res) => {
  try {
    const { name, email } = req.body;
    const student = new Student({ name, email });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error creating student', error });
  }
};
// Get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error });
  }
};


// Assign a Mentor to a Student
const assignMentorToStudent = async (req, res) => {
  try {
    const { studentId, mentorId } = req.body;
    const student = await Student.findById(studentId);
    const mentor = await Mentor.findById(mentorId);

    if (!student || !mentor) {
      return res.status(404).json({ message: 'Student or Mentor not found' });
    }

    student.mentor = mentorId;
    await student.save();

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error assigning mentor', error });
  }
};

// Change Mentor for a particular Student
const changeMentorForStudent = async (req, res) => {
  try {
    const { studentId, mentorId } = req.body;
    const student = await Student.findById(studentId);
    const mentor = await Mentor.findById(mentorId);

    if (!student || !mentor) {
      return res.status(404).json({ message: 'Student or Mentor not found' });
    }

    student.mentor = mentorId;
    await student.save();

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error changing mentor', error });
  }
};

// Get all Students for a particular Mentor
const getStudentsForMentor = async (req, res) => {
  try {
    const mentorId = req.params.mentorId;
    const students = await Student.find({ mentor: mentorId }).populate('mentor');
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error });
  }
};

// Get the previous Mentor for a particular Student
const getPreviousMentorForStudent = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const student = await Student.findById(studentId).populate('mentor');

    if (!student || !student.mentor) {
      return res.status(404).json({ message: 'No mentor assigned to this student' });
    }

    res.status(200).json(student.mentor);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching mentor', error });
  }
};

module.exports = {
  createStudent,
  assignMentorToStudent,
  changeMentorForStudent,
  getStudentsForMentor,
  getPreviousMentorForStudent,
  getAllStudents ,
 
};
