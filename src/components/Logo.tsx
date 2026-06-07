export function Logo() {
  return (
    <div className="flex flex-col items-center justify-center -space-y-0.5 group py-1">
      <svg 
        viewBox="0 0 100 100" 
        className="w-10 h-10 text-[#cc0e0b] transition-transform group-hover:scale-105" 
        fill="none" 
        stroke="currentColor" 
      >
        {/* The C shape */}
        <path d="M 85 30 A 40 40 0 1 0 85 70" stroke="#cc0e0b" strokeWidth="8" fill="none" strokeLinecap="round" />
        {/* The A shape */}
        <path d="M 22 78 L 50 15 L 78 78 M 34 55 L 66 55" stroke="#cc0e0b" strokeWidth="8" fill="none" strokeLinejoin="miter" strokeLinecap="round" />
      </svg>
      <span 
        style={{ fontFamily: "'Black Ops One', cursive" }}
        className="text-[#cc0e0b] text-[15px] leading-tight tracking-[0.1em] uppercase mt-1"
      >
        Audio Care
      </span>
    </div>
  );
}
