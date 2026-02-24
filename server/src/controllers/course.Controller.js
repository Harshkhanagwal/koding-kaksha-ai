const Course = require("../models/courseModel");
const Subject = require("../models/subjectModel");
const mongoose = require("mongoose");


const getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find()
      .populate("subject", "name color"); 

    res.status(200).json({
      success: true,
      data: allCourses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const createCourse = async (req, res) => {
  try {
    const { title, subject, content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(subject)) {
      return res.status(400).json({
        success: false,
        message: "Invalid subject ID",
      });
    }

    const subjectExists = await Subject.findById(subject);
    if (!subjectExists) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    const createdCourse = await Course.create({
      title,
      subject,
      content,
    });

    const populatedCourse = await createdCourse.populate(
      "subject",
      "name color"
    );

    res.status(201).json({
      success: true,
      message: "Course uploaded successfully",
      data: populatedCourse,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


const getCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id)
      .populate("subject", "name color");

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
};


const editCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      req.body,
      { new: true } 
    ).populate("subject", "name color");

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    await course.deleteOne();

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  editCourse,
  deleteCourse,
};
