import { AbsoluteFill } from "remotion";
import { loadFont as loadNotoSansTC } from "@remotion/google-fonts/NotoSansTC";
import { loadFont as loadDMmono } from "@remotion/google-fonts/DMMono";
import { loadFont as loadOswald } from "@remotion/google-fonts/Oswald";

const { fontFamily: sans } = loadNotoSansTC("normal", { weights: ["400", "700", "900"], subsets: ["latin"] });
const { fontFamily: mono } = loadDMmono("normal", { weights: ["400", "500"], subsets: ["latin"] });
const { fontFamily: display } = loadOswald("normal", { weights: ["700"], subsets: ["latin"] });

const C = {
  black: "#111111",
  white: "#F5F5F5",
  gray: "#888888",
  lightGray: "#E0E0E0",
};

export const PosterBrutalist = () => (
  <AbsoluteFill style={{ background: C.white, overflow: "hidden" }}>
    {/* Noise texture */}
    <div style={{
      position: "absolute", inset: 0, opacity: 0.04,
      background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' seed='7' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundSize: "200px 200px", pointerEvents: "none" as const,
    }} />

    <div style={{ position: "absolute", top: 100, left: 64, right: 64, display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <div style={{ fontSize: 14, fontFamily: mono, color: C.gray, letterSpacing: 3, marginBottom: 40 }}>
        半畝咖啡 / KINMEN / SPECIAL EVENT
      </div>

      {/* Title blocks — brutalist style with bg blocks */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 8 }}>
        <div style={{ display: "inline-flex", alignSelf: "flex-start" }}>
          <div style={{ backgroundColor: C.black, padding: "8px 20px", transform: "rotate(-2deg)" }}>
            <div style={{ fontSize: 88, fontFamily: display, fontWeight: 700, color: C.white, lineHeight: 1, textTransform: "uppercase" as const }}>
              NATIONAL
            </div>
          </div>
        </div>
        <div style={{ display: "inline-flex", alignSelf: "flex-start", marginLeft: 40 }}>
          <div style={{ backgroundColor: C.black, padding: "8px 20px", transform: "rotate(-2deg)" }}>
            <div style={{ fontSize: 88, fontFamily: display, fontWeight: 700, color: C.white, lineHeight: 1, textTransform: "uppercase" as const }}>
              DAY
            </div>
          </div>
        </div>
      </div>

      {/* Chinese — white bg black text block */}
      <div style={{ display: "inline-flex", alignSelf: "flex-start", marginTop: 16, marginBottom: 48 }}>
        <div style={{ backgroundColor: C.black, padding: "6px 16px" }}>
          <div style={{ fontSize: 26, fontFamily: sans, fontWeight: 900, color: C.white, letterSpacing: 10 }}>
            國 慶 快 閃 市 集
          </div>
        </div>
      </div>

      {/* Description */}
      <div style={{ fontSize: 24, fontFamily: sans, fontWeight: 400, color: C.black, lineHeight: 1.8, marginBottom: 48, maxWidth: 700 }}>
        金門在地食材 × 精品咖啡
        <br />
        限定餐點 · 手沖體驗 · 風獅爺拉花
      </div>

      {/* Detail rows — gray underline style */}
      {[
        ["10.09 — 10.12 THU–SUN"],
        ["10:00 — 18:00"],
        ["金城鎮莒光路一段 68 號"],
      ].map(([ value], i) => (
        <div key={i} style={{
          padding: "18px 0",
          borderBottom: `2px solid ${C.lightGray}`,
          fontSize: 26, fontFamily: sans, fontWeight: 700, color: C.black,
        }}>
          {value}
        </div>
      ))}

      {/* Bottom CTA bar */}
      <div style={{ marginTop: 40, backgroundColor: C.black, padding: "14px 24px", alignSelf: "stretch" }}>
        <div style={{ fontSize: 16, fontFamily: mono, fontWeight: 500, color: C.white, letterSpacing: 2, textTransform: "uppercase" as const }}>
          LIMITED MENU / WALK-IN OK / RESERVE RECOMMENDED
        </div>
      </div>
    </div>

    {/* Bottom credit */}
    <div style={{ position: "absolute", bottom: 80, left: 64, fontSize: 13, fontFamily: mono, color: C.gray, letterSpacing: 2 }}>
      DESIGNED WITH CLAUDE COWORK × CANVA
    </div>
  </AbsoluteFill>
);
