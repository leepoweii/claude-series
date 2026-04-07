import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { loadFont as loadNotoSansTC } from "@remotion/google-fonts/NotoSansTC";
import { loadFont as loadDMmono } from "@remotion/google-fonts/DMMono";
import React from "react";

const { fontFamily: sans } = loadNotoSansTC("normal", {
  weights: ["400", "500", "700", "900"],
  subsets: ["latin"],
});
const { fontFamily: mono } = loadDMmono("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
});

// ── Welly brand colors (extracted from logo SVG + report PDF) ──
const C = {
  yellow: "#FDDA5A",
  yellowDark: "#E8C84A",
  black: "#1A1A1A",
  white: "#FFFFFF",
  offWhite: "#F8F8F8",
  red: "#E53935",
  redDark: "#C62828",
  gray: "#888888",
  lightGray: "#E0E0E0",
  dimBlack: "rgba(26,26,26,0.08)",
};

const TRANSITION = 15; // frames for each transition

// ── Reusable Components ──

const WellyLogo: React.FC<{ width?: number }> = ({ width = 120 }) => (
  <Img src={staticFile("welly.svg")} style={{ width, height: "auto" }} />
);

/** Yellow highlight bar that wipes in from left */
const HighlightBar: React.FC<{
  children: React.ReactNode;
  delay?: number;
  color?: string;
}> = ({ children, delay = 10, color = C.yellow }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const wipe = spring({ fps, frame, delay, durationInFrames: 18, config: { damping: 200 } });

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span
        style={{
          position: "absolute",
          left: -8,
          right: -8,
          top: "50%",
          height: "1.1em",
          transform: `translateY(-50%) scaleX(${wipe})`,
          transformOrigin: "left center",
          backgroundColor: color,
          borderRadius: 4,
          zIndex: 0,
        }}
      />
      <span style={{ position: "relative", zIndex: 1, fontWeight: 700 }}>{children}</span>
    </span>
  );
};

/** Red priority badge */
const PriorityBadge: React.FC<{ level: "高" | "中" }> = ({ level }) => (
  <div
    style={{
      position: "absolute",
      top: 80,
      right: 64,
      width: 56,
      height: 56,
      backgroundColor: level === "高" ? C.red : C.yellow,
      color: level === "高" ? C.white : C.black,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 28,
      fontFamily: sans,
      fontWeight: 900,
      borderRadius: 4,
    }}
  >
    {level}
  </div>
);

/** Animated number for chapter headings */
const ChapterNumber: React.FC<{ num: string }> = ({ num }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ fps, frame, durationInFrames: 20, config: { damping: 12, mass: 0.8 } });

  return (
    <div
      style={{
        fontSize: 120,
        fontFamily: sans,
        fontWeight: 900,
        color: C.yellow,
        opacity: 0.25,
        transform: `scale(${scale})`,
        lineHeight: 1,
      }}
    >
      {num}
    </div>
  );
};

/** Fade-slide-up animation wrapper */
const FadeUp: React.FC<{
  children: React.ReactNode;
  delay?: number;
  distance?: number;
}> = ({ children, delay = 0, distance = 40 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ fps, frame, delay, durationInFrames: 20, config: { damping: 15 } });
  const y = interpolate(progress, [0, 1], [distance, 0]);

  return (
    <div style={{ opacity: progress, transform: `translateY(${y}px)` }}>
      {children}
    </div>
  );
};

/** Diagonal split background (yellow top-left, white bottom-right) */
const DiagonalBg: React.FC = () => (
  <>
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: C.yellow,
        clipPath: "polygon(0 0, 100% 0, 0 65%)",
      }}
    />
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: C.white,
        clipPath: "polygon(100% 0, 100% 100%, 0 100%, 0 65%)",
      }}
    />
  </>
);

// ── Scene Components ──

