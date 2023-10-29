const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Fetch product information from your API endpoint (e.g., localhost:3000/cart)
      const response = await fetch('http://localhost:3000/api/cart');
      if (!response.ok) {
        throw new Error('Error fetching product information');
      }
      const cartItems = await response.json();

      if (!Array.isArray(cartItems) || cartItems.length === 0) {
        throw new Error('No cart items found.');
      }

      // Create an array to store the products and prices
      const productData = [];

      // Iterate through the cart items and create Products and Prices
      for (const cartItem of cartItems) {
        const productName = cartItem.productname;
        const productPrice = parseFloat(cartItem.price);

        // Create a Stripe Product for each cart item
        const product = await stripe.products.create({
          name: productName,
        });

        // Convert the price to cents (Stripe uses cents)
        const priceInCents = Math.round(productPrice * 100);

        // Create a Price associated with the product
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: priceInCents,
          currency: 'sgd',
        });

        productData.push({ product, price });
      }

      // Now that you have created the products and prices, create the checkout session
      const lineItems = productData.map((item) => ({
        price: item.price.id,
        quantity: 1,
      }));

      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
        automatic_tax: { enabled: true },
      });

      res.json({ productData, session });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
