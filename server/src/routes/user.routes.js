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


// // Any logged-in user
// router.get("/profile", authenticateUser, userController.getProfile);
// router.post("/create-user", adminFullAccess, createUser);
// router.put("/update-user/:id", adminFullAccess, updateUser);
// router.delete("/delete-user/:id", adminFullAccess, deleteUser);

// // Read-only access
// router.get("/all-users", adminReadOnly, getAllUsers);
// // Only read-only users
// router.get("/view-dashboard", userReadOnly, viewDashboard);

module.exports = router;