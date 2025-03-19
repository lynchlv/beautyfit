import { loadStripe } from '@stripe/stripe-js';
import { supabase } from './supabase';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const createCheckoutSession = async (priceId: string, userData: any) => {
  try {
    // Save the user data to Supabase
    const { error: supabaseError } = await supabase
      .from('user_programs')
      .insert([
        {
          user_data: userData,
          status: 'pending'
        }
      ]);

    if (supabaseError) throw supabaseError;

    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe failed to load');

    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/cancel`,
    });

    if (error) throw error;
  } catch (err) {
    console.error('Error creating checkout session:', err);
    throw err;
  }
};

export { stripePromise };