import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../../Stripe/Stripe"; 
import DonationForm from "./DonationsForm";

export default function CheckoutPage() {
  return (
    <Elements stripe={stripePromise}>
      <DonationForm />
    </Elements>
  );
}