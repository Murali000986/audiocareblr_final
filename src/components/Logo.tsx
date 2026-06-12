export function Logo() {
  return (
    <div className="flex flex-col items-center justify-center py-1 group" style={{ gap: '2px' }}>
      <img
        src="/audiocare_img/audiocare-logo.png"
        alt="AudioCare Logo"
        className="h-[68px] sm:h-[82px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
      />
      <span
        style={{
          fontFamily: "'Black Ops One', cursive",
          color: '#c0392b',
          fontSize: '10px',
          letterSpacing: '0.18em',
          lineHeight: 1,
          display: 'block',
          textAlign: 'center',
          textTransform: 'uppercase',
          userSelect: 'none',
          opacity: 0.92,
        }}
      >
        LIFE FOR AUDIO
      </span>
    </div>
  );
}
