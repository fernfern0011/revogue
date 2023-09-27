const postgre = require('../config/database')
const accountController = {
    getAll: async (req, res) => {
        try {
            var sql = 'SELECT * FROM account ORDER BY accid ASC'

            const { rows } = await postgre.query(sql)

            res.json({ msg: "OK", data: rows })
        } catch (error) {
            res.json({ msg: error.msg })
        }
    },
    getById: async (req, res) => {
        try {
            var { accid } = req.body;
            var sql = 'SELECT * FROM account WHERE accid = $1'

            const { rows } = await postgre.query(sql, [accid])

            if (rows[0]) {
                return res.json({ msg: "OK", data: rows })
            }

            res.status(404).json({ msg: "not found" })
        } catch (error) {
            res.json({ msg: error.msg })
        }
    },
    create: async (req, res) => {
        try {
            const { accemail, accpass } = req.body
            const sql = 'INSERT INTO account(accemail, accpass) VALUES($1, $2) RETURNING *'

            const { rows } = await postgre.query(sql, [accemail, accpass])

            res.json({ msg: "OK", data: rows[0] })

        } catch (error) {
            res.json({ msg: error.msg })
        }
    }
    // createAccount: async (req, res) => {
    //     try {
    //         var sql = 'SELECT * FROM public.account ORDER BY accid ASC'

    //         const { rows } = await postgre.query(sql)

    //         res.json({ msg: "OK", data: rows })
    //     } catch (error) {
    //         res.json({ msg: error.msg })
    //     }
    // createAccount: async (accEmail, accPass, callback) => {
    //     const sql = `INSERT INTO account("accId", "accEmail", "accPass") VALUES($1, $2, $3);`;

    //     postgre.query(sql, [nextval('account_id_seq'), accEmail, accPass], (err, result) => {
    //         if (err) {
    //             return callback(err, null);
    //         } else {
    //             return callback(null, result);
    //         };
    //     })
    // }
};


module.exports = accountController;