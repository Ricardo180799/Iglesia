const { claveStripe } = require("../Config/Claves");
const Stripe = require("stripe");
const stripe = Stripe(claveStripe);

const {
  AddDonation,
  GetDonationByEventId,
  UpdateDonationByStripeId,
} = require("../Repositorio/Donations");
const { AddIncomes } = require("../Controllers/IncomeControllers");

exports.PostInfo = async (req, res) => {
  const { amount, currency, name, email } = req.body;
  const User_Id = req.usuario?.ID || null;

  try {
    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: Math.round(amount * 100),
        currency: currency || "usd",
        payment_method_types: ["card"],
        metadata: { name, email, userId: User_Id, type: "ofrenda" },
      },
      {
        idempotencyKey: `donation_${User_Id}_${Date.now()}`,
      }
    );

    const Stripe_Id = paymentIntent.id;
    const type = "ofrenda";

    await AddDonation(User_Id, Stripe_Id, amount, currency, type);

    return res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Se ha producido el siguiente error: " + err });
  }
};

exports.ConfirmDonation = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    const eventId = event.id;

    const alreadyProcessed = await GetDonationByEventId(eventId);
    if (alreadyProcessed) {
      console.log("Evento duplicado ignorado:", eventId);
      return res.json({ received: true, duplicate: true });
    }

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      const User_Id = paymentIntent.metadata.userId || null;
      const amount = paymentIntent.amount / 100;
      const date = new Date(paymentIntent.created * 1000);
      const Stripe_Id = paymentIntent.id;

      await UpdateDonationByStripeId("success", Stripe_Id, eventId);

      console.log("Donación confirmada:", paymentIntent);

      await AddIncomes(
        "Automatic",
        User_Id,
        "Ofrenda",
        amount,
        "Donacion generada por Stripe",
        date,
        User_Id
      );
    }

    if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object;
      const Stripe_Id = paymentIntent.id;

      await UpdateDonationByStripeId("failed", Stripe_Id, eventId);

      console.log("Donación fallida:", paymentIntent);
    }

    res.json({ received: true });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Se ha producido el siguiente error: " + err.message });
  }
};
