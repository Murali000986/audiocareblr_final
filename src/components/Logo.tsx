export function Logo({ large = false, showText = true }: { large?: boolean; showText?: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-1 group">
      <img
        src="/audiocare_img/audiocare-logo.png"
        alt="AudioCare Logo"
        className={`${large ? "h-[120px] sm:h-[140px]" : "h-[85px] sm:h-[100px]"} w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
      />
      {showText && (
        <span
          className="text-[#e84e1b] whitespace-nowrap"
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: large ? '32px' : '20px',
            lineHeight: 1,
            userSelect: 'none',
            marginTop: large ? '-5px' : '-2px',
            marginLeft: large ? '80px' : '65px',
          }}
        >
          Life for Audio
        </span>
      )}
    </div>
  );
}
