import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const BrainwaveDemo = () => {
  const { t } = useLanguage();
  const [heated, setHeated] = useState(false);

  /* generate wave polyline points (α + θ) */
  const { alphaPoints, thetaPoints } = useMemo(() => {
    const count = 320;
    const width = 800;

    const gen = (baseline: number, mainCycles: number) =>
      Array.from({ length: count }, (_, i) => {
        const p = i / (count - 1);
        const x = p * width;

        if (heated) {
          // calmer + more coherent
          const smooth = Math.sin(p * Math.PI * 2 * mainCycles) * 16;
          const micro = Math.sin(p * Math.PI * 2 * (mainCycles * 3.1)) * 2;
          const y = baseline + smooth + micro;
          return `${x},${y}`;
        }

        // more mixed + irregular (science demo only)
        const base = Math.sin(p * Math.PI * 2 * (mainCycles * 1.6)) * 8;
        const noise1 = Math.sin(p * Math.PI * 2 * (mainCycles * 3.4)) * 7;
        const noise2 = Math.sin(p * Math.PI * 2 * (mainCycles * 6.1)) * 5;
        const noise3 = Math.cos(p * Math.PI * 2 * (mainCycles * 9.7)) * 3;
        const y = baseline + base + noise1 + noise2 + noise3;
        return `${x},${y}`;
      }).join(" ");

    return {
      thetaPoints: gen(46, 2.2),
      alphaPoints: gen(118, 3.4),
    };
  }, [heated]);

  return (
    <div className="max-w-3xl mx-auto border border-border bg-background">
      {/* header + toggle */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-border">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
          {t("脑电波科普演示", "Brainwave Demo")}
        </p>
        {/* toggle switch */}
        <button
          onClick={() => setHeated(!heated)}
          className="relative flex items-center gap-3 group cursor-pointer"
          aria-label="Toggle heating state"
        >
          <span className={`text-xs tracking-wider transition-colors ${!heated ? "text-foreground font-medium" : "text-muted-foreground"}`}>
            {t("加热前", "Before")}
          </span>
          <div className={`w-12 h-6 rounded-full transition-colors relative ${heated ? "bg-foreground" : "bg-muted-foreground/30"}`}>
            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-background shadow transition-all ${heated ? "left-[26px]" : "left-0.5"}`} />
          </div>
          <span className={`text-xs tracking-wider transition-colors ${heated ? "text-foreground font-medium" : "text-muted-foreground"}`}>
            {t("加热后", "After")}
          </span>
        </button>
      </div>

      {/* waveform */}
      <div className="px-6 py-8">
        <svg viewBox="0 0 800 160" className="w-full h-36" preserveAspectRatio="none" aria-label="Brainwave demo">
          <text x="6" y="18" className="fill-muted-foreground" fontSize="12">
            θ 4–8Hz
          </text>
          <text x="6" y="92" className="fill-muted-foreground" fontSize="12">
            α 8–13Hz
          </text>

          <polyline
            points={thetaPoints}
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            className={`transition-all duration-700 ${heated ? "text-muted-foreground" : "text-muted-foreground/50"}`}
          />
          <polyline
            points={alphaPoints}
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            className={`transition-all duration-700 ${heated ? "text-foreground" : "text-muted-foreground/60"}`}
          />
        </svg>
        <p className="text-center text-xs text-muted-foreground mt-2">
          {heated
            ? t("α/θ 更连贯 · 更平缓（科普）", "α/θ more coherent · calmer (demo)")
            : t("α/θ 多频混杂 · 更杂乱（科普）", "α/θ mixed frequencies · noisier (demo)")}
        </p>
      </div>

      {/* metrics */}
      <div className="grid grid-cols-2 border-t border-border">
        <div className="px-6 py-5 border-r border-border text-center">
          <p className={`text-2xl font-light transition-colors duration-500 ${heated ? "text-foreground" : "text-muted-foreground/40"}`}>
            {heated ? "×2.3" : "—"}
          </p>
          <p className="text-[11px] tracking-widest text-muted-foreground uppercase mt-1">
            {t("α波出现频率", "α Wave Frequency")}
          </p>
        </div>
        <div className="px-6 py-5 text-center">
          <p className={`text-2xl font-light transition-colors duration-500 ${heated ? "text-foreground" : "text-muted-foreground/40"}`}>
            {heated ? "×3.0" : "—"}
          </p>
          <p className="text-[11px] tracking-widest text-muted-foreground uppercase mt-1">
            {t("α波持续时间", "α Wave Duration")}
          </p>
        </div>
      </div>

      {/* disclaimer */}
      <div className="px-6 py-3 border-t border-border bg-secondary/30">
        <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
          {t(
            "动画仅用于科普展示，不代表实时脑电测量；非医疗器械，体验因人而异",
            "Animation is for educational purposes only, not real-time EEG. Not a medical device; experiences vary."
          )}
        </p>
      </div>
    </div>
  );
};

export default BrainwaveDemo;
