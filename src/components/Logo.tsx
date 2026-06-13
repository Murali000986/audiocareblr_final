export function Logo({ large = false, showText = true }: { large?: boolean; showText?: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-1 group">
      {/* SVG Filter definition for true pixel dilation (makes image bolder without blur) */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <filter id="bold-filter">
          <feMorphology in="SourceGraphic" operator="dilate" radius="0.75" />
        </filter>
      </svg>
      
      <img
        src="/audiocare_img/audiocare-logo.png"
        alt="AudioCare Logo"
        className={`${large ? "h-[100px] sm:h-[120px]" : "h-[70px] sm:h-[80px]"} w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
        style={{ filter: "url(#bold-filter)" }}
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
            marginLeft: large ? '70px' : '50px',
          }}
        >
          Life for Audio
        </span>
      )}
    </div>
  );
}
