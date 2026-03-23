import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct, uploadProductImage } from "@/hooks/useProducts";
import type { Product, ProductColor } from "@/types/product";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Upload, X, LogOut, FileText, Image, Package } from "lucide-react";
import { toast } from "sonner";

const emptyForm = {
  name_zh: "", name_en: "", type: "ergonomic" as "ergonomic" | "square", type_zh: "石墨烯脑电波枕", type_en: "Graphene Brainwave Pillow",
  colors: [] as ProductColor[], size: "", desc_zh: "", desc_en: "", image_url: null as string | null, sort_order: 0,
};

const Admin = () => {
  const { isAdmin, signOut } = useAdminAuth();
  const navigate = useNavigate();
  const { data: products = [], isLoading, error: productsError } = useProducts();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [activeTab, setActiveTab] = useState("products");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [colorName, setColorName] = useState("");
  const [colorHex, setColorHex] = useState("#000000");

  // 检查登录状态，只在首次渲染时检查
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("admin_logged_in") === "true";
    if (!isLoggedIn) {
      navigate("/admin/login");
    }
  }, [navigate]);

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
      toast.success("图片上传成功");
    } catch {
      toast.error("上传失败");
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
      toast.error("请填写必要信息");
      return;
    }
    try {
      if (editingId) {
        await updateProduct.mutateAsync({ id: editingId, ...form });
        toast.success("产品已更新");
      } else {
        await createProduct.mutateAsync(form);
        toast.success("产品已添加");
      }
      setDialogOpen(false);
    } catch {
      toast.error("操作失败");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("确定删除？")) return;
    try {
      await deleteProduct.mutateAsync(id);
      toast.success("已删除");
    } catch {
      toast.error("删除失败");
    }
  };

  const handleTypeChange = (val: string) => {
    const isErgo = val === "ergonomic";
    setForm((f) => ({
      ...f,
      type: val as "ergonomic" | "square",
      type_zh: isErgo ? "石墨烯脑电波枕" : "方型枕",
      type_en: isErgo ? "Graphene Brainwave Pillow" : "Square Pillow",
    }));
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success("已退出登录");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Admin Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-light tracking-wide">格蓝丰 · 后台管理</h1>
              <p className="text-xs text-muted-foreground">GRAPHENE Admin Panel</p>
            </div>
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex items-center gap-2">
                <Link to="/admin">
                  <Button variant={activeTab === "products" ? "default" : "ghost"} size="sm" className="gap-2">
                    <Package size={16} /> 产品
                  </Button>
                </Link>
                <Link to="/admin/content">
                  <Button variant={activeTab === "content" ? "default" : "ghost"} size="sm" className="gap-2">
                    <FileText size={16} /> 文案
                  </Button>
                </Link>
                <Link to="/admin/images">
                  <Button variant={activeTab === "images" ? "default" : "ghost"} size="sm" className="gap-2">
                    <Image size={16} /> 图片
                  </Button>
                </Link>
              </nav>
              <Button variant="outline" size="sm" onClick={handleSignOut} className="gap-2">
                <LogOut size={16} /> 退出
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-grid md:grid-cols-3">
            <TabsTrigger value="products">产品管理</TabsTrigger>
            <TabsTrigger value="content">文案管理</TabsTrigger>
            <TabsTrigger value="images">图片管理</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-light">产品列表</CardTitle>
                <CardDescription>管理网站上的所有产品</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-sm text-muted-foreground">
                    共 {products?.length || 0} 个产品
                  </p>
                  <Button onClick={openCreate} variant="outline" className="gap-2 text-xs tracking-widest uppercase">
                    <Plus size={14} /> 添加产品
                  </Button>
                </div>

                {productsError ? (
                  <div className="text-center py-12">
                    <p className="text-destructive mb-4">加载产品失败</p>
                    <p className="text-xs text-muted-foreground">请检查 Supabase 配置</p>
                  </div>
                ) : isLoading ? (
                  <p className="text-center text-muted-foreground py-20">加载中…</p>
                ) : (
                  <div className="space-y-4">
                    {products && products.length > 0 ? (
                      products.map((p) => (
                        <div key={p.id} className="flex items-center gap-4 p-4 border border-border hover:bg-secondary/30 transition-colors">
                          <div className="w-16 h-16 bg-secondary/50 overflow-hidden flex-shrink-0">
                            {p.image_url ? (
                              <img src={p.image_url} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                                无图
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-foreground truncate">{p.name_zh}</p>
                            <p className="text-xs text-muted-foreground">{p.type_zh} · {p.size}</p>
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
                      ))
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <p>暂无产品</p>
                        <Button onClick={openCreate} variant="outline" size="sm" className="mt-4">
                          添加第一个产品
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-light">文案管理</CardTitle>
                <CardDescription>管理网站各区域的文案内容</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">此处可管理首页 Hero、品牌理念等区域的文案。</p>
                <div className="p-4 bg-muted/50 rounded text-sm">
                  <p>功能开发中...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="images" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-light">图片管理</CardTitle>
                <CardDescription>管理网站图片和画廊图片</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">此处可上传和管理 Hero 图片、画廊图片等。</p>
                <div className="p-4 bg-muted/50 rounded text-sm">
                  <p>功能开发中...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Product Form Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-light tracking-wide">
              {editingId ? "编辑产品" : "添加产品"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-xs tracking-widest uppercase text-muted-foreground mb-2 block">产品图片</label>
              {form.image_url ? (
                <div className="relative w-full aspect-video bg-secondary/30 overflow-hidden mb-2">
                  <img src={form.image_url} alt="" className="w-full h-full object-cover" />
                  <button onClick={() => setForm((f) => ({ ...f, image_url: null }))} className="absolute top-2 right-2 p-1 bg-background/80 hover:bg-background transition-colors">
                    <X size={14} />
                  </button>
                </div>
              ) : null}
              <label className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors border border-dashed border-border p-4 justify-center">
                <Upload size={14} />
                {uploading ? "上传中…" : "上传图片"}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
              </label>
            </div>
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
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs tracking-widest uppercase text-muted-foreground mb-1 block">类型</label>
                <Select value={form.type} onValueChange={handleTypeChange}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ergonomic">石墨烯脑电波枕</SelectItem>
                    <SelectItem value="square">方型枕</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase text-muted-foreground mb-1 block">尺寸</label>
                <Input value={form.size} onChange={(e) => setForm((f) => ({ ...f, size: e.target.value }))} placeholder="60 × 40 × 10 cm" />
              </div>
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase text-muted-foreground mb-1 block">排序</label>
              <Input type="number" value={form.sort_order} onChange={(e) => setForm((f) => ({ ...f, sort_order: parseInt(e.target.value) || 0 }))} />
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase text-muted-foreground mb-1 block">中文描述</label>
              <Textarea value={form.desc_zh} onChange={(e) => setForm((f) => ({ ...f, desc_zh: e.target.value }))} rows={2} />
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase text-muted-foreground mb-1 block">English Description</label>
              <Textarea value={form.desc_en} onChange={(e) => setForm((f) => ({ ...f, desc_en: e.target.value }))} rows={2} />
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase text-muted-foreground mb-2 block">可选颜色</label>
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
                <Input value={colorName} onChange={(e) => setColorName(e.target.value)} placeholder="颜色名称" className="flex-1" />
                <input type="color" value={colorHex} onChange={(e) => setColorHex(e.target.value)} className="w-10 h-10 border border-border cursor-pointer" />
                <Button type="button" variant="outline" size="sm" onClick={addColor}><Plus size={14} /></Button>
              </div>
            </div>
            <Button onClick={handleSubmit} disabled={createProduct.isPending || updateProduct.isPending} className="w-full text-xs tracking-widest uppercase">
              {editingId ? "保存修改" : "添加产品"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
