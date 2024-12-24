import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { showAlert } from './alerts';

let stripe;

const initializeStripe = async () => {
  try {
    stripe = await loadStripe(
      'pk_test_51QZEUQSB8H1cddRI6aTrmi3ZhGr7AONkSZPqbnFJ6wx0oIsDbn36DydD0dMziHaxcitGAtRIPAZsubJRHr9KlmnT00YiS5ynJD',
    );
    if (!stripe) throw new Error('Stripe failed to initialize');
  } catch (err) {
    console.error('Error initializing Stripe:', err);
  }
};

initializeStripe();

export const bookTour = async (tourId) => {
  try {
    console.log('Starting booking process for tourId:', tourId);

    // 1) Get checkout session from API
    const session = await axios.get(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`,
    );
    console.log('Checkout session:', session.data);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.error('Booking error:', err);
    showAlert('error', err.message || 'Something went wrong!');
  }
};
