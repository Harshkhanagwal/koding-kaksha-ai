const express = require("express")
const {
  createSubject,
  getAllSubjects,
  deleteSubject,
} = require("../controllers/subject.Controller")
const { authenticateUser, lecturerMiddleware, adminMiddleware } = require("../middlewares/rbac");

const router = express.Router();

router.post("/create", authenticateUser, lecturerMiddleware, createSubject);
router.get("/all", authenticateUser, getAllSubjects);
router.delete("/:id", authenticateUser, adminMiddleware, deleteSubject);

module.exports = router;
