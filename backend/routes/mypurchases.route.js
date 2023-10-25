const express = require("express")
const router = express.Router()

const myPurchasesController = require("../controllers/mypurchases.controller")

router.get("/get-all-purchases", myPurchasesController.getAllPurchases)
router.post("/purchase", myPurchasesController.purchase)

// When seller has yet to confirm orders; buyer has option to cancel orders
router.get("/get-tobe-confirmed-orders", myPurchasesController.getToBeConfirmedOrders) /* button show 'Cancel' */
router.put("/cancel", myPurchasesController.cancel)

// When seller has confirmed orders
router.get("/get-confirmed-orders", myPurchasesController.getConfirmedOrders) /* 'Cancel' button is disabled */

// When seller has shipped orders; buyer has option to receive orders 
router.get("/get-to-receive-orders", myPurchasesController.getToReceiveOrders) /* button show 'Receive' */
router.put("/receive", myPurchasesController.receive)

// When orders are cancelled by the buyer or seller
router.get("/get-cancelled-orders", myPurchasesController.getCancelledOrders)

// When buyer received orders, and orders completed
router.get("/get-completed-orders", myPurchasesController.getCompletedOrders)

module.exports = router;