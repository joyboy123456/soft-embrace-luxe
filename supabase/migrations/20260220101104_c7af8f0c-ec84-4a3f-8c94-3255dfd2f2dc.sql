
-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name_zh TEXT NOT NULL,
  name_en TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('ergonomic', 'square')),
  type_zh TEXT NOT NULL,
  type_en TEXT NOT NULL,
  colors JSONB NOT NULL DEFAULT '[]'::jsonb,
  size TEXT NOT NULL,
  desc_zh TEXT NOT NULL DEFAULT '',
  desc_en TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS but allow public read (it's a product catalog)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Anyone can read products
CREATE POLICY "Products are publicly readable"
ON public.products FOR SELECT
USING (true);

-- For now, allow all operations (no auth yet)
CREATE POLICY "Allow all inserts temporarily"
ON public.products FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow all updates temporarily"
ON public.products FOR UPDATE
USING (true);

CREATE POLICY "Allow all deletes temporarily"
ON public.products FOR DELETE
USING (true);

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);

-- Public read access for product images
CREATE POLICY "Product images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Allow uploads (no auth for now)
CREATE POLICY "Allow product image uploads"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Allow product image updates"
ON storage.objects FOR UPDATE
USING (bucket_id = 'product-images');

CREATE POLICY "Allow product image deletes"
ON storage.objects FOR DELETE
USING (bucket_id = 'product-images');

-- Auto-update timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
