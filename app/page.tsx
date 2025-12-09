"use client";

import "./app.css";
import "@aws-amplify/ui-react/styles.css";
import { useEffect, useRef, useState } from "react";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";

Amplify.configure(outputs);

type GameCard = {
  name: string;
  slug: string;
  tag?: string;
  colors: [string, string];
  image?: string;
};

const imageMap: Record<string, string> = {
  dice: "/images/dice.png",
  limbo: "/images/limbo.png",
  roulette: "/images/roulette.png",
  hilo: "/images/hilo.png",
  wheel: "/images/wheel.png",
  mines: "/images/mines.png",
  plinko: "/images/plinko.png",
  keno: "/images/keno.png",
  blackjack: "/images/blackjack.png",
  waifu: "/images/waifutower.png",
  crash: "/images/crash.png",
  // add more assets into /public/images and map slug -> filename as needed
};

const imageSizeMap: Record<string, string> = {
  blackjack: "100%",
  waifu: "100%",
  roulette: "100%",
  hilo: "100%",
  wheel: "100%",
  default: "100%",
};

const shuffleGames: GameCard[] = [
  { name: "Dice", slug: "dice", tag: "Shuffle", colors: ["#36d183", "#0b8a45"], image: "/images/dice.png" },
  { name: "Mines", slug: "mines", tag: "Shuffle", colors: ["#e34d6d", "#861337"], image: "/images/mines.png" },
  { name: "Plinko", slug: "plinko", tag: "Shuffle", colors: ["#ef46ff", "#8a28c4"], image: "/images/plinko.png" },
  { name: "Limbo", slug: "limbo", tag: "Shuffle", colors: ["#ffb347", "#ff6a00"], image: "/images/limbo.png" },
  { name: "Keno", slug: "keno", tag: "Shuffle", colors: ["#f4b24d", "#d97706"], image: "/images/keno.png" },
  { name: "Blackjack", slug: "blackjack", tag: "Shuffle", colors: ["#60a5fa", "#1d4ed8"], image: "/images/blackjack.png" },
  { name: "Waifu Tower", slug: "waifu", tag: "Shuffle", colors: ["#8b5cf6", "#4338ca"], image: "/images/waifutower.png" },
  { name: "Crash", slug: "crash", tag: "Shuffle", colors: ["#a855f7", "#5b21b6"], image: "/images/crash.png" },
  { name: "HiLo", slug: "hilo", tag: "Shuffle", colors: ["#38bdf8", "#0ea5e9"], image: "/images/hilo.png" },
  { name: "Wheel", slug: "wheel", tag: "Shuffle", colors: ["#ec4899", "#be185d"], image: "/images/wheel.png" },
  { name: "Roulette", slug: "roulette", tag: "Shuffle", colors: ["#facc15", "#b45309"], image: "/images/roulette.png" },
];

const slotGames: GameCard[] = [
  { name: "Jaws of Justice", slug: "jaws", tag: "Exclusive", colors: ["#f97316", "#c2410c"] },
  { name: "Bloody Dawn", slug: "bloody-dawn", tag: "New", colors: ["#ef4444", "#991b1b"] },
  { name: "Gates of Olympus", slug: "gates", tag: "Hot", colors: ["#a855f7", "#7c3aed"] },
  { name: "Sweet Rush", slug: "sweet-rush", tag: "Popular", colors: ["#f472b6", "#db2777"] },
  { name: "Bizarre", slug: "bizarre", tag: "Hit", colors: ["#22c55e", "#15803d"] },
  { name: "Sun Princess", slug: "sun", tag: "Hot", colors: ["#facc15", "#d97706"] },
  { name: "Duck Hunters", slug: "duck", tag: "Trending", colors: ["#22c55e", "#16a34a"] },
  { name: "Sweet Bonanza", slug: "sweet-bonanza", tag: "Classic", colors: ["#fb7185", "#e11d48"] },
];

