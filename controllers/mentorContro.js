const Mentor = require('../models/mentorModel');

// Create a Mentor
const createMentor = async (req, res) => {
  try {
    const { name, email } = req.body;
    const mentor = new Mentor({ name, email });
    await mentor.save();
    res.status(201).json(mentor);
  } catch (error) {
    res.status(500).json({ message: 'Error creating mentor', error });
  }
};

// Get all Mentors
const getAllMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.status(200).json(mentors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching mentors', error });
  }
};

module.exports = {
  createMentor,
  getAllMentors,
};
