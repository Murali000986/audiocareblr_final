export function Logo() {
  return (
    <div className="flex flex-col items-center justify-center py-1 group gap-0">
      <img 
        src="/audiocare_img/audiocare-logo.png" 
        alt="AudioCare Logo" 
        className="h-[70px] sm:h-20 w-auto object-contain transition-transform group-hover:scale-105"
      />
      <span
        style={{ fontFamily: "'Black Ops One', cursive" }}
        className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-primary leading-none select-none"
      >
        life for audio
      </span>
    </div>
  );
}
