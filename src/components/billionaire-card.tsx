import { useEffect, useMemo, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  BadgeCheck, Building2, TrendingUp, Share2, Mail, MessageSquare, Linkedin,
  Twitter, Facebook, Instagram, Send, Sparkles, X, Box, Loader2, Copy, Check,
} from "lucide-react";
import { toast } from "sonner";
import type { Billionaire } from "@/lib/billionaires";
import { buildSeries } from "@/lib/billionaires";

function VerifiedBadge({ tier }: { tier: Billionaire["verifiedTier"] }) {
  const label =
    tier === "pinnacle" ? "Pinnacle Verified" :
    tier === "forbes" ? "Forbes Referenced" : "Bloomberg Referenced";
  const color =
    tier === "pinnacle" ? "text-[oklch(0.7_0.18_230)]" : "text-gold";
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium ${color}`}>
      <BadgeCheck className="size-4" /> {label}
    </span>
  );
}

function ShareMenu({ b, onClose }: { b: Billionaire; onClose: () => void }) {
  const text = encodeURIComponent(
    `I'm ranked on The Pinnacle Global & Billionaires Index — ${b.name}, ${b.netWorth}. View the live index:`
  );
  const url = encodeURIComponent(typeof window !== "undefined" ? window.location.href : "https://pinnacle.index");
  const items = [
    { icon: Linkedin, label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}` },
    { icon: Twitter, label: "X / Twitter", href: `https://twitter.com/intent/tweet?text=${text}&url=${url}` },
    { icon: Facebook, label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}` },
    { icon: Send, label: "Telegram", href: `https://t.me/share/url?url=${url}&text=${text}` },
    { icon: MessageSquare, label: "WhatsApp", href: `https://api.whatsapp.com/send?text=${text}%20${url}` },
    { icon: Instagram, label: "Instagram", href: `https://www.instagram.com/` },
    { icon: Mail, label: "Email", href: `mailto:?subject=${encodeURIComponent("My Pinnacle Index ranking")}&body=${text}%20${url}` },
    { icon: MessageSquare, label: "SMS", href: `sms:?body=${text}%20${url}` },
  ];
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl border-gold hairline bg-card p-6 shadow-luxe" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl">Share Your Achievement</h3>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-secondary"><X className="size-4" /></button>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">Tell the world you're on the Pinnacle Index.</p>
        <div className="grid grid-cols-4 gap-2">
          {items.map(({ icon: Icon, label, href }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer"
              className="flex flex-col items-center gap-1 rounded-xl border-gold hairline bg-secondary/40 p-3 text-xs transition hover:bg-secondary hover:text-gold">
              <Icon className="size-5" />{label}
            </a>
          ))}
        </div>
        <button
          onClick={() => { navigator.clipboard?.writeText(decodeURIComponent(url)); toast.success("Link copied"); }}
          className="mt-4 w-full rounded-xl border-gold hairline px-4 py-2 text-sm hover:bg-secondary">
          Copy share link
        </button>
      </div>
    </div>
  );
}

function MagazineModal({ b, onClose }: { b: Billionaire; onClose: () => void }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 1200); return () => clearTimeout(t); }, []);
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4" onClick={onClose}>
      <div className="w-full max-w-2xl rounded-2xl border-gold hairline bg-card p-6 shadow-luxe" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-2xl">3D Cover — {b.name}</h3>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-secondary"><X className="size-4" /></button>
        </div>
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-br from-[oklch(0.2_0.03_80)] to-[oklch(0.1_0.01_80)]">
          {loading ? (
            <div className="absolute inset-0 grid place-items-center text-muted-foreground">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="size-8 animate-spin text-gold" />
                <span className="text-sm">AI generating imaginary cover…</span>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-between p-8 [transform:perspective(1200px)_rotateY(-12deg)] transition-transform duration-700 hover:[transform:perspective(1200px)_rotateY(0deg)]">
              <div className="w-full text-center">
                <div className="font-serif text-4xl tracking-wider text-gradient-gold">PINNACLE</div>
                <div className="mt-1 text-[10px] tracking-[0.3em] text-muted-foreground">THE GLOBAL WEALTH JOURNAL</div>
              </div>
              {b.image ? (
                <img src={b.image} alt={b.name} className="size-48 rounded-full object-cover ring-4 ring-gold/40 shadow-glow" />
              ) : (
                <div className="grid size-48 place-items-center rounded-full bg-gradient-gold text-5xl font-serif text-primary-foreground shadow-glow">
                  {b.name.charAt(0)}
                </div>
              )}
              <div className="w-full text-center">
                <div className="font-serif text-3xl">{b.name}</div>
                <div className="mt-2 text-sm text-muted-foreground">{b.title}</div>
                <div className="mt-4 inline-block rounded-full bg-gradient-gold px-4 py-1 text-sm font-medium text-primary-foreground">
                  {b.netWorth} · Rank #{b.rank}
                </div>
              </div>
            </div>
          )}
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Imaginary cover · AI-generated illustration · For showcase purposes
        </p>
      </div>
    </div>
  );
}

