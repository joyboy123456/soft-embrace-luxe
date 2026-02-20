export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name_zh: string;
  name_en: string;
  type: "ergonomic" | "square";
  type_zh: string;
  type_en: string;
  colors: ProductColor[];
  size: string;
  desc_zh: string;
  desc_en: string;
  image_url: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}
