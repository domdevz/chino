"use client";

import "./app.css";
import "@aws-amplify/ui-react/styles.css";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";

Amplify.configure(outputs);

const shuffleGames = [
  { name: "Dice", slug: "dice", tag: "Shuffle" },
  { name: "Mines", slug: "mines", tag: "Shuffle" },
  { name: "Plinko", slug: "plinko", tag: "Shuffle" },
  { name: "Limbo", slug: "limbo", tag: "Shuffle" },
  { name: "Keno", slug: "keno", tag: "Shuffle" },
  { name: "Blackjack", slug: "blackjack", tag: "Shuffle" },
  { name: "Waifu Tower", slug: "waifu", tag: "Shuffle" },
  { name: "Crash", slug: "crash", tag: "Shuffle" },
];

const slotGames = [
  { name: "Jaws of Justice", slug: "jaws", tag: "Exclusive" },
  { name: "Bloody Dawn", slug: "bloody-dawn", tag: "New" },
  { name: "Gates of Olympus", slug: "gates", tag: "Hot" },
  { name: "Sweet Rush", slug: "sweet-rush", tag: "Popular" },
  { name: "Bizarre", slug: "bizarre", tag: "Hit" },
  { name: "Sun Princess", slug: "sun", tag: "Hot" },
  { name: "Duck Hunters", slug: "duck", tag: "Trending" },
  { name: "Sweet Bonanza", slug: "sweet-bonanza", tag: "Classic" },
];

const liveCasino = [
  { name: "Lightning Roulette", slug: "lightning" },
  { name: "Crazy Time", slug: "crazy" },
  { name: "Monopoly Live", slug: "monopoly" },
  { name: "Blackjack Live", slug: "live-bj" },
];

export default function App() {
  const { signOut, user } = useAuthenticator((context) => [context.user]);
  const name = user?.username ?? "Guest";

  return (
    <div className="shell">
      <header className="nav">
        <div className="nav-left">
          <div className="brand">Chino</div>
        </div>
        <div className="nav-right">
          <span className="pill">Hi, {name}</span>
          <button className="btn btn-ghost">Login</button>
          <button className="btn btn-primary">Register</button>
          <button className="btn btn-ghost" onClick={signOut}>Sign out</button>
        </div>
      </header>

      <div className="layout">
        <aside className="sidebar">
          <div className="sidebar-section">
            <div className="sidebar-title">Main</div>
            <a className="sidebar-link" href="/">
              <span className="sidebar-icon">🏠</span>Home
            </a>
            <a className="sidebar-link" href="/favorites">
              <span className="sidebar-icon">⭐</span>Favourites
            </a>
            <a className="sidebar-link" href="/latest">
              <span className="sidebar-icon">🆕</span>Latest Releases
            </a>
            <a className="sidebar-link" href="/challenges">
              <span className="sidebar-icon">🏆</span>Challenges
            </a>
          </div>
          <div className="sidebar-section">
            <div className="sidebar-title">Games</div>
            <a className="sidebar-link" href="/casino">
              <span className="sidebar-icon">🎰</span>Casino
            </a>
            <a className="sidebar-link" href="/slots">
              <span className="sidebar-icon">🎲</span>Slots
            </a>
            <a className="sidebar-link" href="/live">
              <span className="sidebar-icon">🎥</span>Live Casino
            </a>
            <a className="sidebar-link" href="/origins">
              <span className="sidebar-icon">🔥</span>Originals
            </a>
          </div>
          <div className="sidebar-section">
            <div className="sidebar-title">More</div>
            <a className="sidebar-link" href="/promotions">
              <span className="sidebar-icon">🎁</span>Promotions
            </a>
            <a className="sidebar-link" href="/fair">
              <span className="sidebar-icon">🛡️</span>Provably Fair
            </a>
            <a className="sidebar-link" href="/wallet">
              <span className="sidebar-icon">👛</span>Wallet
            </a>
          </div>
        </aside>

        <main className="main">
          <section className="section">
            <div className="section-header">
              <h2>Shuffle Games</h2>
              <button className="view-all">View all</button>
            </div>
            <div className="card-row">
              {shuffleGames.map((game, idx) => (
                <a key={game.slug} className="game-card" href={`/game/${game.slug}`} style={{
                  background: `linear-gradient(160deg, rgba(${80 + idx * 10}, ${180 - idx * 8}, ${120 + idx * 5}, 0.85), rgba(0,0,0,0.4))`
                }}>
                  <div className="game-thumb" />
                  <span className="tag">{game.tag}</span>
                  <div className="game-labels">
                    <h3>{game.name}</h3>
                    <p>Play now</p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section className="section">
            <div className="section-header">
              <h2>Slots</h2>
              <button className="view-all">View all</button>
            </div>
            <div className="card-row">
              {slotGames.map((game, idx) => (
                <a key={game.slug} className="game-card" href={`/game/${game.slug}`} style={{
                  background: `linear-gradient(150deg, rgba(${150 + idx * 8}, ${60 + idx * 5}, ${180 - idx * 6}, 0.8), rgba(0,0,0,0.35))`
                }}>
                  <span className="tag">{game.tag}</span>
                  <div className="game-labels">
                    <h3>{game.name}</h3>
                    <p>Featured slot</p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section className="section">
            <div className="section-header">
              <h2>Live Casino</h2>
              <button className="view-all">View all</button>
            </div>
            <div className="card-row">
              {liveCasino.map((game, idx) => (
                <a key={game.slug} className="game-card" href={`/game/${game.slug}`} style={{
                  background: `linear-gradient(140deg, rgba(${90 + idx * 10}, ${120 + idx * 12}, ${200 - idx * 8}, 0.8), rgba(0,0,0,0.3))`
                }}>
                  <span className="tag">Live</span>
                  <div className="game-labels">
                    <h3>{game.name}</h3>
                    <p>Streamed dealers</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
