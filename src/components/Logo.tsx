export function Logo({ large = false, showText = true }: { large?: boolean; showText?: boolean }) {
  return (
    <div className="flex items-center py-1 group gap-3 sm:gap-4">
      <img
        src="/audiocare_img/audiocare-logo.png"
        alt="AudioCare Logo"
        className={`${large ? "h-[120px] sm:h-[140px]" : "h-[100px] sm:h-[120px]"} w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
      />
      {showText && (
        <span
          className="text-[#c0392b] whitespace-nowrap"
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: large ? '54px' : '46px',
            lineHeight: 1,
            userSelect: 'none',
            transform: 'translateY(4px)'
          }}
        >
          Life for Audio
        </span>
      )}
    </div>
  );
}
