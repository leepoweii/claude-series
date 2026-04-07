import { AbsoluteFill } from "remotion";
import { loadFont as loadNotoSerifTC } from "@remotion/google-fonts/NotoSerifTC";
import { loadFont as loadNotoSansTC } from "@remotion/google-fonts/NotoSansTC";
import { loadFont as loadCormorantGaramond } from "@remotion/google-fonts/CormorantGaramond";
import { loadFont as loadDMmono } from "@remotion/google-fonts/DMMono";

const { fontFamily: serifTC } = loadNotoSerifTC("normal", { weights: ["700", "900"], subsets: ["latin"] });
const { fontFamily: sans } = loadNotoSansTC("normal", { weights: ["400", "500"], subsets: ["latin"] });
const { fontFamily: serifEN } = loadCormorantGaramond("normal", { weights: ["400", "600", "700"], subsets: ["latin"] });
const { fontFamily: mono } = loadDMmono("normal", { weights: ["400"], subsets: ["latin"] });

const C = {
  bg: "#0C0C0C",
  gold: "#C9A84C",
  goldDim: "rgba(201,168,76,0.3)",
  white: "#F0ECE2",
  gray: "rgba(240,236,226,0.5)",
};

export const PosterElegant = () => (
  <AbsoluteFill style={{ background: C.bg, overflow: "hidden" }}>
    {/* Subtle warm vignette */}
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 40%, rgba(201,168,76,0.04) 0%, transparent 60%)" }} />

    {/* Gold border frame */}
    <div style={{ position: "absolute", top: 40, left: 40, right: 40, bottom: 40, border: `1px solid ${C.goldDim}` }} />
    {/* Inner border */}
    <div style={{ position: "absolute", top: 48, left: 48, right: 48, bottom: 48, border: `1px solid ${C.goldDim}40` }} />

    <div style={{ position: "absolute", top: 100, left: 80, right: 80, display: "flex", flexDirection: "column" }}>
      {/* Series label */}
      <div style={{ fontSize: 14, fontFamily: mono, color: C.gold, letterSpacing: 6, marginBottom: 48, textTransform: "uppercase" as const }}>
        half acre coffee presents
      </div>

      {/* Main title — large serif */}
      <div style={{ fontSize: 108, fontFamily: serifEN, fontWeight: 700, color: C.white, lineHeight: 0.95, marginBottom: 4 }}>
        NATIONAL
      </div>
      <div style={{ fontSize: 108, fontFamily: serifEN, fontWeight: 700, color: C.white, lineHeight: 0.95, marginBottom: 32 }}>
        DAY
      </div>

      {/* Gold dot divider */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
        <div style={{ width: 40, height: 1, backgroundColor: C.goldDim }} />
        <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: C.gold }} />
        <div style={{ width: 40, height: 1, backgroundColor: C.goldDim }} />
      </div>

      {/* Chinese subtitle */}
      <div style={{ fontSize: 30, fontFamily: serifTC, fontWeight: 700, color: C.white, letterSpacing: 14, marginBottom: 56 }}>
        國 慶 快 閃 市 集
      </div>

      {/* Featured label */}
      <div style={{ fontSize: 13, fontFamily: mono, color: C.gold, letterSpacing: 5, marginBottom: 12, textTransform: "uppercase" as const }}>
        featured menu
      </div>
      <div style={{ fontSize: 34, fontFamily: serifEN, fontWeight: 600, color: C.white, lineHeight: 1.4, marginBottom: 8 }}>
        金門在地食材 × 精品咖啡
      </div>
      <div style={{ fontSize: 22, fontFamily: sans, fontWeight: 400, color: C.gray, marginBottom: 56 }}>
        限定餐點 · 手沖體驗 · 風獅爺拉花
      </div>

      {/* Detail rows */}
      {[
        ["DATE", "10.09 — 10.12"],
        ["TIME", "10:00 — 18:00"],
        ["VENUE", "金城鎮莒光路一段 68 號"],
      ].map(([label, value], i) => (
        <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 24, marginBottom: 24 }}>
          <div style={{ fontSize: 12, fontFamily: mono, color: C.gold, letterSpacing: 4, width: 70 }}>{label}</div>
          <div style={{ fontSize: 24, fontFamily: serifEN, fontWeight: 600, color: C.white }}>{value}</div>
        </div>
      ))}
    </div>

    {/* Bottom text */}
    <div style={{ position: "absolute", bottom: 80, left: 80, right: 80, textAlign: "center" as const }}>
      <div style={{ fontSize: 16, fontFamily: sans, color: C.gray, letterSpacing: 4 }}>
        限定餐點 · 座位有限 · 建議提前訂位
      </div>
    </div>
  </AbsoluteFill>
);