/** Scene 1: Cover */
const CoverScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleY = spring({ fps, frame, delay: 5, durationInFrames: 25, config: { damping: 14 } });
  const subtitleOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ background: C.white }}>
      {/* Yellow top block */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "45%",
          backgroundColor: C.yellow,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 80,
          right: 80,
          transform: `translateY(${interpolate(titleY, [0, 1], [60, 0])}px)`,
          opacity: titleY,
        }}
      >
        <div style={{ fontSize: 72, fontFamily: sans, fontWeight: 900, color: C.black, lineHeight: 1.2, marginBottom: 24 }}>
          MARS
        </div>
        <div style={{ fontSize: 64, fontFamily: sans, fontWeight: 900, color: C.black, lineHeight: 1.2, marginBottom: 32 }}>
          網站技術優化報告
        </div>
        <div style={{ fontSize: 22, fontFamily: mono, color: C.gray, letterSpacing: 1, marginBottom: 16 }}>
          https://www.marstw.com
        </div>
      </div>

      {/* Report number */}
      <div
        style={{
          position: "absolute",
          top: 680,
          left: 80,
          opacity: subtitleOpacity,
        }}
      >
        <div style={{ fontSize: 48, fontFamily: sans, fontWeight: 900, color: C.black, marginBottom: 8 }}>03</div>
        <div style={{ fontSize: 26, fontFamily: sans, fontWeight: 500, color: C.black }}>
          網站進階 SEO 優化建議
        </div>
      </div>

      {/* Welly logo + MARS badge */}
      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: 80,
          right: 80,
          display: "flex",
          alignItems: "center",
          gap: 24,
          opacity: subtitleOpacity,
        }}
      >
        <div
          style={{
            backgroundColor: C.yellow,
            padding: "10px 24px",
            fontSize: 22,
            fontFamily: sans,
            fontWeight: 900,
            color: C.black,
            borderRadius: 4,
          }}
        >
          MARS
        </div>
        <div style={{ fontSize: 32, color: C.gray }}>×</div>
        <WellyLogo width={140} />
      </div>
    </AbsoluteFill>
  );
};

/** Scene 2: Table of Contents */
const TOCScene: React.FC = () => (
  <AbsoluteFill style={{ background: C.white }}>
    <div style={{ position: "absolute", top: 120, left: 80, right: 80 }}>
      <FadeUp>
        <div style={{ fontSize: 52, fontFamily: sans, fontWeight: 900, color: C.black, marginBottom: 64, textAlign: "center" as const }}>
          報告目錄
        </div>
      </FadeUp>

      {[
        { num: "01", title: "Alt 標記", sub: "圖片替代文字設定" },
        { num: "02", title: "結構化資料標記", sub: "Article / Schema.org" },
        { num: "03", title: "導覽標記", sub: "麵包屑 Breadcrumb" },
        { num: "04", title: "持續優化 SEO", sub: "E-E-A-T 原則" },
      ].map((item, i) => (
        <FadeUp key={i} delay={10 + i * 8}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              marginBottom: 40,
              paddingBottom: 40,
              borderBottom: i < 3 ? `2px solid ${C.lightGray}` : "none",
            }}
          >
            {/* Yellow triangle marker */}
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: "20px solid transparent",
                borderRight: "20px solid transparent",
                borderBottom: `28px solid ${C.yellow}`,
                transform: "rotate(-30deg)",
                flexShrink: 0,
              }}
            />
            <div>
              <div style={{ fontSize: 20, fontFamily: mono, color: C.gray, marginBottom: 4 }}>{item.num}</div>
              <div style={{ fontSize: 32, fontFamily: sans, fontWeight: 700, color: C.black, marginBottom: 4 }}>
                {item.title}
              </div>
              <div style={{ fontSize: 20, fontFamily: sans, fontWeight: 400, color: C.gray }}>
                {item.sub}
              </div>
            </div>
          </div>
        </FadeUp>
      ))}
    </div>

    {/* Page number style */}
    <div style={{ position: "absolute", bottom: 60, right: 64, fontSize: 16, fontFamily: mono, color: C.lightGray }}>
      WELLY SEO
    </div>
  </AbsoluteFill>
);

/** Chapter divider scene (yellow diagonal) */
const ChapterDivider: React.FC<{ num: string; title: string; subtitle: string }> = ({
  num,
  title,
  subtitle,
}) => (
  <AbsoluteFill style={{ background: C.white }}>
    <DiagonalBg />
    <div style={{ position: "absolute", top: 400, left: 80, right: 80 }}>
      <FadeUp>
        <div style={{ fontSize: 64, fontFamily: sans, fontWeight: 900, color: C.black, lineHeight: 1.3 }}>
          {title}
        </div>
      </FadeUp>
      {subtitle && (
        <FadeUp delay={10}>
          <div style={{ fontSize: 28, fontFamily: sans, fontWeight: 400, color: C.gray, marginTop: 16 }}>
            {subtitle}
          </div>
        </FadeUp>
      )}
    </div>
    <FadeUp delay={15}>
      <div
        style={{
          position: "absolute",
          bottom: 300,
          left: 80,
          fontSize: 140,
          fontFamily: sans,
          fontWeight: 900,
          color: C.yellow,
          opacity: 0.3,
          lineHeight: 1,
        }}
      >
        {num}
      </div>
    </FadeUp>
  </AbsoluteFill>
);

