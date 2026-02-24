const express = require("express")

const router = express.Router();
const userController = require("../controllers/user.Controller")
const {validateUser} = require("../middlewares/validateUser");
const { authenticateUser, userReadOnly } = require("../middlewares/authUser");
const { adminFullAccess, adminReadOnly } = require("../middlewares/authAdmin");

router.get("/", userController.sayHii )

router.get('/allusers', userController.allUsers)
router.post('/register-user',validateUser , userController.createUser)
router.put("/update/:id", userController.updateUser)
router.delete("/delete/:id", userController.deleteUser)

module.exports = router;