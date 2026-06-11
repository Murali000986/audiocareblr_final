import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, MapPin, Phone, Award, Users, Star, ArrowRight, CheckCircle2, Briefcase, Shield, Globe } from "lucide-react";

export const Route = createFileRoute("/about/")({
  head: () => ({
    meta: [
      { title: "About AudioCare — 19+ Years of Audio Expertise in Bengaluru" },
      { name: "description", content: "Meet the team behind Bengaluru's most trusted audio service center. Prakash, our founder, has been serving JBL, Harman Kardon & Infinity customers since 2007. Home theatre, AMC, and sound system experts in Bangalore." },
      { name: "keywords", content: "audiocare bengaluru, audio service center bangalore, home theatre expert bengaluru, JBL dealer bangalore, speaker service bangalore, prakash audiocare, audio AMC bengaluru" },
      { property: "og:title", content: "About AudioCare Bengaluru — 19+ Years of Audio Excellence" },
      { property: "og:description", content: "Bengaluru's trusted audio expert since 2007. Prakash & team serve JBL, Harman, Infinity brands across Bangalore." },
      { property: "og:url", content: "https://www.audiocareblr.com/about" },
    ],
  }),
  component: AboutIndex,
});


const milestones = [
  { year: "2007", title: "Career Begins — Sahil International", desc: "Prakash joined JBL, Infinity & Harman Kardon (Sahil International) as a certified service vendor, beginning his journey across Bangalore, Chennai, Kerala and Hyderabad." },
  { year: "2010", title: "Multi-City Service Operations", desc: "Expanded service coverage across South India — handling premium audio brands in commercial, residential and institutional projects." },
  { year: "2014", title: "Wonderla Bangalore — AMC", desc: "Secured the Annual Maintenance Contract for Wonderla Bangalore, one of India's largest amusement parks — a milestone in professional audio service." },
  { year: "2015", title: "Bangalore Club — Audio AMC", desc: "Became the trusted audio AMC partner for Bangalore Club, one of the city's most prestigious social institutions." },
  { year: "2017", title: "PROFX — Pan India Service Vendor", desc: "Empanelled as a Pan India Service Vendor for PROFX, handling audio service projects across the entire country." },
  { year: "2017", title: "AudioCare Founded", desc: "After 13 years of building expertise with the world's leading audio brands, Prakash founded AudioCare — Bengaluru's most trusted audio solutions company." },
  { year: "2026", title: "19+ Years & Counting", desc: "Serving thousands of happy customers across Bengaluru with sales, installation, repair and AMC services." },
];

const founderCredentials = [
  { icon: Briefcase, label: "13 Years", sub: "as JBL / Harman service vendor" },
  { icon: Globe,     label: "5 Cities",  sub: "Bangalore · Chennai · Kerala · Hyderabad · Pan India" },
  { icon: Shield,    label: "AMC Expert", sub: "Wonderla · Bangalore Club · PROFX" },
  { icon: Award,     label: "Est. 2007",  sub: "19+ years of hands-on audio expertise" },
];

const stats = [
  { icon: Calendar, value: "19+", label: "Years in Business" },
  { icon: Users, value: "10,000+", label: "Repairs Completed" },
  { icon: Star, value: "4.9★", label: "Average Rating" },
  { icon: Award, value: "50+", label: "Premium Brands" },
];

const values = [
  { title: "Quality First", desc: "We use only genuine parts and certified techniques for every installation and repair." },
  { title: "Customer Trust", desc: "Our 18-year track record is built entirely on honest advice and transparent pricing." },
  { title: "Technical Expertise", desc: "Our team holds certifications from global audio brands and stays updated with the latest tech." },
  { title: "After-Sales Support", desc: "We don't disappear after the sale. Our AMC and support services are second to none." },
];

