import { InfiniteSlider } from "@/components/core/infinite-slider";

const columnA = [
  { src: "/images/hero-doors/door-fire-exit-red.jpg", alt: "Red fire exit steel door installation" },
  { src: "/images/hero-doors/door-restroom-blue.jpg", alt: "Blue steel restroom door" },
  { src: "/images/hero-doors/door-cleanroom-sliding.jpg", alt: "Sliding steel door for a cleanroom environment" },
  { src: "/images/hero-doors/door-double-blue.jpg", alt: "Double-leaf blue steel doors" },
  { src: "/images/hero-doors/door-restricted-blue.jpg", alt: "Blue steel door marked for restricted access" },
];

const columnB = [
  { src: "/images/hero-doors/door-emergency-exit-red.jpg", alt: "Red emergency exit steel door" },
  { src: "/images/hero-doors/door-staffroom-granite.jpg", alt: "Steel staffroom door with granite-finish surround" },
  { src: "/images/hero-doors/door-electrical-room.jpg", alt: "Steel door for an electrical room" },
  { src: "/images/hero-doors/door-server-room.jpg", alt: "Steel door for a server room" },
  { src: "/images/hero-doors/door-fire-exit-grey.jpg", alt: "Grey fire exit steel door" },
];

/** Two counter-scrolling columns of door photography for the hero's right side. Hidden below lg since the hero
 * text already needs the full width on small screens. */
export default function HeroDoorSlider() {
  return (
    <div className="hero-door-slider" aria-hidden="true">
      <InfiniteSlider direction="vertical" gap={14} duration={26} durationOnHover={60} className="hero-door-column">
        {columnA.map((door) => (
          <img key={door.src} src={door.src} alt={door.alt} loading="lazy" className="hero-door-image" />
        ))}
      </InfiniteSlider>
      <InfiniteSlider direction="vertical" reverse gap={14} duration={26} durationOnHover={60} className="hero-door-column">
        {columnB.map((door) => (
          <img key={door.src} src={door.src} alt={door.alt} loading="lazy" className="hero-door-image" />
        ))}
      </InfiniteSlider>
    </div>
  );
}
