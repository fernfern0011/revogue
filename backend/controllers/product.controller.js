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
            var { productid } = req.body;
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
    create: async (req, res) => {
        try {
            const { accid, productname, description, price, size, quantity, images } = req.body
            const sql = `INSERT INTO product(productid, accid, productname, description, price, size, quantity, images)
                         VALUES(nextval('product_id_seq'), $1, $2, $3, $4, $5, $6, $7) RETURNING *`

            const { rows } = await postgre.query(sql, [accid, productname, description, price, size, quantity, images])

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
            const { productname, description, price, size, images, productid, accid } = req.body

            const sql = `UPDATE product SET productname = $1, description = $2, price = $3, size = $4, images = $5
                         WHERE productid = $6 and accid = $7 RETURNING *`

            const { rows } = await postgre.query(sql, [productname, description, price, size, images, productid, accid])

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