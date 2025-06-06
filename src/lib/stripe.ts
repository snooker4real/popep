import { supabase } from './supabase';
import { products } from '../stripe-config';

interface CheckoutItem {
  priceId: string;
  quantity: number;
}

export async function createCheckoutSession(
  items: CheckoutItem[],
  mode: 'payment' | 'subscription',
  successUrl: string,
  cancelUrl: string
): Promise<string> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          mode,
          success_url: successUrl,
          cancel_url: cancelUrl,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create checkout session');
    }

    const { url } = await response.json();
    
    if (!url) {
      throw new Error('No checkout URL returned from server');
    }

    return url;
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    throw error;
  }
}

export async function getActiveSubscription() {
  const { data: subscription, error } = await supabase
    .from('stripe_user_subscriptions')
    .select('*')
    .maybeSingle();

  if (error) {
    console.error('Error fetching subscription:', error);
    return null;
  }

  return subscription;
}

export async function getOrderHistory() {
  const { data: orders, error } = await supabase
    .from('stripe_user_orders')
    .select('*')
    .order('order_date', { ascending: false });

  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }

  return orders;
}

export function getProductByPriceId(priceId: string) {
  return Object.values(products).find(product => product.priceId === priceId);
}