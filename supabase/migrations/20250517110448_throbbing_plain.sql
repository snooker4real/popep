/*
  # Create products table and insert initial data

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text) - Product name
      - `description` (text) - Product description
      - `price` (integer) - Price in cents
      - `image_url` (text) - Product image URL
      - `stripe_price_id` (text) - Stripe price ID
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Initial Data
    - Inserts the four product variants with their Stripe price IDs
    - Sets up prices and descriptions

  3. Security
    - Enable RLS on `products` table
    - Add policy for public read access
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price integer NOT NULL,
  image_url text NOT NULL,
  stripe_price_id text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Anyone can read products"
  ON products
  FOR SELECT
  TO public
  USING (true);

-- Insert initial product data
INSERT INTO products (name, description, price, image_url, stripe_price_id) VALUES
  (
    'POPEP Distance',
    'Découvrez notre jeu de cartes unique, spécialement conçu pour les couples en relation à distance, qui permet de surmonter les obstacles de la distance tout en renforçant vos liens émotionnels. Avec quatre thèmes enrichissants—Apprendre à se connaître en profondeur, Questions légères et fun, Notre évolution et notre futur, et Les défis et la gestion de la relation à distance—ce jeu vous offre des opportunités précieuses pour explorer, discuter et célébrer votre amour.',
    2499,
    'https://images.unsplash.com/photo-1745671756390-971023ed5060?q=80&w=1887&auto=format&fit=crop',
    'price_1RP37yCQLuYBkFrFJ4VzDqYS'
  ),
  (
    'POPEP Love&Couches',
    'Partage des Émotions : Créez un espace sûr pour exprimer vos sentiments face aux défis et joies de la parentalité, favorisant compréhension et soutien mutuel.',
    2499,
    'https://images.unsplash.com/photo-1745671785278-d2f5a2fdc597?q=80&w=1887&auto=format&fit=crop',
    'price_1RP37QCQLuYBkFrFeMX3U31Z'
  ),
  (
    'POPEP Friends',
    'Découvrez notre jeu de cartes dynamique conçu pour les soirées entre amis, qui promet des moments inoubliables et des échanges authentiques. Avec quatre thèmes captivants—Fun, Introspection, Aventure & Expériences, et Débats—ce jeu encourage à partager, rire et réfléchir ensemble.',
    2499,
    'https://images.unsplash.com/photo-1745671792141-6a4ca9d03d36?q=80&w=1887&auto=format&fit=crop',
    'price_1RP36ZCQLuYBkFrFWMVBdRSb'
  ),
  (
    'POPEP Couple',
    'Popep Jeu T''adore - Versione En Couple - Découvrez notre jeu de cartes unique pour couples, conçu pour enrichir votre relation et favoriser des échanges authentiques.',
    2499,
    'https://images.unsplash.com/photo-1745671762109-cdd5ca111765?q=80&w=1887&auto=format&fit=crop',
    'price_1RP359CQLuYBkFrFrvsAaiZS'
  );