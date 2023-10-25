const express = require("express")
const router = express.Router()

const mySalesController = require("../controllers/mysales.controller")

router.get("/get-all-sales", mySalesController.getAllSales)

// When receive new orders from buyer; seller has option to confirm or cancel
router.get("/get-new-orders", mySalesController.getNewOrders) /* button shows 'Confirm Order' */
router.put("/confirm", mySalesController.confirm)
router.put("/cancel", mySalesController.cancel)

// When seller confirmed orders; seller to ship orders
router.get("/get-to-ship-orders", mySalesController.getToShipOrders) /* button shows 'Ship Order' */
router.put("/ship", mySalesController.ship)

// When sellers shipped orders and wait for buyers to receive
router.get("/get-inprogress-orders", mySalesController.getInProgressOrders)

// When orders are cancelled by the buyer or seller
router.get("/get-cancelled-orders", mySalesController.getCancelledOrders)

// When buyer received orders, and orders completed
router.get("/get-completed-orders", mySalesController.getCompletedOrders)

module.exports = router;