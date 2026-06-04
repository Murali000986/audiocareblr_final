-- AudioCare Supabase Schema
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/zorbicldczcewexjiqla/sql

-- Profiles
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  phone text,
  avatar_url text,
  created_at timestamptz default now()
);
alter table public.profiles enable row level security;
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "Users can upsert own profile" on public.profiles for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Products
create table if not exists public.products (
  id text primary key,
  name text not null,
  slug text unique,
  category text not null,
  category_label text,
  brand text not null,
  price numeric not null,
  mrp numeric,
  rating numeric default 4.5,
  reviews_count integer default 0,
  badge text,
  img_url text,
  description text,
  highlights text[],
  in_stock boolean default true,
  cost_price numeric,
  is_best_seller boolean default false,
  created_at timestamptz default now()
);
alter table public.products enable row level security;
create policy "Anyone can view products" on public.products for select using (true);
create policy "Only admins can modify products" on public.products for all using (auth.jwt()->>'email' in ('admin@audiocare.in', 'murali701081@gmail.com'));

-- Orders
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users,
  status text default 'confirmed',
  items jsonb,
  subtotal numeric,
  shipping numeric,
  total numeric,
  address jsonb,
  created_at timestamptz default now()
);
alter table public.orders enable row level security;
create policy "Users can view own orders" on public.orders for select using (auth.uid() = user_id);
create policy "Users can insert own orders" on public.orders for insert with check (auth.uid() = user_id or user_id is null);
create policy "Admins can view all orders" on public.orders for all using (auth.jwt()->>'email' in ('admin@audiocare.in', 'murali701081@gmail.com'));

-- Repair Bookings
create table if not exists public.repair_bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users,
  name text not null,
  phone text not null,
  email text not null,
  device text not null,
  brand text not null,
  issue text not null,
  pickup_mode text default 'pickup',
  preferred_date text,
  status text default 'booked',
  booking_ref text unique not null,
  created_at timestamptz default now()
);
alter table public.repair_bookings enable row level security;
create policy "Users can view own bookings" on public.repair_bookings for select using (auth.uid() = user_id);
create policy "Anyone can insert bookings" on public.repair_bookings for insert with check (true);
create policy "Admins can view all bookings" on public.repair_bookings for all using (auth.jwt()->>'email' in ('admin@audiocare.in', 'murali701081@gmail.com'));

-- Reviews
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id text references public.products,
  user_id uuid references auth.users,
  rating integer check (rating >= 1 and rating <= 5),
  text text not null,
  author_name text,
  created_at timestamptz default now()
);
alter table public.reviews enable row level security;
create policy "Anyone can view reviews" on public.reviews for select using (true);
create policy "Auth users can insert reviews" on public.reviews for insert with check (auth.uid() = user_id);

-- Wishlist
create table if not exists public.wishlist (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  product_id text references public.products not null,
  created_at timestamptz default now(),
  unique(user_id, product_id)
);
alter table public.wishlist enable row level security;
create policy "Users can manage own wishlist" on public.wishlist for all using (auth.uid() = user_id);

-- Testimonials (What Our Customers Say)
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  text text not null,
  rating integer check (rating >= 1 and rating <= 5) default 5,
  avatar_url text,
  created_at timestamptz default now()
);
alter table public.testimonials enable row level security;
create policy "Anyone can view testimonials" on public.testimonials for select using (true);
create policy "Only admins can modify testimonials" on public.testimonials for all using (auth.jwt()->>'email' in ('admin@audiocare.in', 'murali701081@gmail.com'));

-- Portfolio (Our Work)
create table if not exists public.portfolio (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text,
  img_url text not null,
  description text,
  created_at timestamptz default now()
);
alter table public.portfolio enable row level security;
create policy "Anyone can view portfolio" on public.portfolio for select using (true);
create policy "Only admins can modify portfolio" on public.portfolio for all using (auth.jwt()->>'email' in ('admin@audiocare.in', 'murali701081@gmail.com'));

-- Storage (Create a public bucket named 'images' if it doesn't exist)
insert into storage.buckets (id, name, public) values ('images', 'images', true) on conflict (id) do nothing;
create policy "Anyone can read images" on storage.objects for select using (bucket_id = 'images');
create policy "Auth users can upload images" on storage.objects for insert with check (bucket_id = 'images' and auth.role() = 'authenticated');
create policy "Auth users can update images" on storage.objects for update with check (bucket_id = 'images' and auth.role() = 'authenticated');
create policy "Auth users can delete images" on storage.objects for delete using (bucket_id = 'images' and auth.role() = 'authenticated');
