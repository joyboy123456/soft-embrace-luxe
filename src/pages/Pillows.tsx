import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";

import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const BUY_URL =
  "https://tuicashier.youzan.com/pay/wscgoods_order?banner_id=f.90403027~goods.5~5~wB9npDsT&alg_id=0&slg=tagGoodList-default%2COpBottom%2Cuuid%2CabTraceId&components_style_layout=1&reft=1771733737125&spm=f.90403027&alias=1ye7fs589pfyqss";

const images = [gallery5, gallery1, gallery6, gallery2, gallery3, gallery4];

export default function Pillows() {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Hero */}
      <header className="max-w-7xl mx-auto px-6 pt-20 md:pt-24 pb-12 border-b border-border">
        <p className="text-xs tracking-[0.5em] uppercase text-muted-foreground mb-4">Gallery</p>
        <h1 className="text-3xl md:text-5xl font-light text-foreground tracking-wide">
          {t("石墨烯脑电波助眠枕", "Graphene Brainwave Sleep Pillow")}
        </h1>
        <p className="mt-4 text-sm text-muted-foreground max-w-2xl leading-relaxed">
          {t(
            "用实拍记录枕头的触感、支撑与使用场景，石墨烯脑电波科技助你入眠。",
            "Real-life photos showing texture, support, and everyday comfort with graphene brainwave sleep technology.",
          )}
        </p>
      </header>

      {/* Masonry-ish grid */}
      <main className="max-w-7xl mx-auto px-6 py-14">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {images.map((src, idx) => (
            <figure
              key={idx}
              className="group mb-6 break-inside-avoid overflow-hidden bg-secondary/30"
            >
              <img
                src={src}
                alt={t("石墨烯脑电波助眠枕实拍", "Graphene Brainwave Pillow Photo") + ` ${idx + 1}`}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </figure>
          ))}
        </div>

        {/* Buy CTA */}
        <section className="mt-16 pt-12 border-t border-border text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-4">
            {t("官方购买", "Official Purchase")}
          </p>
          <h2 className="text-2xl md:text-3xl font-light text-foreground mb-6">
            {t("现在下单，开启一夜好眠", "Order now, sleep better tonight")}
          </h2>
          <a
            href={BUY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border border-border px-10 py-3 text-xs tracking-[0.3em] uppercase hover:bg-foreground hover:text-background transition-colors"
          >
            {t("立即购买", "Buy Now")}
          </a>
          <p className="mt-4 text-xs text-muted-foreground">
            {t("将在新标签页打开官方支付页面", "Opens the official checkout in a new tab")}
          </p>
        </section>
      </main>
    </Layout>
  );
}
