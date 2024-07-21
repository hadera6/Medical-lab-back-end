const express = require("express");
const passport = require("passport")
const router = express.Router();
const userController = require("../Controller/userController");
const upload = require("../config/multer")

Authorize = passport.authenticate("jwt", { session: false });

router.post("/admin/user/store", upload.single("profile_pic"), userController.StoreUser);
router.get("/admin/user", userController.AllUser);
router.get("/admin/user/:id", userController.OneUser);
router.put("/admin/user/update/:id", userController.UpdateUser);
router.put("/admin/account/pic/:id", upload.single("profile_pic"), userController.ChangeProfile);
router.put("/admin/user/change/password/:id", userController.ChangePassword);
router.put("/admin/user/delete/:id", userController.DeleteUser);

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public

router.post("/login", userController.LoginUser);

module.exports = router;