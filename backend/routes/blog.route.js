const express = require("express")
const router = express.Router()

const blogController = require('../controllers/blog.controller')

router.post("/create-blog", blogController.createBlog)
router.get("/get-all-blogs", blogController.getAll)
router.get("/get-blogs", blogController.getBlogsByUserId)

module.exports = router