-- ============================================================
-- AudioCare - Full Data Reset & Seed Script
-- Run this in Supabase SQL Editor to reset all data
-- ============================================================

-- Clear existing data (order matters for foreign keys)
DELETE FROM public.reviews;
DELETE FROM public.wishlist;
DELETE FROM public.blogs;
DELETE FROM public.products;

-- ============================================================
-- PRODUCTS (id: text PK, matches schema.sql)
-- ============================================================
INSERT INTO public.products (
    id, name, slug, description, category, price, mrp,
    brand, is_best_seller, img_url, highlights, in_stock
) VALUES
(
    'p_001', 'JBL PartyBox 710', 'jbl-partybox-710',
    'The splashproof PartyBox 710 transforms your next event into a real party, concert or nightclub. With its unique and colorful light show synced to JBL Original Pro Sound.',
    'Party Speakers', 799.95, 799.95, 'JBL', TRUE,
    'https://i.rtings.com/assets/products/RNp0AVhU/jbl-partybox-710/design-medium.jpg?format=auto',
    ARRAY['800W RMS', 'Bluetooth 5.1', 'IPX4 Water Resistance', 'Party lights'], true
),
(
    'p_002', 'Sony SRS-XV900', 'sony-srs-xv900',
    'Power your party with the omnidirectional sound of the SRS-XV900, the most powerful and loudest wireless party speaker in the X-Series.',
    'Party Speakers', 798.00, 898.00, 'Sony', TRUE,
    '/audiocare_img/sony_srs_xv900.png',
    ARRAY['25 hours Battery', 'Bluetooth 5.2', 'TV Sound Booster', 'Omnidirectional Sound'], true
),
(
    'p_003', 'Bose S1 Pro+ Portable PA', 'bose-s1-pro-plus',
    'Musicians, DJs, and general PA users: The Bose S1 Pro+ is your all-in-one PA, floor monitor, practice amplifier, and primary music system.',
    'PA Systems', 699.00, 699.00, 'Bose', FALSE,
    'https://m.media-amazon.com/images/P/B0CB22DNSH.01._SCLZZZZZZZ_.jpg',
    ARRAY['Up to 11 hours battery', '14.4 lbs', '3-channel mixer', 'Portable'], true
),
(
    'p_004', 'Sony BRAVIA Theatre Quad HT-A9M2', 'sony-ht-a9m2',
    'Flexible layout, wireless connection. With 360 Spatial Sound Mapping, the HT-A9M2 adapts to your room to create an incredibly immersive surround sound experience.',
    'Home Theater Systems', 2499.99, 2499.99, 'Sony', TRUE,
    '/audiocare_img/sony_ht_a9m2.png',
    ARRAY['4.0.4 Channels', 'Dolby Atmos', 'Wireless Connectivity', '360 Spatial Sound'], true
),
(
    'p_005', 'Denon AVC-X4800H', 'denon-avc-x4800h',
    '9.4 channel 8K AV Receiver with HEOS Built-in. Designed and manufactured in Japan, the AVC-X4800H drives 9 channels of 200W amplification.',
    'AV Receivers', 2199.00, 2499.00, 'Denon', FALSE,
    '/audiocare_img/denon_avc_x4800h.png',
    ARRAY['9.4 Channels', '200W per channel', '8K/60Hz Video', 'HEOS Built-in'], true
),
(
    'p_006', 'Klipsch Reference Theater Pack 5.1', 'klipsch-reference-theater-pack',
    'The Klipsch Reference Theater Pack delivers superior acoustic performance by leveraging Injection Molded Graphite (IMG) woofers. Comes with a wireless subwoofer.',
    'Home Theater Systems', 349.00, 399.00, 'Klipsch', FALSE,
    'https://m.media-amazon.com/images/P/B0779GRFWF.01._SCLZZZZZZZ_.jpg',
    ARRAY['5.1 System', 'Wireless Subwoofer', 'Linear Travel Suspension', 'Compact design'], true
),
(
    'p_007', 'Bose Smart Ultra Soundbar', 'bose-smart-ultra-soundbar',
    'The Bose Smart Ultra Soundbar with Dolby Atmos and Voice Control is our top-of-the-line wireless soundbar. Featuring A.I. Dialogue Mode.',
    'Soundbars', 899.00, 899.00, 'Bose', TRUE,
    'https://i.rtings.com/assets/products/pf69ci3G/bose-smart-ultra-soundbar/design-medium.jpg?format=auto',
    ARRAY['Dolby Atmos', 'Wi-Fi & Bluetooth', 'Alexa & Google Assistant'], true
),
(
    'p_008', 'Sony HT-A7000 7.1.2ch Soundbar', 'sony-ht-a7000',
    'Discover a whole new level of immersion. The HT-A7000 envelopes you in authentic 7.1.2 channel surround sound with multiple speakers, S-Force PRO Front Surround and Vertical Surround Engine.',
    'Soundbars', 1199.99, 1399.99, 'Sony', TRUE,
    'https://i.rtings.com/assets/products/6WRg2OaU/sony-ht-a7000/design-medium.jpg?format=auto',
    ARRAY['7.1.2 Channels', 'Dolby Atmos & DTS:X', 'High-Res Audio'], true
),
(
    'p_009', 'Samsung HW-Q990D', 'samsung-hw-q990d',
    '11.1.4ch Soundbar with Wireless Dolby Atmos. Experience the ultimate 3D sound from every direction with 11 front-facing speakers, 1 subwoofer, and 4 up-firing channels.',
    'Soundbars', 1499.99, 1999.99, 'Samsung', TRUE,
    'https://i.rtings.com/assets/products/caElzo97/samsung-hw-q990d/design-medium.jpg?format=auto',
    ARRAY['11.1.4 Channels', 'Q-Symphony', 'Included Rear Speakers', 'Wireless Dolby Atmos'], true
),
(
    'p_010', 'KEF LS50 Meta', 'kef-ls50-meta',
    'The LS50 Meta is a highly precise, emotionally engaging loudspeaker built on revolutionary acoustic technology. Designed around the 12th Generation Uni-Q with Metamaterial Absorption Technology.',
    'Bookshelf Speakers', 1599.99, 1599.99, 'KEF', TRUE,
    '/audiocare_img/kef_ls50_meta.png',
    ARRAY['Two-way bass reflex', 'Uni-Q Driver', '47Hz - 45kHz', 'Metamaterial Absorption'], true
),
(
    'p_011', 'Yamaha NS-F51', 'yamaha-ns-f51',
    'This high performance floor-standing speaker uses a two-way, three-speaker configuration with two 16cm cone woofers and one 3cm soft dome tweeter for beautifully clear sound with immensely powerful bass.',
    'Floorstanding Speakers', 349.95, 349.95, 'Yamaha', FALSE,
    '/audiocare_img/yamaha_ns_f51.png',
    ARRAY['2-way bass-reflex', 'Dual 16cm Woofers', '6 ohms Impedance'], true
),
(
    'p_012', 'JBL L100 Classic', 'jbl-l100-classic',
    'In 1970, JBL released the iconic L100 Loudspeaker. Over the years, the L100 became the best-selling loudspeaker in JBL''s history. Now, we are proud to bring you the JBL L100 Classic.',
    'Bookshelf Speakers', 4800.00, 4800.00, 'JBL', TRUE,
    '/audiocare_img/jbl_l100_classic.png',
    ARRAY['3-way Design', '12-inch pure pulp woofer', 'Quadrex foam grille', 'Classic Vintage Look'], true
);

