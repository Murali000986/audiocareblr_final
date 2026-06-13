export function Logo({ large = false, showText = true }: { large?: boolean; showText?: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-1 group">
      <img
        src="/audiocare_img/audiocare-logo.png"
        alt="AudioCare Logo"
        className={`${large ? "h-[100px] sm:h-[120px]" : "h-[70px] sm:h-[80px]"} w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
      />
      {showText && (
        <span
          className="text-[#e84e1b] whitespace-nowrap"
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: large ? '36px' : '26px',
            lineHeight: 1,
            userSelect: 'none',
            marginTop: large ? '-5px' : '-2px',
          }}
        >
          Life for Audio
        </span>
      )}
    </div>
  );
}
