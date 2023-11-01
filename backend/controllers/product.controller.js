require('dotenv').config()
const postgre = require('../config/database')

const productController = {
    getAllProducts: async (req, res) => {
        try {
            var sql = 'SELECT * FROM product ORDER BY productid ASC'

            const { rows } = await postgre.query(sql)

            res.status(200).json({ data: rows })

        } catch (error) {
            res.status(404).json({ msg: error.msg })
        }
    },
    getProductById: async (req, res) => {
        try {
            var { productid } = req.query;
            var sql = 'SELECT * FROM product WHERE productid = $1'

            const { rows } = await postgre.query(sql, [productid])

            if (rows[0]) {
                return res.status(200).json({ data: rows })
            }

            res.status(404).json({ msg: "Product is not found" })

        } catch (error) {
            res.status(404).json({ msg: error.msg })
        }
    },
    getProductByAccId: async (req, res) => {
        try {
            var { accid } = req.query;
            var sql = 'SELECT * FROM product WHERE accid = $1'

            const { rows } = await postgre.query(sql, [accid])

            if (rows[0]) {
                return res.status(200).json({ data: rows })
            }

            res.status(404).json({ msg: "Product is not found" })

        } catch (error) {
            res.status(404).json({ msg: error.msg })
        }
    },
    create: async (req, res) => {
        try {
            const { accid, productname, description, price, size, quantity, category, forwomen, formen, images } = req.body
            const sql = `INSERT INTO product(productid, accid, productname, description, price, size, quantity, category, forwomen, formen, images)
                         VALUES(nextval('product_id_seq'), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`

            const { rows } = await postgre.query(sql, [accid, productname, description, price, size, 1, category, forwomen, formen, images])

            if (rows[0]) {
                return res.status(201).json({ msg: "Product is created", data: rows[0] })
            }

            return res.status(404).json({ msg: "Failed to create a product" })

        } catch (error) {
            res.status(404).json({ msg: error.msg })
        }
    },
    updateProductById: async (req, res) => {
        try {
            const { productname, description, price, size, category, forwomen, formen, images, productid, accid } = req.body

            const sql = `UPDATE product SET productname = $1, description = $2, price = $3, size = $4, category = $5, forwomen = $6, formen = $7, images = $8
                         WHERE productid = $9 and accid = $10 RETURNING *`

            const { rows } = await postgre.query(sql, [productname, description, price, size, category, forwomen, formen, images, productid, accid])

            if (rows[0]) {
                return res.status(201).json({ msg: "Product is updated", data: rows[0] })
            }

            return res.status(404).json({ msg: "Failed to update a product" })

        } catch (error) {
            res.status(404).json({ msg: error.msg })
        }
    },
    deleteProductById: async (req, res) => {
        try {
            const { productid } = req.body;
            const sql = 'DELETE FROM product where productid = $1 RETURNING *'

            const { rows } = await postgre.query(sql, [productid])

            if (rows[0]) {
                return res.status(200).json({ msg: "Product is deleted" })
            }

            return res.status(404).json({ msg: "Product is not found" })

        } catch (error) {
            res.status(404).json({ msg: error.msg })
        }
    }
}

module.exports = productController;