import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { ImageIcon } from "lucide-react";

/* manus-storage assets resolve only when a Forge storage backend is configured; this falls back to a
   branded placeholder so pages render correctly without it, and upgrades automatically once real images exist. */
export function SiteImage({
  src,
  alt,
  label,
  icon: Icon = ImageIcon,
  className = "",
}: {
  src?: string;
  alt: string;
  label?: string;
  icon?: LucideIcon;
  className?: string;
}) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return (
      <div className={`site-image-fallback ${className}`} role="img" aria-label={alt}>
        <div className="site-image-fallback-grid" />
        <Icon size={34} />
        {label && <span>{label}</span>}
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} onError={() => setErrored(true)} />;
}
