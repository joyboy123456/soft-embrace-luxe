import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/layout/Layout";
import brandStory from "@/assets/brand-story.jpg";
import packaging from "@/assets/packaging.jpg";

const About = () => {
  const { t } = useLanguage();

  const timeline = [
    { year: "2012", zh: "格蓝丰品牌创立，开启石墨烯寝具研发之路", en: "GRAPHENE brand founded, beginning graphene bedding R&D" },
    { year: "2015", zh: "首款石墨烯枕头面世，获多项国家专利", en: "First graphene pillow launched, multiple national patents obtained" },
    { year: "2018", zh: "产品线扩展至人体工学枕与方型枕两大系列", en: "Product line expanded to Ergonomic and Square pillow series" },
    { year: "2021", zh: "石墨烯纤维技术升级，抗菌率达到 99%", en: "Graphene fiber technology upgraded, antibacterial rate reaches 99%" },
    { year: "2024", zh: "品牌焕新，致力于成为全球石墨烯寝具领导者", en: "Brand refresh, aiming to become a global leader in graphene bedding" },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img src={brandStory} alt="GRAPHENE" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="relative z-10 text-center text-primary-foreground">
          <h1 className="text-4xl md:text-6xl tracking-[0.3em] font-light mb-4">GRAPHENE</h1>
          <p className="text-sm tracking-[0.4em] opacity-70">{t("格蓝丰", "GRAPHENE")}</p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-6">
          {t("品牌故事", "Our Story")}
        </p>
        <h2 className="text-3xl font-light text-foreground mb-8">
          {t("十二载，只为一个好枕头", "Twelve Years, For One Great Pillow")}
        </h2>
        <p className="text-muted-foreground leading-loose">
          {t(
            "格蓝丰创立于2012年，我们始终怀着一个简单的信念：每个人都值得拥有一夜好眠。十二年来，我们专注于石墨烯新材料的研究与应用，将这种被誉为「新材料之王」的物质融入枕头设计，让科技服务于生活，让每一晚都成为对身体最好的馈赠。",
            "Founded in 2012, GRAPHENE has always held a simple belief: everyone deserves a great night's sleep. For twelve years, we have focused on the research and application of graphene — the 'King of New Materials' — integrating it into pillow design so that technology serves life, making every night a gift to your body."
          )}
        </p>
      </section>

      {/* Timeline */}
      <section className="bg-secondary/30 py-24">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-12 text-center">
            {t("品牌历程", "Brand Timeline")}
          </p>
          <div className="space-y-12">
            {timeline.map((item) => (
              <div key={item.year} className="flex gap-8 items-start">
                <span className="text-2xl font-light text-foreground min-w-[80px]">{item.year}</span>
                <div className="border-l border-border pl-8 pb-2">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(item.zh, item.en)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Graphene Technology */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-6">
              {t("石墨烯技术", "Graphene Technology")}
            </p>
            <h2 className="text-3xl font-light text-foreground mb-8">
              {t("新材料之王", "The King of New Materials")}
            </h2>
            <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
              <p>
                {t(
                  "石墨烯是一种由碳原子以六角形排列组成的二维材料，具有优异的导热性、抗菌性和远红外发射功能。",
                  "Graphene is a two-dimensional material composed of carbon atoms arranged in a hexagonal lattice, with exceptional thermal conductivity, antibacterial properties, and far-infrared emission."
                )}
              </p>
              <p>
                {t(
                  "我们将石墨烯纤维融入枕头面料，使其具备持久抗菌（抗菌率≥99%）、高效导热散热、远红外理疗等多重功能，从材料层面重新定义「好枕头」。",
                  "We integrate graphene fibers into pillow fabrics, providing lasting antibacterial protection (≥99%), efficient thermal conductivity, and far-infrared therapy — redefining what a 'great pillow' means at the material level."
                )}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: t("导热系数", "Thermal Conductivity"), value: "5300 W/mK" },
              { label: t("抗菌率", "Antibacterial Rate"), value: "≥ 99%" },
              { label: t("远红外波长", "Far-Infrared"), value: "8–15 μm" },
              { label: t("研发专利", "Patents"), value: "12+" },
            ].map((stat) => (
              <div key={stat.label} className="border border-border p-6 text-center">
                <p className="text-2xl font-light text-foreground mb-2">{stat.value}</p>
                <p className="text-xs tracking-widest text-muted-foreground uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packaging */}
      <section className="bg-secondary/30 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="aspect-square overflow-hidden">
              <img src={packaging} alt={t("品牌包装", "Brand Packaging")} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-6">
                {t("包装设计", "Packaging Design")}
              </p>
              <h2 className="text-3xl font-light text-foreground mb-8">
                {t("精致，始于细节", "Refined, Down to Every Detail")}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(
                  "每一款格蓝丰枕头都配有精心设计的深蓝色礼盒与品牌手提袋，金色点缀彰显品质感。无论是自用还是馈赠亲友，都是一份体面而贴心的选择。",
                  "Every GRAPHENE pillow comes in a carefully designed deep blue gift box with a branded tote bag, accented in gold to convey quality. Whether for personal use or as a gift, it's always a thoughtful and elegant choice."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-6">
          {t("联系我们", "Contact Us")}
        </p>
        <h2 className="text-3xl font-light text-foreground mb-8">
          {t("期待与您的合作", "We Look Forward to Connecting")}
        </h2>
        <div className="text-sm text-muted-foreground space-y-2">
          <p>info@graphene-pillow.com</p>
          <p>{t("广东省 · 中国", "Guangdong Province · China")}</p>
        </div>
      </section>
    </Layout>
  );
};

export default About;
