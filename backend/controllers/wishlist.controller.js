require('dotenv').config()
const postgre = require('../config/database')

const wishlistController = {
    getAllWishlists: async (req, res) => {
        try {
            const { accid } = req.query;

            const sql = `SELECT productname, price, size, quantity, images FROM product p 
                        INNER JOIN wishlist w ON p.productid = w.productid AND w.accid = $1 ORDER BY w.created_on DESC;`

            const { rows } = await postgre.query(sql, [accid])

            if (rows[0]) {
                return res.status(200).json({ data: rows })
            }

            res.status(404).json({ msg: "No wishlist exists" })

        } catch (error) {
            res.status(404).json({ msg: error.msg })
        }
    },
    addNewWishlist: async (req, res) => {
        try {

            const { accid, productid } = req.body;
            const sql = `INSERT INTO wishlist(wishlistid, accid, productid) VALUES(nextval('wishlist_id_seq'), $1, $2) RETURNING *`;

            const { rows } = await postgre.query(sql, [accid, productid])

            if (rows[0]) {
                return res.status(200).json({ data: rows })
            }

            return res.status(404).json({ msg: "Failed to add a new wishlist" })
        } catch (error) {
            res.status(404).json({ msg: error.msg })
        }
    },
    deleteWishlist: async (req, res) => {
        try {

            const { wishlistid, accid } = req.body;
            const sql = `DELETE FROM wishlist WHERE wishlistid = $1 AND accid = $2 RETURNING *;`

            const { rows } = await postgre.query(sql, [wishlistid, accid])

            if (rows[0]) {
                return res.status(201).json({ msg: "Wishlist is deleted" })
            }

            return res.status(404).json({ msg: "Wishlist is not found" })

        } catch (error) {
            res.status(404).json({ msg: error.msg })
        }
    }
}

module.exports = wishlistController;