export function BillionaireCard({ b, accent = "gold" }: { b: Billionaire; accent?: "gold" | "platinum" }) {
  const [shareOpen, setShareOpen] = useState(false);
  const [magOpen, setMagOpen] = useState(false);
  const data = useMemo(() => buildSeries(b.graphSeed, b.graphTrend), [b.graphSeed, b.graphTrend]);
  const startV = data[0].v;
  const endV = data[data.length - 1].v;
  const growth = (((endV - startV) / startV) * 100).toFixed(1);

  return (
    <article className="group relative overflow-hidden rounded-2xl border-gold hairline bg-card/80 backdrop-blur shadow-luxe transition-all hover:-translate-y-1 hover:shadow-glow">
      <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-gradient-gold opacity-[0.07] blur-3xl" />
      <div className="grid gap-6 p-6 md:grid-cols-[auto_1fr] md:p-8">
        <div className="flex flex-col items-center gap-3 md:items-start">
          <div className="relative">
            {b.image ? (
              <img src={b.image} alt={b.name}
                className="size-28 rounded-2xl object-cover ring-2 ring-gold/40 md:size-32" />
            ) : (
              <div className={`grid size-28 place-items-center rounded-2xl font-serif text-4xl text-primary-foreground md:size-32 ${
                accent === "gold" ? "bg-gradient-gold" : "bg-secondary text-foreground"
              }`}>{b.name.charAt(0)}</div>
            )}
            <span className="absolute -bottom-2 -right-2 grid size-9 place-items-center rounded-full bg-gradient-gold text-sm font-bold text-primary-foreground shadow-glow">
              {b.rank}
            </span>
          </div>
          <div className="text-center md:text-left">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{b.country}</div>
            {b.age !== undefined && <div className="text-xs text-muted-foreground">Age {b.age}</div>}
          </div>
        </div>

        <div className="space-y-5">
          <header className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-2xl md:text-3xl">{b.name}</h3>
              <VerifiedBadge tier={b.verifiedTier} />
            </div>
            <p className="text-sm text-muted-foreground">{b.title}</p>
          </header>

          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Net Worth</div>
              <div className="text-3xl text-gradient-gold font-serif">{b.netWorth}</div>
            </div>
            {b.pricePerShare && (
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Price / Share</div>
                <div className="font-mono text-lg">{b.pricePerShare}</div>
              </div>
            )}
            {b.sharesOwned && (
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Shares Owned</div>
                <div className="font-mono text-lg">{b.sharesOwned}</div>
              </div>
            )}
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">12-mo Trend</div>
              <div className={`flex items-center gap-1 text-lg font-medium ${Number(growth) >= 0 ? "text-[oklch(0.78_0.16_140)]" : "text-destructive"}`}>
                <TrendingUp className="size-4" /> +{growth}%
              </div>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">{b.bio}</p>

          <div className="rounded-xl border-gold hairline bg-background/40 p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Building2 className="size-4 text-gold" />
                <span className="font-medium">{b.company}</span>
                {b.ticker && <span className="font-mono text-xs text-muted-foreground">{b.ticker}</span>}
              </div>
              <span className="text-xs text-muted-foreground">Equity performance · indicative</span>
            </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id={`g-${b.rank}-${b.name}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.82 0.14 85)" stopOpacity={0.7} />
                      <stop offset="100%" stopColor="oklch(0.82 0.14 85)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="m" stroke="oklch(0.6 0.02 85)" fontSize={10} tickLine={false} axisLine={false} interval={3} />
                  <YAxis stroke="oklch(0.6 0.02 85)" fontSize={10} tickLine={false} axisLine={false} width={32} />
                  <Tooltip contentStyle={{ background: "oklch(0.17 0.02 80)", border: "1px solid oklch(0.82 0.14 85 / 30%)", borderRadius: 8, fontSize: 12 }} />
                  <Area type="monotone" dataKey="v" stroke="oklch(0.82 0.14 85)" strokeWidth={2} fill={`url(#g-${b.rank}-${b.name})`} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Stakes & Holdings</div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {b.stakes.map((s) => (
                <li key={s.company} className="flex items-start gap-2 rounded-lg border-gold hairline bg-secondary/30 p-3 text-sm">
                  <Sparkles className="mt-0.5 size-4 shrink-0 text-gold" />
                  <div>
                    <div className="font-medium">{s.company} {s.percent && <span className="text-gold">· {s.percent}</span>}</div>
                    {s.note && <div className="text-xs text-muted-foreground">{s.note}</div>}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border-gold hairline bg-secondary/20 p-3 text-xs text-muted-foreground">
            <BadgeCheck className="mr-1 inline size-3.5 text-gold" />
            {b.verifiedBy} · <span className="italic">Source: {b.source}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button onClick={() => setShareOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90">
              <Share2 className="size-4" /> Share achievement
            </button>
            <button onClick={() => setMagOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border-gold hairline px-4 py-2 text-sm transition hover:bg-secondary">
              <Box className="size-4 text-gold" /> View 3D Magazine Cover
            </button>
          </div>
        </div>
      </div>

      {shareOpen && <ShareMenu b={b} onClose={() => setShareOpen(false)} />}
      {magOpen && <MagazineModal b={b} onClose={() => setMagOpen(false)} />}
    </article>
  );
}

export function ApiBlock() {
  const [copied, setCopied] = useState(false);
  const snippet = `<!-- Pinnacle Index — embed live rankings -->
<script src="https://api.pinnacle-index.com/v1/embed.js" defer></script>
<div data-pinnacle-index
     data-list="teen-child"
     data-theme="luxe-dark"
     data-limit="10"></div>

<!-- Or fetch JSON directly -->
<script>
  fetch("https://api.pinnacle-index.com/v1/rankings?list=global&limit=25", {
    headers: { "x-api-key": "PUBLIC_DEMO_KEY" }
  })
    .then(r => r.json())
    .then(data => console.log(data));
</script>`;
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div className="mb-8 text-center">
        <div className="text-xs uppercase tracking-[0.3em] text-gold">Developers</div>
        <h2 className="mt-2 text-4xl">Public API · Embed the Index</h2>
        <p className="mt-3 text-muted-foreground">Drag-and-drop the live Pinnacle Index into any website. Free public tier, no credit card.</p>
      </div>
      <div className="overflow-hidden rounded-2xl border-gold hairline bg-card shadow-luxe">
        <div className="flex items-center justify-between border-b border-gold/20 px-4 py-2">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-destructive/80" />
            <span className="size-2.5 rounded-full bg-gold/80" />
            <span className="size-2.5 rounded-full bg-[oklch(0.7_0.18_140)]/80" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">pinnacle-index.embed.html</span>
          </div>
          <button onClick={() => { navigator.clipboard?.writeText(snippet); setCopied(true); toast.success("API snippet copied"); setTimeout(() => setCopied(false), 1500); }}
            className="inline-flex items-center gap-1.5 rounded-md border-gold hairline px-2.5 py-1 text-xs hover:bg-secondary">
            {copied ? <Check className="size-3.5 text-gold" /> : <Copy className="size-3.5" />} {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-foreground/90">{snippet}</pre>
      </div>
    </section>
  );
}
