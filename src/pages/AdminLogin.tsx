import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Lock, Mail } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 查询 admins 表验证（明文密码比对）
      const { data: admins, error } = await supabase
        .from("admins")
        .select("email, name, password_plain")
        .eq("email", email)
        .maybeSingle();

      if (error || !admins) {
        toast.error("邮箱或密码错误");
        setLoading(false);
        return;
      }

      // 明文密码比对
      if (admins.password_plain !== password) {
        toast.error("邮箱或密码错误");
        setLoading(false);
        return;
      }

      // 登录成功，存储会话
      localStorage.setItem("admin_email", admins.email);
      localStorage.setItem("admin_name", admins.name || "Admin");
      localStorage.setItem("admin_logged_in", "true");

      toast.success("登录成功！");
      navigate("/admin");
    } catch {
      toast.error("登录失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center">
            <Lock className="w-6 h-6 text-foreground" />
          </div>
          <CardTitle className="text-2xl font-light tracking-wide">
            管理员登录
          </CardTitle>
          <CardDescription>
            请输入管理员邮箱和密码
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs tracking-widest uppercase text-muted-foreground">
                邮箱
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="graphene@graphene.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs tracking-widest uppercase text-muted-foreground">
                密码
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full tracking-widest uppercase"
            >
              {loading ? "登录中..." : "登录"}
            </Button>
          </form>

          <div className="mt-4 p-3 bg-muted/50 rounded text-xs text-muted-foreground">
            <p className="font-medium mb-1">默认账号：</p>
            <p>邮箱：graphene@graphene.com</p>
            <p>密码：graphene1</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
