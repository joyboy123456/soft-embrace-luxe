import { useMemo, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/layout/Layout";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useProducts } from "@/hooks/useProducts";
import type { Product } from "@/types/product";

import pillowErgonomic from "@/assets/pillow-ergonomic.jpg";
import pillowSquare from "@/assets/pillow-square.jpg";

type Filter = "all" | "ergonomic" | "square";

const Pillows = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Product | null>(null);
  const { data: products = [], isLoading } = useProducts(filter === "all" ? undefined : filter);

  const filters: { key: Filter; zh: string; en: string }[] = [
    { key: "all", zh: "全部", en: "All" },
    { key: "ergonomic", zh: "人体工学枕", en: "Ergonomic" },
    { key: "square", zh: "方型枕", en: "Square" },
  ];

  const getFallbackImage = (p: Pick<Product, "type">) => (p.type === "square" ? pillowSquare : pillowErgonomic);

  const selectedImage = useMemo(() => {
    if (!selected) return null;
    return selected.image_url || getFallbackImage(selected);
  }, [selected]);

  return (
    <Layout>
      {/* Banner */}
      <section className="py-20 md:py-28 text-center border-b border-border">
        <p className="text-xs tracking-[0.5em] uppercase text-muted-foreground mb-4">Pillow Collection</p>
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
        {isLoading ? (
          <p className="text-center text-muted-foreground py-20">{t("加载中…", "Loading…")}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {products.map((product) => {
              const imageSrc = product.image_url || getFallbackImage(product);
              return (
                <div
                  key={product.id}
                  className="group cursor-pointer"
                  onClick={() => setSelected(product)}
                >
                  <div className="aspect-square bg-secondary/30 overflow-hidden mb-4">
                    <img
                      src={imageSrc}
                      alt={t(product.name_zh, product.name_en)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-sm text-foreground tracking-wide mb-2">{t(product.name_zh, product.name_en)}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    {product.colors.map((c, i) => (
                      <span
                        key={i}
                        className="w-3 h-3 rounded-full border border-border"
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">{product.size}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Product Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-2xl">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg font-light tracking-wide">
                  {t(selected.name_zh, selected.name_en)}
                </DialogTitle>
                <DialogDescription className="text-xs tracking-widest uppercase text-muted-foreground">
                  {t(selected.type_zh, selected.type_en)}
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="aspect-square bg-secondary/30 overflow-hidden">
                  {selectedImage && (
                    <img
                      src={selectedImage}
                      alt={t(selected.name_zh, selected.name_en)}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {t(selected.desc_zh, selected.desc_en)}
                  </p>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">{t("尺寸", "Size")}</p>
                      <p className="text-sm text-foreground">{selected.size}</p>
                    </div>
                    <div>
                      <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">
                        {t("可选颜色", "Available Colors")}
                      </p>
                      <div className="flex gap-3">
                        {selected.colors.map((c, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full border border-border" style={{ backgroundColor: c.hex }} />
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

