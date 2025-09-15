import Marks from '../models/Result.js';

// POST: Add marks for a user
export const addMarks = async (req, res) => {
  const {maxMarks, marksObtained,Topic } = req.body;
  const userId = req.user.userId; // Make sure this is set via auth middleware
    console.log(userId);
  try {
    const newMarks = new Marks({
      maxMarks,
      marksObtained,
      userId,
      Topic
    });

    await newMarks.save();
    res.status(201).json({ message: 'Marks added successfully', data: newMarks });
  } catch (error) {
    console.error('Add Marks Error:', error);
    res.status(500).json({ error: 'Failed to add marks' });
  }
};

// GET: Get all marks for a user
export const getMarks = async (req, res) => {
  const userId = req.userId;

  try {
    const marksList = await Marks.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(marksList);
  } catch (error) {
    console.error('Get Marks Error:', error);
    res.status(500).json({ error: 'Failed to fetch marks' });
  }
};
