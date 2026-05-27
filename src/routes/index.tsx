import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { Crown, Globe2, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { ApiBlock, BillionaireCard } from "@/components/billionaire-card";
import { adultBillionaires, teenAndChild } from "@/lib/billionaires";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Pinnacle Global & Billionaires Index (Live)" },
      { name: "description", content: "A luxury, real-time index of the world's wealthiest — featuring a dedicated section for self-made teen and child billionaires & millionaires." },
      { property: "og:title", content: "The Pinnacle Global & Billionaires Index (Live)" },
      { property: "og:description", content: "Live rankings, equity charts, holdings, and verified net worths — including the next generation of self-made teen and child founders." },
    ],
  }),
  component: Index,
});

function Stat({ label, value, icon: Icon }: { label: string; value: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="rounded-2xl border-gold hairline bg-card/60 p-5 backdrop-blur">
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
        <Icon className="size-4 text-gold" /> {label}
      </div>
      <div className="mt-2 text-3xl font-serif text-gradient-gold">{value}</div>
    </div>
  );
}

function Index() {
  return (
    <main className="min-h-screen text-foreground">
      <Toaster theme="dark" position="top-center" />

      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-gold/15 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-full bg-gradient-gold text-primary-foreground shadow-glow">
              <Crown className="size-4" />
            </div>
            <div className="leading-tight">
              <div className="font-serif text-lg tracking-wide">The Pinnacle</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Global & Billionaires Index</div>
            </div>
          </div>
          <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
            <a href="#global" className="hover:text-gold">Global</a>
            <a href="#teen" className="hover:text-gold">Teen & Child</a>
            <a href="#api" className="hover:text-gold">API</a>
            <a href="#verification" className="hover:text-gold">Verification</a>
          </nav>
          <div className="flex items-center gap-2 rounded-full border-gold hairline bg-background/60 px-3 py-1 text-xs">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[oklch(0.78_0.16_140)] opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-[oklch(0.78_0.16_140)]" />
            </span>
            Live
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 -top-40 mx-auto size-[40rem] rounded-full bg-gradient-gold opacity-10 blur-[120px]" />
        <div className="mx-auto max-w-6xl px-6 pb-12 pt-20 text-center md:pt-28">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border-gold hairline bg-background/40 px-3 py-1 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            <Sparkles className="size-3 text-gold" /> Edition MMXXVI · Live
          </div>
          <h1 className="mt-6 font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl">
            The <span className="text-gradient-gold">Pinnacle</span> Global<br />
            & Billionaires Index
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-muted-foreground md:text-lg">
            A real-time ranking of the world's wealthiest — with a dedicated chamber for
            <span className="text-gold"> self-made teen & child founders </span>
            shaping the next century of industry.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            <Stat label="Tracked Fortunes" value="2,640" icon={Globe2} />
            <Stat label="Combined Net Worth" value="$14.8T" icon={TrendingUp} />
            <Stat label="Under-18 Founders" value="42" icon={Sparkles} />
            <Stat label="Verified Profiles" value="100%" icon={ShieldCheck} />
          </div>
        </div>
      </section>

      {/* TEEN & CHILD */}
      <section id="teen" className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-gold">Featured Chamber</div>
            <h2 className="mt-2 font-serif text-4xl md:text-5xl">Self-Made Teen & Child<br/>Billionaires & Millionaires</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Verified founders, creators and operators under the age of 18 — each card shows
              live equity performance, declared stakes, and the verification trail.
            </p>
          </div>
          <div className="rounded-full border-gold hairline bg-card/60 px-4 py-2 text-xs text-muted-foreground">
            Updated continuously · {teenAndChild.length} profiles
          </div>
        </div>
        <div className="grid gap-6">
          {teenAndChild.map((b) => <BillionaireCard key={b.name} b={b} />)}
        </div>
      </section>

      {/* GLOBAL */}
      <section id="global" className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-10">
          <div className="text-xs uppercase tracking-[0.3em] text-gold">Global Rankings</div>
          <h2 className="mt-2 font-serif text-4xl md:text-5xl">The World's Top Fortunes</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Live snapshot of the largest tracked fortunes. Equity performance is indicative and refreshes alongside market sessions.
          </p>
        </div>
        <div className="grid gap-6">
          {adultBillionaires.map((b) => <BillionaireCard key={b.name} b={b} />)}
        </div>
      </section>

      {/* VERIFICATION */}
      <section id="verification" className="mx-auto max-w-5xl px-6 py-20">
        <div className="rounded-3xl border-gold hairline bg-card/60 p-10 shadow-luxe backdrop-blur">
          <div className="mb-6 flex items-center gap-3">
            <ShieldCheck className="size-7 text-[oklch(0.7_0.18_230)]" />
            <h2 className="text-3xl md:text-4xl">Verification & Methodology</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <div className="mb-2 text-sm font-semibold text-gold">Pinnacle Verified</div>
              <p className="text-sm text-muted-foreground">
                Profiles audited end-to-end by Assurance & Co. using Deloitte India auditors and SEBI-compliant frameworks. A blue check denotes the highest tier of net-worth verification within our index.
              </p>
            </div>
            <div>
              <div className="mb-2 text-sm font-semibold text-gold">Forbes Referenced</div>
              <p className="text-sm text-muted-foreground">
                Net worth figures referenced from Forbes Real-Time Billionaires and Forbes annual creator and youth-earner reporting.
              </p>
            </div>
            <div>
              <div className="mb-2 text-sm font-semibold text-gold">Bloomberg Referenced</div>
              <p className="text-sm text-muted-foreground">
                Net worth figures referenced from the Bloomberg Billionaires Index and Bloomberg founder profiles.
              </p>
            </div>
          </div>
          <p className="mt-8 text-xs text-muted-foreground">
            The Pinnacle Index aggregates from public filings, exchange disclosures and recognised wealth-tracking publications. Indicative graphs are scenario-based and do not constitute investment advice.
          </p>
        </div>
      </section>

      {/* API */}
      <div id="api"><ApiBlock /></div>

      {/* FOOTER */}
      <footer className="border-t border-gold/15 bg-background/60">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Crown className="size-4 text-gold" />
            <span className="font-serif text-base text-foreground">The Pinnacle</span>
            <span>· Global & Billionaires Index</span>
          </div>
          <div>© MMXXVI Pinnacle Editorial. Live tracking. All rankings indicative.</div>
        </div>
      </footer>
    </main>
  );
}
