import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Img,
  staticFile,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
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

// ── Mojo-inspired palette ──────────────────────
const C = {
  bg: "#0A0A0A",
  red: "#FF1744",
  cyan: "#00E5FF",
  yellow: "#FFD600",
  white: "#FFFFFF",
  gray: "#9E9E9E",
  darkCard: "rgba(10,10,10,0.85)",
  dimWhite: "rgba(255,255,255,0.7)",
};

// ── Grain Overlay ──────────────────────────────
const GrainOverlay = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        opacity: 0.08,
        mixBlendMode: "overlay",
        background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' seed='${frame % 8}' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "200px 200px",
        pointerEvents: "none",
      }}
    />
  );
};

// ── Chromatic Aberration Text ──────────────────
const ChromaText: React.FC<{
  children: string;
  fontSize: number;
  offset?: number;
  fontFamily?: string;
  fontWeight?: number;
  letterSpacing?: number;
  style?: React.CSSProperties;
}> = ({ children, fontSize, offset = 4, fontFamily: ff, fontWeight = 700, letterSpacing = 0, style = {} }) => {
  const base = {
    fontSize,
    fontFamily: ff || display,
    fontWeight,
    letterSpacing,
    lineHeight: 1,
    textTransform: "uppercase" as const,
    position: "relative" as const,
    ...style,
  };
  return (
    <div style={{ position: "relative" }}>
      {/* Cyan layer — offset left+up */}
      <div style={{ ...base, color: C.cyan, position: "absolute", left: -offset, top: -offset * 0.5, opacity: 0.7 }}>
        {children}
      </div>
      {/* Red layer — offset right+down */}
      <div style={{ ...base, color: C.red, position: "absolute", left: offset, top: offset * 0.5, opacity: 0.7 }}>
        {children}
      </div>
      {/* White main layer */}
      <div style={{ ...base, color: C.white }}>
        {children}
      </div>
    </div>
  );
};

// ── Yellow Badge ───────────────────────────────
const Badge: React.FC<{ children: string; opacity?: number }> = ({ children, opacity = 1 }) => (
  <div
    style={{
      opacity,
      display: "inline-block",
      backgroundColor: C.yellow,
      color: C.bg,
      fontSize: 16,
      fontFamily: mono,
      fontWeight: 500,
      padding: "6px 16px",
      letterSpacing: 3,
      textTransform: "uppercase" as const,
    }}
  >
    {children}
  </div>
);

// ── Diagonal Accent Lines (bottom) ─────────────
const DiagonalAccent: React.FC<{ opacity: number }> = ({ opacity }) => (
  <>
    <div style={{
      position: "absolute", bottom: 60, right: -40, width: 300, height: 4,
      backgroundColor: C.red, transform: "rotate(-12deg)", opacity,
    }} />
    <div style={{
      position: "absolute", bottom: 44, right: -20, width: 200, height: 4,
      backgroundColor: C.red, transform: "rotate(-12deg)", opacity: opacity * 0.6,
    }} />
  </>
);

