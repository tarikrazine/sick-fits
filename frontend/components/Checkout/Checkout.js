import { useState } from 'react';

import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import nProgress from 'nprogress';

import { CheckoutFormStyles, Button } from './Checkout.styles';

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const CheckoutFrom = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // 1. Stop the form from submitting and turn the loader one
    event.preventDefault();

    // 2. Start the page transition
    setLoading(true);

    nProgress.start();

    // 3. Create the payment method via stripe (Token comes back here if successful)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    console.log(paymentMethod);

    // 4. Handle any errors from stripe
    if (error) {
      setError(error.message);
      nProgress.done();
    }

    // 5. Send the token from step 3 to our keystone server, via a custom mutation!

    // 6. Change the page to view the order

    // 7. Close the cart

    // 8. turn the loader off
    setLoading(false);
    nProgress.done();
  };

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <CardElement />
      <Button>Check Out Now</Button>
    </CheckoutFormStyles>
  );
};

const Checkout = () => (
  <Elements stripe={stripeLib}>
    <CheckoutFrom />
  </Elements>
);

export default Checkout;
