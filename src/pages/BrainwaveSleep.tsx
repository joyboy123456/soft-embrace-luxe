import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/layout/Layout";
import detailMesh from "@/assets/detail-mesh.jpg";

/* ───── tiny reusable SVG wave ───── */
const AlphaWave = ({ amplitude = 24, frequency = 3, className = "" }: { amplitude?: number; frequency?: number; className?: string }) => {
  const points = Array.from({ length: 200 }, (_, i) => {
    const x = (i / 199) * 600;
    const y = 30 + amplitude * Math.sin((i / 199) * Math.PI * 2 * frequency);
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 600 60" className={className} preserveAspectRatio="none">
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

/* ───── animated sine wave component for visual flair ───── */
const AnimatedWave = ({ label, color, amplitude, freq, delay = "0s" }: { label: string; color: string; amplitude: number; freq: number; delay?: string }) => {
  const points = Array.from({ length: 300 }, (_, i) => {
    const x = (i / 299) * 800;
    const y = 40 + amplitude * Math.sin((i / 299) * Math.PI * 2 * freq);
    return `${x},${y}`;
  }).join(" ");
  return (
    <div className="flex items-center gap-4">
      <span className="text-xs tracking-widest text-muted-foreground min-w-[50px] uppercase">{label}</span>
      <svg viewBox="0 0 800 80" className="flex-1 h-12 overflow-visible" preserveAspectRatio="none">
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          className="animate-pulse"
          style={{ animationDelay: delay, animationDuration: "3s" }}
        />
      </svg>
    </div>
  );
};

const BrainwaveSleep = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-foreground">
        <img src={detailMesh} alt="Graphene" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="relative z-10 text-center text-primary-foreground px-6">
          <p className="text-xs tracking-[0.5em] uppercase opacity-60 mb-4">
            {t("脑电波助眠理念", "Brainwave Sleep Science")}
          </p>
          <h1 className="text-4xl md:text-6xl tracking-[0.2em] font-light mb-6">
            {t("把放松看得见", "See Relaxation")}
          </h1>
          <p className="text-sm tracking-widest opacity-50">
            {t("浙江大学 × 格蓝丰 联合研究", "Zhejiang University × GRAPHENE Joint Research")}
          </p>
        </div>
      </section>

      {/* ── Module A: 一句话总览 ── */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-8">
          {t("核心发现", "Core Insight")}
        </p>
        <h2 className="text-3xl md:text-4xl font-light text-foreground mb-10 leading-tight">
          {t(
            "研究聚焦于 α 波（8–13 Hz）与 θ 波（4–8 Hz）——与放松、入睡过渡直接相关的慢波脑电信号",
            "Research focuses on α waves (8–13 Hz) and θ waves (4–8 Hz) — slow brainwaves directly linked to relaxation and sleep onset"
          )}
        </h2>
        {/* animated brainwave band chart */}
        <div className="max-w-2xl mx-auto space-y-3 mt-12">
          <AnimatedWave label="θ 4-8Hz" color="hsl(220,50%,60%)" amplitude={18} freq={2} delay="0s" />
          <AnimatedWave label="α 8-13Hz" color="hsl(200,60%,50%)" amplitude={22} freq={4} delay="0.5s" />
          <AnimatedWave label="β 13-32Hz" color="hsl(0,0%,65%)" amplitude={10} freq={8} delay="1s" />
        </div>
        <p className="text-xs text-muted-foreground mt-6">
          {t("脑电波代表大脑不同情绪状态——α/θ 慢波与放松、深度平静相关", "Brainwaves represent different mental states — α/θ slow waves correlate with relaxation and calm")}
        </p>
      </section>

      {/* ── Module B: 材料与波长匹配信息图 ── */}
      <section className="bg-secondary/40 py-24">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-4 text-center">
            {t("波长匹配", "Wavelength Match")}
          </p>
          <h2 className="text-3xl font-light text-foreground text-center mb-16">
            {t("人体红外 × 石墨烯中远红外", "Body Infrared × Graphene Mid-Far Infrared")}
          </h2>

          {/* spectrum bar infographic */}
          <div className="relative max-w-3xl mx-auto mb-12">
            {/* Scale */}
            <div className="flex justify-between text-[10px] text-muted-foreground mb-1 px-1">
              {[3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23].map(n => <span key={n}>{n}μm</span>)}
            </div>
            {/* Full graphene range bar */}
            <div className="relative h-8 bg-muted rounded-sm overflow-hidden">
              {/* 3-23 full range */}
              <div className="absolute inset-0 bg-foreground/10" />
              {/* 7-14 peak zone */}
              <div
                className="absolute top-0 bottom-0 bg-foreground/30"
                style={{ left: `${((7 - 3) / 20) * 100}%`, width: `${((14 - 7) / 20) * 100}%` }}
              />
              {/* 8-15 human match overlay */}
              <div
                className="absolute top-0 bottom-0 border-2 border-foreground/60 rounded-sm"
                style={{ left: `${((8 - 3) / 20) * 100}%`, width: `${((15 - 8) / 20) * 100}%` }}
              />
            </div>
            {/* labels */}
            <div className="flex justify-between mt-3">
              <div className="text-xs text-muted-foreground">
                <span className="inline-block w-3 h-3 bg-foreground/10 mr-1 align-middle" />
                {t("石墨烯辐射范围 3–23μm", "Graphene radiation 3–23μm")}
              </div>
              <div className="text-xs text-muted-foreground">
                <span className="inline-block w-3 h-3 bg-foreground/30 mr-1 align-middle" />
                {t("峰值 7–14μm", "Peak 7–14μm")}
              </div>
              <div className="text-xs text-muted-foreground">
                <span className="inline-block w-3 h-3 border-2 border-foreground/60 mr-1 align-middle" />
                {t("人体红外 8–15μm", "Body IR 8–15μm")}
              </div>
            </div>
          </div>

          {/* Key numbers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-16">
            {[
              { stat: "7–14μm", label: t("石墨烯峰值波长", "Graphene Peak λ") },
              { stat: "8–15μm", label: t("人体红外匹配区间", "Body IR Match Range") },
              { stat: ">90%", label: t("电-热辐射转换效率", "Electro-thermal Conversion") },
            ].map(item => (
              <div key={item.stat} className="py-6 border border-border">
                <p className="text-3xl font-light text-foreground mb-2">{item.stat}</p>
                <p className="text-xs tracking-widest text-muted-foreground uppercase">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Module C: 加热前 vs 加热后 ── */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-4 text-center">
          {t("实验观察", "Experimental Observation")}
        </p>
        <h2 className="text-3xl font-light text-foreground text-center mb-16">
          {t("石墨烯加热对 α 波的影响", "Effect of Graphene Heating on α Waves")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Before */}
          <div className="border border-border p-8 relative">
            <span className="absolute top-4 left-4 text-[10px] tracking-widest uppercase text-muted-foreground">
              {t("加热前", "Before Heating")}
            </span>
            <div className="mt-8">
              <AlphaWave amplitude={8} frequency={2} className="w-full h-16 text-muted-foreground/40" />
              <AlphaWave amplitude={6} frequency={3} className="w-full h-16 text-muted-foreground/30 mt-2" />
            </div>
            <p className="text-xs text-muted-foreground mt-6 text-center">
              {t("O1/O2 点位 α 波幅度较低、出现频率较少", "Low α wave amplitude and frequency at O1/O2")}
            </p>
          </div>

          {/* After */}
          <div className="border-2 border-foreground p-8 relative">
            <span className="absolute top-4 left-4 text-[10px] tracking-widest uppercase text-foreground font-medium">
              {t("加热后", "After Heating")}
            </span>
            <span className="absolute top-4 right-4 text-[10px] tracking-wider text-foreground/70 text-right leading-relaxed">
              {t("频率 ×2.3 · 持续 ×3.0", "Freq ×2.3 · Duration ×3.0")}
            </span>
            <div className="mt-8">
              <AlphaWave amplitude={22} frequency={4} className="w-full h-16 text-foreground" />
              <AlphaWave amplitude={18} frequency={5} className="w-full h-16 text-foreground/70 mt-2" />
            </div>
            <p className="text-xs text-foreground/70 mt-6 text-center">
              {t("α 波出现频率提升 2.3 倍，持续时间提升 3.0 倍", "α wave frequency increased 2.3×, duration increased 3.0×")}
            </p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-6">
          {t("检测点位：O1、O2（枕区），代表情绪放松状态", "Detection points: O1, O2 (occipital), representing relaxed state")}
        </p>
      </section>

      {/* ── Module D: 实验条件 + 免责 ── */}
      <section className="bg-secondary/30 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-block border border-border px-8 py-6 mb-8">
            <p className="text-2xl font-light text-foreground mb-2">50°C</p>
            <p className="text-xs tracking-widest text-muted-foreground uppercase">
              {t("实验观察中效果最佳的加热温度", "Optimal heating temperature observed in experiments")}
            </p>
          </div>
          <p className="text-xs text-muted-foreground mb-2">
            {t(
              "石墨烯膜效果明显优于铜、水以及单层石墨烯等对照材料",
              "Graphene film significantly outperformed copper, water, and monolayer graphene controls"
            )}
          </p>
          <div className="mt-8 border border-border/60 p-4 bg-background">
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              ⚠️ {t(
                "重要声明：以上数据来源于实验室研究观察，不构成任何医疗建议或疗效承诺。本产品为寝具，非医疗器械。个体体验因人而异，请以自身实际感受为准。",
                "Disclaimer: The data above is derived from laboratory research observations and does not constitute medical advice or efficacy claims. This product is bedding, not a medical device. Individual experiences vary."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* ── Module E: 产品落地 ── */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-4 text-center">
          {t("从实验到枕边", "From Lab to Pillow")}
        </p>
        <h2 className="text-3xl font-light text-foreground text-center mb-16">
          {t("石墨烯枕头：你的睡前放松体验", "Graphene Pillow: Your Pre-Sleep Relaxation")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: "◎", zh: "人体工学支撑", en: "Ergonomic Support", descZh: "贴合颈椎曲线，舒适托持", descEn: "Contoured to support natural cervical alignment" },
            { icon: "○", zh: "石墨烯亲肤面料", en: "Graphene Fabric", descZh: "柔软透气，抗菌率 ≥99%", descEn: "Soft, breathable, ≥99% antibacterial" },
            { icon: "◇", zh: "安静无噪音", en: "Silent Comfort", descZh: "零声响材质，不干扰入睡", descEn: "Zero-noise material, undisturbed sleep" },
            { icon: "△", zh: "远红外温感", en: "Far-IR Warmth", descZh: "石墨烯纤维自然温热体验", descEn: "Natural gentle warmth from graphene fibers" },
          ].map(item => (
            <div key={item.en} className="border border-border p-6 text-center">
              <span className="text-2xl text-foreground mb-4 block">{item.icon}</span>
              <h3 className="text-sm tracking-wide text-foreground mb-2">{t(item.zh, item.en)}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{t(item.descZh, item.descEn)}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/pillows"
            className="inline-block border border-foreground px-10 py-3 text-xs tracking-[0.3em] uppercase text-foreground hover:bg-foreground hover:text-primary-foreground transition-all"
          >
            {t("浏览枕头系列", "Browse Pillow Collection")}
          </Link>
        </div>
      </section>

      {/* ── Module F: 参考与团队 ── */}
      <section className="border-t border-border py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-8">
            {t("研究参考", "Research Reference")}
          </p>
          <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
            <p>
              {t(
                "浙江大学林时胜课题组联合格蓝丰等团队的研究成果发表于 Small Science（2022年11月），报道了石墨烯中远红外波促进人体脑电波的新方法。",
                "Research by Prof. Lin Shisheng's team at Zhejiang University, in collaboration with GRAPHENE and partners, published in Small Science (Nov 2022), reported a novel method of promoting human brainwaves via graphene mid-far infrared radiation."
              )}
            </p>
            <p>{t("受到 Wiley 官方平台 MaterialsViews 专文报道", "Featured by Wiley's official MaterialsViews platform")}</p>
            <p className="text-muted-foreground/60">
              {t("另引：J. Phys. Chem. C 2021, 125, 14180-14187", "Also ref: J. Phys. Chem. C 2021, 125, 14180-14187")}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BrainwaveSleep;
