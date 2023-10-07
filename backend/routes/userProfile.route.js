const express = require("express");
const router = express.Router();

const userProfileController = require("../controllers/userProfile.controller")

router.get("/get-all-details", userProfileController.getAll);
router.get("/", userProfileController.getById)

module.exports = router;