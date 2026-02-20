import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Product, ProductColor } from "@/types/product";

const parseProduct = (row: any): Product => ({
  ...row,
  type: row.type as "ergonomic" | "square",
  colors: (typeof row.colors === "string" ? JSON.parse(row.colors) : row.colors) as ProductColor[],
});

export const useProducts = (type?: "ergonomic" | "square") => {
  return useQuery({
    queryKey: ["products", type],
    queryFn: async () => {
      let query = supabase
        .from("products" as any)
        .select("*")
        .order("sort_order", { ascending: true });
      if (type) query = query.eq("type", type);
      const { data, error } = await query;
      if (error) throw error;
      return (data as any[]).map(parseProduct);
    },
  });
};

export const useCreateProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (product: Omit<Product, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("products" as any)
        .insert(product as any)
        .select()
        .single();
      if (error) throw error;
      return parseProduct(data);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
};

export const useUpdateProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Product> & { id: string }) => {
      const { data, error } = await supabase
        .from("products" as any)
        .update(updates as any)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return parseProduct(data);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
};

export const useDeleteProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("products" as any)
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
};

export const uploadProductImage = async (file: File): Promise<string> => {
  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage
    .from("product-images")
    .upload(fileName, file, { upsert: true });
  if (error) throw error;
  const { data } = supabase.storage.from("product-images").getPublicUrl(fileName);
  return data.publicUrl;
};