// ── Scene 1: Title (3s) ────────────────────────
const TitleScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = (s: number) => s * fps;

  const badgeOpacity = interpolate(frame, [t(0.1), t(0.4)], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const presentsOpacity = interpolate(frame, [t(0.2), t(0.5)], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const titleScale = spring({ frame, fps, config: { damping: 15, stiffness: 120 } });
  const titleOpacity = interpolate(frame, [t(0.1), t(0.4)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const coworkDelay = Math.round(t(0.2));
  const coworkScale = spring({ frame, fps, delay: coworkDelay, config: { damping: 15, stiffness: 120 } });
  const coworkOpacity = interpolate(frame, [t(0.25), t(0.55)], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const subOpacity = interpolate(frame, [t(0.6), t(1)], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const detailOpacity = interpolate(frame, [t(1.2), t(1.8)], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const lineW = interpolate(frame, [t(0.8), t(1.5)], [0, 3], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      {/* Subtle warm gradient overlay */}
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 30% 20%, rgba(255,23,68,0.06) 0%, transparent 60%)` }} />

      <div style={{ position: "absolute", top: 320, left: 64, right: 64, display: "flex", flexDirection: "column" }}>
        <div style={{ opacity: badgeOpacity, marginBottom: 16 }}>
          <Badge>AI 實戰工作坊</Badge>
        </div>
        <div style={{ opacity: presentsOpacity, fontSize: 18, fontFamily: mono, color: C.dimWhite, letterSpacing: 3, marginBottom: 32 }}>
          LEARN BY DOING
        </div>

        {/* CLAUDE — chromatic */}
        <div style={{ opacity: titleOpacity, transform: `scale(${titleScale})`, transformOrigin: "left center", marginBottom: -8 }}>
          <ChromaText fontSize={110} offset={5}>CLAUDE</ChromaText>
        </div>
        {/* COWORK — chromatic */}
        <div style={{ opacity: coworkOpacity, transform: `scale(${coworkScale})`, transformOrigin: "left center" }}>
          <ChromaText fontSize={110} offset={5} style={{ color: C.yellow }}>COWORK</ChromaText>
        </div>

        {/* Red vertical bar + Chinese subtitle */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 40 }}>
          <div style={{ width: lineW, height: 50, backgroundColor: C.red }} />
          <div style={{ opacity: subOpacity }}>
            <div style={{ fontSize: 32, fontFamily: sans, fontWeight: 900, color: C.white, letterSpacing: 12 }}>
              協 作 日 常 營 運
            </div>
          </div>
        </div>

        {/* Detail cards */}
        <div style={{ opacity: detailOpacity, display: "flex", flexDirection: "column", gap: 12, marginTop: 48 }}>
          {[
            ["FORMAT", "小班制 4–5 人"],
            ["DURATION", "2 小時實作"],
            ["TOOL", "Claude Desktop"],
          ].map(([label, value], i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 0", borderBottom: `1px solid rgba(255,255,255,0.08)` }}>
              <div style={{ fontSize: 13, fontFamily: mono, color: C.red, letterSpacing: 3, width: 100 }}>{label}</div>
              <div style={{ fontSize: 22, fontFamily: sans, fontWeight: 500, color: C.white }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      <DiagonalAccent opacity={detailOpacity} />
      <GrainOverlay />
    </AbsoluteFill>
  );
};

// ── Chapter Card (2.5s) ────────────────────────
type ChapterProps = {
  num: string;
  title: string;
  body: string;
  highlights: string[];
};

const ChapterScene: React.FC<ChapterProps> = ({ num, title, body, highlights }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = (s: number) => s * fps;

  const numOpacity = interpolate(frame, [0, t(0.2)], [0, 0.08], { extrapolateRight: "clamp" });
  const numScale = spring({ frame, fps, config: { damping: 200 } });
  const badgeOpacity = interpolate(frame, [t(0.05), t(0.3)], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const titleOpacity = interpolate(frame, [t(0.1), t(0.4)], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const titleX = interpolate(
    spring({ frame, fps, delay: Math.round(t(0.1)), config: { damping: 200 } }),
    [0, 1], [-40, 0]
  );
  const bodyOpacity = interpolate(frame, [t(0.3), t(0.6)], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const lineH = interpolate(frame, [t(0.05), t(0.5)], [0, 240], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      {/* Big number watermark */}
      <div style={{
        position: "absolute", top: 120, right: -30, fontSize: 380, fontFamily: display, fontWeight: 700,
        color: C.white, opacity: numOpacity, transform: `scale(${numScale})`, lineHeight: 1, userSelect: "none" as const,
      }}>
        {num}
      </div>

      {/* Red vertical bar */}
      <div style={{ position: "absolute", top: 380, left: 0, width: 4, height: lineH, backgroundColor: C.red }} />

      <div style={{ position: "absolute", top: 400, left: 64, right: 64, display: "flex", flexDirection: "column" }}>
        <div style={{ opacity: badgeOpacity, marginBottom: 20 }}>
          <Badge>{`CHAPTER ${num}`}</Badge>
        </div>

        <div style={{ opacity: titleOpacity, transform: `translateX(${titleX}px)`, fontSize: 46, fontFamily: sans, fontWeight: 900, color: C.white, lineHeight: 1.25, marginBottom: 20 }}>
          {title}
        </div>

        <div style={{ width: 60, height: 2, backgroundColor: C.red, marginBottom: 20, opacity: bodyOpacity }} />

        <div style={{ opacity: bodyOpacity, fontSize: 24, fontFamily: sans, fontWeight: 400, color: C.gray, lineHeight: 1.7, marginBottom: 28 }}>
          {body}
        </div>

        {highlights.map((h, i) => {
          const delay = t(0.5) + i * t(0.12);
          const hOpacity = interpolate(frame, [delay, delay + t(0.2)], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          });
          const hX = interpolate(frame, [delay, delay + t(0.2)], [20, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          });
          return (
            <div key={i} style={{ opacity: hOpacity, transform: `translateX(${hX}px)`, display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
              <div style={{ width: 20, height: 2, backgroundColor: C.red, flexShrink: 0 }} />
              <div style={{ fontSize: 22, fontFamily: sans, fontWeight: 500, color: C.white }}>{h}</div>
            </div>
          );
        })}
      </div>

      <DiagonalAccent opacity={bodyOpacity} />
      <GrainOverlay />
    </AbsoluteFill>
  );
};

// ── Poster Showcase — 3 styles carousel (3.5s) ─
const POSTERS = [
  { file: "poster-neon.png", label: "NEON", bg: C.bg },
  { file: "poster-elegant.png", label: "ELEGANT", bg: "#0C0C0C" },
  { file: "poster-brutalist.png", label: "BRUTALIST", bg: "#F5F5F5" },
];

const PosterShowcase = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = (s: number) => s * fps;

  const labelOpacity = interpolate(frame, [t(0.1), t(0.4)], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const captionOpacity = interpolate(frame, [t(0.5), t(0.9)], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Each poster gets ~1s display time, with crossfade
  const EACH = t(1.1);
  const FADE = t(0.25);

  // Which poster is active (0, 1, 2)
  const activeIndex = Math.min(2, Math.floor(frame / EACH));

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      {/* Header */}
      <div style={{ position: "absolute", top: 140, left: 64, opacity: labelOpacity, display: "flex", flexDirection: "column", gap: 12 }}>
        <Badge>多種風格生成</Badge>
        <div style={{ fontSize: 34, fontFamily: sans, fontWeight: 900, color: C.white, letterSpacing: 6 }}>
          成 品 預 覽
        </div>
      </div>

      {/* Phone mockup with cycling posters */}
      <div style={{ position: "absolute", top: 310, left: "50%", transform: "translateX(-50%)", width: 380 }}>
        <div style={{
          width: 380, height: 1020, borderRadius: 36,
          border: `2px solid rgba(255,255,255,0.1)`,
          backgroundColor: "#111", overflow: "hidden", position: "relative",
          boxShadow: `0 0 60px rgba(255,23,68,0.15), 0 0 120px rgba(0,229,255,0.08)`,
        }}>
          {/* Notch */}
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 140, height: 28, backgroundColor: "#111", borderBottomLeftRadius: 16, borderBottomRightRadius: 16, zIndex: 10 }} />

          {/* Stack all 3 posters, fade in/out */}
          {POSTERS.map((p, i) => {
            const start = i * EACH;
            const fadeIn = interpolate(frame, [start, start + FADE], [0, 1], {
              extrapolateLeft: "clamp", extrapolateRight: "clamp",
            });
            const fadeOut = i < 2
              ? interpolate(frame, [start + EACH - FADE, start + EACH], [1, 0], {
                  extrapolateLeft: "clamp", extrapolateRight: "clamp",
                })
              : 1;
            const opacity = Math.min(fadeIn, fadeOut);
            const scale = interpolate(
              spring({ frame: Math.max(0, frame - start), fps, config: { damping: 200 } }),
              [0, 1], [1.05, 1]
            );

            return (
              <div key={i} style={{
                position: "absolute", top: 8, left: 8, right: 8, bottom: 8,
                borderRadius: 28, overflow: "hidden", opacity,
                transform: `scale(${scale})`,
              }}>
                <Img
                  src={staticFile(p.file)}
                  style={{ width: "100%", height: "100%", objectFit: "contain", backgroundColor: p.bg }}
                />
              </div>
            );
          })}
        </div>

        {/* Style label under phone — changes with active poster */}
        {POSTERS.map((p, i) => {
          const start = i * EACH;
          const labelFadeIn = interpolate(frame, [start + FADE * 0.5, start + FADE * 1.5], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          });
          const labelFadeOut = i < 2
            ? interpolate(frame, [start + EACH - FADE, start + EACH], [1, 0], {
                extrapolateLeft: "clamp", extrapolateRight: "clamp",
              })
            : 1;
          const labelOp = Math.min(labelFadeIn, labelFadeOut);

          return (
            <div key={i} style={{
              position: "absolute", top: 1035, left: 0, right: 0,
              opacity: labelOp, display: "flex", justifyContent: "center",
            }}>
              <div style={{
                backgroundColor: C.red, padding: "6px 20px",
                fontSize: 14, fontFamily: mono, fontWeight: 500,
                color: C.white, letterSpacing: 4,
              }}>
                STYLE: {p.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom caption */}
      <div style={{ position: "absolute", bottom: 120, left: 64, right: 64, opacity: captionOpacity, textAlign: "center" as const }}>
        <div style={{ fontSize: 20, fontFamily: sans, color: C.gray, lineHeight: 1.6 }}>
          CoWork + Canva Connector
        </div>
        <div style={{ fontSize: 22, fontFamily: sans, fontWeight: 700, color: C.yellow, marginTop: 8 }}>
          一句話切換風格，秒出設計
        </div>
      </div>

      <DiagonalAccent opacity={captionOpacity} />
      <GrainOverlay />
    </AbsoluteFill>
  );
};

// ── Outro (2.5s) ───────────────────────────────
const OutroScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = (s: number) => s * fps;

  const headlineScale = spring({ frame, fps, config: { damping: 15, stiffness: 100 } });
  const headlineOpacity = interpolate(frame, [0, t(0.3)], [0, 1], { extrapolateRight: "clamp" });

  const detailsOpacity = interpolate(frame, [t(0.5), t(0.9)], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const ctaOpacity = interpolate(frame, [t(0.9), t(1.3)], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const ctaScale = spring({ frame, fps, delay: Math.round(t(0.9)), config: { damping: 12 } });

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 40%, rgba(255,23,68,0.05) 0%, transparent 60%)` }} />

      <div style={{ position: "absolute", top: 420, left: 64, right: 64, display: "flex", flexDirection: "column" }}>
        <div style={{ opacity: headlineOpacity, marginBottom: 20 }}>
          <Badge>ENROLL NOW</Badge>
        </div>

        <div style={{ opacity: headlineOpacity, transform: `scale(${headlineScale})`, transformOrigin: "left center", marginBottom: 8 }}>
          <ChromaText fontSize={72} offset={4}>2 HOURS</ChromaText>
        </div>

        <div style={{ opacity: headlineOpacity, fontSize: 52, fontFamily: sans, fontWeight: 900, color: C.white, lineHeight: 1.3, marginTop: 16 }}>
          學會 AI 協作
        </div>

        <div style={{ width: 4, height: interpolate(frame, [t(0.3), t(0.8)], [0, 60], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), backgroundColor: C.red, marginTop: 32, marginBottom: 32 }} />

        <div style={{ opacity: detailsOpacity, display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            ["FORMAT", "👥 小班制 4–5 人"],
            ["LOCATION", "🏝️ 金門 · 實體"],
            ["TOOL", "💻 Claude Desktop"],
          ].map(([label, value], i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "10px 0", borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
              <div style={{ fontSize: 12, fontFamily: mono, color: C.red, letterSpacing: 3, width: 90 }}>{label}</div>
              <div style={{ fontSize: 22, fontFamily: sans, fontWeight: 500, color: C.white }}>{value}</div>
            </div>
          ))}
        </div>

        <div style={{
          opacity: ctaOpacity, transform: `scale(${ctaScale})`, transformOrigin: "left center",
          marginTop: 48, alignSelf: "flex-start", padding: "18px 48px",
          backgroundColor: C.red, fontSize: 26, fontFamily: sans, fontWeight: 700, color: C.white, letterSpacing: 2,
        }}>
          立即報名 →
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 100, left: 64, opacity: ctaOpacity, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 30, height: 2, backgroundColor: C.red }} />
        <div style={{ fontSize: 14, fontFamily: mono, color: C.gray, letterSpacing: 2 }}>
          講師 柏緯 · 設計 METIS
        </div>
      </div>

      <DiagonalAccent opacity={ctaOpacity} />
      <GrainOverlay />
    </AbsoluteFill>
  );
};

// ── Main Composition (~18s) ────────────────────
export const CoWorkStory = () => {
  const { fps } = useVideoConfig();

  const TITLE = Math.round(2.5 * fps);
  const CH = Math.round(2 * fps);
  const POSTER = Math.round(3.5 * fps);
  const OUTRO = Math.round(2.5 * fps);
  const T = Math.round(0.3 * fps);

  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={TITLE}>
        <TitleScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />

      <TransitionSeries.Sequence durationInFrames={CH}>
        <ChapterScene num="01" title="Chat vs CoWork 差在哪？" body="同一句話，不同結果 — CoWork 認識你的事業"
          highlights={["Context 是 AI 的工作記憶", "Connectors 串接外部工具", "Skills 把流程一鍵化"]} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={linearTiming({ durationInFrames: T })} />

      <TransitionSeries.Sequence durationInFrames={CH}>
        <ChapterScene num="02" title="國慶快閃行銷企劃" body="虛構品牌「半畝咖啡」，從零完成一份企劃"
          highlights={["查天氣、趨勢、在地活動", "企劃 + 時程 + 文案一條龍", "Session Handoff 無縫交接"]} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />

      <TransitionSeries.Sequence durationInFrames={POSTER}>
        <PosterShowcase />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={linearTiming({ durationInFrames: T })} />

      <TransitionSeries.Sequence durationInFrames={CH}>
        <ChapterScene num="03" title="AI 幫你對帳" body="從 Gmail 自動撈帳單，比對交貨記錄"
          highlights={["Gmail Connector 撈 PDF", "找出對帳單款項出入", "數字比對零失誤"]} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={linearTiming({ durationInFrames: T })} />

      <TransitionSeries.Sequence durationInFrames={CH}>
        <ChapterScene num="04" title="流程 → 一鍵指令" body="手動對帳變 Skill，下次一鍵搞定"
          highlights={["第一次手動 vs 第二次自動", "Slash Command 即時體驗", "帶走你自己的 AI 工作流"]} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />

      <TransitionSeries.Sequence durationInFrames={OUTRO}>
        <OutroScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
