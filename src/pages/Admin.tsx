import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct, uploadProductImage } from "@/hooks/useProducts";
import type { Product, ProductColor } from "@/types/product";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Pencil, Trash2, Upload, X } from "lucide-react";
import { toast } from "sonner";

const emptyForm = {
  name_zh: "", name_en: "", type: "ergonomic" as "ergonomic" | "square", type_zh: "人体工学枕", type_en: "Ergonomic Pillow",
  colors: [] as ProductColor[], size: "", desc_zh: "", desc_en: "", image_url: null as string | null, sort_order: 0,
};

const Admin = () => {
  const { t } = useLanguage();
  const { data: products = [], isLoading } = useProducts();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [colorName, setColorName] = useState("");
  const [colorHex, setColorHex] = useState("#000000");

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditingId(p.id);
    setForm({
      name_zh: p.name_zh, name_en: p.name_en, type: p.type, type_zh: p.type_zh, type_en: p.type_en,
      colors: p.colors, size: p.size, desc_zh: p.desc_zh, desc_en: p.desc_en, image_url: p.image_url, sort_order: p.sort_order,
    });
    setDialogOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadProductImage(file);
      setForm((f) => ({ ...f, image_url: url }));
      toast.success(t("图片上传成功", "Image uploaded"));
    } catch {
      toast.error(t("上传失败", "Upload failed"));
    } finally {
      setUploading(false);
    }
  };

  const addColor = () => {
    if (!colorName.trim()) return;
    setForm((f) => ({ ...f, colors: [...f.colors, { name: colorName.trim(), hex: colorHex }] }));
    setColorName("");
    setColorHex("#000000");
  };

  const removeColor = (i: number) => {
    setForm((f) => ({ ...f, colors: f.colors.filter((_, idx) => idx !== i) }));
  };

  const handleSubmit = async () => {
    if (!form.name_zh || !form.name_en || !form.size) {
      toast.error(t("请填写必要信息", "Please fill required fields"));
      return;
    }
    try {
      if (editingId) {
        await updateProduct.mutateAsync({ id: editingId, ...form });
        toast.success(t("产品已更新", "Product updated"));
      } else {
        await createProduct.mutateAsync(form);
        toast.success(t("产品已添加", "Product created"));
      }
      setDialogOpen(false);
    } catch {
      toast.error(t("操作失败", "Operation failed"));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t("确定删除？", "Delete this product?"))) return;
    try {
      await deleteProduct.mutateAsync(id);
      toast.success(t("已删除", "Deleted"));
    } catch {
      toast.error(t("删除失败", "Delete failed"));
    }
  };

  const handleTypeChange = (val: string) => {
    const isErgo = val === "ergonomic";
    setForm((f) => ({
      ...f,
      type: val as "ergonomic" | "square",
      type_zh: isErgo ? "人体工学枕" : "方型枕",
      type_en: isErgo ? "Ergonomic Pillow" : "Square Pillow",
    }));
  };

  return (
    <Layout>
      <section className="py-20 md:py-28 text-center border-b border-border">
        <p className="text-xs tracking-[0.5em] uppercase text-muted-foreground mb-4">Admin</p>
        <h1 className="text-3xl md:text-5xl font-light text-foreground tracking-wide">
          {t("产品管理", "Product Management")}
        </h1>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <p className="text-sm text-muted-foreground">
            {products.length} {t("个产品", " products")}
          </p>
          <Button onClick={openCreate} variant="outline" className="gap-2 text-xs tracking-widest uppercase">
            <Plus size={14} /> {t("添加产品", "Add Product")}
          </Button>
        </div>

        {isLoading ? (
          <p className="text-center text-muted-foreground py-20">{t("加载中…", "Loading…")}</p>
        ) : (
          <div className="space-y-4">
            {products.map((p) => (
              <div key={p.id} className="flex items-center gap-4 p-4 border border-border hover:bg-secondary/30 transition-colors">
                <div className="w-16 h-16 bg-secondary/50 overflow-hidden flex-shrink-0">
                  {p.image_url ? (
                    <img src={p.image_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                      {t("无图", "No img")}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground truncate">{t(p.name_zh, p.name_en)}</p>
                  <p className="text-xs text-muted-foreground">{t(p.type_zh, p.type_en)} · {p.size}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => openEdit(p)} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Form Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-light tracking-wide">
              {editingId ? t("编辑产品", "Edit Product") : t("添加产品", "Add Product")}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {/* Image */}
            <div>
              <label className="text-xs tracking-widest uppercase text-muted-foreground mb-2 block">
                {t("产品图片", "Product Image")}
              </label>
              {form.image_url ? (
                <div className="relative w-full aspect-video bg-secondary/30 overflow-hidden mb-2">
                  <img src={form.image_url} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={() => setForm((f) => ({ ...f, image_url: null }))}
                    className="absolute top-2 right-2 p-1 bg-background/80 hover:bg-background transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : null}
              <label className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors border border-dashed border-border p-4 justify-center">
                <Upload size={14} />
                {uploading ? t("上传中…", "Uploading…") : t("上传图片", "Upload Image")}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
              </label>
            </div>

            {/* Names */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs tracking-widest uppercase text-muted-foreground mb-1 block">中文名称</label>
                <Input value={form.name_zh} onChange={(e) => setForm((f) => ({ ...f, name_zh: e.target.value }))} />
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase text-muted-foreground mb-1 block">English Name</label>
                <Input value={form.name_en} onChange={(e) => setForm((f) => ({ ...f, name_en: e.target.value }))} />
              </div>
            </div>

            {/* Type & Size */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs tracking-widest uppercase text-muted-foreground mb-1 block">{t("类型", "Type")}</label>
                <Select value={form.type} onValueChange={handleTypeChange}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ergonomic">{t("人体工学枕", "Ergonomic")}</SelectItem>
                    <SelectItem value="square">{t("方型枕", "Square")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase text-muted-foreground mb-1 block">{t("尺寸", "Size")}</label>
                <Input value={form.size} onChange={(e) => setForm((f) => ({ ...f, size: e.target.value }))} placeholder="60 × 40 × 10 cm" />
              </div>
            </div>

            {/* Sort order */}
            <div>
              <label className="text-xs tracking-widest uppercase text-muted-foreground mb-1 block">{t("排序", "Sort Order")}</label>
              <Input type="number" value={form.sort_order} onChange={(e) => setForm((f) => ({ ...f, sort_order: parseInt(e.target.value) || 0 }))} />
            </div>

            {/* Descriptions */}
            <div>
              <label className="text-xs tracking-widest uppercase text-muted-foreground mb-1 block">中文描述</label>
              <Textarea value={form.desc_zh} onChange={(e) => setForm((f) => ({ ...f, desc_zh: e.target.value }))} rows={2} />
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase text-muted-foreground mb-1 block">English Description</label>
              <Textarea value={form.desc_en} onChange={(e) => setForm((f) => ({ ...f, desc_en: e.target.value }))} rows={2} />
            </div>

            {/* Colors */}
            <div>
              <label className="text-xs tracking-widest uppercase text-muted-foreground mb-2 block">{t("可选颜色", "Colors")}</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {form.colors.map((c, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-xs border border-border px-2 py-1">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.hex }} />
                    {c.name}
                    <button onClick={() => removeColor(i)} className="text-muted-foreground hover:text-foreground"><X size={10} /></button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Input value={colorName} onChange={(e) => setColorName(e.target.value)} placeholder={t("颜色名称", "Color name")} className="flex-1" />
                <input type="color" value={colorHex} onChange={(e) => setColorHex(e.target.value)} className="w-10 h-10 border border-border cursor-pointer" />
                <Button type="button" variant="outline" size="sm" onClick={addColor}><Plus size={14} /></Button>
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={createProduct.isPending || updateProduct.isPending}
              className="w-full text-xs tracking-widest uppercase"
            >
              {editingId ? t("保存修改", "Save Changes") : t("添加产品", "Add Product")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Admin;
