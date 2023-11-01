// pages/api/cart/cart.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const response = await fetch('http://localhost:5000/api/cart/get-all-cartitems');
    if (response.ok) {
      const cartItems = await response.json();
      res.json(cartItems.data);
    } else {
      throw new Error('Error fetching cart items');
    }
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Error fetching cart items' });
  }
}
