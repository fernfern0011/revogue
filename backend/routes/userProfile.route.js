const express = require("express");
const router = express.Router();

const userProfileController = require("../controllers/userProfile.controller")

router.get("/get-all-userprofile", userProfileController.getAllUserProfile);
router.get("/", userProfileController.getUserProfileById)
router.put('/upload-profile-image', userProfileController.uploadProfileImage)

module.exports = router;