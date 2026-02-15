const express = require("express");
const healthRouter = require("./health.routes");
const userRouter = require("./user.routes")
const authRouter = require("./auth.routes")


const router = express.Router();

router.use("/health", healthRouter);
router.use("/users", userRouter)
router.use("/auth", authRouter )

module.exports = router;
