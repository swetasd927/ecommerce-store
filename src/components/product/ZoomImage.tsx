import { useRef, useState, type MouseEvent } from "react";

type ZoomImageProps = {
  src: string;
  alt: string;
  zoomLevel?: number;
  className?: string;
};

function ZoomImage({ src, alt, zoomLevel = 2, className }: ZoomImageProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [zoomed, setZoomed] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setOrigin({
      x: Math.min(100, Math.max(0, x)),
      y: Math.min(100, Math.max(0, y)),
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setZoomed(true)}
      onMouseLeave={() => {
        setZoomed(false);
        setOrigin({ x: 50, y: 50 });
      }}
      onMouseMove={handleMouseMove}
      className={`relative h-full w-full cursor-zoom-in overflow-hidden ${className ?? ""}`}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-contain transition-transform duration-300 ease-out"
        style={{
          transformOrigin: `${origin.x}% ${origin.y}%`,
          transform: zoomed ? `scale(${zoomLevel})` : "scale(1)",
        }}
        draggable={false}
      />
    </div>
  );
}

export default ZoomImage;