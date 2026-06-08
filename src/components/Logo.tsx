export function Logo() {
  return (
    <div className="flex items-center justify-center py-1 group">
      <img 
        src="/audiocare_img/audiocare-logo.png" 
        alt="AudioCare Logo" 
        className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
      />
    </div>
  );
}
