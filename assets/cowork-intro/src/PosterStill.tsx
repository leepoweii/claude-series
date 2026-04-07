import { AbsoluteFill } from "remotion";
import { loadFont as loadNotoSansTC } from "@remotion/google-fonts/NotoSansTC";
import { loadFont as loadDMmono } from "@remotion/google-fonts/DMMono";
import { loadFont as loadOswald } from "@remotion/google-fonts/Oswald";

const { fontFamily: sans } = loadNotoSansTC("normal", {
  weights: ["400", "500", "700", "900"],
  subsets: ["latin"],
});
const { fontFamily: mono } = loadDMmono("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
});
const { fontFamily: display } = loadOswald("normal", {
  weights: ["700"],
  subsets: ["latin"],
});

const C = {
  bg: "#0A0A0A",
  red: "#FF1744",
  cyan: "#00E5FF",
  yellow: "#FFD600",
  white: "#FFFFFF",
  gray: "#9E9E9E",
  dimWhite: "rgba(255,255,255,0.6)",
};

export const PosterStill = () => {
  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily: sans, overflow: "hidden" }}>
      {/* Subtle radial glow */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 40% 25%, rgba(255,23,68,0.07) 0%, transparent 55%)" }} />

      {/* Grain texture */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.07, mixBlendMode: "overlay" as const,
        background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' seed='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "200px 200px", pointerEvents: "none" as const,
      }} />

      {/* Content */}
      <div style={{ position: "absolute", top: 120, left: 64, right: 64, display: "flex", flexDirection: "column" }}>
        {/* Badge */}
        <div style={{ display: "inline-flex", alignSelf: "flex-start", backgroundColor: C.yellow, color: C.bg, fontSize: 16, fontFamily: mono, fontWeight: 500, padding: "6px 16px", letterSpacing: 3, marginBottom: 16 }}>
          SPECIAL EVENT
        </div>

        <div style={{ fontSize: 16, fontFamily: mono, color: C.dimWhite, letterSpacing: 3, marginBottom: 40 }}>
          半畝咖啡 PRESENTS
        </div>

        {/* Main title — chromatic aberration */}
        <div style={{ position: "relative", marginBottom: -12 }}>
          <div style={{ position: "absolute", left: -5, top: -3, fontSize: 100, fontFamily: display, fontWeight: 700, color: C.cyan, opacity: 0.7, lineHeight: 1, textTransform: "uppercase" as const }}>
            NATIONAL
          </div>
          <div style={{ position: "absolute", left: 5, top: 3, fontSize: 100, fontFamily: display, fontWeight: 700, color: C.red, opacity: 0.7, lineHeight: 1, textTransform: "uppercase" as const }}>
            NATIONAL
          </div>
          <div style={{ position: "relative", fontSize: 100, fontFamily: display, fontWeight: 700, color: C.white, lineHeight: 1, textTransform: "uppercase" as const }}>
            NATIONAL
          </div>
        </div>

        <div style={{ position: "relative", marginBottom: 24 }}>
          <div style={{ position: "absolute", left: -5, top: -3, fontSize: 100, fontFamily: display, fontWeight: 700, color: C.cyan, opacity: 0.7, lineHeight: 1, textTransform: "uppercase" as const }}>
            DAY POP-UP
          </div>
          <div style={{ position: "absolute", left: 5, top: 3, fontSize: 100, fontFamily: display, fontWeight: 700, color: C.red, opacity: 0.7, lineHeight: 1, textTransform: "uppercase" as const }}>
            DAY POP-UP
          </div>
          <div style={{ position: "relative", fontSize: 100, fontFamily: display, fontWeight: 700, color: C.white, lineHeight: 1, textTransform: "uppercase" as const }}>
            DAY POP-UP
          </div>
        </div>

        {/* Chinese subtitle with red bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 56 }}>
          <div style={{ width: 4, height: 44, backgroundColor: C.red }} />
          <div style={{ fontSize: 34, fontFamily: sans, fontWeight: 900, color: C.white, letterSpacing: 14 }}>
            國 慶 快 閃 市 集
          </div>
        </div>

        {/* Description */}
        <div style={{ fontSize: 26, fontFamily: sans, fontWeight: 400, color: C.gray, lineHeight: 1.8, marginBottom: 48, maxWidth: 700 }}>
          金門在地食材 × 精品咖啡
          <br />
          限定餐點 · 手沖體驗 · 風獅爺拉花
        </div>

        {/* Event detail rows */}
        {[
          ["DATE", "10.09 — 10.12 THU–SUN"],
          ["TIME", "10:00 — 18:00"],
          ["AT", "金城鎮莒光路一段 68 號"],
          ["SPECIAL", "前 30 名贈風獅爺杯墊"],
        ].map(([label, value], i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 20,
            padding: "16px 0",
            borderBottom: `1px solid rgba(255,255,255,0.08)`,
          }}>
            <div style={{
              display: "inline-flex", backgroundColor: C.red, color: C.white,
              fontSize: 12, fontFamily: mono, fontWeight: 500, padding: "4px 12px", letterSpacing: 2,
              minWidth: 80, justifyContent: "center",
            }}>
              {label}
            </div>
            <div style={{ fontSize: 24, fontFamily: sans, fontWeight: 700, color: C.white }}>
              {value}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div style={{ marginTop: 48, display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ padding: "16px 40px", backgroundColor: C.red, fontSize: 22, fontFamily: sans, fontWeight: 700, color: C.white, letterSpacing: 2 }}>
            追蹤 IG 看更多 →
          </div>
          <div style={{ fontSize: 18, fontFamily: mono, color: C.gray }}>
            @halfacre.coffee
          </div>
        </div>
      </div>

      {/* Bottom credit */}
      <div style={{ position: "absolute", bottom: 80, left: 64, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 30, height: 2, backgroundColor: C.red }} />
        <div style={{ fontSize: 13, fontFamily: mono, color: C.gray, letterSpacing: 2 }}>
          DESIGNED WITH CLAUDE COWORK × CANVA
        </div>
      </div>

      {/* Diagonal accent lines */}
      <div style={{ position: "absolute", bottom: 50, right: -40, width: 300, height: 4, backgroundColor: C.red, transform: "rotate(-12deg)" }} />
      <div style={{ position: "absolute", bottom: 34, right: -20, width: 200, height: 4, backgroundColor: C.red, transform: "rotate(-12deg)", opacity: 0.6 }} />
    </AbsoluteFill>
  );
};
