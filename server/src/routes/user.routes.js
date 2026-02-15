const express = require("express")

const router = express.Router();
const userController = require("../controllers/user.Controller")
const {validateUser} = require("../middlewares/validateUser")

router.get("/", userController.sayHii )

router.get('/allusers', userController.allUsers)
router.post('/register-user',validateUser , userController.createUser)



module.exports = router;