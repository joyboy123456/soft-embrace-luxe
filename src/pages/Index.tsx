import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/layout/Layout";
import StoreEntrySection from "@/components/StoreEntrySection";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import lifestyleBed from "@/assets/lifestyle-bed.jpg";
import lifestyleChair from "@/assets/lifestyle-chair.jpg";
import productErgoSide from "@/assets/product-ergo-side.jpg";
import productErgoFlat from "@/assets/product-ergo-flat.jpg";
import productErgoStack from "@/assets/product-ergo-stack.jpg";
import productErgoTilt from "@/assets/product-ergo-tilt.jpg";
import detailMesh from "@/assets/detail-mesh.jpg";
import lifestyleFlatlay from "@/assets/lifestyle-flatlay.jpg";
import { products } from "@/data/products";

const carouselImages = [productErgoSide, productErgoFlat, productErgoStack, productErgoTilt];

const Index = () => {
  const { t } = useLanguage();
  const featured = products.slice(0, 4);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img src={lifestyleBed} alt="GRAPHENE" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/30" />
        <div className="relative z-10 text-center text-primary-foreground px-6">
          <p className="text-sm tracking-[0.5em] uppercase mb-4 opacity-80">
            Go, Let You Free
          </p>
          <h1 className="text-5xl md:text-7xl tracking-[0.2em] font-light mb-8">
            GRAPHENE
          </h1>
          <p className="text-sm tracking-[0.3em] mb-10 opacity-70">
            {t("格蓝丰 · 石墨烯寝具", "Graphene Bedding")}
          </p>
          <Link
            to="/pillows"
            className="inline-block border border-primary-foreground/60 px-10 py-3 text-xs tracking-[0.3em] uppercase hover:bg-primary-foreground hover:text-foreground transition-all"
          >
            {t("探索系列", "Explore Collection")}
          </Link>
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-6">
              {t("品牌理念", "Brand Philosophy")}
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-8 leading-tight">
              {t("十二载，专注石墨烯", "Twelve Years, Devoted to Graphene")}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {t(
                "格蓝丰自创立以来，始终致力于将石墨烯新材料应用于寝具领域。我们相信，一个好枕头能改变一整夜的睡眠，进而改变一整天的生活。",
                "Since its founding, GRAPHENE has been dedicated to applying graphene materials to bedding. We believe a great pillow can transform a night's sleep, and in turn, transform your entire day."
              )}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t(
                "石墨烯的远红外、抗菌、导热特性，让每一款枕头都成为科技与舒适的完美结合。",
                "The far-infrared, antibacterial, and thermal properties of graphene make every pillow a perfect fusion of technology and comfort."
              )}
            </p>
          </div>
          <div className="aspect-[4/5] overflow-hidden">
            <img src={lifestyleChair} alt={t("品牌故事", "Brand Story")} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="bg-secondary/50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-4 text-center">
            {t("精选产品", "Featured Products")}
          </p>
          <h2 className="text-3xl font-light text-foreground text-center mb-16">
            {t("为您甄选", "Curated for You")}
          </h2>
          <Carousel opts={{ align: "start", loop: true }} className="mx-12">
            <CarouselContent>
              {featured.map((product, i) => (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                  <Link to="/pillows" className="group block">
                    <div className="aspect-square bg-background overflow-hidden mb-4">
                      <img
                        src={carouselImages[i % carouselImages.length]}
                        alt={t(product.nameZh, product.nameEn)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="text-sm text-foreground tracking-wide">
                      {t(product.nameZh, product.nameEn)}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">{product.size}</p>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Graphene Tech Banner */}
      <section className="relative py-32 overflow-hidden">
        <img src={detailMesh} alt="Graphene mesh detail" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/70" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.5em] uppercase text-primary-foreground/60 mb-6">
            {t("石墨烯科技", "Graphene Technology")}
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-primary-foreground mb-8 leading-tight">
            {t("新材料，新睡眠", "New Material, New Sleep")}
          </h2>
          <div className="grid grid-cols-3 gap-8 mt-12">
            {[
              { zh: "抗菌防螨", en: "Antibacterial", stat: "99%" },
              { zh: "远红外理疗", en: "Far-Infrared", stat: "8-15μm" },
              { zh: "超强导热", en: "Thermal", stat: "5300 W/mK" },
            ].map((item) => (
              <div key={item.en}>
                <p className="text-2xl md:text-3xl font-light text-primary-foreground mb-2">{item.stat}</p>
                <p className="text-xs tracking-widest text-primary-foreground/60 uppercase">{t(item.zh, item.en)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brainwave Sleep CTA */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <Link to="/brainwave" className="group grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-6">
              {t("脑电波助眠理念", "Brainwave Sleep Science")}
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-6 leading-tight">
              {t("把放松看得见：α 波与睡前状态", "See Relaxation: α Waves & Pre-Sleep State")}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {t(
                "浙江大学联合研究发现，石墨烯中远红外加热可有效提升放松相关的 α 波出现频率 2.3 倍。",
                "Joint research with Zhejiang University found that graphene far-infrared heating increases relaxation-related α wave frequency by 2.3×."
              )}
            </p>
            <span className="inline-block text-xs tracking-[0.3em] uppercase text-foreground border-b border-foreground pb-1 group-hover:pb-2 transition-all">
              {t("了解详情", "Learn More")} →
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { label: "θ", amp: 16, freq: 2, opacity: "opacity-40" },
              { label: "α", amp: 24, freq: 4, opacity: "opacity-80" },
              { label: "β", amp: 8, freq: 9, opacity: "opacity-20" },
            ].map(wave => {
              const pts = Array.from({ length: 200 }, (_, i) => {
                const x = (i / 199) * 600;
                const y = 25 + wave.amp * Math.sin((i / 199) * Math.PI * 2 * wave.freq);
                return `${x},${y}`;
              }).join(" ");
              return (
                <div key={wave.label} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-6">{wave.label}</span>
                  <svg viewBox="0 0 600 50" className={`flex-1 h-10 text-foreground ${wave.opacity}`} preserveAspectRatio="none">
                    <polyline points={pts} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="group-hover:animate-pulse" style={{ animationDuration: "2.5s" }} />
                  </svg>
                </div>
              );
            })}
          </div>
        </Link>
      </section>

      {/* Category Cards */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { image: productErgoStack, zh: "人体工学枕", en: "Ergonomic Pillows" },
            { image: lifestyleFlatlay, zh: "方型枕", en: "Square Pillows" },
          ].map((cat) => (
            <Link key={cat.en} to="/pillows" className="group relative aspect-[3/2] overflow-hidden">
              <img src={cat.image} alt={t(cat.zh, cat.en)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/30 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-xl md:text-2xl tracking-[0.2em] text-primary-foreground font-light">
                  {t(cat.zh, cat.en)}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Store Entry */}
      <StoreEntrySection />
    </Layout>
  );
};

export default Index;
