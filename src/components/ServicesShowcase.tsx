import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Home Theater",
    description:
      "Transform any room into a private cinema with professional home theater installation in Bangalore. We supply and install complete home theater systems with Dolby Atmos surround sound, projectors, and smart controls.",
    image:
      "/audiocare_img/services_home_theater.png",
    link: "/shop/category/home-theatre",
    tag: "Design & Install",
    points: ["Dolby Atmos / DTS:X Surround", "4K Projector Setup", "Acoustic Treatment", "Smart Remote Control"],
    accent: "#e84e1b",
  },
  {
    id: 2,
    title: "Theater & Auditorium",
    description:
      "Professional audio-visual solutions for theaters, auditoriums, schools, and conference halls. Crisp, powerful sound that fills every seat — engineered for large spaces.",
    image:
      "/audiocare_img/services_auditorium.png",
    link: "/contact",
    tag: "Professional AV",
    points: ["Large Venue Sound Design", "Line Array Speaker Systems", "AV Integration", "Conference & Boardroom"],
    accent: "#5b21b6",
  },
  {
    id: 3,
    title: "Sound Systems",
    description:
      "Whether it's a premium soundbar, multi-room audio, or a full hi-fi setup — we carry top brands like JBL, Sony, Bose, and Marshall. Your perfect sound system is here.",
    image:
      "/audiocare_img/services_sound_systems.png",
    link: "/shop",
    tag: "Buy & Experience",
    points: ["Premium Brand Selection", "Soundbars & Subwoofers", "Multi-room Audio", "Party Speakers"],
    accent: "#1a3c6e",
  },
  {
    id: 4,
    title: "Audio Repair Service",
    description:
      "Expert audio equipment repair in Bengaluru — speakers, amplifiers, subwoofers, and soundbars. Certified technicians, genuine parts, and free pickup & delivery for speaker repair in Bangalore.",
    image:
      "/audiocare_img/services_repair.png",
    link: "/repair-service",
    tag: "Repair & Restore",
    points: ["Speaker Cone Replacement", "Amplifier Repair", "Soundbar Servicing", "Free Doorstep Pickup"],
    accent: "#1f5c2e",
  },
];

export function ServicesShowcase() {
  return (
    <section className="w-full bg-background py-20 px-4 sm:px-6">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-primary font-bold uppercase tracking-[0.2em] text-sm mb-3">
            Everything Audio, Under One Roof
          </p>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight">
            What We Do
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            From home theaters and professional audio installations to speaker repair — AudioCare is your complete audio solutions partner.
          </p>
        </div>

        {/* Service Cards — alternating layout */}
        <div className="flex flex-col gap-8">
          {services.map((service, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={service.id}
                className={`group flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} rounded-2xl overflow-hidden border border-border shadow-soft hover:shadow-lg transition-shadow`}
              >
                {/* Image */}
                <div className="relative w-full lg:w-[55%] h-64 sm:h-80 lg:h-[420px] overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Tag badge */}
                  <div
                    className="absolute top-5 left-5 text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm"
                    style={{ backgroundColor: service.accent }}
                  >
                    {service.tag}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-14 bg-card w-full">
                  <h3
                    className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight"
                  >
                    {service.title}
                  </h3>
                  <p className="mt-4 text-muted-foreground leading-relaxed text-base sm:text-lg max-w-lg">
                    {service.description}
                  </p>

                  {/* Feature points */}
                  <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: service.accent }}
                        />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <Link
                      to={service.link as any}
                      className="inline-flex items-center gap-2 font-bold uppercase tracking-wider text-sm px-7 py-3.5 text-white transition-all hover:brightness-110 hover:-translate-y-0.5"
                      style={{ backgroundColor: service.accent }}
                    >
                      {service.id === 4 ? "Book Repair Now" : service.id === 2 ? "Get a Quote" : "Explore More"}{" "}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
