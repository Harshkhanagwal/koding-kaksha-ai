const Subject = require('../models/subjectModel')

const createSubject = async (req, res) => {
  try {
    const { name, color } = req.body;   // ✅ include color

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Subject name is required",
      });
    }

    const existingSubject = await Subject.findOne({
      name: name.toLowerCase(),
    });

    if (existingSubject) {
      return res.status(400).json({
        success: false,
        message: "Subject already exists",
      });
    }

    const subject = await Subject.create({
      name: name.toLowerCase(),
      color: color || "gray", 
    });

    res.status(201).json({
      success: true,
      message: "Subject created successfully",
      data: subject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating subject",
      error: error.message,
    });
  }
};




 const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: subjects.length,
      data: subjects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching subjects",
      error: error.message,
    });
  }
};


const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;

    const subject = await Subject.findByIdAndDelete(id);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Subject deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting subject",
      error: error.message,
    });
  }
};


module.exports = {
    createSubject,
  getAllSubjects,
  deleteSubject,
}