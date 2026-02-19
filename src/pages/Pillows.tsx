import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/layout/Layout";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { products, type Product } from "@/data/products";
import productErgoSide from "@/assets/product-ergo-side.jpg";
import productErgoFlat from "@/assets/product-ergo-flat.jpg";
import productErgoStack from "@/assets/product-ergo-stack.jpg";
import productErgoTilt from "@/assets/product-ergo-tilt.jpg";
import productErgoPair from "@/assets/product-ergo-pair.jpg";
import lifestyleCloseup from "@/assets/lifestyle-closeup.jpg";

const productImages: Record<string, string> = {
  "ergo-blue": productErgoSide,
  "ergo-pink": productErgoFlat,
  "ergo-grey": productErgoStack,
  "square-gold": productErgoTilt,
  "square-red": productErgoPair,
  "square-charcoal": lifestyleCloseup,
};

type Filter = "all" | "ergonomic" | "square";

const Pillows = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered = filter === "all" ? products : products.filter((p) => p.type === filter);

  const filters: { key: Filter; zh: string; en: string }[] = [
    { key: "all", zh: "全部", en: "All" },
    { key: "ergonomic", zh: "人体工学枕", en: "Ergonomic" },
    { key: "square", zh: "方型枕", en: "Square" },
  ];

  return (
    <Layout>
      {/* Banner */}
      <section className="py-20 md:py-28 text-center border-b border-border">
        <p className="text-xs tracking-[0.5em] uppercase text-muted-foreground mb-4">
          Pillow Collection
        </p>
        <h1 className="text-3xl md:text-5xl font-light text-foreground tracking-wide">
          {t("枕头系列", "Pillow Collection")}
        </h1>
      </section>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex justify-center gap-6">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`text-xs tracking-[0.2em] uppercase pb-1 transition-colors ${
              filter === f.key
                ? "text-foreground border-b border-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t(f.zh, f.en)}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer"
              onClick={() => setSelected(product)}
            >
              <div className="aspect-square bg-secondary/30 overflow-hidden mb-4">
                <img
                  src={productImages[product.id]}
                  alt={t(product.nameZh, product.nameEn)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-sm text-foreground tracking-wide mb-2">
                {t(product.nameZh, product.nameEn)}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                {product.colors.map((c) => (
                  <span
                    key={c.hex}
                    className="w-3 h-3 rounded-full border border-border"
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">{product.size}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Product Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-2xl">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg font-light tracking-wide">
                  {t(selected.nameZh, selected.nameEn)}
                </DialogTitle>
                <DialogDescription className="text-xs tracking-widest uppercase text-muted-foreground">
                  {t(selected.typeZh, selected.typeEn)}
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="aspect-square bg-secondary/30 overflow-hidden">
                  <img
                    src={productImages[selected.id]}
                    alt={t(selected.nameZh, selected.nameEn)}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {t(selected.descZh, selected.descEn)}
                  </p>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">
                        {t("尺寸", "Size")}
                      </p>
                      <p className="text-sm text-foreground">{selected.size}</p>
                    </div>
                    <div>
                      <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">
                        {t("可选颜色", "Available Colors")}
                      </p>
                      <div className="flex gap-3">
                        {selected.colors.map((c) => (
                          <div key={c.hex} className="flex items-center gap-2">
                            <span
                              className="w-4 h-4 rounded-full border border-border"
                              style={{ backgroundColor: c.hex }}
                            />
                            <span className="text-xs text-muted-foreground">{c.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">
                        {t("材质特点", "Material Features")}
                      </p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>· {t("石墨烯纤维面料", "Graphene fiber fabric")}</li>
                        <li>· {t("远红外理疗功能", "Far-infrared therapy")}</li>
                        <li>· {t("抗菌率 ≥99%", "Antibacterial rate ≥99%")}</li>
                        <li>· {t("高效导热散热", "Efficient thermal conductivity")}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Pillows;
