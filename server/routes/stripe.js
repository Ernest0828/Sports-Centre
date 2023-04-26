const express = require("express");
const router = express.Router()
const stripe = require('stripe')('sk_test_51MrbuEHb9PPilNEF1HgDEBmPrJYnSTEeUojKam6GR16HUsfr5G8i0gu5XO1oPJUophzGpa6JxAawBELbzelmuk7b00do44JoiY');
const bodyParser = require('body-parser');
const webhookSecret = "whsec_402be5c94c101fde0d4506015013f3c524fdcb2a93cca60a99189d03a1686dbcwhsec_402be5c94c101fde0d4506015013f3c524fdcb2a93cca60a99189d03a1686dbc";


router.post('/create-checkout-session', async (req, res) => {
   const items = req.body.items;
  const line_items = items.map((item) => {
    return{
      price_data: {
          currency: 'gbp',
          product_data: {
            name: item.description, //its called description instead of name. This works!
          },
          unit_amount: item.cost * 100,
        },
        quantity: 1 /*itemCounts[item.description]*/, //Need to fix this so that it counts the number of individual items i.e: Swimmming pool =5 Memebership =1 instead of total number of items in cart
    };
  });

    const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    success_url: 'http://localhost:3000/successPage', //where checkout page takes us to
    cancel_url: 'http://localhost:3000/climbingwall', //Change this to something else?
  });
    res.send({url: session.url});
  });

  const getRawBody = (req, res, buf, encoding) => {
    if (buf && buf.length) {
      req.rawBody = buf.toString(encoding || 'utf8');
    }
  };
  
  router.post('/webhook', express.raw({ type: 'application/json', verify: getRawBody }), (req, res) => {
      const payload = req.rawBody;
      const sig = req.headers['stripe-signature'];  
      let event;
      try {
        event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
      } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }
      console.log("Got payload: " + payload);
  
      res.status(200).end();
    }
  );

  module.exports = router;

