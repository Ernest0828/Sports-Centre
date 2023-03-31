const express = require("express");
const Stripe = require("stripe");

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY)

const router = express.Router()

router.post('api/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [ //array of items
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment', //either payment or subscription
      success_url: 'http://localhost:3000/successPage', //where checkout page takes us to
      cancel_url: 'http://localhost:3000/climbingwall',
    });
  
    res.send({url: session.url });
  });

  module.exports = router;

