import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { RevealStagger, staggerItem } from "@/components/Reveal";

const industries = [
  { name: "Hospitals & healthcare", door: "Scientific Steel Doors", img: "/images/hero-doors/door-restricted-blue.jpg", href: "/products/scientific-doors" },
  { name: "Pharma & clean rooms", door: "Scientific Steel Doors", img: "/images/hero-doors/door-cleanroom-sliding.jpg", href: "/products/scientific-doors" },
  { name: "Fire exits & stairwells", door: "Fire Rated Steel Doors", img: "/images/hero-doors/door-fire-exit-red.jpg", href: "/products/fire-rated-doors" },
  { name: "Server & electrical rooms", door: "Fire Rated Steel Doors", img: "/images/hero-doors/door-server-room.jpg", href: "/products/fire-rated-doors" },
  { name: "Offices & institutions", door: "General Purpose Steel Doors", img: "/images/hero-doors/door-staffroom-granite.jpg", href: "/products/general-purpose-doors" },
  { name: "Lobbies & showrooms", door: "Fully Glass Steel Doors", img: "/images/products/aluminium-glass-doors.jpg", href: "/products/aluminium-glass-doors" },
];

/** Editorial list of sectors. On desktop a photo card trails the cursor on a spring and swaps to the hovered row. */
export default function IndustryList() {
  const [hovered, setHovered] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 24, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 24, mass: 0.5 });

  return (
    <div
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        x.set(e.clientX + 24);
        y.set(e.clientY - 180);
      }}
      onPointerLeave={() => setHovered(null)}
    >
      <RevealStagger className="industry-list">
        {industries.map((item, i) => (
          <motion.div variants={staggerItem} key={item.name}>
            <Link href={item.href} className="industry-row" onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(i)}>
              <i>0{i + 1}</i>
              <img className="thumb" src={item.img} alt="" loading="lazy" />
              <h3>{item.name}</h3>
              <span className="ind-door">{item.door}</span>
              <span className="arrow" aria-hidden="true">
                <ArrowUpRight size={18} />
              </span>
            </Link>
          </motion.div>
        ))}
      </RevealStagger>

      <AnimatePresence>
        {hovered !== null && (
          <motion.div
            className="industry-follower"
            style={{ x: sx, y: sy }}
            initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.15 } }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            aria-hidden="true"
          >
            <AnimatePresence initial={false}>
              <motion.img
                key={industries[hovered].img}
                src={industries[hovered].img}
                alt=""
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              />
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
