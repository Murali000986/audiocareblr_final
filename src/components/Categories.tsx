import { categories } from "@/data/sampleData";
import { Bluetooth, Disc3, AudioWaveform, Monitor, Headphones } from "lucide-react";

const iconMap: Record<string, any> = { bluetooth: Bluetooth, disc: Disc3, "audio-waveform": AudioWaveform, monitor: Monitor, headphones: Headphones };

export function Categories() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((c) => {
          const Icon = iconMap[c.icon];
          return (
            <a
              key={c.name}
              href="/shop"
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 hover:border-primary hover:-translate-y-1 transition-all shadow-soft flex items-center justify-between gap-2"
            >
              <div>
                <div className="font-display font-bold text-sm leading-tight">{c.name}</div>
                {Icon && <Icon className="w-4 h-4 text-primary mt-2" />}
              </div>
              <img src={c.img} alt={c.name} loading="lazy" className="w-20 h-20 object-contain group-hover:scale-110 transition-transform" />
            </a>
          );
        })}
      </div>
    </section>
  );
}
