export interface Product {
  id: string;
  nameZh: string;
  nameEn: string;
  type: "ergonomic" | "square";
  typeZh: string;
  typeEn: string;
  colors: { name: string; hex: string }[];
  size: string;
  descZh: string;
  descEn: string;
  image: string;
}

export const products: Product[] = [
  {
    id: "ergo-blue",
    nameZh: "石墨烯人体工学枕 · 宝蓝款",
    nameEn: "Graphene Ergonomic Pillow · Royal Blue",
    type: "ergonomic",
    typeZh: "人体工学枕",
    typeEn: "Ergonomic Pillow",
    colors: [
      { name: "Royal Blue", hex: "#1a3a5c" },
      { name: "Blush Pink", hex: "#d4a0a0" },
      { name: "Silver Grey", hex: "#9e9e9e" },
    ],
    size: "60 × 40 × 10/8 cm",
    descZh: "采用石墨烯纤维面料，人体工学曲线设计，有效承托颈椎，释放压力，带来深度睡眠体验。",
    descEn: "Featuring graphene fiber fabric with ergonomic curve design, effectively supporting the cervical spine and relieving pressure for a deep sleep experience.",
    image: "pillow-ergonomic",
  },
  {
    id: "ergo-pink",
    nameZh: "石墨烯人体工学枕 · 樱粉款",
    nameEn: "Graphene Ergonomic Pillow · Blush Pink",
    type: "ergonomic",
    typeZh: "人体工学枕",
    typeEn: "Ergonomic Pillow",
    colors: [
      { name: "Blush Pink", hex: "#d4a0a0" },
      { name: "Royal Blue", hex: "#1a3a5c" },
      { name: "Silver Grey", hex: "#9e9e9e" },
    ],
    size: "60 × 40 × 10/8 cm",
    descZh: "柔美樱粉色调，石墨烯远红外功能，促进血液循环，抗菌防螨，呵护您的每一晚。",
    descEn: "Soft blush pink tone with graphene far-infrared function, promoting blood circulation, antibacterial and anti-mite for your every night.",
    image: "pillow-ergonomic",
  },
  {
    id: "ergo-grey",
    nameZh: "石墨烯人体工学枕 · 银灰款",
    nameEn: "Graphene Ergonomic Pillow · Silver Grey",
    type: "ergonomic",
    typeZh: "人体工学枕",
    typeEn: "Ergonomic Pillow",
    colors: [
      { name: "Silver Grey", hex: "#9e9e9e" },
      { name: "Royal Blue", hex: "#1a3a5c" },
      { name: "Blush Pink", hex: "#d4a0a0" },
    ],
    size: "60 × 40 × 10/8 cm",
    descZh: "经典银灰配色，低调优雅，石墨烯导热科技让枕面常保清爽舒适。",
    descEn: "Classic silver grey, understated elegance. Graphene thermal conductivity keeps the pillow surface cool and comfortable.",
    image: "pillow-ergonomic",
  },
  {
    id: "square-gold",
    nameZh: "石墨烯方型枕 · 香槟金",
    nameEn: "Graphene Square Pillow · Champagne Gold",
    type: "square",
    typeZh: "方型枕",
    typeEn: "Square Pillow",
    colors: [
      { name: "Champagne Gold", hex: "#c9a96e" },
      { name: "Wine Red", hex: "#8b2252" },
      { name: "Charcoal", hex: "#4a4a4a" },
    ],
    size: "60 × 40 × 12 cm",
    descZh: "经典方型设计，香槟金奢华质感，石墨烯纤维带来远红外理疗效果，改善睡眠质量。",
    descEn: "Classic square design in luxurious champagne gold, with graphene fiber far-infrared therapy to improve sleep quality.",
    image: "pillow-square",
  },
  {
    id: "square-red",
    nameZh: "石墨烯方型枕 · 酒红款",
    nameEn: "Graphene Square Pillow · Wine Red",
    type: "square",
    typeZh: "方型枕",
    typeEn: "Square Pillow",
    colors: [
      { name: "Wine Red", hex: "#8b2252" },
      { name: "Champagne Gold", hex: "#c9a96e" },
      { name: "Charcoal", hex: "#4a4a4a" },
    ],
    size: "60 × 40 × 12 cm",
    descZh: "浓郁酒红色调，优雅大气，石墨烯材质抗菌率高达99%，守护家人健康。",
    descEn: "Rich wine red tone, elegant and grand. Graphene material with up to 99% antibacterial rate to protect your family's health.",
    image: "pillow-square",
  },
  {
    id: "square-charcoal",
    nameZh: "石墨烯方型枕 · 深炭灰",
    nameEn: "Graphene Square Pillow · Charcoal",
    type: "square",
    typeZh: "方型枕",
    typeEn: "Square Pillow",
    colors: [
      { name: "Charcoal", hex: "#4a4a4a" },
      { name: "Champagne Gold", hex: "#c9a96e" },
      { name: "Wine Red", hex: "#8b2252" },
    ],
    size: "60 × 40 × 12 cm",
    descZh: "沉稳深炭灰，百搭不挑风格，石墨烯远红外技术助您安然入睡。",
    descEn: "Calm charcoal grey, versatile for any style. Graphene far-infrared technology helps you fall asleep peacefully.",
    image: "pillow-square",
  },
];
