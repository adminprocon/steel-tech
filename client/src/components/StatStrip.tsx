import { motion } from "framer-motion";
import { RevealStagger, staggerItem } from "./Reveal";
import { CountUp } from "./motion";
import { stats } from "@/data/site";

export default function StatStrip({ className = "" }: { className?: string }) {
  return (
    <RevealStagger className={`stat-row ${className}`}>
      {stats.map((stat) => (
        <motion.div variants={staggerItem} className="stat" key={stat.value}>
          <strong>
            <CountUp value={stat.value} />
          </strong>
          <span>{stat.label}</span>
        </motion.div>
      ))}
    </RevealStagger>
  );
}