/** Scene 3: Alt 標記 (content) */
const AltTagScene: React.FC = () => (
  <AbsoluteFill style={{ background: C.white }}>
    <PriorityBadge level="高" />

    <div style={{ position: "absolute", top: 100, left: 64, right: 64 }}>
      <FadeUp>
        <div style={{ fontSize: 42, fontFamily: sans, fontWeight: 900, color: C.black, marginBottom: 48 }}>
          圖片 Alt 標記是什麼？
        </div>
      </FadeUp>

      <FadeUp delay={8}>
        <div style={{ marginBottom: 40 }}>
          <HighlightBar delay={15}>現狀分析</HighlightBar>
        </div>
      </FadeUp>

      <FadeUp delay={16}>
        <div
          style={{
            fontSize: 28,
            fontFamily: sans,
            fontWeight: 500,
            color: C.black,
            lineHeight: 1.8,
            marginBottom: 48,
          }}
        >
          目前有 <span style={{ color: C.red, fontWeight: 900 }}>50 個頁面</span>
          的圖片沒有設立 Alt 標記
        </div>
      </FadeUp>

      <FadeUp delay={24}>
        <div style={{ marginBottom: 32 }}>
          <HighlightBar delay={30}>修改建議</HighlightBar>
        </div>
      </FadeUp>

      {[
        "添加圖片 Alt 語法描述",
        "內容包含關鍵字，簡明扼要",
        "描述圖像的實際內容",
      ].map((text, i) => (
        <FadeUp key={i} delay={32 + i * 6}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 16,
              marginBottom: 24,
              fontSize: 24,
              fontFamily: sans,
              color: C.black,
              lineHeight: 1.6,
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: C.yellow, marginTop: 12, flexShrink: 0 }} />
            {text}
          </div>
        </FadeUp>
      ))}

      {/* Code example */}
      <FadeUp delay={56}>
        <div
          style={{
            marginTop: 32,
            backgroundColor: C.offWhite,
            border: `2px solid ${C.lightGray}`,
            borderRadius: 12,
            padding: 28,
            fontFamily: mono,
            fontSize: 18,
            color: C.black,
            lineHeight: 1.6,
          }}
        >
          <span style={{ color: C.red }}>&lt;img</span>{" "}
          <span style={{ color: "#6A1B9A" }}>src=</span>
          <span style={{ color: "#2E7D32" }}>"photo.png"</span>{" "}
          <span style={{ color: "#6A1B9A" }}>alt=</span>
          <span style={{ color: "#2E7D32" }}>"圖片敘述"</span>
          <span style={{ color: C.red }}>&gt;</span>
        </div>
      </FadeUp>
    </div>
  </AbsoluteFill>
);

/** Scene 4: 結構化資料標記 */
const SchemaScene: React.FC = () => (
  <AbsoluteFill style={{ background: C.white }}>
    <PriorityBadge level="高" />

    <div style={{ position: "absolute", top: 100, left: 64, right: 64 }}>
      <FadeUp>
        <div style={{ fontSize: 38, fontFamily: sans, fontWeight: 900, color: C.black, marginBottom: 16 }}>
          結構化資料標記
        </div>
        <div style={{ fontSize: 22, fontFamily: sans, fontWeight: 400, color: C.gray, marginBottom: 48 }}>
          Structured Data — Schema.org
        </div>
      </FadeUp>

      <FadeUp delay={10}>
        <div style={{ fontSize: 24, fontFamily: sans, color: C.black, lineHeight: 1.8, marginBottom: 48 }}>
          讓搜尋引擎更快理解網頁內容，
          <br />
          獲得 <span style={{ fontWeight: 900, color: C.red }}>Rich Snippets</span> 精選摘要機會
        </div>
      </FadeUp>

      {/* 4 Schema types */}
      {[
        { icon: "📄", name: "Article", desc: "文章結構化標記" },
        { icon: "🏪", name: "Local Business", desc: "在地商家資訊" },
        { icon: "🏢", name: "Organization", desc: "機構詳細資料" },
        { icon: "🌐", name: "Website", desc: "首頁結構化標記" },
      ].map((item, i) => (
        <FadeUp key={i} delay={18 + i * 8}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginBottom: 28,
              padding: "20px 24px",
              backgroundColor: i % 2 === 0 ? C.offWhite : C.white,
              borderLeft: `4px solid ${C.yellow}`,
              borderRadius: 8,
            }}
          >
            <div style={{ fontSize: 36 }}>{item.icon}</div>
            <div>
              <div style={{ fontSize: 24, fontFamily: mono, fontWeight: 500, color: C.black }}>{item.name}</div>
              <div style={{ fontSize: 18, fontFamily: sans, color: C.gray }}>{item.desc}</div>
            </div>
          </div>
        </FadeUp>
      ))}
    </div>
  </AbsoluteFill>
);

