# 上海普惠口腔官网 - 上线检查清单

> 生成日期：2026/04/14
> 状态：开发已完成，等待内容填充和部署上线

---

## 一、构建验证结果

### ✅ website（Next.js 前台）
```
构建结果：SUCCESS
版本：Next.js 14.2.35
生成静态页面：30 个
输出目录：website/dist/
类型检查：通过
Lint：通过
```

### ✅ studio（Sanity CMS 后台）
```
构建结果：SUCCESS
版本：Sanity v3
输出目录：studio/dist/
```

### ⚠️ 需要注意的安全警告
- `website/` 有 4 个 high severity npm 依赖漏洞
- `studio/` 有 4 个 moderate severity npm 依赖漏洞
- **建议上线前运行**：`npm audit fix`（不会破坏构建，但需验证）

### ⚠️ 预约表单的技术说明
- `/api/booking` 是动态 API 路由，纯静态托管（如阿里云 OSS / CDN）无法运行
- **解决方案**：
  - 方案 A：部署到 Vercel / 腾讯云函数 / 阿里云函数计算（支持 API 路由）
  - 方案 B：改用第三方表单服务（如金数据、麦客表单）收集预约
  - 方案 C：先隐藏在线预约功能，只展示预约电话

---

## 二、上线前必须完成的事项

### 2.1 注册并配置 Sanity 项目

这是整个网站从「演示版」变成「可管理版」的关键步骤。

- [ ] **注册 Sanity 账号**
  - 访问 https://www.sanity.io/manage
  - 用邮箱注册（建议用机构官方邮箱）

- [ ] **创建新项目**
  - 点击 "Create new project"
  - 项目名称：上海普惠口腔 或 Shanghai Puhui Dental
  - 记住生成的 `projectId`

- [ ] **配置环境变量**
  ```bash
  # 在 studio/ 目录下
  cp .env.example .env
  # 编辑 .env，填入：
  SANITY_STUDIO_PROJECT_ID=你的_projectId
  ```

  ```bash
  # 在 website/ 目录下
  # 创建 .env.local 文件，填入：
  NEXT_PUBLIC_SANITY_PROJECT_ID=你的_projectId
  NEXT_PUBLIC_SANITY_DATASET=production
  SANITY_API_TOKEN=你的_read_write_token
  ```

- [ ] **生成 API Token**
  - 在 Sanity 管理后台 → API → Tokens
  - 创建一个 "Editor" 权限的 token
  - 用于 website 前台写入预约数据

- [ ] **导入样本数据**
  ```bash
  cd /Users/leo/Desktop/puhuikouq/studio
  
  # 导入 4 家分店数据
  npx sanity@latest documents import sample-data/clinic-sample.ndjson --dataset production
  
  # 导入 10 篇科普文章
  npx sanity@latest documents import sample-data/articles-10.ndjson --dataset production
  ```

- [ ] **添加管理员账号**
  - 在 Sanity 管理后台 → Members
  - 邀请其他同事（正维/百维/清木/皓星各分店负责人）

### 2.2 替换网站上的占位信息

| 位置 | 当前状态 | 需要替换为 |
|------|---------|-----------|
| `website/src/components/footer.tsx` | `沪ICP备XXXXXXXX号` | 真实的 ICP 备案号 |
| `website/src/app/contact/page.tsx` | 占位地址和电话 | 4 家分店的真实地址、电话 |
| `website/src/app/doctors/page.tsx` | fallback 医生数据 | 真实的医生照片、学历、执业资格 |
| `website/public/llms.txt` | 基于示例数据 | 基于真实医生和分店信息更新 |

### 2.3 图片素材整理

- [ ] 医生职业照：每位医生 1 张（建议白底或浅色背景）
- [ ] 门店外观图：每家分店 2-3 张
- [ ] 门店内部环境图：候诊区、诊疗室、设备
- [ ] Logo：SVG 或高清 PNG 版本
- [ ] 首页 Banner 图：3-5 张轮播图（诊所环境、服务场景）

> 图片上传方式：通过 Sanity Studio 后台直接拖拽上传，前台会自动从 CDN 读取。

### 2.4 内容合规审查（再次确认）

- [ ] 首页没有「最好」「第一」「根治」等绝对化用语
- [ ] 诊疗页面没有功效断言（如「成功率 100%」「永不复发」）
- [ ] 没有患者感谢信 / before-after 对比图
- [ ] 医生介绍中没有「权威专家」「顶尖」等主观评价
- [ ] 机构名称统一为「上海普惠口腔」或其分店全称

---

## 三、部署方案选择

