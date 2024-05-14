// subscribe.js

const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Endpoint to create a subscription
app.post("/api/create-subscription", async (req, res) => {
  try {
    // Create a new customer
    const customer = await stripe.customers.create({
      email: req.body.email, // You should get the user's email from the frontend
      // More customer details can be added here as needed
    });

    // Create a subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: "your_price_id" }], // The ID of the Stripe price object for your subscription plan
      // More subscription details can be added here as needed
    });

    // Return the session ID to the frontend
    res.status(200).json({ id: subscription.id });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to create subscription");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
