import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-lg tracking-[0.3em] font-light text-foreground mb-4">GRAPHENE</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t(
                "格蓝丰 · 十二载专注石墨烯寝具，以科技成就好睡眠。",
                "GRAPHENE · 12 years dedicated to graphene bedding, achieving better sleep through technology."
              )}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-foreground mb-4">
              {t("导航", "Navigation")}
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="/" className="hover:text-foreground transition-colors">{t("首页", "Home")}</a></li>
              <li><a href="/pillows" className="hover:text-foreground transition-colors">{t("枕头系列", "Pillows")}</a></li>
              <li><a href="/about" className="hover:text-foreground transition-colors">{t("关于我们", "About")}</a></li>
            </ul>
          </div>


        </div>

        <div className="mt-16 pt-8 border-t border-border text-center text-xs text-muted-foreground tracking-wider">
          © 2024 GRAPHENE 格蓝丰. {t("保留所有权利", "All rights reserved")}.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
