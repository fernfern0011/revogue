const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// import { userEmail } from '@/app/api/auth/[...nextauth]/route';
// const nodemailer = require('nodemailer');
import { useSession } from 'next-auth/react';


// Nodemailer configuration
// const transporter = nodemailer.createTransport({
//   service: 'gmail', // e.g., 'Gmail', 'Yahoo', etc.
//   auth: {
//     user: 'revogue2023@gmail.com',
//     pass: 'yeex axcs uusx dzlx',
//   },
// });

export default async function handler(req, res) {

  const {data: session} = useSession();
  let accID;
  if(session){
    accID = session.id
    console.log(accID)
    console.log(req)
  }

  if (req.method === 'POST') {
    try {
      // Fetch product information from your API endpoint (e.g., localhost:3000/cart)
      const response = await fetch(`http://localhost:5000/api/cart/get-all-cartitems?accid=${accID}`);
      if (!response.ok) {
        throw new Error('Error fetching product information');
      }
      
      const responseData = await response.json();
      const cartItems = responseData.data;
      console.log(cartItems)

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

      // const mailOptions = {
      //   from: 'revogue2023@gmail.com', // Sender email address
      //   to: 'sathwikchiluveru@gmail.com', // Recipient email address
      //   subject: 'Payment Confirmation',
      //   html: `
      //     <html>
      //       <head>
      //         <style>
      //           /* Add your CSS styles here */
      //         </style>
      //       </head>
      //       <body>
      //         <div style="background-color: #f4f4f4; padding: 20px;">
      //         <h1 style="color: #17B5B5;">Thank you for your purchase!</h1>
      //         <p>Order status: Payment Successful</p>
      //         </div>
      //       </body>
      //     </html>
      //   `,
      // };

      // transporter.sendMail(mailOptions, (error, info) => {
      //   if (error) {
      //     console.error('Email error:', error);
      //     res.status(500).send('Email could not be sent');
      //   } else {
      //     console.log('Email sent:', info.response);
      //     // Clear form fields
      //     // setFirstName('');
      //     // setLastName('');
      //     // setEmail('');
      //     // setMessage('');
      //     res.status(200).send('Payment and email were successful');
      //   }
      // });

      res.json({ productData, session });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