-- ============================================================
-- BLOGS (id: uuid, matches blogs.sql schema)
-- ============================================================
INSERT INTO public.blogs (
    title, slug, excerpt, content, featured_image, tags, published
) VALUES
(
    'Setting Up Your Home Theater: A Beginner''s Guide',
    'setting-up-home-theater',
    'Everything you need to know to get started with your first 5.1 or 7.1 setup.',
    'A detailed guide covering speaker placement, receiver connections, and acoustic treatments for the perfect home cinema experience.',
    'https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=800&q=80',
    ARRAY['guide', 'home theater'],
    TRUE
),
(
    'Soundbar vs. Surround Sound: Which is Right for You?',
    'soundbar-vs-surround-sound',
    'Weighing the pros and cons of simple soundbars versus full dedicated surround sound systems.',
    'A comprehensive comparison focusing on budget, room size, and audio fidelity to help you make the right choice.',
    'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=800&q=80',
    ARRAY['comparison', 'soundbar', 'surround'],
    TRUE
),
(
    'How to Fix a Blown Speaker Cone',
    'how-to-fix-blown-speaker-cone',
    'Learn the symptoms of a blown speaker and whether you should attempt a DIY fix or seek professional re-coning services.',
    'A blown speaker typically produces a scratching, buzzing, or distorted sound. This guide walks you through diagnosis and repair options.',
    'https://images.unsplash.com/photo-1545464528-7965b1617415?q=80&w=800&auto=format&fit=crop',
    ARRAY['Speakers', 'Repair', 'DIY'],
    TRUE
)
ON CONFLICT (slug) DO NOTHING;
