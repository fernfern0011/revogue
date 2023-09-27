require('dotenv').config()
const postgre = require('../config/database')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const accountController = {
    getAll: async (req, res) => {
        try {
            var sql = 'SELECT * FROM account ORDER BY accid ASC'

            const { rows } = await postgre.query(sql)

            res.status(200).json({ data: rows })
        } catch (error) {
            res.status(404).json({ msg: error.msg })
        }
    },
    getById: async (req, res) => {
        try {
            var { accid } = req.body;
            var sql = 'SELECT * FROM account WHERE accid = $1'

            const { rows } = await postgre.query(sql, [accid])

            if (rows[0]) {
                return res.status(200).json({ data: rows })
            }

            res.status(404).json({ msg: "Account is not found" })
        } catch (error) {
            res.json({ msg: error.msg })
        }
    },
    create: async (req, res) => {
        try {
            const { accemail, accpass } = req.body
            const hashedPassword = await bcrypt.hash(accpass, 10);

            const sql = `INSERT INTO account(accid, accemail, accpass)
                         VALUES(nextval('account_id_seq'), $1, $2) RETURNING *`

            const { rows } = await postgre.query(sql, [accemail.toLowerCase(), hashedPassword])

            if (rows[0]) {
                return res.status(201).json({ msg: "Account is created" })
            }

            return res.status(404).json({ msg: "Failed to create an account" })

        } catch (error) {
            res.json({ msg: error.msg })
        }
    },
    verifyAccount: async (req, res) => {
        try {
            var { accemail, accpass } = req.body;
            var sql = `SELECT accemail, accpass FROM account WHERE accemail = $1`

            const { rows } = postgre.query(sql, [accemail])

            if (rows[0]) {
                var token = "";

                hashedPassword = rows[0].accpass;
                bcrypt.compare(accpass, hashedPassword, (error, res) => {
                    if (res) {
                        token = jwt.sign({ accemail: rows[0].accemail }, process.env.JWT_SECRET, {
                            expiresIn: 86400 //expires in 24 hrs
                        });

                        return res.json({ msg: "Logged in successfully" })
                    } else if (!res) {
                        return res.status(404).json({ msg: "Password is incorrect" })
                    } else {
                        return res.json({ msg: error.msg })
                    }
                })
            }

            return res.status(404).json({ msg: "Account is not found" })
        } catch (error) {
            res.json({ msg: error.msg })
        }
    },
    updateEmail: async (req, res) => {
        try {
            const { accid, accemail, newemail } = req.body
            const sql = 'UPDATE account set accemail = $3 where accid = $1 and accemail = $2 RETURNING *'

            const { rows } = await postgre.query(sql, [accid, accemail, newemail])

            if (rows[0]) {
                return res.status(200).json({ msg: "Email is updated" })
            }

            return res.status(404).json({ msg: "Failed to update" })

        } catch (error) {
            res.json({ msg: error.msg })
        }
    },
    updatePassword: async (req, res) => {
        try {
            const { accid, accpass, newpass } = req.body
            const sql = 'UPDATE account set accpass = $3 where accid = $1 and accpass = $2 RETURNING *'

            const { rows } = await postgre.query(sql, [accid, accpass, newpass])

            if (rows[0]) {
                return res.status(200).json({ msg: "Password is updated" })
            }

            return res.status(404).json({ msg: "Failed to update" })

        } catch (error) {
            res.json({ msg: error.msg })
        }
    },
    // resetPassword
    deleteById: async (req, res) => {
        try {
            var { accid } = req.body;
            const sql = 'DELETE FROM account where accid = $1 RETURNING *'

            const { rows } = await postgre.query(sql, [accid])

            if (rows[0]) {
                return res.status(200).json({ msg: "Account is deleted" })
            }

            return res.status(404).json({ msg: "Account is not found" })

        } catch (error) {
            res.json({ msg: error.msg })
        }
    }
};

module.exports = accountController;