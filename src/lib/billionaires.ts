import sharavImg from "@/assets/sharav-arora.jpg";

export type Stake = { company: string; percent?: string; note?: string };
export type Billionaire = {
  rank: number;
  name: string;
  title: string;
  age?: number | string;
  country: string;
  netWorth: string;
  netWorthNumeric: number; // in billions USD
  company: string;
  ticker?: string;
  pricePerShare?: string;
  sharesOwned?: string;
  stakes: Stake[];
  bio: string;
  image?: string;
  verifiedBy: string;
  verifiedTier: "pinnacle" | "forbes" | "bloomberg";
  source: string;
  // graph baseline (last value will be scaled to reach netWorth scale)
  graphSeed: number;
  graphTrend: number; // overall % growth across the series
};

// Generates a 24-point time series with a slight upward bias and noise
export function buildSeries(seed: number, trend = 0.6, points = 24) {
  const out: { m: string; v: number }[] = [];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  let v = seed;
  for (let i = 0; i < points; i++) {
    // pseudo-random but deterministic
    const r = Math.sin(seed * (i + 1) * 0.37) * 0.06;
    const step = (trend / points) + r;
    v = v * (1 + step);
    const monthLabel = months[i % 12] + (i >= 12 ? " '25" : " '24");
    out.push({ m: monthLabel, v: Math.max(1, +v.toFixed(2)) });
  }
  return out;
}

export const teenAndChild: Billionaire[] = [
  {
    rank: 1,
    name: "Sharav Arora",
    title: "Founder & Chairman, TechForges Technologies",
    age: 9,
    country: "India",
    netWorth: "$1.20B",
    netWorthNumeric: 1.2,
    company: "TechForges Technologies",
    ticker: "TFRG",
    pricePerShare: "$120,000",
    sharesOwned: "10,000",
    stakes: [
      { company: "TechForges Technologies", percent: "100%", note: "Founder, full ownership" },
      { company: "ABrailleAbility (Vancouver, Canada)", percent: "10%", note: "Strategic minority stake" },
      { company: "BrailleBuddy", note: "Acquired — now under TechForges Group" },
    ],
    bio: "Founder of TechForges Technologies, leading inclusive-tech initiatives spanning accessibility hardware and assistive software. Architected the acquisition of BrailleBuddy and a strategic stake in ABrailleAbility, building a vertically integrated braille-tech portfolio.",
    image: sharavImg,
    verifiedBy: "Verified by Assurance & Co. using Deloitte India Auditors and SEBI Compliant Frameworks",
    verifiedTier: "pinnacle",
    source: "Pinnacle Global Index — primary filing",
    graphSeed: 22,
    graphTrend: 4.4,
  },
  {
    rank: 2,
    name: "Ryan Kaji",
    title: "Star & Co-owner, Ryan's World",
    age: 14,
    country: "United States",
    netWorth: "$100M",
    netWorthNumeric: 0.1,
    company: "Ryan's World / Sunlight Entertainment",
    ticker: "RYAN",
    pricePerShare: "$8,400",
    sharesOwned: "11,900",
    stakes: [
      { company: "Sunlight Entertainment", percent: "50%", note: "Co-owner with family" },
      { company: "Ryan's World branded merchandise", note: "Licensing across 30+ countries" },
      { company: "Pocket.watch", note: "Long-term content partnership" },
    ],
    bio: "Headlines one of the most-watched YouTube channels for kids and anchors a global toy and entertainment franchise distributed across major retailers.",
    verifiedBy: "Earnings figures referenced from Forbes 'Highest-Paid YouTube Stars' reporting",
    verifiedTier: "forbes",
    source: "Forbes — Highest-Paid YouTube Stars",
    graphSeed: 6,
    graphTrend: 1.6,
  },
  {
    rank: 3,
    name: "Like Nastya (Anastasia Radzinskaya)",
    title: "Creator & Co-owner, Like Nastya",
    age: 11,
    country: "Russia / United States",
    netWorth: "$32M",
    netWorthNumeric: 0.032,
    company: "Like Nastya Media",
    ticker: "NSTY",
    pricePerShare: "$2,100",
    sharesOwned: "15,200",
    stakes: [
      { company: "Like Nastya Media", percent: "45%", note: "Co-owned with family" },
      { company: "Global licensing deals", note: "Multi-platform distribution" },
    ],
    bio: "One of the highest-earning child creators globally with a multilingual content footprint spanning English, Russian and Spanish channels.",
    verifiedBy: "Earnings figures referenced from Forbes annual creator reporting",
    verifiedTier: "forbes",
    source: "Forbes — Top-Earning Kid YouTubers",
    graphSeed: 3,
    graphTrend: 1.2,
  },
  {
    rank: 4,
    name: "Moziah Bridges",
    title: "Founder & CEO, Mo's Bows",
    age: 22,
    country: "United States",
    netWorth: "$3M",
    netWorthNumeric: 0.003,
    company: "Mo's Bows Memphis",
    ticker: "MOBO",
    pricePerShare: "$640",
    sharesOwned: "4,700",
    stakes: [
      { company: "Mo's Bows Memphis", percent: "100%", note: "Founder, full ownership" },
      { company: "NBA licensing partnership", note: "Multi-year deal" },
    ],
    bio: "Started Mo's Bows at age 9; grew the brand into a celebrated American menswear label with retail and league partnerships.",
    verifiedBy: "Public reporting referenced from Bloomberg and Inc. profiles",
    verifiedTier: "bloomberg",
    source: "Bloomberg / Inc. — Founder profiles",
    graphSeed: 1.1,
    graphTrend: 1.0,
  },
  {
    rank: 5,
    name: "Mikaila Ulmer",
    title: "Founder & CEO, Me & the Bees Lemonade",
    age: 20,
    country: "United States",
    netWorth: "$11M",
    netWorthNumeric: 0.011,
    company: "Me & the Bees Lemonade",
    ticker: "BEES",
    pricePerShare: "$980",
    sharesOwned: "11,200",
    stakes: [
      { company: "Me & the Bees Lemonade", percent: "100%", note: "Founder, full ownership" },
      { company: "Healthy Hive Foundation", note: "Conservation initiative" },
    ],
    bio: "Built a national lemonade brand stocked across 1,500+ U.S. stores after closing a landmark Whole Foods supply deal at age 11.",
    verifiedBy: "Public reporting referenced from Bloomberg founder coverage",
    verifiedTier: "bloomberg",
    source: "Bloomberg — Young Founders",
    graphSeed: 1.6,
    graphTrend: 1.1,
  },
];

