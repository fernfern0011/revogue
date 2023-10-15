const express = require("express");
const router = express.Router();

const userProfileController = require("../controllers/userProfile.controller")

router.get("/get-all-details", userProfileController.getAll);
router.get("/", userProfileController.getById)
router.put('/upload-profile-image', userProfileController.uploadProfileImage)

module.exports = router;