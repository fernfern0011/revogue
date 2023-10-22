require('dotenv').config()
const postgre = require('../config/database')

const addressController = {
    getAllAddresses: async (req, res) => {
        try {
            const { accid } = req.body;
            const sql = 'SELECT * FROM address WHERE accid = $1 ORDER BY addressid ASC;'

            const { rows } = await postgre.query(sql, [accid])

            if (rows[0]) {
                return res.status(200).json({ data: rows })
            }

            res.status(404).json({ msg: "No address exists" })

        } catch (error) {
            res.status(404).json({ msg: error.msg })
        }
    },
    getDefaultAddress: async (req, res) => {
        try {
            const { accid } = req.body;
            const sql = 'SELECT * FROM address WHERE accid = $1 AND isDefault = $2;'

            const { rows } = await postgre.query(sql, [accid, true])

            if (rows[0]) {
                return res.status(200).json({ data: rows })
            }

            res.status(404).json({ msg: "No default address" })

        } catch (error) {
            res.status(404).json({ msg: error.msg })
        }
    },
    addNewAddress: async (req, res) => {
        try {
            const { accid, fname, lname, phone, street, unit, postal_code, delivery_instruction, isDefault } = req.body;

            const selectData = `SELECT * from address;`
            const retrieveExistingDefaultAddress = `SELECT addressid FROM address WHERE accid = $1 AND isDefault = $2;`
            const insertNewAddress = `INSERT INTO address(addressid, accid, fname, lname, phone, street, unit, postal_code, delivery_instruction, isDefault)
                       VALUES(nextval('address_id_seq'), $1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`
            const updateDefaultAddress = `UPDATE address SET isDefault = $1 WHERE addressid = $2 RETURNING *;`

            // Check if table is empty
            const { rows } = await postgre.query(selectData);

            if (!rows[0]) {
                const { rows } = await postgre.query(insertNewAddress, [accid, fname, lname, phone, street, unit, postal_code, delivery_instruction, true])

                if (rows[0]) {
                    return res.status(201).json({ msg: "Address is added", data: rows[0] })
                }

                return res.status(404).json({ msg: "Failed to add an address" })
            } else {

                // Check if new address is set to default, if not then add new address directly
                if (isDefault == false) {
                    const { rows } = await postgre.query(insertNewAddress, [accid, fname, lname, phone, street, unit, postal_code, delivery_instruction, isDefault])

                    if (rows[0]) {
                        return res.status(201).json({ msg: "Address is added", data: rows[0] })
                    }

                    return res.status(404).json({ msg: "Failed to add an address" })
                } else {
                    // if new address is set to default, get existing default address first
                    postgre.query(retrieveExistingDefaultAddress, [accid, true], async (error, existingDefaultAddress) => {
                        // If there is an error
                        // Else if default address does not exist
                        // Else default address exist
                        if (error) {
                            res.status(404).json({ msg: error.msg })
                        } else {
                            if (existingDefaultAddress.rows[0]) {
                                // Update existing default address to false
                                var addressid = existingDefaultAddress.rows[0].addressid;

                                postgre.query(updateDefaultAddress, [false, addressid], async (error, result) => {
                                    if (error) {
                                        res.status(404).json({ msg: error.msg })
                                    } else {
                                        if (result.rows[0]) {
                                            // Add new address with default address
                                            const { rows } = await postgre.query(insertNewAddress, [accid, fname, lname, phone, street, unit, postal_code, delivery_instruction, isDefault])

                                            if (rows[0]) {
                                                return res.status(201).json({ msg: "Address is added", data: rows[0] })
                                            }

                                        } else {
                                            return res.status(404).json({ msg: "Failed to add an address" })
                                        }
                                    }
                                })
                            } else {
                                // Add new address with default address
                                const { rows } = await postgre.query(insertNewAddress, [accid, fname, lname, phone, street, unit, postal_code, delivery_instruction, isDefault])

                                if (rows[0]) {
                                    return res.status(201).json({ msg: "Address is added", data: rows[0] })
                                }

                                return res.status(404).json({ msg: "Failed to add an address" })
                            }
                        }
                    })
                }
            }
        } catch (error) {
            res.status(404).json({ msg: error.msg })
        }
    },
    updateAddress: async (req, res) => {
        try {
            const { fname, lname, phone, street, unit, postal_code, delivery_instruction, isDefault, accid, addressid } = req.body;
            const retrieveExistingDefaultAddress = `SELECT addressid FROM address WHERE accid = $1 AND isDefault = $2;`
            const updateDefaultAddress = `UPDATE address SET isDefault = $1 WHERE addressid = $2 RETURNING *;`
            const updateAddress = `UPDATE address SET fname = $1, lname = $2, phone = $3, street = $4, unit = $5, postal_code = $6,
                                    delivery_instruction = $7, isDefault = $8 WHERE accid = $9 AND addressid = $10 RETURNING *;`

            // Get existing default address first
            postgre.query(retrieveExistingDefaultAddress, [accid, true], async (error, existingDefaultAddress) => {
                // If there is an error
                if (error) {
                    res.status(404).json({ msg: error.msg })
                } else {
                    // If default address exist
                    if (existingDefaultAddress.rows[0]) {
                        var existingAddressid = existingDefaultAddress.rows[0].addressid;

                        // check if existing default address same as updating address, and default is removed
                        if (existingAddressid == addressid) {
                            if (isDefault == false) {
                                return res.status(404).json({ msg: "You must have at least one default address" })
                            }
                        } else {
                            // if existing default address is not same as updating address
                            // Check if updating address is set to default, if not then update address directly
                            if (isDefault == false) {
                                const { rows } = await postgre.query(updateAddress, [fname, lname, phone, street, unit, postal_code, delivery_instruction, isDefault, accid, addressid])

                                if (rows[0]) {
                                    return res.status(201).json({ msg: "Address is updated", data: rows[0] })
                                }

                                return res.status(404).json({ msg: "Failed to update an address" })
                            } else {
                                // Else update existing default address to false, then update updating address to default
                                postgre.query(updateDefaultAddress, [false, existingAddressid], async (error, result) => {
                                    if (error) {
                                        res.status(404).json({ msg: error.msg })
                                    } else {
                                        if (result.rows[0]) {
                                            // update address with default address
                                            const { rows } = await postgre.query(updateAddress, [fname, lname, phone, street, unit, postal_code, delivery_instruction, isDefault, accid, addressid])

                                            if (rows[0]) {
                                                return res.status(201).json({ msg: "Address is updated", data: rows[0] })
                                            }

                                        } else {
                                            return res.status(404).json({ msg: "Failed to update an address" })
                                        }
                                    }
                                })
                            }
                        }
                    } else {
                        // If default address does not exist, and updating adddress is not set to default
                        if (isDefault == false) {
                            return res.status(404).json({ msg: "You must have at least one default address" })
                        } else {
                            // update address with default address
                            const { rows } = await postgre.query(updateAddress, [fname, lname, phone, street, unit, postal_code, delivery_instruction, isDefault, accid, addressid])

                            if (rows[0]) {
                                return res.status(201).json({ msg: "Address is updated", data: rows[0] })
                            }

                            return res.status(404).json({ msg: "Failed to update an address" })
                        }
                    }
                }
            })
        } catch (error) {
            res.status(404).json({ msg: error.msg })
        }
    },
    setDefault: async (req, res) => {
        try {
            const { addressid, accid } = req.body;
            const retrieveExistingDefaultAddress = `SELECT addressid FROM address WHERE accid = $1 AND isDefault = $2;`
            const updateDefaultAddress = `UPDATE address SET isDefault = $1 WHERE addressid = $2 RETURNING *;`
            const updateAddress = `UPDATE address SET isDefault = $1 WHERE addressid = $2 AND accid = $3 RETURNING *;`

            // Get existing default address first
            postgre.query(retrieveExistingDefaultAddress, [accid, true], async (error, existingDefaultAddress) => {
                // If there is an error
                if (error) {
                    res.status(404).json({ msg: error.msg })
                } else {
                    // If default address exist
                    if (existingDefaultAddress.rows[0]) {
                        var existingAddressid = existingDefaultAddress.rows[0].addressid;

                        postgre.query(updateDefaultAddress, [false, existingAddressid], async (error, result) => {
                            if (error) {
                                res.status(404).json({ msg: error.msg })
                            } else {
                                if (result.rows[0]) {
                                    // update address with default address
                                    const { rows } = await postgre.query(updateAddress, [true, addressid, accid])

                                    if (rows[0]) {
                                        return res.status(201).json({ msg: "Default Address is updated", data: rows[0] })
                                    }

                                } else {
                                    return res.status(404).json({ msg: "Failed to update an address" })
                                }
                            }
                        })
                    }
                }
            })
        } catch (error) {
            res.status(404).json({ msg: error.msg })
        }
    },
    delete: async (req, res) => {
        try {
            const { addressid, accid } = req.body;
            const getSelectedData = 'SELECT * FROM address WHERE addressid = $1 AND accid = $2;'
            const selectNewAddress = 'SELECT * FROM address WHERE accid = $1 ORDER BY addressid ASC LIMIT 1;'
            const deleteAddress = 'DELETE FROM address WHERE addressid = $1 AND accid = $2 RETURNING *;'
            const updateAddress = `UPDATE address SET isDefault = $1 WHERE addressid = $2 AND accid = $3 RETURNING *;`

            // Get selected data
            postgre.query(getSelectedData, [addressid, accid], async (error, selectedData) => {
                // If there is an error
                if (error) {
                    res.status(404).json({ msg: error.msg })
                } else {
                    if (selectedData.rows[0]) {
                        var defaultStatus = selectedData.rows[0].isdefault;

                        if (defaultStatus == false) {
                            const { rows } = await postgre.query(deleteAddress, [addressid, accid])

                            if (rows[0]) {
                                return res.status(201).json({ msg: "Address is deleted" })
                            }
                        } else {
                            // If selected address is default address, delete address
                            postgre.query(deleteAddress, [addressid, accid], async (error, result) => {
                                // If there is an error
                                if (error) {
                                    res.status(404).json({ msg: error.msg })
                                } else {
                                    if (result.rows[0]) {
                                        // Select new address to set to default adddress
                                        postgre.query(selectNewAddress, [accid], async (error, result) => {
                                            // If there is an error
                                            if (error) {
                                                res.status(404).json({ msg: error.msg })
                                            } else {
                                                if (result.rows[0]) {
                                                    // If still have addresses
                                                    var newDefaultAddressID = result.rows[0].addressid

                                                    // Set address with default address
                                                    const { rows } = await postgre.query(updateAddress, [true, newDefaultAddressID, accid])

                                                    if (rows[0]) {
                                                        return res.status(201).json({ msg: "Address is deleted" })
                                                    }

                                                    return res.status(404).json({ msg: "Address can't be deleted" })

                                                } else {
                                                    // Else completely remove the address
                                                    return res.status(201).json({ msg: "Address is deleted" })
                                                }
                                            }
                                        })
                                    } else {
                                        return res.status(404).json({ msg: "Address can't be deleted" })
                                    }
                                }
                            })
                        }
                    }
                }
            })
        } catch (error) {
            res.status(404).json({ msg: error.msg })
        }
    }
}

module.exports = addressController;