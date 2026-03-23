import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SiteContent {
  id: string;
  key: string;
  value_zh: string;
  value_en: string;
  type: string;
  group_name: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface SiteImage {
  id: string;
  name: string;
  url: string;
  category: string;
  alt_zh: string | null;
  alt_en: string | null;
  sort_order: number;
  created_at: string;
}

// ============ Site Contents ============

export const useSiteContents = (groupName?: string) => {
  return useQuery({
    queryKey: ["siteContents", groupName],
    queryFn: async () => {
      let query = supabase
        .from("site_contents")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });

      if (groupName) {
        query = query.eq("group_name", groupName);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as SiteContent[];
    },
  });
};

export const useUpdateSiteContent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, value_zh, value_en }: { id: string; value_zh: string; value_en: string }) => {
      const { data, error } = await supabase
        .from("site_contents")
        .update({ value_zh, value_en, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as SiteContent;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["siteContents"] });
    },
  });
};

export const useCreateSiteContent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (content: Omit<SiteContent, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("site_contents")
        .insert(content)
        .select()
        .single();
      if (error) throw error;
      return data as SiteContent;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["siteContents"] });
    },
  });
};

export const useDeleteSiteContent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("site_contents")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["siteContents"] });
    },
  });
};

// ============ Site Images ============

export const useSiteImages = (category?: string) => {
  return useQuery({
    queryKey: ["siteImages", category],
    queryFn: async () => {
      let query = supabase
        .from("site_images")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });

      if (category) {
        query = query.eq("category", category);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as SiteImage[];
    },
  });
};

export const useUploadSiteImage = () => {
  const qc = useQueryClient();

  const uploadImage = async (file: File, bucket: string = "site-images"): Promise<string> => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only JPEG, PNG, WebP and GIF are allowed.');
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error('File too large. Maximum size is 5MB.');
    }

    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
    return data.publicUrl;
  };

  return useMutation({
    mutationFn: async ({ file, name, category, alt_zh, alt_en }: {
      file: File;
      name: string;
      category: string;
      alt_zh?: string;
      alt_en?: string
    }) => {
      const url = await uploadImage(file);

      const { data, error } = await supabase
        .from("site_images")
        .insert({ name, url, category, alt_zh, alt_en })
        .select()
        .single();

      if (error) throw error;
      return data as SiteImage;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["siteImages"] });
    },
  });
};

export const useDeleteSiteImage = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, url }: { id: string; url: string }) => {
      // Extract filename from URL
      const urlParts = url.split("/");
      const fileName = urlParts[urlParts.length - 1];

      // Delete from storage
      await supabase.storage
        .from("site-images")
        .remove([fileName]);

      // Delete from database
      const { error } = await supabase
        .from("site_images")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["siteImages"] });
    },
  });
};
