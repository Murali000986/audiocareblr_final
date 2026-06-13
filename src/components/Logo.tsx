export function Logo({ large = false }: { large?: boolean }) {
  return (
    <div className="flex items-center py-1 group gap-3 sm:gap-4">
      <img
        src="/audiocare_img/audiocare-logo.png"
        alt="AudioCare Logo"
        className={`${large ? "h-[80px] sm:h-[95px]" : "h-[60px] sm:h-[70px]"} w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
      />
      <span
        className="text-[#c0392b] whitespace-nowrap"
        style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: large ? '48px' : '38px',
          lineHeight: 1,
          userSelect: 'none',
          transform: 'translateY(4px)'
        }}
      >
        Life for Audio
      </span>
    </div>
  );
}
