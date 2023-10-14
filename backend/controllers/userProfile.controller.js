require('dotenv').config()
const postgre = require('../config/database')

const userProfileController = {
    getAll: async (req, res) => {
        try {
            var sql = 'SELECT * FROM userprofile ORDER BY accid ASC'

            const { rows } = await postgre.query(sql)

            res.status(200).json({ data: rows })

        } catch (error) {
            res.status(404).json({ msg: error.msg })
        }
    },
    getById: async (req, res) => {
        try {
            var { accid } = req.body;
            var sql = 'SELECT * FROM userprofile WHERE accid = $1'

            const { rows } = await postgre.query(sql, [accid])

            if (rows[0]) {
                return res.status(200).json({ data: rows })
            }

            return res.status(404).json({ msg: "Account is not found" })

        } catch (error) {
            res.status(404).json({ msg: error.msg })
        }
    }
}

module.exports = userProfileController;