const liveCasino: GameCard[] = [
  { name: "Lightning Roulette", slug: "lightning", tag: "Live", colors: ["#facc15", "#b45309"], image: "/images/roulette.png" },
  { name: "Crazy Time", slug: "crazy", tag: "Live", colors: ["#34d399", "#0f766e"] },
  { name: "Monopoly Live", slug: "monopoly", tag: "Live", colors: ["#60a5fa", "#2563eb"] },
  { name: "Blackjack Live", slug: "live-bj", tag: "Live", colors: ["#22d3ee", "#0ea5e9"] },
];

const promoBanners = [
  {
    title: "Boost Your Level Up!",
    sub: "Earn more rewards as you rank up.",
    badge: "Refreshed!",
    image: "/images/promo-boost.jpg",
  },
  {
    title: "$30,000 Wreck the Reels",
    sub: "Hit all target multipliers to unlock prizes.",
    badge: "New Tournament",
    image: "/images/promo-wreck.jpg",
  },
  {
    title: "$20,000 SHFL Challenge",
    sub: "Hit 200x on Merge Up 2 to unlock prizes.",
    badge: "SHFL Exclusive",
    image: "/images/promo-challenge.jpg",
  },
];

const promoTabs = [
  { label: "Lobby", icon: "/images/home.svg" },
  { label: "Originals", icon: "/images/original.svg" },
  { label: "Slots", icon: "/images/slots.svg" },
  { label: "Live Casino", icon: "/images/casino.svg" },
  { label: "Table Games", icon: "/images/table-games.svg" },
];

