const express = require("express")
const {
  createSubject,
  getAllSubjects,
  deleteSubject,
} = require("../controllers/subject.Controller")

const router = express.Router();

router.post("/create", createSubject);
router.get("/all", getAllSubjects);
router.delete("/:id", deleteSubject);

module.exports = router;
