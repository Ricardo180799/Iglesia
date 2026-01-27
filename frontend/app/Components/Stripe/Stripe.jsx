import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

export const stripePromise = loadStripe("TU_PUBLIC_STRIPE_KEY"); // clave pública