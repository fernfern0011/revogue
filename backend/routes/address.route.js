const express = require("express")
const router = express.Router()

const addressController = require("../controllers/address.controller")

router.get("/get-all-addresses", addressController.getAllAddresses)
router.get("/get-default-address", addressController.getDefaultAddress)
router.post("/add-new-address", addressController.addNewAddress)
router.put("/update", addressController.updateAddress)
router.put("/set-default", addressController.setDefault)
router.delete("/delete", addressController.delete)

module.exports = router;