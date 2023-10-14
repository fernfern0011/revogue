const express = require("express")
const router = express.Router()

const productController = require("../controllers/product.controller")

router.get("/get-all-products", productController.getAllProducts)
router.get("/", productController.getProductById)
router.post("/create", productController.create)
router.put("/update", productController.updateById)
router.delete("/delete", productController.deleteById)

module.exports = router;