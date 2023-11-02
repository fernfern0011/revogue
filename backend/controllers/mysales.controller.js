require('dotenv').config()
const postgre = require('../config/database')

const mySalesController = {
    getAllSales: async (req, res) => {
        try {

            const { sellerid } = req.query;
            const sql = `SELECT * FROM mysales WHERE sellerid = $1 ORDER BY created_on ASC;`

            const { rows } = await postgre.query(sql, [sellerid])

            if (rows[0]) {
                return res.status(200).json({ data: rows })
            }

            res.status(404).json({ msg: "No item exists" })


        } catch (error) {
            res.status(404).json({ msg: error.msg })
        }

    },
    getNewOrders: async (req, res) => {
        try {

            const { sellerid } = req.query;
            const sql = `SELECT * from mysales WHERE sellerid = $1 AND isshipped = $2 AND iscancelled = $3 AND isconfirmed = $4 AND iscompleted = $5 ORDER BY created_on ASC;`

            const { rows } = await postgre.query(sql, [sellerid, false, false, false, false])

            if (rows[0]) {
                return res.status(200).json({ data: rows })
            }

            res.status(404).json({ msg: "No new orders" })
        } catch (error) {
            res.status(404).json({ msg: error.msg })
        }
    },
    confirm: async (req, res) => {
        try {

            const { buyerid, sellerid, orderid } = req.body;
            const confirmOrder = `UPDATE mysales SET isconfirmed = $1, isshipped = $2, iscancelled = $3, iscompleted = $4 WHERE buyerid = $5 AND sellerid = $6 AND orderid = $7 RETURNING *;`
            const updatePurchasesOrder = `UPDATE mypurchases SET isconfirmed = $1, isreceived = $2, iscancelled = $3, iscompleted = $4 WHERE buyerid = $5 AND sellerid = $6 AND orderid = $7 RETURNING *;`

            postgre.query(confirmOrder, [true, false, false, false, buyerid, sellerid, orderid], async (error, result) => {
                // If there is an error
                // Else if fail to confirm order
                // Else confirm successfully
                if (error) {
                    res.status(404).json({ msg: error.msg })
                } else {
                    if (result.rows[0]) {

                        const { rows } = await postgre.query(updatePurchasesOrder, [true, false, false, false, buyerid, sellerid, orderid])

                        if (rows[0]) {
                            return res.status(201).json({ msg: "Order is confirmed" })
                        }

                        return res.status(404).json({ msg: "Failed to confirm order" })

                    } else {
                        return res.status(404).json({ msg: "Failed to confirm order" })
                    }
                }
            })

        } catch (error) {
            res.status(404).json({ msg: error.msg })
        }
    },
    cancel: async (req, res) => {
        try {
            const { orderid, buyerid, sellerid } = req.body;
            const cancelPurchase = `UPDATE mysales SET iscancelled = $1, isshipped = $2, isconfirmed = $3, iscompleted = $4 WHERE orderid = $5 AND buyerid = $6 AND sellerid = $7 RETURNING *;`
            const updateSalesOrder = `UPDATE mypurchases SET iscancelled = $1, isreceived = $2, isconfirmed = $3, iscompleted = $4 WHERE orderid = $5 AND buyerid = $6 AND sellerid = $7 RETURNING *;`

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
    getToShipOrders: async (req, res) => {
        try {

            const { sellerid } = req.query;
            const sql = `SELECT * from mysales WHERE sellerid = $1 AND isconfirmed = $2 ORDER BY created_on ASC;`

            const { rows } = await postgre.query(sql, [sellerid, true])

            if (rows[0]) {
                return res.status(200).json({ data: rows })
            }

            return res.status(404).json({ msg: "No orders exists" })

        } catch (error) {
            res.status(404).json({ msg: error.msg })
        }
    },
    ship: async (req, res) => {
        try {

            const { orderid, buyerid, sellerid } = req.body;
            const shipOrder = `UPDATE mysales SET isshipped = $1, isconfirmed = $2 WHERE orderid = $3 AND buyerid = $4 AND sellerid = $5 RETURNING *;`
            const updatePurchasesOrder = `UPDATE mypurchases SET isconfirmed = $1 WHERE orderid = $2 AND buyerid = $3 AND sellerid = $4 RETURNING *;`

            postgre.query(shipOrder, [true, false, orderid, buyerid, sellerid], async (error, result) => {
                // If there is an error
                // Else if fail to ship
                // Else ship successfully
                if (error) {
                    res.status(404).json({ msg: error.msg })
                } else {
                    if (result.rows[0]) {

                        const { rows } = await postgre.query(updatePurchasesOrder, [false, orderid, buyerid, sellerid]);

                        if (rows[0]) {
                            return res.status(201).json({ msg: "Order is shipped" })
                        }

                        return res.status(404).json({ msg: "Failed to ship an order" })
                    } else {
                        return res.status(404).json({ msg: "Failed to ship an order" })
                    }
                }
            })
        } catch (error) {
            res.status(404).json({ msg: error.msg })
        }
    },
    getInProgressOrders: async (req, res) => {
        try {

            const { buyerid, sellerid, orderid } = req.query;
            const sql = `SELECT * FROM mysales ms INNER JOIN mypurchases mp ON 
                        mp.orderid = ms.orderid AND mp.buyerid = ms.buyerid AND mp.sellerid = ms.sellerid
                        WHERE ms.buyerid = $1 AND ms.sellerid = $2 AND ms.orderid = $3 AND ms.isshipped = $4 AND mp.isreceived = $5;`;

            const { rows } = await postgre.query(sql, [buyerid, sellerid, orderid, true, false])

            if (rows[0]) {
                return res.status(200).json({ data: rows })
            }

            res.status(404).json({ msg: "No orders exists" })

        } catch (error) {
            res.status(404).json({ msg: error.msg })
        }
    },
    getCancelledOrders: async (req, res) => {
        try {

            const { sellerid } = req.query;
            const sql = `SELECT * from mysales WHERE sellerid = $1 AND iscancelled = $2 ORDER BY created_on DESC;`

            const { rows } = await postgre.query(sql, [sellerid, true])

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

            const { sellerid } = req.query;
            const sql = `SELECT * from mysales WHERE sellerid = $1 AND iscompleted = $2 ORDER BY created_on DESC;`

            const { rows } = await postgre.query(sql, [sellerid, true])

            if (rows[0]) {
                return res.status(200).json({ data: rows })
            }

            res.status(404).json({ msg: "No orders exists" })


        } catch (error) {
            res.status(404).json({ msg: error.msg })
        }
    }
}

module.exports = mySalesController;