function AboutIndex() {
  return (
    <div className="space-y-20 animate-fade-up">

      {/* WHO WE ARE — Image + Text */}
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-primary font-bold uppercase tracking-widest text-xs mb-3">Est. 2007</p>
          <h2 className="text-4xl font-display font-extrabold tracking-tight mb-6 leading-tight">
            Bengaluru's Most Trusted Audio Partner
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed text-base">
            <p>
              AudioCare was born in 2007 from a single passion: <strong className="text-foreground">making world-class audio accessible to everyone</strong>. What started as a small repair shop in KHB Colony has grown into one of Bengaluru's leading audio solution providers.
            </p>
            <p>
              Today, we serve homeowners who want cinema-quality living rooms, businesses that need robust PA systems, and iconic venues like Wonderla and the Bangalore Club that rely on our Annual Maintenance Contracts to keep their audio running 24/7.
            </p>
            <p>
              We carry the most respected brands in audio — JBL, Infinity, Harman Kardon — backed by a team of certified technicians with decades of hands-on experience.
            </p>
          </div>
          <Link to="/about/services" className="mt-8 inline-flex items-center gap-2 font-bold text-primary hover:underline">
            Explore Our Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="relative h-[460px] rounded-3xl overflow-hidden shadow-xl">
          <img
            src="/audiocare_img/about_expert_team.png"
            alt="AudioCare technician repairing audio equipment"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <p className="text-white font-bold text-lg">Our Expert Team</p>
            <p className="text-white/70 text-sm">Certified technicians with 19+ years combined experience</p>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-2xl p-6 text-center shadow-soft">
            <s.icon className="w-7 h-7 text-primary mx-auto mb-3" />
            <div className="text-3xl font-display font-black text-foreground mb-1">{s.value}</div>
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </section>

      {/* FULL-WIDTH IMAGE QUOTE */}
      <section className="relative rounded-3xl overflow-hidden h-[350px] flex items-center">
        <img
          src="/audiocare_img/about_quote_banner.png"
          alt="Professional audio installation team at work"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 max-w-2xl mx-auto text-center px-8">
          <p className="text-white/90 text-2xl md:text-3xl font-display font-bold italic leading-snug">
            "We don't just sell audio — we engineer experiences that stay with you for a lifetime."
          </p>
          <p className="mt-5 text-white/60 font-medium">— Prakash, Founder · AudioCare, Since 2007</p>
        </div>
      </section>

      {/* ─── MEET THE FOUNDER ─── */}
      <section className="grid md:grid-cols-2 gap-12 items-center">

        {/* Left — Premium Audio Image */}
        <div className="relative h-[480px] rounded-3xl overflow-hidden shadow-2xl">
          <img 
            src="/audiocare_img/gallery_speakers.png"
            alt="Prakash AudioCare founder at work" 
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Floating experience badge */}
          <div className="absolute bottom-6 right-6 bg-primary text-primary-foreground rounded-2xl px-6 py-4 shadow-glow backdrop-blur-md bg-primary/90">
            <p className="font-display font-black text-3xl leading-none">19+</p>
            <p className="text-xs font-bold opacity-90 mt-1">Years Experience</p>
          </div>
          
          <div className="absolute bottom-6 left-6">
            <p className="text-white/90 font-bold text-sm uppercase tracking-widest">Est. 2007</p>
          </div>
        </div>

        {/* Right — story */}
        <div>
          <p className="text-primary font-bold uppercase tracking-widest text-xs mb-3">Meet the Founder</p>
          <h2 className="text-4xl font-display font-extrabold tracking-tight mb-6 leading-tight">
            The Man Behind <span className="text-gradient-orange">AudioCare</span>
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Prakash began his journey in the audio service industry in <strong className="text-foreground">2007</strong>, joining <strong className="text-foreground">Sahil International</strong> as a certified service vendor for industry-leading brands — <strong className="text-foreground">JBL, Infinity, and Harman Kardon</strong>.
            </p>
            <p>
              Over the next 13 years, he built a reputation for excellence across <strong className="text-foreground">Bangalore, Chennai, Kerala, and Hyderabad</strong> — handling everything from large commercial PA systems to precision home audio setups.
            </p>
            <p>
              His expertise earned him prestigious Annual Maintenance Contracts with landmarks like <strong className="text-foreground">Wonderla Bangalore</strong> and the <strong className="text-foreground">Bangalore Club</strong>. He was also empanelled as a <strong className="text-foreground">Pan India Service Vendor for PROFX</strong> — a testament to his pan-India reputation.
            </p>
            <p>
              Armed with this deep experience, Prakash founded <strong className="text-foreground">AudioCare</strong> — bringing world-class audio knowledge directly to customers, with the same professionalism that served India's biggest brands and venues.
            </p>
          </div>

          {/* Credential grid */}
          <div className="grid grid-cols-2 gap-3 mt-8">
            {founderCredentials.map((c) => (
              <div key={c.label} className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <c.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-display font-black text-sm text-foreground">{c.label}</p>
                  <p className="text-[10px] text-muted-foreground leading-tight">{c.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* OUR VALUES — 4 cards */}
      <section>
        <p className="text-primary font-bold uppercase tracking-widest text-xs mb-3">Our Philosophy</p>
        <h2 className="text-3xl font-display font-extrabold mb-8">What Drives Us</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {values.map((v, i) => (
            <div key={v.title} className="flex gap-4 p-6 bg-card border border-border rounded-2xl shadow-soft">
              <div className="w-9 h-9 bg-primary/10 text-primary flex items-center justify-center rounded-xl flex-shrink-0 font-black text-sm font-display">
                0{i + 1}
              </div>
              <div>
                <h3 className="font-bold text-base mb-1">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* JOURNEY TIMELINE */}
      <section>
        <p className="text-primary font-bold uppercase tracking-widest text-xs mb-3">Our Journey</p>
        <h2 className="text-3xl font-display font-extrabold mb-10">Milestones Over The Years</h2>
        <div className="relative border-l-2 border-primary/30 pl-8 space-y-8">
          {milestones.map((m) => (
            <div key={m.year} className="relative">
              <div className="absolute -left-[2.65rem] top-1 w-5 h-5 rounded-full bg-primary border-4 border-background" />
              <p className="text-primary font-black text-sm tracking-widest mb-1">{m.year}</p>
              <h3 className="font-bold text-lg text-foreground">{m.title}</h3>
              <p className="text-muted-foreground text-sm mt-1">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3-COLUMN IMAGE GALLERY */}
      <section>
        <p className="text-primary font-bold uppercase tracking-widest text-xs mb-3">Our Work</p>
        <h2 className="text-3xl font-display font-extrabold mb-8">Installations & Setups</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { src: "/audiocare_img/store-1.jpeg", alt: "AudioCare Store Koramangala" },
            { src: "/audiocare_img/store-2.jpeg", alt: "AudioCare Workshop" },
            { src: "/audiocare_img/services_repair.png", alt: "Technician repairing audio equipment" },
            { src: "/audiocare_img/services_home_theater.png", alt: "Home theater installation" },
            { src: "/audiocare_img/gallery_home_theater.png", alt: "Professional audio setup" },
            { src: "/audiocare_img/services_auditorium.png", alt: "Sound system installation" },
          ].map((img) => (
            <div key={img.alt} className="aspect-square rounded-xl overflow-hidden bg-muted group">
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT CARD */}
      <section className="bg-muted border border-border rounded-3xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="p-10 space-y-6">
            <p className="text-primary font-bold uppercase tracking-widest text-xs">Get In Touch</p>
            <h2 className="text-3xl font-display font-extrabold">Visit Us or Call Today</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0"><Phone className="w-5 h-5" /></div>
                <div>
                  <p className="font-bold text-sm text-foreground">Phone</p>
                  <p className="text-muted-foreground">Mobile: 9945966499</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0"><MapPin className="w-5 h-5" /></div>
                <div>
                  <p className="font-bold text-sm text-foreground">Locations</p>
                  <div className="space-y-3 mt-1">
                    <a href="https://maps.app.goo.gl/A5eJPPQdYyxD6g797?g_st" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                      <span className="font-semibold text-xs uppercase block text-foreground">Koramangala</span>
                      <span className="text-sm">AUDIOCARE</span>
                    </a>
                    <a href="https://maps.app.goo.gl/ZUKo8JVv9Zaa5YCA6?g_st=awb" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                      <span className="font-semibold text-xs uppercase block text-foreground">Nagarabhavi</span>
                      <span className="text-sm">AUDIOCARE UNIT2</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors">
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="h-[300px] md:h-auto bg-black relative overflow-hidden">
            <img
              src="/audiocare_img/services_sound_systems.png"
              alt="AudioCare professional store interior"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
