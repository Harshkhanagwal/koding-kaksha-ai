const express = require("express")

const router = express.Router();
const userController = require("../controllers/user.Controller")
const {validateUser} = require("../middlewares/validateUser");
const { authenticateUser, adminMiddleware, superadminMiddleware } = require("../middlewares/rbac");

router.get("/", userController.sayHii )

router.get('/allusers', authenticateUser, adminMiddleware, userController.allUsers)
router.post('/register-user', authenticateUser, adminMiddleware, validateUser, userController.createUser)
router.put("/readonly/:id", authenticateUser, superadminMiddleware, userController.updateUserReadOnly)
router.put("/update/:id", authenticateUser, adminMiddleware, userController.updateUser)
router.delete("/delete/:id", authenticateUser, adminMiddleware, userController.deleteUser)

module.exports = router;
