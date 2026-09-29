import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { ImageIcon } from "lucide-react";

/* Renders the photo, or a branded blueprint placeholder when no src is given or the file fails to load. */
export function SiteImage({
  src,
  alt,
  label,
  icon: Icon = ImageIcon,
  className = "",
  loading = "lazy",
}: {
  src?: string;
  alt: string;
  label?: string;
  icon?: LucideIcon;
  className?: string;
  loading?: "lazy" | "eager";
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

  return <img src={src} alt={alt} className={className} loading={loading} decoding="async" onError={() => setErrored(true)} />;
}