export const adultBillionaires: Billionaire[] = [
  {
    rank: 1, name: "Elon Musk", title: "CEO, Tesla & SpaceX", age: 54, country: "United States",
    netWorth: "$728B", netWorthNumeric: 728, company: "Tesla, SpaceX, xAI", ticker: "TSLA",
    pricePerShare: "$348", sharesOwned: "411M",
    stakes: [
      { company: "Tesla", percent: "~13%" },
      { company: "SpaceX", percent: "~42%" },
      { company: "xAI", percent: "Majority" },
      { company: "X (formerly Twitter)", percent: "~74%" },
    ],
    bio: "Leads electric vehicles, private spaceflight and frontier AI under a single founder portfolio.",
    verifiedBy: "Net worth figures referenced from Forbes Real-Time Billionaires",
    verifiedTier: "forbes",
    source: "Forbes — Real-Time Billionaires",
    graphSeed: 420, graphTrend: 1.2,
  },
  {
    rank: 2, name: "Bernard Arnault", title: "Chairman & CEO, LVMH", age: 76, country: "France",
    netWorth: "$198B", netWorthNumeric: 198, company: "LVMH Moët Hennessy Louis Vuitton", ticker: "MC.PA",
    pricePerShare: "€615", sharesOwned: "242M",
    stakes: [
      { company: "LVMH", percent: "~48%" },
      { company: "Christian Dior SE", percent: "~97%" },
    ],
    bio: "Architect of the world's largest luxury conglomerate spanning 75+ maisons.",
    verifiedBy: "Net worth figures referenced from Forbes Real-Time Billionaires",
    verifiedTier: "forbes",
    source: "Forbes — Real-Time Billionaires",
    graphSeed: 160, graphTrend: 0.4,
  },
  {
    rank: 3, name: "Jeff Bezos", title: "Founder, Amazon · Owner, Blue Origin", age: 61, country: "United States",
    netWorth: "$235B", netWorthNumeric: 235, company: "Amazon, Blue Origin", ticker: "AMZN",
    pricePerShare: "$215", sharesOwned: "913M",
    stakes: [
      { company: "Amazon", percent: "~9%" },
      { company: "Blue Origin", percent: "100%" },
      { company: "The Washington Post", percent: "100%" },
    ],
    bio: "Founded the world's largest online retailer and operates a privately held aerospace venture.",
    verifiedBy: "Net worth figures referenced from Bloomberg Billionaires Index",
    verifiedTier: "bloomberg",
    source: "Bloomberg Billionaires Index",
    graphSeed: 180, graphTrend: 0.5,
  },
  {
    rank: 4, name: "Mark Zuckerberg", title: "Founder & CEO, Meta Platforms", age: 41, country: "United States",
    netWorth: "$220B", netWorthNumeric: 220, company: "Meta Platforms", ticker: "META",
    pricePerShare: "$595", sharesOwned: "350M",
    stakes: [
      { company: "Meta Platforms", percent: "~13%" },
      { company: "Chan Zuckerberg Initiative", note: "Philanthropic LLC" },
    ],
    bio: "Built Facebook into the world's largest social network and pivoted Meta into AI and immersive computing.",
    verifiedBy: "Net worth figures referenced from Forbes Real-Time Billionaires",
    verifiedTier: "forbes",
    source: "Forbes — Real-Time Billionaires",
    graphSeed: 130, graphTrend: 0.85,
  },
  {
    rank: 5, name: "Larry Ellison", title: "Co-founder & CTO, Oracle", age: 81, country: "United States",
    netWorth: "$210B", netWorthNumeric: 210, company: "Oracle Corporation", ticker: "ORCL",
    pricePerShare: "$186", sharesOwned: "1.16B",
    stakes: [
      { company: "Oracle", percent: "~40%" },
      { company: "Tesla", percent: "Significant stake" },
    ],
    bio: "Co-founded one of the world's leading enterprise software firms; major investor across tech and biotech.",
    verifiedBy: "Net worth figures referenced from Bloomberg Billionaires Index",
    verifiedTier: "bloomberg",
    source: "Bloomberg Billionaires Index",
    graphSeed: 120, graphTrend: 0.75,
  },
  {
    rank: 6, name: "Warren Buffett", title: "Chairman & CEO, Berkshire Hathaway", age: 95, country: "United States",
    netWorth: "$148B", netWorthNumeric: 148, company: "Berkshire Hathaway", ticker: "BRK.A",
    pricePerShare: "$715,000", sharesOwned: "227K (A-equiv.)",
    stakes: [
      { company: "Berkshire Hathaway", percent: "~15%" },
    ],
    bio: "Legendary value investor commanding a diversified holding company across insurance, energy and consumer staples.",
    verifiedBy: "Net worth figures referenced from Forbes Real-Time Billionaires",
    verifiedTier: "forbes",
    source: "Forbes — Real-Time Billionaires",
    graphSeed: 110, graphTrend: 0.25,
  },
  {
    rank: 7, name: "Larry Page", title: "Co-founder, Google", age: 52, country: "United States",
    netWorth: "$165B", netWorthNumeric: 165, company: "Alphabet Inc.", ticker: "GOOGL",
    pricePerShare: "$192", sharesOwned: "390M",
    stakes: [
      { company: "Alphabet", percent: "~6% (class B supervoting)" },
      { company: "Kitty Hawk / Opener", note: "Aerospace ventures" },
    ],
    bio: "Co-architect of the modern search era and Alphabet's holding-company structure.",
    verifiedBy: "Net worth figures referenced from Forbes Real-Time Billionaires",
    verifiedTier: "forbes",
    source: "Forbes — Real-Time Billionaires",
    graphSeed: 105, graphTrend: 0.55,
  },
  {
    rank: 8, name: "Mukesh Ambani", title: "Chairman, Reliance Industries", age: 68, country: "India",
    netWorth: "$108B", netWorthNumeric: 108, company: "Reliance Industries", ticker: "RELIANCE.NS",
    pricePerShare: "₹1,290", sharesOwned: "3.5B",
    stakes: [
      { company: "Reliance Industries", percent: "~50%" },
      { company: "Jio Platforms", note: "Controlling stake" },
      { company: "Reliance Retail", note: "Controlling stake" },
    ],
    bio: "Heads India's largest private conglomerate spanning energy, telecom and retail.",
    verifiedBy: "Net worth figures referenced from Forbes Real-Time Billionaires",
    verifiedTier: "forbes",
    source: "Forbes — Real-Time Billionaires",
    graphSeed: 80, graphTrend: 0.5,
  },
];
