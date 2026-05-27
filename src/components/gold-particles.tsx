import { useEffect, useRef } from "react";

export default function GoldParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0;
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; life: number; maxLife: number }[] = [];
    const spawn = () => {
      for (let i = 0; i < 3; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2.5 + 0.5,
          alpha: 0,
          life: 0,
          maxLife: 300 + Math.random() * 400,
        });
      }
    };

    let anim = 0;
    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      if (particles.length < 120) spawn();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        const fadeIn = Math.min(1, p.life / 60);
        const fadeOut = Math.max(0, 1 - (p.life - p.maxLife + 120) / 120);
        p.alpha = fadeIn * fadeOut;

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha * 0.9;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        g.addColorStop(0, "rgba(255, 220, 140, 1)");
        g.addColorStop(0.4, "rgba(212, 175, 55, 0.6)");
        g.addColorStop(1, "rgba(212, 175, 55, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      anim = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(anim);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ mixBlendMode: "screen", opacity: 0.65 }}
    />
  );
}