export default function App() {
  const name = "Guest";
  const shuffleRowRef = useRef<HTMLDivElement | null>(null);
  const slotRowRef = useRef<HTMLDivElement | null>(null);
  const liveRowRef = useRef<HTMLDivElement | null>(null);
  const [activePromoTab, setActivePromoTab] = useState(promoTabs[0].label);
  const [shadows, setShadows] = useState({
    shuffle: { left: false, right: false },
    slot: { left: false, right: false },
    live: { left: false, right: false },
  });

  const animateScroll = (ref: React.RefObject<HTMLDivElement>, delta: number) => {
    const el = ref.current;
    if (!el) return;
    const start = el.scrollLeft;
    const target = start + delta;
    const duration = 400;
    const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      el.scrollLeft = start + (target - start) * ease(t);
      if (t < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const scrollRow = (ref: React.RefObject<HTMLDivElement>, dir: number) => () => {
    const el = ref.current;
    const width = el ? el.clientWidth : 600;
    const delta = dir * Math.max(300, width * 0.75);
    animateScroll(ref, delta);
  };

  const updateShadows = (key: "shuffle" | "slot" | "live", ref: React.RefObject<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const left = scrollLeft > 2;
    const right = scrollLeft + clientWidth < scrollWidth - 2;
    setShadows((prev) => {
      const curr = prev[key];
      if (curr.left === left && curr.right === right) return prev;
      return { ...prev, [key]: { left, right } };
    });
  };

  useEffect(() => {
    const refs: Array<["shuffle" | "slot" | "live", React.RefObject<HTMLDivElement>]> = [
      ["shuffle", shuffleRowRef],
      ["slot", slotRowRef],
      ["live", liveRowRef],
    ];

    const handleResize = () => refs.forEach(([key, ref]) => updateShadows(key, ref));
    const handlers = refs.map(([key, ref]) => {
      const h = () => updateShadows(key, ref);
      ref.current?.addEventListener("scroll", h);
      return [ref, h] as const;
    });

    refs.forEach(([key, ref]) => updateShadows(key, ref));
    window.addEventListener("resize", handleResize);

    return () => {
      handlers.forEach(([ref, h]) => ref.current?.removeEventListener("scroll", h));
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="shell">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">Chino</div>
          <div className="top-banner" aria-hidden="true" />
          <div className="actions">
            <button className="btn login rectangular">LogIn</button>
            <button className="btn btn-primary rectangular">Register</button>
          </div>
        </div>
      </header>

      <div className="content-area">
        <aside className="sidebar sidebar-container">
          <div className="sidebar-title">Main</div>
          <a className="sidebar-link active" href="/"><span className="sidebar-icon">🏠</span>Home</a>
          <a className="sidebar-link" href="/favorites"><span className="sidebar-icon">⭐</span>Favourites</a>
          <a className="sidebar-link" href="/latest"><span className="sidebar-icon">🆕</span>Latest Releases</a>
          <a className="sidebar-link" href="/challenges"><span className="sidebar-icon">🏆</span>Challenges</a>
          <div className="sidebar-title">Games</div>
          <a className="sidebar-link" href="/casino"><span className="sidebar-icon">🎰</span>Casino</a>
          <a className="sidebar-link" href="/slots"><span className="sidebar-icon">🎲</span>Slots</a>
          <a className="sidebar-link" href="/live"><span className="sidebar-icon">🎥</span>Live Casino</a>
          <a className="sidebar-link" href="/origins"><span className="sidebar-icon">🔥</span>Originals</a>
          <div className="sidebar-title">More</div>
          <a className="sidebar-link" href="/promotions"><span className="sidebar-icon">🎁</span>Promotions</a>
          <a className="sidebar-link" href="/fair"><span className="sidebar-icon">🛡️</span>Provably Fair</a>
          <a className="sidebar-link" href="/wallet"><span className="sidebar-icon">👛</span>Wallet</a>
        </aside>

        <main className="main">
          <section className="promo-section">
            <div className="promo-blank" />
            <div className="promo-top-row">
              <div className="promo-tabs">
                {promoTabs.map((tab, i) => (
                  <button
                    type="button"
                    key={tab.label}
                    className={`promo-tab${tab.label === activePromoTab ? " active" : ""}`}
                    onClick={() => setActivePromoTab(tab.label)}
                  >
                    <img src={tab.icon} alt={tab.label} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
              <div className="promo-search">
                  <input className="promo-search-input" placeholder="Search" />
              </div>
            </div>
          </section>

          <section className="section">
            <div className="section-header">
              <div className="section-title">
                <img src="/images/original.svg" alt="Originals" className="section-icon" />
                <span
                  role="button"
                  tabIndex={0}
                  onClick={() => scrollRow(shuffleRowRef, -1000)()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") scrollRow(shuffleRowRef, -1000)();
                  }}
                >
                  Shuffle Games
                </span>
              </div>
              <div className="section-actions">
                <button className="view-all">View all</button>
                <div className="scroll-controls">
                  <button
                    className="scroll-btn left"
                    onClick={scrollRow(shuffleRowRef, -1)}
                    disabled={!shadows.shuffle.left}
                  >
                    <img src="/images/leftarrow.svg" alt="Scroll left" />
                  </button>
                  <button
                    className="scroll-btn right"
                    onClick={scrollRow(shuffleRowRef, 1)}
                    disabled={!shadows.shuffle.right}
                  >
                    <img src="/images/rightarrow.svg" alt="Scroll right" />
                  </button>
                </div>
              </div>
            </div>
            <div
              className={`card-row${shadows.shuffle.left ? " has-left" : ""}${shadows.shuffle.right ? " has-right" : ""}`}
              ref={shuffleRowRef}
            >
              {shuffleGames.map((game) => {
                const bgImage = game.image ?? imageMap[game.slug];
                const bgSize = imageSizeMap[game.slug] ?? imageSizeMap.default;
                return (
                  <a
                    key={game.slug}
                    className="game-card"
                    data-slug={game.slug}
                    href={`/game/${game.slug}`}
                    style={{
                      background: bgImage
                        ? `url(${bgImage})`
                        : `linear-gradient(160deg, ${game.colors[0]}, ${game.colors[1]})`,
                      backgroundSize: bgSize,
                      backgroundPosition: "center center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <div className="card-scrim" />
                    <div
                      className="card-border"
                      style={{
                        border: `2px solid ${game.colors[0]}`,
                        boxShadow: `0 0 12px ${game.colors[0]}33`,
                      }}
                    />
                  </a>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
