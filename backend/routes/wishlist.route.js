const express = require("express")
const router = express.Router()

const wishlistController = require("../controllers/wishlist.controller")

router.get("/get-all-wishlists", wishlistController.getAllWishlists)
router.post("/create", wishlistController.addNewWishlist)
router.delete("/delete", wishlistController.deleteWishlist)

module.exports = router;