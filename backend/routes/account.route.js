const express = require("express");
const router = express.Router();

const accountController = require("../controllers/account.controller")

router.get("/get-all", accountController.getAll);
router.get("/:id", accountController.getById);
router.post("/create", accountController.create);

// router.get("/get-data", (req, res) => {
//     accountController.getAccount(function (err, result) {
//         if (!err) {
//             res.status(200).send({ result: result });
//         } else {
//             res.status(500).send({ err: err })
//         }
//     })
// })

// router.post("/create", (req, res) => {
//     var accEmail = req.body.email;
//     var accPassword = req.body.password;

//     accountController.createAccount(accEmail, accPassword, function (err, result) {
//         if (!err) {
//             res.status(201).send({ result: result });
//         } else {
//             res.status(500).send({ err: err })
//         }
//     })
// });

module.exports = router;