# 格蓝丰官网 - 后台管理系统使用指南

## 🎉 功能概述

本后台管理系统允许你自行调整网站的**产品**、**文案**和**图片**，无需修改代码！

---

## 📋 已实现的功能

### 1. 产品管理 (`/admin`)
- ✅ 添加新产品
- ✅ 编辑现有产品（名称、描述、价格、图片）
- ✅ 删除产品
- ✅ 产品排序
- ✅ 多颜色配置

### 2. 文案管理 (`/admin/content`)
- ✅ 管理首页 Hero 区域文案
- ✅ 管理品牌理念文案
- ✅ 管理石墨烯科技区域文案
- ✅ 支持中英文双语

### 3. 图片管理 (`/admin/images`)
- ✅ 上传 Hero 图片
- ✅ 上传画廊图片
- ✅ 上传 Banner 图片
- ✅ 图片分类管理
- ✅ 图片预览和删除

### 4. 管理员登录 (`/admin/login`)
- ✅ 邮箱密码登录
- ✅ 会话管理
- ✅ 自动跳转

---

## 🔧 首次设置步骤

### 步骤 1：在 Supabase 执行 SQL 迁移

1. 登录 [Supabase 控制台](https://supabase.com/dashboard)
2. 进入你的项目：`stzbersjbirlinzmmesi`
3. 打开 **SQL Editor**
4. 复制并执行 `/tmp/supabase_init.sql` 文件中的 SQL 脚本

### 步骤 2：创建 Storage Bucket

1. 在 Supabase 控制台进入 **Storage** 页面
2. 点击 **New bucket**
3. 创建名为 `site-images` 的 bucket
4. 设置为 **Public** 访问级别
5. 点击 **Create bucket**

> ⚠️ 注意：`product-images` bucket 应该已经存在，如果没有也请创建

### 步骤 3：添加管理员账户

在 Supabase **SQL Editor** 中执行：

```sql
-- 替换为你的邮箱和姓名
INSERT INTO admins (email, name)
VALUES ('your-email@example.com', 'Your Name');
```

### 步骤 4：在 Supabase 启用邮箱密码登录

1. 进入 **Authentication** → **Providers**
2. 确保 **Email**  provider 已启用
3. 如需自定义用户，可在 **Authentication** → **Users** 中手动添加

### 步骤 5：访问后台

访问：`http://47.96.71.237/admin/login`

使用你刚才设置的邮箱和密码登录即可！

---

## 📝 使用指南

### 管理产品

1. 访问 `/admin` 页面
2. 点击 **添加产品** 按钮
3. 填写产品信息：
   - 中文名称 / 英文名称
   - 类型（石墨烯脑电波枕 / 方型枕）
   - 尺寸
   - 排序（数字越小越靠前）
   - 中文描述 / 英文描述
   - 产品图片（点击上传）
   - 可选颜色（添加多个颜色选项）
4. 点击 **添加产品** 保存

### 管理文案

1. 访问 `/admin/content` 页面
2. 选择分组筛选（Hero 区域 / 品牌理念 / 石墨烯科技）
3. 点击编辑按钮修改文案
4. 点击保存按钮生效

### 管理图片

1. 访问 `/admin/images` 页面
2. 点击 **上传图片** 按钮
3. 填写图片信息：
   - 图片名称
   - 分类（Hero 图片 / 画廊图片 / Banner 图片）
   - 选择图片文件
   - 中英文说明（可选）
4. 点击 **上传** 按钮

---

## 🔐 安全提示

1. **不要分享管理员密码**
2. 建议定期修改密码
3. 在 Supabase 控制台可以查看和管理所有管理员账户

---

## 🛠️ 故障排查

### 问题：无法登录后台

**解决方案：**
1. 确认已在 `admins` 表中添加你的邮箱
2. 确认已在 Supabase Authentication 中启用邮箱登录
3. 检查浏览器控制台是否有错误信息

### 问题：图片上传失败

**解决方案：**
1. 确认已创建 `site-images` 和 `product-images` storage bucket
2. 确认 bucket 设置为 Public 访问级别
3. 检查图片大小不超过 5MB
4. 只支持 JPEG、PNG、WebP、GIF 格式

### 问题：修改后网站没有更新

**解决方案：**
1. 清除浏览器缓存（Ctrl+Shift+Delete）
2. 强制刷新页面（Ctrl+F5）
3. 检查数据库是否正确保存

---

## 📂 文件结构

```
/var/www/graphene/
├── src/
│   ├── hooks/
│   │   ├── useAdminAuth.ts      # 管理员登录验证
│   │   ├── useSiteContent.ts    # 文案管理 Hooks
│   │   └── useProducts.ts       # 产品管理 Hooks
│   ├── pages/
│   │   ├── Admin.tsx            # 管理后台主页
│   │   ├── AdminLogin.tsx       # 登录页面
│   │   ├── ContentManagement.tsx # 文案管理页面
│   │   └── ImageManagement.tsx  # 图片管理页面
│   └── components/
│       └── ProtectedAdminRoute.tsx # 路由守卫
└── dist/                        # 构建输出目录
```

---

## 📞 技术支持

如有问题，请联系技术支持。

---

*最后更新：2026-03-01*
