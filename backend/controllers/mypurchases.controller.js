require('dotenv').config()
const postgre = require('../config/database')

const myPurchasesController = {
    getAllPurchases: async (req, res) => {
        try {
            const { buyerid } = req.body;
            const sql = `SELECT * FROM mypurchases WHERE buyerid = $1 ORDER BY created_on ASC;`

            const { rows } = await postgre.query(sql, [buyerid])

            if (rows[0]) {
                return res.status(200).json({ data: rows })
            }

            res.status(404).json({ msg: "No item exists" })

        } catch (error) {
            res.status(404).json({ msg: error.msg })
        }
    },
    purchase: async (req, res) => {
        try {
            const { buyerid, sellerid, orderdetails, totalprice } = req.body;
            const makePurchase = `INSERT INTO mypurchases(purchaseid, buyerid, sellerid, orderdetails, totalprice, orderid)
                        VALUES(nextval('mypurchases_id_seq'), $1, $2, $3, $4, $5) RETURNING *;`
            const insertSaleOrder = `INSERT INTO mysales(salesid, buyerid, sellerid, orderdetails, totalprice, orderid)
                        VALUES(nextval('mysales_id_seq'), $1, $2, $3, $4, $5) RETURNING *;`

            // To random order id
            const randomOrderId = Math.random().toString(36).substring(2, 7);

            // placeholder orderid; waiting for stripe api to complete
            postgre.query(makePurchase, [buyerid, sellerid, orderdetails, totalprice, randomOrderId], async (error, result) => {
                // If there is an error
                // Else if fail to make a purchase
                // Else purchase successfully
                if (error) {
                    res.status(404).json({ msg: error.msg })
                } else {
                    if (result.rows[0]) {
                        const salesOrder = result.rows[0];

                        const { rows } = await postgre.query(insertSaleOrder, [salesOrder.buyerid, salesOrder.sellerid, salesOrder.orderdetails, salesOrder.totalprice, randomOrderId])

                        if (rows[0]) {
                            return res.status(201).json({ msg: "Order is placed" })
                        }

                        return res.status(404).json({ msg: "Failed to make a purchase" })

                    } else {
                        return res.status(404).json({ msg: "Failed to make a purchase" })
                    }
                }
            });

        } catch (error) {
            res.status(404).json({ msg: error.msg })
        }
    },
    getToBeConfirmedOrders: async (req, res) => {
        try {

            const { buyerid } = req.body;
            const sql = `SELECT * FROM mypurchases WHERE buyerid = $1 AND isreceived = $2 AND iscancelled = $3 AND isconfirmed = $4 AND iscompleted = $5 ORDER BY created_on DESC;`

            const { rows } = await postgre.query(sql, [buyerid, false, false, false, false])

            if (rows[0]) {
                return res.status(200).json({ data: rows })
            }

            res.status(404).json({ msg: "No orders exists" })

        } catch (error) {
            res.status(404).json({ msg: error.msg })
        }
    },
    getConfirmedOrders: async (req, res) => {
        try {

            const { buyerid } = req.body;
            const sql = `SELECT * FROM mypurchases WHERE buyerid = $1 AND isconfirmed = $2 ORDER BY created_on DESC;`

            const { rows } = await postgre.query(sql, [buyerid, true])

            if (rows[0]) {
                return res.status(200).json({ data: rows })
            }

            res.status(404).json({ msg: "No orders exists" })

        } catch (error) {
            res.status(404).json({ msg: error.msg })
        }
    },
    cancel: async (req, res) => {
        try {
            const { orderid, buyerid, sellerid } = req.body;
            const cancelPurchase = `UPDATE mypurchases SET iscancelled = $1, isreceived = $2, isconfirmed = $3, iscompleted = $4 WHERE orderid = $5 AND buyerid = $6 AND sellerid = $7 RETURNING *;`
            const updateSalesOrder = `UPDATE mysales SET iscancelled = $1, isshipped = $2, isconfirmed = $3, iscompleted = $4 WHERE orderid = $5 AND buyerid = $6 AND sellerid = $7 RETURNING *;`

            postgre.query(cancelPurchase, [true, false, false, false, orderid, buyerid, sellerid], async (error, result) => {
                // If there is an error
                // Else if fail to cancel
                // Else cancel successfully
                if (error) {
                    res.status(404).json({ msg: error.msg })
                } else {
                    if (result.rows[0]) {

                        const { rows } = await postgre.query(updateSalesOrder, [true, false, false, false, orderid, buyerid, sellerid])

                        if (rows[0]) {
                            return res.status(201).json({ msg: "Order is cancelled" })
                        }

                        return res.status(404).json({ msg: "Failed to cancel an order" })

                    } else {
                        return res.status(404).json({ msg: "Failed to cancel an order" })
                    }
                }
            })
        } catch (error) {
            res.status(404).json({ msg: error.msg })
        }
    },
    getToReceiveOrders: async (req, res) => {
        try {

            const { buyerid, sellerid, orderid } = req.body;
            const sql = `SELECT mp.* FROM mypurchases mp INNER JOIN mysales ms 
                         ON mp.orderid = ms.orderid AND mp.buyerid = ms.buyerid AND mp.sellerid = ms.sellerid
                         WHERE mp.buyerid = $1 AND mp.sellerid = $2 AND mp.orderid = $3 AND ms.isshipped = $4 AND mp.isreceived = $5;`

            const { rows } = await postgre.query(sql, [buyerid, sellerid, orderid, true, false])

            if (rows[0]) {
                return res.status(200).json({ data: rows })
            }

            res.status(404).json({ msg: "No orders exists" })

        } catch (error) {
            res.status(404).json({ msg: error.msg })
        }
    },
    receive: async (req, res) => {
        try {

            const { buyerid, sellerid, orderid } = req.body;
            const receiveOrder = `UPDATE mypurchases SET isreceived = $1, iscompleted = $2, iscancelled = $3, isconfirmed = $4 WHERE buyerid = $5 AND sellerid = $6 AND orderid = $7 RETURNING *;`
            const updateSalesOrder = `UPDATE mysales SET iscompleted = $1, isshipped = $2, iscancelled = $3, isconfirmed = $4 WHERE buyerid = $5 AND sellerid = $6 AND orderid = $7 RETURNING *;`

            postgre.query(receiveOrder, [true, true, false, false, buyerid, sellerid, orderid], async (error, result) => {
                // If there is an error
                // Else if fail to receive order
                // Else receive successfully
                if (error) {
                    res.status(404).json({ msg: error.msg })
                } else {
                    if (result.rows[0]) {

                        const { rows } = await postgre.query(updateSalesOrder, [true, true, false, false, buyerid, sellerid, orderid])

                        if (rows[0]) {
                            return res.status(201).json({ msg: "Order is received" })
                        }

                        return res.status(404).json({ msg: "Failed to update order status" })

                    } else {
                        return res.status(404).json({ msg: "Failed to update order status" })
                    }
                }
            })
        } catch (error) {
            res.status(404).json({ msg: error.msg })
        }
    },
    getCancelledOrders: async (req, res) => {
        try {

            const { buyerid } = req.body;
            const sql = `SELECT * from mypurchases WHERE buyerid = $1 AND iscancelled = $2 ORDER BY created_on DESC;`

            const { rows } = await postgre.query(sql, [buyerid, true])

            if (rows[0]) {
                return res.status(200).json({ data: rows })
            }

            res.status(404).json({ msg: "No orders exists" })


        } catch (error) {
            res.status(404).json({ msg: error.msg })
        }
    },
    getCompletedOrders: async (req, res) => {
        try {

            const { buyerid } = req.body;
            const sql = `SELECT * from mypurchases WHERE buyerid = $1 AND iscompleted = $2 ORDER BY created_on DESC;`

            const { rows } = await postgre.query(sql, [buyerid, true])

            if (rows[0]) {
                return res.status(200).json({ data: rows })
            }

            res.status(404).json({ msg: "No orders exists" })


        } catch (error) {
            res.status(404).json({ msg: error.msg })
        }
    }
}

module.exports = myPurchasesController;