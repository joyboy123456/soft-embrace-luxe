import { useState } from "react";
import { useSiteContents, useUpdateSiteContent, useCreateSiteContent, useDeleteSiteContent } from "@/hooks/useSiteContent";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pencil, Plus, Save, X } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CONTENT_GROUPS = [
  { value: "hero", label: "Hero 区域" },
  { value: "philosophy", label: "品牌理念" },
  { value: "tech", label: "石墨烯科技" },
  { value: "about", label: "关于页面" },
  { value: "footer", label: "页脚" },
];

export default function ContentManagement() {
  const [selectedGroup, setSelectedGroup] = useState<string>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ zh: string; en: string } | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newContent, setNewContent] = useState({
    key: "",
    value_zh: "",
    value_en: "",
    type: "text",
    group_name: "general",
  });

  const { data: allContents = [], isLoading } = useSiteContents();
  const updateContent = useUpdateSiteContent();
  const createContent = useCreateSiteContent();
  const deleteContent = useDeleteSiteContent();

  const contents = selectedGroup === "all"
    ? allContents
    : allContents.filter((c) => c.group_name === selectedGroup);

  const handleEdit = (content: any) => {
    setEditingId(content.id);
    setEditValues({ zh: content.value_zh, en: content.value_en });
  };

  const handleSave = async (id: string) => {
    if (!editValues) return;
    try {
      await updateContent.mutateAsync({
        id,
        value_zh: editValues.zh,
        value_en: editValues.en,
      });
      toast.success("内容已更新");
      setEditingId(null);
      setEditValues(null);
    } catch {
      toast.error("更新失败");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValues(null);
  };

  const handleCreate = async () => {
    if (!newContent.key || !newContent.value_zh || !newContent.value_en) {
      toast.error("请填写必要信息");
      return;
    }
    try {
      await createContent.mutateAsync(newContent as any);
      toast.success("内容已添加");
      setDialogOpen(false);
      setNewContent({
        key: "",
        value_zh: "",
        value_en: "",
        type: "text",
        group_name: "general",
      });
    } catch {
      toast.error("添加失败");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("确定删除此内容？")) return;
    try {
      await deleteContent.mutateAsync(id);
      toast.success("已删除");
    } catch {
      toast.error("删除失败");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-xl font-light tracking-wide">文案管理</h2>
          <p className="text-sm text-muted-foreground">管理网站各区域的文案内容</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Plus size={16} /> 添加内容
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>添加新内容</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-xs uppercase text-muted-foreground mb-1 block">Key</label>
                <Input
                  value={newContent.key}
                  onChange={(e) => setNewContent({ ...newContent, key: e.target.value })}
                  placeholder="hero_title_zh"
                />
              </div>
              <div>
                <label className="text-xs uppercase text-muted-foreground mb-1 block">分组</label>
                <Select
                  value={newContent.group_name}
                  onValueChange={(v) => setNewContent({ ...newContent, group_name: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CONTENT_GROUPS.map((g) => (
                      <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>
                    ))}
                    <SelectItem value="general">通用</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs uppercase text-muted-foreground mb-1 block">类型</label>
                <Select
                  value={newContent.type}
                  onValueChange={(v) => setNewContent({ ...newContent, type: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">文本</SelectItem>
                    <SelectItem value="textarea">多行文本</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs uppercase text-muted-foreground mb-1 block">中文内容</label>
                <Textarea
                  value={newContent.value_zh}
                  onChange={(e) => setNewContent({ ...newContent, value_zh: e.target.value })}
                  rows={3}
                />
              </div>
              <div>
                <label className="text-xs uppercase text-muted-foreground mb-1 block">英文内容</label>
                <Textarea
                  value={newContent.value_en}
                  onChange={(e) => setNewContent({ ...newContent, value_en: e.target.value })}
                  rows={3}
                />
              </div>
              <Button onClick={handleCreate} className="w-full">添加</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Group Filter */}
      <Select value={selectedGroup} onValueChange={setSelectedGroup}>
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="选择分组" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全部分组</SelectItem>
          {CONTENT_GROUPS.map((g) => (
            <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Content List */}
      {isLoading ? (
        <p className="text-center text-muted-foreground py-12">加载中...</p>
      ) : (
        <div className="space-y-4">
          {contents.map((content) => (
            <Card key={content.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-sm font-mono">{content.key}</CardTitle>
                    <CardDescription className="flex gap-2 mt-1">
                      <span className="px-2 py-0.5 bg-secondary rounded text-xs">{content.group_name}</span>
                      <span className="px-2 py-0.5 bg-secondary rounded text-xs">{content.type}</span>
                    </CardDescription>
                  </div>
                  {editingId === content.id ? (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleSave(content.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Save size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleCancel}
                        className="h-8 w-8 p-0"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(content)}
                        className="h-8 w-8 p-0"
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(content.id)}
                        className="h-8 w-8 p-0 text-destructive"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {editingId === content.id && editValues ? (
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">中文</label>
                      <Textarea
                        value={editValues.zh}
                        onChange={(e) => setEditValues({ ...editValues, zh: e.target.value })}
                        rows={content.type === "textarea" ? 4 : 2}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">English</label>
                      <Textarea
                        value={editValues.en}
                        onChange={(e) => setEditValues({ ...editValues, en: e.target.value })}
                        rows={content.type === "textarea" ? 4 : 2}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm">{content.value_zh}</p>
                    <p className="text-xs text-muted-foreground">{content.value_en}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
