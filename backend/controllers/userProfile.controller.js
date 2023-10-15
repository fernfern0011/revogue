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
    },
    uploadProfileImage: async (req, res) => {
        try {
            var { imageUrl, imagePublicId, accid } = req.body;
            var sql = 'UPDATE userprofile set uprofileimage = $2, imagepublicid = $3 where accid = $1 RETURNING *';

            const { rows } = await postgre.query(sql, [accid, imageUrl, imagePublicId])

            if (rows[0]) {
                return res.status(200).json({ data: rows })
            }

            return res.status(404).json({ msg: "Failed to upload profile image" })

        } catch (error) {
            res.status(404).json({ msg: error.msg })
        }
    }
}

module.exports = userProfileController;