/** Scene 5: 導覽標記 & 麵包屑 */
const BreadcrumbScene: React.FC = () => (
  <AbsoluteFill style={{ background: C.white }}>
    <PriorityBadge level="中" />

    <div style={{ position: "absolute", top: 100, left: 64, right: 64 }}>
      <FadeUp>
        <div style={{ fontSize: 42, fontFamily: sans, fontWeight: 900, color: C.black, marginBottom: 48 }}>
          導覽標記 & 麵包屑
        </div>
      </FadeUp>

      <FadeUp delay={8}>
        <div style={{ marginBottom: 32 }}>
          <HighlightBar delay={12}>導覽標記 Breadcrumb</HighlightBar>
        </div>
        <div style={{ fontSize: 24, fontFamily: sans, color: C.black, lineHeight: 1.8, marginBottom: 48 }}>
          幫助使用者辨認目前位於網站中的哪個位置，
          也有助於搜尋引擎理解網站內容的層次結構
        </div>
      </FadeUp>

      {/* Breadcrumb visual example */}
      <FadeUp delay={20}>
        <div
          style={{
            padding: 28,
            backgroundColor: C.offWhite,
            borderRadius: 12,
            border: `2px solid ${C.lightGray}`,
            marginBottom: 40,
          }}
        >
          <div style={{ fontSize: 14, fontFamily: mono, color: C.gray, marginBottom: 12 }}>
            BREADCRUMB EXAMPLE
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 22, fontFamily: sans }}>
            <span style={{ color: C.red, fontWeight: 700 }}>首頁</span>
            <span style={{ color: C.gray }}>&gt;</span>
            <span style={{ color: C.red, fontWeight: 700 }}>部落格列表</span>
            <span style={{ color: C.gray }}>&gt;</span>
            <span style={{ color: C.black, fontWeight: 500 }}>文章標題</span>
          </div>
        </div>
      </FadeUp>

      <FadeUp delay={30}>
        <div style={{ marginBottom: 32 }}>
          <HighlightBar delay={34}>修改建議</HighlightBar>
        </div>
      </FadeUp>

      {[
        "使用 Google 規範的結構化資料 BreadcrumbList",
        "確保麵包屑路徑與網站實際層級一致",
        "blog 頁面建議加入：首頁 > 部落格 > 文章",
      ].map((text, i) => (
        <FadeUp key={i} delay={36 + i * 6}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 16,
              marginBottom: 20,
              fontSize: 22,
              fontFamily: sans,
              color: C.black,
              lineHeight: 1.6,
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: C.yellow, marginTop: 10, flexShrink: 0 }} />
            {text}
          </div>
        </FadeUp>
      ))}
    </div>
  </AbsoluteFill>
);

/** Scene 6: E-E-A-T */
const EEATScene: React.FC = () => (
  <AbsoluteFill style={{ background: C.white }}>
    <PriorityBadge level="高" />

    <div style={{ position: "absolute", top: 100, left: 64, right: 64 }}>
      <FadeUp>
        <div style={{ fontSize: 48, fontFamily: sans, fontWeight: 900, color: C.black, marginBottom: 16 }}>
          E-E-A-T 原則
        </div>
        <div style={{ fontSize: 20, fontFamily: sans, color: C.gray, marginBottom: 48 }}>
          Google 搜尋品質評分的核心指標
        </div>
      </FadeUp>

      {[
        { letter: "E", label: "Experience", zh: "經驗值", color: "#E53935" },
        { letter: "E", label: "Expertise", zh: "專業性", color: "#FB8C00" },
        { letter: "A", label: "Authoritativeness", zh: "權威性", color: "#43A047" },
        { letter: "T", label: "Trust", zh: "可信度", color: "#1E88E5" },
      ].map((item, i) => (
        <FadeUp key={i} delay={12 + i * 10}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              marginBottom: 32,
              padding: "24px 28px",
              backgroundColor: C.offWhite,
              borderRadius: 12,
              borderLeft: `5px solid ${item.color}`,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 12,
                backgroundColor: item.color,
                color: C.white,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 32,
                fontFamily: sans,
                fontWeight: 900,
                flexShrink: 0,
              }}
            >
              {item.letter}
            </div>
            <div>
              <div style={{ fontSize: 22, fontFamily: mono, fontWeight: 500, color: C.black }}>{item.label}</div>
              <div style={{ fontSize: 26, fontFamily: sans, fontWeight: 700, color: C.black }}>{item.zh}</div>
            </div>
          </div>
        </FadeUp>
      ))}

      <FadeUp delay={55}>
        <div style={{ fontSize: 20, fontFamily: sans, color: C.gray, lineHeight: 1.8, marginTop: 24 }}>
          E-E-A-T 是評估指標之一，影響程度取決於
          <br />
          網站主題與 YMYL 的相關程度
        </div>
      </FadeUp>
    </div>
  </AbsoluteFill>
);

