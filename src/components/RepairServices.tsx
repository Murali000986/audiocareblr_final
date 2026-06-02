import { repairServices } from "@/data/sampleData";
import { Speaker, Cpu, AudioWaveform, Truck, ArrowRight } from "lucide-react";

const iconMap: Record<string, any> = { speaker: Speaker, cpu: Cpu, "audio-waveform": AudioWaveform, truck: Truck };

export function RepairServices() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid lg:grid-cols-[260px_1fr] gap-6 items-start">
        <div>
          <h2 className="font-display text-3xl font-bold">Our Repair Services</h2>
          <div className="mt-2 w-12 h-1 bg-primary rounded" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {repairServices.map((s) => {
            const Icon = iconMap[s.icon];
            return (
              <div key={s.title} className="rounded-2xl border border-border bg-card p-5 hover:border-primary transition-all hover:-translate-y-1 shadow-soft">
                <div className="w-11 h-11 rounded-xl bg-accent text-primary flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="mt-3 font-bold">{s.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{s.desc}</p>
                <a href="/repair-service" className="inline-flex items-center gap-1 text-xs font-semibold text-primary mt-3 hover:gap-2 transition-all">
                  Learn More <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
