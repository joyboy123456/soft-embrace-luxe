import { useState } from "react";
import { useSiteImages, useUploadSiteImage, useDeleteSiteImage } from "@/hooks/useSiteContent";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Upload, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";

const IMAGE_CATEGORIES = [
  { value: "hero", label: "Hero 图片" },
  { value: "gallery", label: "画廊图片" },
  { value: "banner", label: "Banner 图片" },
  { value: "product", label: "产品图片" },
  { value: "other", label: "其他" },
];

export default function ImageManagement() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadForm, setUploadForm] = useState({
    name: "",
    category: "gallery",
    alt_zh: "",
    alt_en: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const { data: allImages = [], isLoading } = useSiteImages();
  const uploadImage = useUploadSiteImage();
  const deleteImage = useDeleteSiteImage();

  const images = selectedCategory === "all"
    ? allImages
    : allImages.filter((img) => img.category === selectedCategory);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (!uploadForm.name) {
        setUploadForm({ ...uploadForm, name: file.name });
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !uploadForm.name) {
      toast.error("请选择图片并填写名称");
      return;
    }

    setUploading(true);
    try {
      await uploadImage.mutateAsync({
        file: selectedFile,
        name: uploadForm.name,
        category: uploadForm.category,
        alt_zh: uploadForm.alt_zh,
        alt_en: uploadForm.alt_en,
      });
      toast.success("图片上传成功");
      setDialogOpen(false);
      setSelectedFile(null);
      setUploadForm({ name: "", category: "gallery", alt_zh: "", alt_en: "" });
    } catch {
      toast.error("上传失败");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, url: string) => {
    if (!confirm("确定删除此图片？")) return;
    try {
      await deleteImage.mutateAsync({ id, url });
      toast.success("图片已删除");
    } catch {
      toast.error("删除失败");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-xl font-light tracking-wide">图片管理</h2>
          <p className="text-sm text-muted-foreground">管理网站图片和画廊图片</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Upload size={16} /> 上传图片
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>上传图片</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-xs uppercase text-muted-foreground mb-1 block">图片名称</label>
                <Input
                  value={uploadForm.name}
                  onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                  placeholder="例如：hero-banner-1"
                />
              </div>
              <div>
                <label className="text-xs uppercase text-muted-foreground mb-1 block">分类</label>
                <Select
                  value={uploadForm.category}
                  onValueChange={(v) => setUploadForm({ ...uploadForm, category: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {IMAGE_CATEGORIES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs uppercase text-muted-foreground mb-1 block">选择图片</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="cursor-pointer"
                />
                {selectedFile && (
                  <p className="text-xs text-muted-foreground mt-1">
                    已选择：{selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>
              <div>
                <label className="text-xs uppercase text-muted-foreground mb-1 block">中文说明</label>
                <Input
                  value={uploadForm.alt_zh}
                  onChange={(e) => setUploadForm({ ...uploadForm, alt_zh: e.target.value })}
                  placeholder="可选"
                />
              </div>
              <div>
                <label className="text-xs uppercase text-muted-foreground mb-1 block">English Alt</label>
                <Input
                  value={uploadForm.alt_en}
                  onChange={(e) => setUploadForm({ ...uploadForm, alt_en: e.target.value })}
                  placeholder="Optional"
                />
              </div>
              <Button
                onClick={handleUpload}
                disabled={uploading || !selectedFile}
                className="w-full"
              >
                {uploading ? "上传中..." : "上传"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Category Filter */}
      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="选择分类" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全部分类</SelectItem>
          {IMAGE_CATEGORIES.map((c) => (
            <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Image Grid */}
      {isLoading ? (
        <p className="text-center text-muted-foreground py-12">加载中...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <Card key={img.id} className="group overflow-hidden">
              <div className="aspect-square overflow-hidden bg-secondary/30 relative">
                <img
                  src={img.url}
                  alt={img.alt_zh || img.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-white"
                    onClick={() => setPreviewImage(img.url)}
                  >
                    <Eye size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-destructive"
                    onClick={() => handleDelete(img.id, img.url)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
              <CardContent className="p-3">
                <p className="text-xs font-medium truncate">{img.name}</p>
                <p className="text-[10px] text-muted-foreground uppercase">{img.category}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Preview Dialog */}
      <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>图片预览</DialogTitle>
          </DialogHeader>
          {previewImage && (
            <div className="relative w-full">
              <img src={previewImage} alt="Preview" className="w-full h-auto" />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
