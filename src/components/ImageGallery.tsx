import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function ImageGallery() {
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight mb-3">
              Audio Inspiration
            </h2>
            <p className="text-muted-foreground text-lg">
              Explore our premium installations and top-tier audio equipment setups.
            </p>
          </div>
          <Link to="/our-work" className="inline-flex items-center gap-2 font-bold text-primary hover:underline shrink-0">
            View Portfolio <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Masonry-style grid for visual impact */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden relative group">
            <img 
              src="https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1200&auto=format&fit=crop" 
              alt="Home Theater" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
          </div>
          <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden relative group">
             <img 
              src="https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=600&auto=format&fit=crop" 
              alt="Premium Speakers" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
          </div>
          <div className="col-span-1 row-span-2 rounded-2xl overflow-hidden relative group">
            <img 
              src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop" 
              alt="Auditorium Audio" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
          </div>
          <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden relative group">
            <img 
              src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=600&auto=format&fit=crop" 
              alt="Soundbar Setup" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
