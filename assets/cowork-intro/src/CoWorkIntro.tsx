import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";

// ── Color palette ──────────────────────────────
const COLORS = {
  bg: "#0f0f23",
  accent: "#6C63FF",
  accentLight: "#8B85FF",
  gold: "#FFD700",
  white: "#FFFFFF",
  gray: "#94A3B8",
  cardBg: "#1a1a2e",
  gradient1: "#6C63FF",
  gradient2: "#FF6584",
};

// ── Scene 1: Title ─────────────────────────────
const TitleScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(
    spring({ frame, fps, config: { damping: 200 } }),
    [0, 1],
    [60, 0]
  );
  const titleOpacity = interpolate(frame, [0, 0.8 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(
    frame,
    [0.6 * fps, 1.4 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const subtitleY = interpolate(frame, [0.6 * fps, 1.4 * fps], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const tagOpacity = interpolate(frame, [1.2 * fps, 2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const lineWidth = interpolate(frame, [1 * fps, 2 * fps], [0, 400], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 30% 50%, ${COLORS.cardBg} 0%, ${COLORS.bg} 70%)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          border: `1px solid ${COLORS.accent}22`,
          top: -100,
          right: -100,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          border: `1px solid ${COLORS.gradient2}22`,
          bottom: -50,
          left: -50,
        }}
      />

      <div
        style={{
          opacity: tagOpacity,
          fontSize: 28,
          color: COLORS.accent,
          fontWeight: 600,
          letterSpacing: 6,
          marginBottom: 24,
          fontFamily: "sans-serif",
        }}
      >
        AI 實戰工作坊
      </div>

      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          fontSize: 88,
          fontWeight: 800,
          color: COLORS.white,
          textAlign: "center",
          lineHeight: 1.2,
          fontFamily: "sans-serif",
        }}
      >
        Claude CoWork
      </div>

      {/* Gradient underline */}
      <div
        style={{
          width: lineWidth,
          height: 4,
          background: `linear-gradient(90deg, ${COLORS.gradient1}, ${COLORS.gradient2})`,
          borderRadius: 2,
          marginTop: 16,
          marginBottom: 24,
        }}
      />

      <div
        style={{
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          fontSize: 36,
          color: COLORS.gray,
          fontWeight: 400,
          fontFamily: "sans-serif",
        }}
      >
        AI 協作日常營運 — 從零到自動化
      </div>
    </AbsoluteFill>
  );
};

// ── Chapter Card Component ─────────────────────
type ChapterProps = {
  chapterNum: string;
  title: string;
  description: string;
  icon: string;
  accentColor: string;
  highlights: string[];
};

const ChapterCard: React.FC<ChapterProps> = ({
  chapterNum,
  title,
  description,
  icon,
  accentColor,
  highlights,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardScale = spring({ frame, fps, config: { damping: 200 } });
  const cardOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
        gap: 80,
      }}
    >
      {/* Left: Chapter number + icon */}
      <div
        style={{
          opacity: cardOpacity,
          transform: `scale(${cardScale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            fontSize: 120,
            lineHeight: 1,
          }}
        >
          {icon}
        </div>
        <div
          style={{
            fontSize: 22,
            color: accentColor,
            fontWeight: 700,
            letterSpacing: 4,
            fontFamily: "sans-serif",
          }}
        >
          {chapterNum}
        </div>
      </div>

      {/* Right: Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          maxWidth: 900,
        }}
      >
        <div
          style={{
            opacity: cardOpacity,
            fontSize: 52,
            fontWeight: 700,
            color: COLORS.white,
            fontFamily: "sans-serif",
          }}
        >
          {title}
        </div>

        <div
          style={{
            opacity: interpolate(frame, [0.3 * fps, 0.8 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            fontSize: 28,
            color: COLORS.gray,
            lineHeight: 1.6,
            fontFamily: "sans-serif",
          }}
        >
          {description}
        </div>

        {/* Highlights */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {highlights.map((h, i) => {
            const delay = 0.5 * fps + i * 0.25 * fps;
            const hOpacity = interpolate(
              frame,
              [delay, delay + 0.4 * fps],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const hX = interpolate(
              frame,
              [delay, delay + 0.4 * fps],
              [30, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            return (
              <div
                key={i}
                style={{
                  opacity: hOpacity,
                  transform: `translateX(${hX}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontSize: 26,
                  color: COLORS.white,
                  fontFamily: "sans-serif",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: accentColor,
                    flexShrink: 0,
                  }}
                />
                {h}
              </div>
            );
          })}
        </div>

        {/* Accent bar */}
        <div
          style={{
            width: interpolate(frame, [0.2 * fps, 1 * fps], [0, 200], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            height: 3,
            backgroundColor: accentColor,
            borderRadius: 2,
            marginTop: 8,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 6: CTA / Outro ──────────────────────
const OutroScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const mainScale = spring({ frame, fps, config: { damping: 15, stiffness: 80 } });
  const mainOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  const detailsOpacity = interpolate(frame, [0.8 * fps, 1.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ctaOpacity = interpolate(frame, [1.5 * fps, 2.2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaScale = spring({
    frame,
    fps,
    delay: Math.round(1.5 * fps),
    config: { damping: 12 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.bg} 0%, #1a1040 50%, ${COLORS.bg} 100%)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 32,
      }}
    >
      <div
        style={{
          opacity: mainOpacity,
          transform: `scale(${mainScale})`,
          fontSize: 64,
          fontWeight: 800,
          color: COLORS.white,
          textAlign: "center",
          fontFamily: "sans-serif",
        }}
      >
        2 小時，學會 AI 協作
      </div>

      <div
        style={{
          opacity: detailsOpacity,
          display: "flex",
          gap: 48,
          fontSize: 28,
          color: COLORS.gray,
          fontFamily: "sans-serif",
        }}
      >
        <span>👥 小班制 4-5 人</span>
        <span>🏝️ 金門 · 實體</span>
        <span>💻 Claude Desktop</span>
      </div>

      <div
        style={{
          opacity: ctaOpacity,
          transform: `scale(${ctaScale})`,
          marginTop: 32,
          padding: "20px 64px",
          borderRadius: 16,
          background: `linear-gradient(135deg, ${COLORS.gradient1}, ${COLORS.gradient2})`,
          fontSize: 36,
          fontWeight: 700,
          color: COLORS.white,
          fontFamily: "sans-serif",
        }}
      >
        立即報名 →
      </div>

      <div
        style={{
          opacity: ctaOpacity,
          fontSize: 22,
          color: COLORS.gray,
          marginTop: 16,
          fontFamily: "sans-serif",
        }}
      >
        講師：柏緯 ✦ 設計：Metis
      </div>
    </AbsoluteFill>
  );
};

// ── Main Composition ───────────────────────────
export const CoWorkIntro = () => {
  const { fps } = useVideoConfig();

  const SCENE = 5 * fps; // 5 seconds per scene
  const TRANSITION = Math.round(0.5 * fps); // 0.5s transitions

  return (
    <TransitionSeries>
      {/* Scene 1: Title */}
      <TransitionSeries.Sequence durationInFrames={SCENE}>
        <TitleScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION })}
      />

      {/* Scene 2: Chapter 1 */}
      <TransitionSeries.Sequence durationInFrames={SCENE}>
        <ChapterCard
          chapterNum="CHAPTER 01"
          title="Chat vs CoWork 差在哪？"
          description="同一句話，Chat 給你通用答案，CoWork 給你量身打造的回應"
          icon="🧠"
          accentColor={COLORS.accent}
          highlights={["Context = AI 的工作記憶", "Connectors = 串接外部工具", "Skills = 一鍵自動化"]}
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: TRANSITION })}
      />

      {/* Scene 3: Chapter 2 */}
      <TransitionSeries.Sequence durationInFrames={SCENE}>
        <ChapterCard
          chapterNum="CHAPTER 02"
          title="國慶快閃行銷企劃"
          description="用虛構品牌「半畝咖啡」，從零做一份完整企劃"
          icon="☕"
          accentColor="#FF6584"
          highlights={["查天氣、查趨勢、查在地活動", "企劃書 + 時程表 + 文案一條龍", "Session Handoff 無縫交接"]}
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: TRANSITION })}
      />

      {/* Scene 4: Chapter 3 */}
      <TransitionSeries.Sequence durationInFrames={SCENE}>
        <ChapterCard
          chapterNum="CHAPTER 03"
          title="AI 幫你對帳"
          description="從 Gmail 自動撈廠商帳單，比對交貨記錄找差異"
          icon="📊"
          accentColor={COLORS.gold}
          highlights={["Gmail Connector 撈 PDF", "找出對帳單款項出入", "數字比對零失誤"]}
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: TRANSITION })}
      />

      {/* Scene 5: Chapter 4 */}
      <TransitionSeries.Sequence durationInFrames={SCENE}>
        <ChapterCard
          chapterNum="CHAPTER 04"
          title="流程 → 一鍵指令"
          description="把手動對帳變成 Skill，下次一鍵搞定"
          icon="⚡"
          accentColor="#00D4AA"
          highlights={["第一次手動 vs 第二次自動", "Slash Command 即時體驗", "帶走你自己的 AI 工作流"]}
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION })}
      />

      {/* Scene 6: CTA */}
      <TransitionSeries.Sequence durationInFrames={SCENE}>
        <OutroScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
