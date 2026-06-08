-- =============================================================
-- AudioCare — SAMPLE DATA SEEDING
-- Run this in your Supabase SQL Editor to populate your website
-- =============================================================

-- 1. Insert Sample Products
INSERT INTO public.products (id, name, slug, category, category_label, brand, price, mrp, rating, reviews_count, badge, img_url, description, highlights, in_stock, is_best_seller)
VALUES
  (
    'p1', 
    'JBL PartyBox 710', 
    'jbl-partybox-710', 
    'party', 
    'Party Speakers', 
    'JBL', 
    59999, 
    69999, 
    4.9, 
    128, 
    'Bestseller', 
    'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=800&auto=format&fit=crop', 
    '800W RMS of powerful JBL Original Pro Sound. Dual 2.75" tweeters and 8" woofers paired with its tuned bass reflex port deliver detailed audio perfection for music so loud you can literally feel the beat.', 
    ARRAY['800W RMS Power', 'Dynamic Light Show', 'IPX4 Splashproof', 'Guitar and Mic Inputs'], 
    true, 
    true
  ),
  (
    'p2', 
    'Sony HT-A9 Home Theatre', 
    'sony-ht-a9', 
    'hometheater', 
    'Home Theatre', 
    'Sony', 
    129990, 
    149990, 
    4.8, 
    85, 
    'Premium', 
    'https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=800&auto=format&fit=crop', 
    'Feel the action happening above and all around you with 360 Spatial Sound Mapping. Sony HT-A9 revolutionizes home cinema.', 
    ARRAY['360 Spatial Sound', 'Dolby Atmos', 'Wireless Connectivity', 'Hi-Res Audio'], 
    true, 
    true
  ),
  (
    'p3', 
    'Bose Smart Soundbar 900', 
    'bose-soundbar-900', 
    'soundbars', 
    'Soundbars', 
    'Bose', 
    89999, 
    104999, 
    4.7, 
    92, 
    'Trending', 
    'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=800&auto=format&fit=crop', 
    'The most immersive Bose voice control soundbar. Custom-engineered upfiring dipole speakers work with Bose technologies to make it feel as if sound is coming from every direction.', 
    ARRAY['Dolby Atmos', 'Voice Assistant', 'Wi-Fi & Bluetooth', 'ADAPTiQ Audio Calibration'], 
    true, 
    false
  ),
  (
    'p4', 
    'Yamaha NS-F51 Floorstanding Speakers', 
    'yamaha-ns-f51', 
    'speakers', 
    'Speakers', 
    'Yamaha', 
    24990, 
    29990, 
    4.6, 
    45, 
    'Value', 
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop', 
    'High performance floor-standing speakers. A perfect match for large-screen TVs. A home theatre speaker system that provides full enjoyment of even HD sound sources.', 
    ARRAY['2-way 3-speaker system', 'Low-diffraction rounded form', 'Front grille', 'Luxurious wooden design'], 
    true, 
    false
  )
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Sample Portfolio / Gallery items
INSERT INTO public.portfolio (title, category, img_url, description)
VALUES
  ('Luxury Home Theatre Installation', 'Installation', 'https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1200&auto=format&fit=crop', 'Complete 7.1.4 Dolby Atmos setup with hidden acoustic wiring in Koramangala.'),
  ('JBL Vintage Speaker Restoration', 'Repair', 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=600&auto=format&fit=crop', 'Full driver replacement, crossover rebuild, and cabinet refinishing.'),
  ('Auditorium Audio Setup', 'Commercial', 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop', 'Professional line array installation for a 500-seater auditorium in Whitefield.'),
  ('Soundbar Mounting & Tuning', 'Installation', 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=600&auto=format&fit=crop', 'Seamless wall mounting and audio calibration for Sony HT-A7000.'),
  ('Amplifier Motherboard Repair', 'Repair', 'https://images.unsplash.com/photo-1593697909822-90e7c0e4da3c?w=600&q=80', 'Micro-soldering and IC replacement on a blown Denon AV Receiver.'),
  ('Outdoor Patio Audio', 'Installation', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', 'Weatherproof speaker installation with hidden zone control.')
ON CONFLICT DO NOTHING;

-- 3. Insert Sample Blog Post
INSERT INTO public.blogs (title, slug, excerpt, content, featured_image, tags, published)
VALUES
  (
    'How to Choose the Perfect Soundbar for Your TV', 
    'choose-perfect-soundbar', 
    'A quick guide to understanding channels, Dolby Atmos, and what soundbar fits your living room.', 
    '<p>When upgrading your TV audio, a soundbar is the easiest and most effective choice...</p>', 
    'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=800&auto=format&fit=crop', 
    ARRAY['Buying Guide', 'Soundbars'], 
    true
  )
ON CONFLICT (slug) DO NOTHING;
