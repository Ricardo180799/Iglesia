import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {PostInfo} from "../Service/Service"
import {stripePromise} from "../../../Stripe/Stripe"

export default function DonationForm() {
  const elements = useElements();
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [currency, setCurrency] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const response = await PostInfo(amount, currency, name, email)
   

    // 2️⃣ Confirmar el pago en Stripe
    const cardElement = elements.getElement(CardElement);
    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement, billing_details: { name, email } },
    });

    if (paymentResult.error) {
      // ❌ Error en el pago
      setMessage("Pago fallido: " + paymentResult.error.message);
    } else if (paymentResult.paymentIntent.status === "succeeded") {
      // ✅ Pago exitoso
      setMessage("¡Gracias por tu donación!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Cantidad"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Cantidad"
        value={currency}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Donar
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}