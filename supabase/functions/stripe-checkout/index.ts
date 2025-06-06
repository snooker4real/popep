import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';

const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY');

if (!stripeSecret) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

const stripe = new Stripe(stripeSecret, {
  appInfo: {
    name: 'Bolt Integration',
    version: '1.0.0',
  },
});

// Helper function to create responses with CORS headers
function corsResponse(body: string | object | null, status = 200) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // For 204 No Content, don't include Content-Type or body
  if (status === 204) {
    return new Response(null, { status, headers });
  }

  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  });
}

Deno.serve(async (req) => {
  try {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
      return corsResponse(null, 204);
    }

    if (req.method !== 'POST') {
      return corsResponse({ error: 'Method not allowed' }, 405);
    }

    // Parse and validate request body
    let body;
    try {
      body = await req.json();
    } catch (e) {
      return corsResponse({ error: 'Invalid JSON body' }, 400);
    }

    const { items, success_url, cancel_url, mode } = body;

    // Validate required parameters
    const error = validateParameters(
      { items, success_url, cancel_url, mode },
      {
        items: 'array',
        success_url: 'string',
        cancel_url: 'string',
        mode: { values: ['payment', 'subscription'] },
      },
    );

    if (error) {
      return corsResponse({ error }, 400);
    }

    // Validate items array
    if (!items.length) {
      return corsResponse({ error: 'Items array cannot be empty' }, 400);
    }

    for (const item of items) {
      if (!item.priceId || typeof item.quantity !== 'number' || item.quantity < 1) {
        return corsResponse({ error: 'Invalid item format' }, 400);
      }
    }

    try {
      // Create line items from the cart items
      const line_items = items.map((item: { priceId: string; quantity: number }) => ({
        price: item.priceId,
        quantity: item.quantity,
      }));

      // Create Checkout Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode,
        success_url,
        cancel_url,
      });

      return corsResponse({ sessionId: session.id, url: session.url });
    } catch (error: any) {
      console.error('Stripe error:', error);
      return corsResponse({ 
        error: error.message || 'Failed to create checkout session'
      }, 500);
    }
  } catch (error: any) {
    console.error('Unexpected error:', error);
    return corsResponse({ 
      error: 'An unexpected error occurred'
    }, 500);
  }
});

type ExpectedType = 'string' | { values: string[] } | 'array';
type Expectations<T> = { [K in keyof T]: ExpectedType };

function validateParameters<T extends Record<string, any>>(values: T, expected: Expectations<T>): string | undefined {
  for (const parameter in expected) {
    const expectation = expected[parameter];
    const value = values[parameter];

    if (value == null) {
      return `Missing required parameter: ${parameter}`;
    }

    if (expectation === 'string') {
      if (typeof value !== 'string') {
        return `Expected parameter ${parameter} to be a string, got ${typeof value}`;
      }
    } else if (expectation === 'array') {
      if (!Array.isArray(value)) {
        return `Expected parameter ${parameter} to be an array`;
      }
    } else if (typeof expectation === 'object') {
      if (!expectation.values.includes(value)) {
        return `Expected parameter ${parameter} to be one of: ${expectation.values.join(', ')}`;
      }
    }
  }

  return undefined;
}