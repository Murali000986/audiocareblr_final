-- =============================================================
-- AudioCare — Fix / Re-apply Supabase Policies & Storage
-- Run this in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/zorbicldczcewexjiqla/sql
-- =============================================================

-- 1. Products table: fix products primary key to use UUID if text causes issues
-- (Only run if you want to switch to UUID; skip if text id is working fine)
-- ALTER TABLE public.products ALTER COLUMN id SET DEFAULT gen_random_uuid()::text;

-- 2. Drop & recreate products admin policy (in case of permission issues)
DROP POLICY IF EXISTS "Only admins can modify products" ON public.products;
CREATE POLICY "Only admins can modify products" ON public.products
  FOR ALL
  USING (
    auth.jwt()->>'email' IN ('admin@audiocare.in', 'murali701081@gmail.com', 'info@audiocare.in')
    OR auth.jwt()->>'email' LIKE '%admin%'
  )
  WITH CHECK (
    auth.jwt()->>'email' IN ('admin@audiocare.in', 'murali701081@gmail.com', 'info@audiocare.in')
    OR auth.jwt()->>'email' LIKE '%admin%'
  );

-- 3. Testimonials
DROP POLICY IF EXISTS "Only admins can modify testimonials" ON public.testimonials;
CREATE POLICY "Only admins can modify testimonials" ON public.testimonials
  FOR ALL
  USING (
    auth.jwt()->>'email' IN ('admin@audiocare.in', 'murali701081@gmail.com', 'info@audiocare.in')
    OR auth.jwt()->>'email' LIKE '%admin%'
  )
  WITH CHECK (
    auth.jwt()->>'email' IN ('admin@audiocare.in', 'murali701081@gmail.com', 'info@audiocare.in')
    OR auth.jwt()->>'email' LIKE '%admin%'
  );

-- 4. Portfolio
DROP POLICY IF EXISTS "Only admins can modify portfolio" ON public.portfolio;
CREATE POLICY "Only admins can modify portfolio" ON public.portfolio
  FOR ALL
  USING (
    auth.jwt()->>'email' IN ('admin@audiocare.in', 'murali701081@gmail.com', 'info@audiocare.in')
    OR auth.jwt()->>'email' LIKE '%admin%'
  )
  WITH CHECK (
    auth.jwt()->>'email' IN ('admin@audiocare.in', 'murali701081@gmail.com', 'info@audiocare.in')
    OR auth.jwt()->>'email' LIKE '%admin%'
  );

-- 5. Repair bookings admin
DROP POLICY IF EXISTS "Admins can view all bookings" ON public.repair_bookings;
CREATE POLICY "Admins can view all bookings" ON public.repair_bookings
  FOR ALL
  USING (
    auth.jwt()->>'email' IN ('admin@audiocare.in', 'murali701081@gmail.com', 'info@audiocare.in')
    OR auth.jwt()->>'email' LIKE '%admin%'
  );

-- 6. Orders admin
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
CREATE POLICY "Admins can view all orders" ON public.orders
  FOR ALL
  USING (
    auth.jwt()->>'email' IN ('admin@audiocare.in', 'murali701081@gmail.com', 'info@audiocare.in')
    OR auth.jwt()->>'email' LIKE '%admin%'
  );

-- 7. Create blogs table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text,
  featured_image text,
  tags text[] DEFAULT '{}',
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can view published blogs" ON public.blogs;
CREATE POLICY "Anyone can view published blogs" ON public.blogs
  FOR SELECT USING (published = true OR auth.jwt()->>'email' IN ('admin@audiocare.in', 'murali701081@gmail.com', 'info@audiocare.in'));
DROP POLICY IF EXISTS "Admins can manage blogs" ON public.blogs;
CREATE POLICY "Admins can manage blogs" ON public.blogs
  FOR ALL
  USING (
    auth.jwt()->>'email' IN ('admin@audiocare.in', 'murali701081@gmail.com', 'info@audiocare.in')
    OR auth.jwt()->>'email' LIKE '%admin%'
  )
  WITH CHECK (
    auth.jwt()->>'email' IN ('admin@audiocare.in', 'murali701081@gmail.com', 'info@audiocare.in')
    OR auth.jwt()->>'email' LIKE '%admin%'
  );

-- 8. Storage bucket & policies
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true) ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Anyone can read images" ON storage.objects;
CREATE POLICY "Anyone can read images" ON storage.objects
  FOR SELECT USING (bucket_id = 'images');

DROP POLICY IF EXISTS "Auth users can upload images" ON storage.objects;
CREATE POLICY "Auth users can upload images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Auth users can update images" ON storage.objects;
CREATE POLICY "Auth users can update images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'images' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Auth users can delete images" ON storage.objects;
CREATE POLICY "Auth users can delete images" ON storage.objects
  FOR DELETE USING (bucket_id = 'images' AND auth.role() = 'authenticated');