### 推荐方案：Vercel（最简单）

| 优点 | 缺点 |
|------|------|
| 原生支持 Next.js | 服务器在海外，备案域名需配置 DNS |
| 自动 CI/CD，git push 即部署 | 免费版有带宽和函数时长限制 |
| API 路由可直接运行 | 大量图片可能触发流量计费 |

**部署步骤**：
1. 把代码推送到 GitHub
2. 在 Vercel 导入项目
3. 配置环境变量（`NEXT_PUBLIC_SANITY_PROJECT_ID` 等）
4. 点击 Deploy

### 备选方案：阿里云 / 腾讯云

| 优点 | 缺点 |
|------|------|
| 国内访问速度快 | 需要单独配置服务器或函数计算 |
| 备案域名无缝接入 | 静态导出 + API 路由需要分开部署 |
| 符合医疗行业合规要求 | 运维成本稍高 |

**部署结构建议**：
```
静态网站（Next.js dist/）→ 阿里云 OSS + CDN
预约 API（/api/booking）→ 阿里云函数计算 / 腾讯云函数
Sanity Studio → Sanity 官方托管（免费）
```

---

## 四、部署后验证清单

### 4.1 页面访问测试
- [ ] 首页 `/` 正常加载
- [ ] 5 个诊疗科目页正常访问
- [ ] 医生团队页 `/doctors` 显示正常
- [ ] 联系我们页 `/contact` 显示 4 家分店
- [ ] 知识库列表 `/knowledge` 显示 10 篇文章
- [ ] 任意文章详情页 `/knowledge/xxx` 正常打开
- [ ] 预约页 `/booking` 表单可填写
- [ ] 隐私政策页 `/privacy` 可访问
- [ ] 404 页面友好提示

### 4.2 功能测试
- [ ] 导航栏在移动端能展开/收起
- [ ] 预约表单提交后显示成功提示
- [ ] Sanity 后台能看到新提交的预约记录
- [ ] 修改 Sanity 后台的 Banner，前台首页自动更新

### 4.3 SEO/GEO 验证
- [ ] `robots.txt` 允许 AI 爬虫
- [ ] `sitemap.xml` 包含所有页面
- [ ] `llms.txt` 可被公开访问
- [ ] 每页有唯一的 `<title>` 和 `<meta name="description">`

### 4.4 性能测试
- [ ] Lighthouse 性能评分 > 90
- [ ] 首页加载时间 < 2 秒
- [ ] 移动端无横向滚动条
- [ ] 图片懒加载正常工作

---

## 五、域名与备案

- [ ] 注册域名（建议：`puhuikouq.com` / `pukou.com` / `shphkq.com`）
- [ ] 域名 ICP 备案（通过阿里云/腾讯云提交，约 7-20 个工作日）
- [ ] 配置 DNS 解析到服务器
- [ ] 配置 HTTPS 证书

---

## 六、后续运营建议

### 内容更新频率
| 内容类型 | 建议更新频率 | 负责人 |
|---------|------------|--------|
| 科普文章 | 每月 1-2 篇 | 市场部 / 医生 |
| 医生信息 | 有新人入职时更新 | 行政 |
| 分店信息 | 地址/电话变更时更新 | 行政 |
| 轮播图/公告 | 有活动时更新 | 市场部 |
| 预约记录 | 每日查看处理 | 前台客服 |

### GEO 优化维护
- [ ] 每季度用 ChatGPT / Perplexity 测试一次 AI 引用率
- [ ] 根据用户高频问题补充新的 FAQ 页面
- [ ] 在文章中引用最新的行业数据和指南

---

## 七、紧急联系与回滚

### 如果上线后发现问题
1. **代码问题**：修改代码 → 重新构建 → 重新部署
2. **内容问题**：直接登录 Sanity Studio 修改，无需重新部署
3. **严重错误需要快速回滚**：Vercel 和大多数平台都支持一键回滚到上一个版本

### 关键文件备份
- 所有代码：已提交到 Git，随时可恢复
- 所有内容数据：存在于 Sanity 云端 + `sample-data/` 本地 NDJSON 文件

---

## 八、总结：你现在立刻能做的 3 件事

1. **注册 Sanity 项目**（15 分钟）→ 获取 `projectId`
2. **配置环境变量并导入数据**（20 分钟）→ 让网站连上真实后台
3. **替换 4 家分店的真实地址和电话**（10 分钟）→ 消除关键占位信息

做完这 3 步，网站就具备了**基本可用**的状态，可以直接部署给内部人员预览了。

---

*有任何步骤需要我协助执行，随时告诉我。*
