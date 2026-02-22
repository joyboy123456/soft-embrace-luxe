import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

import storeYouzan from "@/assets/store-youzan.jpg";

const STORE = {
  url: "https://tuicashier.youzan.com/pay/wscgoods_order?banner_id=f.90403027~goods.5~5~wB9npDsT&alg_id=0&slg=tagGoodList-default%2COpBottom%2Cuuid%2CabTraceId&components_style_layout=1&reft=1771733737125&spm=f.90403027&alias=1ye7fs589pfyqss",
  nameZh: "官方商城",
  nameEn: "Official Store",
  descZh: "一键进入官方购买页，支持安全支付与订单查询。",
  descEn: "Enter the official checkout page with secure payment and order tracking.",
} as const;

export default function Stores() {
  const { t } = useLanguage();

  return (
    <Layout>
      <header className="max-w-7xl mx-auto px-6 pt-16 md:pt-20 pb-10">
        <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-4">
          {t("购买渠道", "Where to Buy")}
        </p>
        <h1 className="text-3xl md:text-5xl font-light text-foreground tracking-wide">
          {t("店铺列表", "Store List")}
        </h1>
        <p className="mt-4 text-sm text-muted-foreground max-w-2xl leading-relaxed">
          {t(
            "点击下方店铺卡片将在新标签页打开购买页面。",
            "Click the store card below to open the purchase page in a new tab.",
          )}
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-24">
        <a
          href={STORE.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
          aria-label={t("打开官方商城（新标签页）", "Open official store (new tab)")}
        >
          <Card className="overflow-hidden transition-shadow hover:shadow-md">
            <div className="relative aspect-[16/9] overflow-hidden bg-muted">
              <img
                src={storeYouzan}
                alt={t("官方商城入口图", "Official store cover")}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/15 transition-colors" />
            </div>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between gap-4">
                <span className="font-light tracking-wide">{t(STORE.nameZh, STORE.nameEn)}</span>
                <ExternalLink className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
              </CardTitle>
              <CardDescription>{t(STORE.descZh, STORE.descEn)}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-foreground border-b border-foreground/60 pb-1 group-hover:pb-2 transition-all">
                {t("前往购买", "Go to Store")}
                <span aria-hidden>→</span>
              </div>
            </CardContent>
          </Card>
        </a>
      </main>
    </Layout>
  );
}
