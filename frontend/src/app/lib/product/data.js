import { sql } from '@vercel/postgres';

export async function getAllProducts() {
    try {

        const getAllProducts = sql`SELECT * FROM product ORDER BY productid ASC`;

        const data = await Promise.all([
            getAllProducts
        ])

        return data[0].rows
    } catch (error) {
        throw new Error('Failed to fetch product data.');
    }
}

export async function getProductById({ productid }) {
    try {

        const getProductById = sql`SELECT * FROM product WHERE productid = ${productid}`

        const data = await Promise.all([
            getProductById
        ])

        return data[0].rows
    } catch (error) {
        throw new Error('Failed to fetch product data.');
    }
}