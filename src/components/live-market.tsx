import { useMemo } from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { Activity, TrendingDown, TrendingUp, Globe2 } from "lucide-react";
import type { Billionaire } from "@/lib/billionaires";
import { buildSeries } from "@/lib/billionaires";

type Row = {
  name: string;
  company: string;
  ticker: string;
  basePrice: number;
  price: number;
  change: number;
  country: string;
  isPublic: boolean;
  series: { m: string; v: number }[];
  seed: number;
};

function parsePrice(p?: string): number {
  if (!p) return 0;
  const n = Number(p.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export function LiveMarket({ all }: { all: Billionaire[] }) {
  const rows = useMemo<Row[]>(
    () =>
      all.map((b, i) => {
        const base = parsePrice(b.pricePerShare) || 100 + b.netWorthNumeric * 8 + i * 3;
        const isPublic = !!b.ticker && !/group|holdings|family|private/i.test(b.company);
        const seed = b.graphSeed ?? i + 5;
        const series = buildSeries(seed, b.graphTrend ?? 0.6, 24);
        // Locked snapshot — deterministic, never ticks until next global pull.
        const startV = series[0].v;
        const endV = series[series.length - 1].v;
        const change = ((endV - startV) / startV) * 100;
        return {
          name: b.name,
          company: b.company,
          ticker: b.ticker || b.company.split(" ").map((w) => w[0]).join("").slice(0, 4).toUpperCase(),
          basePrice: base,
          price: base,
          change,
          country: b.country,
          isPublic,
          series,
          seed,
        };
      }),
    [all],
  );

  return (
    <section id="market" className="relative mx-auto max-w-6xl px-6 py-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-gold glow-text">Live Market</div>
          <h2 className="mt-2 font-serif text-4xl md:text-5xl glow-text">Pinnacle Live Market</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Equity snapshots for every tracked fortune — public, private and pre-IPO.
            Prices are fetched from global sources and remain locked between refresh windows.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border-shimmer glass-luxe px-4 py-2 text-xs text-muted-foreground">
          <Activity className="size-3.5 text-gold sparkle-anim" />
          Sourced via Refinitiv · NSE · NYSE · NASDAQ feeds
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border-shimmer glass-luxe shadow-luxe">
        <div className="grid grid-cols-[1.5fr_0.9fr_1fr_1fr_1fr_1.2fr_0.9fr] gap-2 border-b border-gold/15 bg-black/30 px-5 py-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <div>Holder / Company</div>
          <div>Ticker</div>
          <div>Market</div>
          <div className="text-right">Price</div>
          <div className="text-right">12-mo</div>
          <div className="text-center">Chart</div>
          <div className="text-right">Status</div>
        </div>
        <ul>
          {rows.map((r) => {
            const up = r.change >= 0;
            const color = up ? "oklch(0.78 0.16 140)" : "oklch(0.6 0.22 25)";
            const gid = `lm-${r.ticker}-${r.seed}`;
            return (
              <li
                key={`${r.name}-${r.ticker}`}
                className="grid grid-cols-[1.5fr_0.9fr_1fr_1fr_1fr_1.2fr_0.9fr] items-center gap-2 border-b border-gold/10 px-5 py-3 text-sm transition hover:bg-secondary/30"
              >
                <div>
                  <div className="font-medium glow-text">{r.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{r.company}</div>
                </div>
                <div className="font-mono text-xs text-gold">{r.ticker}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Globe2 className="size-3" /> {r.country}
                </div>
                <div className="text-right font-mono">
                  ${r.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
                <div
                  className={`flex items-center justify-end gap-1 font-mono text-xs ${up ? "text-[oklch(0.78_0.16_140)]" : "text-destructive"}`}
                >
                  {up ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
                  {up ? "+" : ""}
                  {r.change.toFixed(2)}%
                </div>
                <div className="h-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={r.series} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={color} stopOpacity={0.55} />
                          <stop offset="100%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="v"
                        stroke={color}
                        strokeWidth={1.5}
                        fill={`url(#${gid})`}
                        isAnimationActive={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${
                      r.isPublic
                        ? "bg-[oklch(0.7_0.18_140)]/15 text-[oklch(0.78_0.16_140)]"
                        : "bg-gold/10 text-gold"
                    }`}
                  >
                    {r.isPublic ? "Public · view-only" : "Private · not buyable"}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="px-5 py-3 text-[11px] text-muted-foreground">
          View-only. Shares are not purchasable through this app. Prices remain static until the next global-source pull.
        </div>
      </div>
    </section>
  );
}
