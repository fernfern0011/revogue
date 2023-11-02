require('dotenv').config()
const postgre = require('../config/database')

const cartController = {
    getAllCartItems: async (req, res) => {
        try {
            const { accid } = req.query;
            const sql = `SELECT cartitemid, productname, productid, price, size, quantity, images FROM product p 
                        INNER JOIN cart c ON p.productid = c.productid AND c.accid = $1 ORDER BY c.created_on DESC;`

            const { rows } = await postgre.query(sql, [accid])

            if (rows[0]) {
                return res.status(200).json({ data: rows })
            }

            res.status(404).json({ msg: "No item exists" })

        } catch (error) {
            res.status(404).json({ msg: error.msg })
        }
    },
    addToCart: async (req, res) => {
        try {

            const { accid, productid } = req.body;
            const sql = `INSERT INTO cart(cartitemid, accid, productid) VALUES(nextval('cart_id_seq'), $1, $2) RETURNING *`;

            const { rows } = await postgre.query(sql, [accid, productid])

            if (rows[0]) {
                return res.status(200).json({ data: rows })
            }

            return res.status(404).json({ msg: "Failed to add an item to cart" })

        } catch (error) {
            res.status(404).json({ msg: error.msg })
        }
    },
    deleteItem: async (req, res) => {
        try {

            const { cartitemid, accid } = req.body;
            const sql = `DELETE FROM cart WHERE cartitemid = $1 AND accid = $2 RETURNING *;`

            const { rows } = await postgre.query(sql, [cartitemid, accid])

            if (rows[0]) {
                return res.status(201).json({ msg: "Item is deleted" })
            }

            return res.status(404).json({ msg: "Item is not found" })

        } catch (error) {
            res.status(404).json({ msg: error.msg })
        }
    }
}

module.exports = cartController;