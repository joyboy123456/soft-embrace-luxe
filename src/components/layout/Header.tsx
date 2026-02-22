import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X } from "lucide-react";

const Header = () => {
  const { lang, setLang, t } = useLanguage();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: "/", label: t("首页", "Home") },
    { to: "/pillows", label: t("视觉展示", "Gallery") },
    { to: "/brainwave", label: t("助眠理念", "Sleep Science") },
    { to: "/about", label: t("关于我们", "About") },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl tracking-[0.3em] font-light text-foreground">
          GRAPHENE
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm tracking-widest uppercase transition-colors hover:text-foreground ${
                isActive(link.to)
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Language Toggle + Mobile Menu */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setLang(lang === "zh" ? "en" : "zh")}
            className="text-xs tracking-widest text-muted-foreground hover:text-foreground transition-colors border border-border px-3 py-1"
          >
            {lang === "zh" ? "EN" : "中"}
          </button>
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-border bg-background px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block text-sm tracking-widest uppercase ${
                isActive(link.to) ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
