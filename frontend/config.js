//config.js
module.exports = { 
    backendUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY };