const express = require("express");
const healthRouter = require("./health.routes");
const userRouter = require("./user.routes")
const authRouter = require("./auth.routes")
const courseRouter = require('./course.routes')
const subjectRouter = require('./subject.routes')
const router = express.Router();

router.use("/health", healthRouter);
router.use("/users", userRouter)
router.use("/course",  courseRouter)
router.use("/auth", authRouter )
router.use("/subject", subjectRouter )

module.exports = router;
