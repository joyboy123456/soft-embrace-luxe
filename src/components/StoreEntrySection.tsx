import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

import storeYouzan from "@/assets/store-youzan.jpg";

export default function StoreEntrySection() {
  const { t } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex items-end justify-between gap-6 mb-10">
        <div>
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-4">
            {t("购买渠道", "Where to Buy")}
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-foreground leading-tight">
            {t("官方商城", "Official Store")}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-2xl leading-relaxed">
            {t(
              "点击进入店铺列表页，随后可在新标签页打开官方购买链接。",
              "Go to the store page, then open the official purchase link in a new tab.",
            )}
          </p>
        </div>

        <Link
          to="/stores"
          className="hidden md:inline-flex text-xs tracking-[0.3em] uppercase text-foreground border-b border-foreground/60 pb-1 hover:pb-2 transition-all"
        >
          {t("查看店铺", "View Store")} →
        </Link>
      </div>

      <Link to="/stores" className="group block" aria-label={t("前往店铺列表", "Go to store list")}>
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
              <span className="font-light tracking-wide">{t("官方商城", "Official Store")}</span>
              <ExternalLink className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
            </CardTitle>
            <CardDescription>
              {t("一键进入官方购买页，支持安全支付与订单查询。", "Secure checkout with order tracking.")}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-foreground border-b border-foreground/60 pb-1 group-hover:pb-2 transition-all">
              {t("进入店铺", "Enter Store")}
              <span aria-hidden>→</span>
            </div>
          </CardContent>
        </Card>
      </Link>

      <div className="mt-6 md:hidden">
        <Link
          to="/stores"
          className="inline-flex text-xs tracking-[0.3em] uppercase text-foreground border-b border-foreground/60 pb-1 hover:pb-2 transition-all"
        >
          {t("查看店铺", "View Store")} →
        </Link>
      </div>
    </section>
  );
}