/** Scene 7: Outro */
const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoScale = spring({ fps, frame, delay: 5, durationInFrames: 20, config: { damping: 12 } });

  return (
    <AbsoluteFill style={{ background: C.black }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
        }}
      >
        <FadeUp delay={0}>
          <div style={{ transform: `scale(${logoScale})` }}>
            {/* White version of logo - invert filter */}
            <Img
              src={staticFile("welly.svg")}
              style={{ width: 200, height: "auto", filter: "brightness(0) invert(1)" }}
            />
          </div>
        </FadeUp>

        <FadeUp delay={10}>
          <div style={{ fontSize: 20, fontFamily: mono, color: C.gray, letterSpacing: 4, textTransform: "uppercase" as const }}>
            SEO Technical Report
          </div>
        </FadeUp>

        <FadeUp delay={18}>
          <div
            style={{
              fontSize: 36,
              fontFamily: sans,
              fontWeight: 900,
              color: C.white,
              textAlign: "center" as const,
              lineHeight: 1.5,
            }}
          >
            MARS × Welly
          </div>
        </FadeUp>

        <FadeUp delay={26}>
          <div
            style={{
              marginTop: 20,
              padding: "14px 40px",
              backgroundColor: C.yellow,
              borderRadius: 8,
              fontSize: 22,
              fontFamily: sans,
              fontWeight: 700,
              color: C.black,
            }}
          >
            完整報告請見 PDF 附件
          </div>
        </FadeUp>

        <FadeUp delay={34}>
          <div style={{ fontSize: 16, fontFamily: mono, color: C.gray, marginTop: 20 }}>
            welly.tw
          </div>
        </FadeUp>
      </div>
    </AbsoluteFill>
  );
};

// ── Main Composition ──

export const MarsReport: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: sans }}>
    <TransitionSeries>
      {/* 1. Cover */}
      <TransitionSeries.Sequence durationInFrames={130}>
        <CoverScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION })}
      />

      {/* 2. TOC */}
      <TransitionSeries.Sequence durationInFrames={120}>
        <TOCScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-bottom" })}
        timing={linearTiming({ durationInFrames: TRANSITION })}
      />

      {/* 3. Ch01 Alt — divider */}
      <TransitionSeries.Sequence durationInFrames={75}>
        <ChapterDivider num="01" title="圖片 Alt 標記是什麼？" subtitle="" />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION })}
      />

      {/* 3b. Ch01 Alt — content */}
      <TransitionSeries.Sequence durationInFrames={150}>
        <AltTagScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: TRANSITION })}
      />

      {/* 4. Ch02 Schema — divider */}
      <TransitionSeries.Sequence durationInFrames={75}>
        <ChapterDivider num="02" title="結構化資料標記是什麼？" subtitle="" />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION })}
      />

      {/* 4b. Ch02 Schema — content */}
      <TransitionSeries.Sequence durationInFrames={150}>
        <SchemaScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-bottom" })}
        timing={linearTiming({ durationInFrames: TRANSITION })}
      />

      {/* 5. Ch03 Breadcrumb — divider */}
      <TransitionSeries.Sequence durationInFrames={75}>
        <ChapterDivider num="03" title={"導覽標記是什麼？\n如何設置？"} subtitle="" />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION })}
      />

      {/* 5b. Ch03 Breadcrumb — content */}
      <TransitionSeries.Sequence durationInFrames={150}>
        <BreadcrumbScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: TRANSITION })}
      />

      {/* 6. Ch04 E-E-A-T — divider */}
      <TransitionSeries.Sequence durationInFrames={75}>
        <ChapterDivider num="04" title={"持續優化\nSEO 的建議"} subtitle="" />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION })}
      />

      {/* 6b. Ch04 E-E-A-T — content */}
      <TransitionSeries.Sequence durationInFrames={150}>
        <EEATScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION })}
      />

      {/* 7. Outro */}
      <TransitionSeries.Sequence durationInFrames={130}>
        <OutroScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
);
