const express = require("express")

const router = express.Router();
const courseController = require("../controllers/course.Controller")
const { authenticateUser, lecturerMiddleware, adminMiddleware } = require("../middlewares/rbac");

router.get('/all', authenticateUser, courseController.getAllCourses)
router.post('/upload-course', authenticateUser, lecturerMiddleware, courseController.createCourse)
router.delete('/remove/:id', authenticateUser, adminMiddleware, courseController.deleteCourse)
router.put("/update/:id", authenticateUser, adminMiddleware, courseController.editCourse)
router.get("/course-details/:id", authenticateUser, courseController.getCourseById)

module.exports = router;
