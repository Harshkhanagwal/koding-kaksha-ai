const express = require("express")

const router = express.Router();
const courseController = require("../controllers/course.Controller")

router.get('/all', courseController.getAllCourses)
router.post('/upload-course', courseController.createCourse)
router.delete('/remove/:id', courseController.deleteCourse)
router.put("/update/:id", courseController.editCourse)
router.get("/course-details/:id",courseController.getCourseById)

module.exports = router;