interface MarqueeProps {
  children: React.ReactNode;
  reverse?: boolean;
  speed?: number;
  className?: string;
}

export default function Marquee({
  children,
  reverse = false,
  speed = 20,
  className = "",
}: MarqueeProps) {
  const style = {
    animationDuration: `${speed}s`,
  };

  return (
    <div className={`marquee-viewport overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className={reverse ? "marquee-track-reverse" : "marquee-track"}
        style={style}
      >
        {/* Duplicate content for seamless loop */}
        <div className="flex shrink-0 gap-12 md:gap-20">{children}</div>
        <div className="flex shrink-0 gap-12 md:gap-20" aria-hidden>{children}</div>
      </div>
    </div>
  );
}
