import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Gem } from "lucide-react";

const KEY = "pinnacle-luxury";

export function LuxurySlider() {
  const [value, setValue] = useState<number>(() => {
    if (typeof window === "undefined") return 75;
    const v = Number(window.localStorage.getItem(KEY));
    return Number.isFinite(v) && v > 0 ? v : 75;
  });

  useEffect(() => {
    const root = document.documentElement;
    const v = Math.max(0, Math.min(100, value));
    root.style.setProperty("--luxury", String(v / 100));
    root.style.setProperty("--luxury-blur", `${(v / 100) * 28}px`);
    root.style.setProperty("--luxury-glow", String((v / 100) * 1.2));
    root.style.setProperty("--luxury-saturate", String(0.8 + (v / 100) * 0.6));
    window.localStorage.setItem(KEY, String(v));
  }, [value]);

  return (
    <div className="hidden items-center gap-3 rounded-full border-shimmer glass-luxe px-3 py-1.5 md:flex">
      <Gem className="size-3.5 text-gold sparkle-anim" />
      <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Luxury</span>
      <Slider
        value={[value]}
        min={0}
        max={100}
        step={1}
        onValueChange={(v) => setValue(v[0] ?? 75)}
        className="w-32"
      />
      <span className="w-8 text-right font-mono text-[10px] text-gold">{value}</span>
    </div>
  );
}
