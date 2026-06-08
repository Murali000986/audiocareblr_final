-- Create Blogs Table
CREATE TABLE IF NOT EXISTS public.blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text NOT NULL,
  featured_image text,
  tags text[],
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view published blogs" ON public.blogs FOR SELECT USING (published = true);
CREATE POLICY "Only admins can modify blogs" ON public.blogs FOR ALL USING (auth.jwt()->>'email' IN ('admin@audiocare.in', 'murali701081@gmail.com'));

-- Insert AI-Optimized SEO Blog Posts
INSERT INTO public.blogs (title, slug, excerpt, content, featured_image, tags, published) VALUES
(
  'Troubleshooting No Sound from Soundbar',
  'troubleshooting-no-sound-soundbar',
  'A complete diagnostic guide to fixing soundbars that won''t produce audio. Learn how to check cables, inputs, and internal settings.',
  '## Why Is There No Sound From My Soundbar?

**If your soundbar has power but no sound, the most common culprits are incorrect input settings on the TV, a faulty HDMI ARC/Optical cable, or a Bluetooth pairing glitch. First, ensure your TV audio output is set to "External Speakers" or "Optical" instead of TV Speakers.**

### 1. Check the Connections
The first step in diagnosing a silent soundbar is verifying the physical connections.
- **HDMI ARC/eARC:** Ensure the cable is plugged into the port explicitly labeled "ARC" or "eARC" on both the TV and the soundbar.
- **Optical Cable:** Check for the red light emitting from the tip of the optical cable. If there is no light, the cable or the TV port might be damaged.

### 2. Verify TV Audio Settings
Modern smart TVs often don''t switch audio outputs automatically.
- Go to TV Settings > Sound > Audio Output.
- Select your soundbar or "Receiver (HDMI)".
- Ensure the Digital Audio Out format is set to "PCM" or "Auto".

### 3. Power Cycle and Reset
Sometimes a simple power cycle resolves handshake issues between the TV and soundbar. Unplug both devices from the wall, wait 60 seconds, and plug them back in. If the issue persists, consult your manual to perform a factory reset on the soundbar.

### FAQ
**Q: Why does my soundbar cut out randomly?**
A: Audio cutouts are usually caused by wireless interference (if using Bluetooth) or a degraded HDMI cable struggling with high bandwidth. Try replacing the HDMI cable with a certified Ultra High Speed cable.

*Expert Reviewed By: AudioCare Technical Team, Bengaluru.*',
  'https://images.unsplash.com/photo-1542728928-1413d1894ed1?q=80&w=800&auto=format&fit=crop',
  ARRAY['Soundbar', 'Troubleshooting', 'Repair'],
  true
),
(
  'How to Fix a Blown Speaker Cone',
  'how-to-fix-blown-speaker-cone',
  'Learn the symptoms of a blown speaker and whether you should attempt a DIY fix or seek professional re-coning services.',
  '## How Do I Know If My Speaker Is Blown?

**A blown speaker typically produces a scratching, buzzing, or distorted sound, especially at higher volumes. You may also notice no sound coming from a specific driver (like a tweeter or woofer), or physically see tears and separation in the foam surround or speaker cone.**

### Symptoms of a Blown Speaker
1. **Distortion:** The audio sounds fuzzy or staticky.
2. **Lack of Range:** The bass sounds thin, or the treble is missing entirely.
3. **Physical Damage:** The foam edge holding the cone to the metal basket is deteriorating or ripped.

### Can You Fix a Blown Speaker?
Yes, a blown speaker can often be repaired without replacing the entire unit.
- **Re-foaming:** If only the outer foam edge is degraded (common in older speakers), a re-foam kit can restore it perfectly.
- **Re-coning:** If the actual paper/kevlar cone is torn, or the voice coil is burnt out, the speaker will need to be re-coned. This involves stripping the speaker down to the magnet basket and rebuilding the moving parts.

### DIY vs. Professional Repair
While re-foaming can be a careful DIY project, re-coning requires precision alignment of the voice coil in the magnetic gap. If aligned improperly, the speaker will rub and distort immediately. For high-end or vintage speakers, professional service is highly recommended.

### FAQ
**Q: How much does it cost to fix a blown speaker?**
A: Re-foaming is generally inexpensive, while full re-coning or voice coil replacement can range from ₹1500 to ₹5000+ depending on the brand and size of the speaker in Bangalore.

*Expert Reviewed By: AudioCare Technical Team, Bengaluru.*',
  'https://images.unsplash.com/photo-1545464528-7965b1617415?q=80&w=800&auto=format&fit=crop',
  ARRAY['Speakers', 'Repair', 'DIY'],
  true
),
(
  'Vintage Amplifier Repair Guide',
  'vintage-amplifier-repair-guide',
  'Discover the common issues that plague vintage stereo amplifiers and how to restore that warm, classic analog sound.',
  '## How to Restore a Vintage Amplifier

**Restoring a vintage amplifier involves cleaning scratchy potentiometers (knobs), replacing dried-out electrolytic capacitors, and resetting the bias and DC offset to factory specifications. This preventative maintenance ensures longevity and restores the original warm audio quality.**

### Common Issues in Vintage Audio Gear

#### 1. Scratchy Controls and Switches
Over decades, dust and oxidation build up inside volume dials and selector switches. This causes a crackling sound when you turn the knobs, or audio dropping out of one channel. A thorough cleaning with specialized contact cleaner (like DeoxIT) usually resolves this instantly.

#### 2. Failing Capacitors
Electrolytic capacitors contain a liquid that dries out over 20-30 years. When they fail, you may hear a constant 60Hz hum in your speakers, experience weak bass response, or the amplifier might fail to power on entirely. A "re-cap" involves replacing these old components with modern, high-quality audio capacitors.

#### 3. DC Offset and Bias Drift
Amplifiers use internal trimmers to control the idle current (bias) and the voltage sent to the speakers (DC offset). Over time, these values drift. High DC offset can damage your speakers, while incorrect bias can cause the amplifier to run dangerously hot or sound distorted.

### Should I Leave My Vintage Amp Plugged In?
It is generally safe, but if the amplifier hasn''t been serviced in decades, leaving it unattended can be risky due to aging capacitors. It''s best to have it inspected by a qualified technician first.

### FAQ
**Q: Is it worth repairing an old stereo receiver?**
A: Absolutely. Vintage receivers from the 70s and 80s (like Marantz, Pioneer, Sansui) were built with high-quality discrete components and massive power supplies that far exceed the build quality of many modern entry-level amplifiers.

*Expert Reviewed By: AudioCare Technical Team, Bengaluru.*',
  'https://images.unsplash.com/photo-1461151304267-38535e780c79?q=80&w=800&auto=format&fit=crop',
  ARRAY['Amplifiers', 'Vintage', 'Maintenance'],
  true
) ON CONFLICT (slug) DO NOTHING;
