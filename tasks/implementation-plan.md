# 上海普惠口腔官网 - 实施计划

> 基于 [prd-dental-website.md](./prd-dental-website.md) 更新，新增 Sanity CMS 后台管理模块与多分店信息展示。
> 更新日期：2026/04/13

---

## 一、需求变更摘要

### 原始 PRD 方案
- 纯静态网站，使用 MDX 文件管理内容
- 无后台管理系统

### 更新后方案
- **前台**：Next.js 14 + TypeScript + Tailwind CSS + shadcn/ui
- **后台**：Sanity CMS（Headless CMS），支持多账号内容管理
- **部署**：静态导出（SSG），便于部署到 Vercel / 阿里云

### 新增内容管理需求

| 内容类型 | 管理方式 | 说明 |
|---------|---------|------|
| 科普文章 | Sanity 后台 | 富文本编辑，分类标签，封面图 |
| 医生信息 | Sanity 后台 | 照片、学历、执业资格、专业方向、所属分店 |
| 分店信息 | Sanity 后台 | 名称、地址、电话、营业时间、地图坐标 |
| 预约记录 | Sanity 后台 | 表单提交后自动写入，可查看处理状态 |
| 轮播图/公告 | Sanity 后台 | 首页轮播、顶部公告、排序控制 |

### 核心信息确认

- **机构名称**：上海普惠口腔
- **分店信息**：4 家分店
  - 正维口腔
  - 百维口腔
  - 清木口腔
  - 皓星口腔
- **诊疗科目**：口腔类目均包含（许可证已覆盖）
- **账号需求**：支持多账号，后续可能为不同分店人员分配权限

---

## 二、技术架构

### 2.1 整体架构

```
[用户浏览器] ←→ [Next.js 前台网站] ←→ [Sanity CMS API]
                      ↓
               [静态导出 HTML/CSS/JS]
```

### 2.2 目录结构

```
puhuikouq/
├── website/                    # Next.js 前台网站
│   ├── app/                    # 页面路由 (App Router)
│   │   ├── (marketing)/
│   │   │   ├── page.tsx              # 首页
│   │   │   ├── about/page.tsx        # 关于我们
│   │   │   ├── services/
│   │   │   │   ├── page.tsx          # 诊疗科目列表
│   │   │   │   ├── implant/page.tsx  # 种植牙
│   │   │   │   ├── orthodontics/page.tsx   # 正畸
│   │   │   │   ├── restoration/page.tsx    # 口腔修复
│   │   │   │   ├── periodontal/page.tsx    # 牙周治疗
│   │   │   │   └── pediatric/page.tsx      # 儿童口腔
│   │   │   ├── doctors/page.tsx      # 医生团队
│   │   │   ├── knowledge/
│   │   │   │   ├── page.tsx          # 文章列表
│   │   │   │   └── [slug]/page.tsx   # 文章详情
│   │   │   ├── guide/page.tsx        # 就诊指南
│   │   │   ├── booking/page.tsx      # 在线预约
│   │   │   └── contact/page.tsx      # 联系我们
│   │   ├── layout.tsx                # 根布局
│   │   └── globals.css               # 全局样式 + CSS 变量
│   ├── components/
│   │   ├── ui/                       # shadcn/ui 组件
│   │   ├── layout/                   # Navigation, Footer
│   │   └── sections/                 # 页面区块组件
│   ├── lib/
│   │   ├── sanity.ts                 # Sanity 客户端与数据获取
│   │   ├── seo.ts                    # SEO 工具函数
│   │   └── schema.ts                 # Schema.org 结构化数据生成
│   ├── public/
│   │   ├── images/
│   │   └── robots.txt
│   ├── next.config.js                # 静态导出配置
│   └── package.json
│
├── studio/                     # Sanity CMS 后台
│   ├── schemaTypes/            # 内容模型定义
│   │   ├── index.ts
│   │   ├── article.ts          # 科普文章
│   │   ├── doctor.ts           # 医生信息
│   │   ├── clinic.ts           # 分店信息
│   │   ├── booking.ts          # 预约记录
│   │   └── banner.ts           # 轮播图/公告
│   ├── sanity.config.ts        # Sanity 项目配置
│   └── package.json
│
├── 素材/                       # 图片素材（关联 ../普惠口腔/）
│   ├── 医生简介/
│   ├── 门诊环境/
│   └── logo/
│
└── tasks/
    ├── prd-dental-website.md   # 原始产品需求文档
    └── implementation-plan.md  # 本实施计划
```

### 2.3 技术栈

| 层级 | 技术 |
|-----|------|
| 前端框架 | Next.js 14 (App Router) |
| 编程语言 | TypeScript |
| 样式方案 | Tailwind CSS |
| UI 组件 | shadcn/ui |
| 内容管理 | Sanity CMS v3 |
| 富文本 | Sanity Portable Text |
| 图片优化 | Next.js Image |
| 部署方式 | 静态导出 (Static Export) |

---

## 三、Sanity CMS 内容模型设计

### 3.1 科普文章 (article)

| 字段名 | 类型 | 说明 |
|-------|------|------|
| title | string | 文章标题 |
| slug | slug | URL 标识符，如 `dental-implant-lifespan` |
| excerpt | text | 文章摘要（80-120 字） |
| coverImage | image | 封面图 |
| category | string | 分类：种植牙 / 正畸 / 口腔护理 / 牙周 / 儿童口腔 |
| content | array (Portable Text) | 正文富文本内容 |
| publishedAt | datetime | 发布时间 |
| seoDescription | text | 用于 meta description |

### 3.2 医生信息 (doctor)

| 字段名 | 类型 | 说明 |
|-------|------|------|
| name | string | 医生姓名 |
| photo | image | 证件照/职业照 |
| education | string | 学历，如 `四川大学华西口腔医学院 硕士` |
| qualifications | array of string | 执业资格，如 `主治医师`、`口腔种植专科医师` |
| specialties | array of string | 专业方向，如 `种植牙`、`微创拔牙` |
| yearsOfPractice | number | 从业年限 |
| clinic | reference → clinic | 所属分店 |
| bio | text | 简介 |

### 3.3 分店信息 (clinic)

| 字段名 | 类型 | 说明 |
|-------|------|------|
| name | string | 分店名称，如 `正维口腔` |
| fullName | string | 完整机构名，如 `上海普惠口腔·正维口腔` |
| address | text | 详细地址 |
| phone | string | 预约电话 |
| businessHours | string | 营业时间，如 `周一至周日 09:00-18:00` |
| location | geopoint | 地图坐标（经纬度） |
| coverImage | image | 门店外观图 |

### 3.4 预约记录 (booking)

| 字段名 | 类型 | 说明 |
|-------|------|------|
| name | string | 预约人姓名 |
| phone | string | 联系电话 |
| service | string | 预约项目，如 `种植牙咨询`、`正畸初诊` |
| preferredDate | string | 期望时间 |
| symptoms | text | 症状描述 |
| clinic | reference → clinic | 意向分店 |
| status | string | 状态：待处理 / 已确认 / 已完成 / 已取消 |
| submittedAt | datetime | 提交时间 |

### 3.5 轮播图/公告 (banner)

| 字段名 | 类型 | 说明 |
|-------|------|------|
| title | string | 标题 |
| subtitle | string | 副标题 |
| link | string | 跳转链接 |
| image | image | 背景图 |
| isActive | boolean | 是否启用 |
| sortOrder | number | 排序权重，数字越小越靠前 |
| position | string | 展示位置：首页轮播 / 顶部公告 |

---

## 四、分阶段实施计划

### 第一阶段：基础架构 + Sanity 集成（约 2 周）

**目标**：初始化前后端项目，打通数据链路，建立全局布局和 SEO 基础。

| 任务 ID | 任务名称 | 验收标准 |
|---------|---------|---------|
| P1-1 | 初始化 Next.js 前台 | `website/` 目录创建完成；`create-next-app` 初始化成功；TypeScript + Tailwind CSS + App Router 配置完成；ESLint + Prettier 配置完成；`next.config.js` 静态导出配置完成 |
| P1-2 | 初始化 Sanity 后台 | `studio/` 目录创建完成；Sanity v3 项目初始化成功；注册免费 Sanity 项目；配置生产数据集 (`production`) |
| P1-3 | 安装并配置 shadcn/ui | shadcn/ui 在 `website/` 中初始化成功；安装常用基础组件（Button、Card、Sheet、Dialog 等） |
| P1-4 | 定义 Sanity 内容模型 | 在 `studio/schemaTypes/` 中定义 article、doctor、clinic、booking、banner 的 schema；Sanity Studio 能正常启动并显示所有内容类型 |
| P1-5 | Next.js 连接 Sanity | 安装 `@sanity/client`；在 `lib/sanity.ts` 中编写数据获取函数；创建测试页面验证数据读取正常 |
| P1-6 | 设计系统 + 全局布局 | 在 `globals.css` 中定义颜色/字体/间距变量（医疗蓝 + 温暖米）；创建 `RootLayout`；创建响应式 `Navigation`；创建 `Footer`（含备案号占位） |
| P1-7 | SEO 基础配置 | 配置默认 `metadata`；创建 `robots.txt`（允许 AI 爬虫）；创建 `sitemap.ts` 自动生成 sitemap；配置 Open Graph 和 Twitter Card 元数据 |
| P1-8 | 第一阶段验收 | `pnpm tsc --noEmit` 无报错；`pnpm build` 成功生成静态导出；前台页面能正确渲染 Sanity 测试数据 |

### 第二阶段：核心页面开发（约 1.5–2 周）

**目标**：完成首页、诊疗科目页、医生团队页，所有动态内容从 Sanity 读取。

| 任务 ID | 任务名称 | 验收标准 |
|---------|---------|---------|
| P2-1 | 首页开发 | 轮播图读取 Banner 数据；机构第一名称展示；诊疗科目入口；医生团队预览（读取 Doctor 数据）；联系方式和预约 CTA |
| P2-2 | 诊疗科目页模板开发 | 创建可复用模板组件：什么是 XXX、适用情况、治疗流程、注意事项、FAQ 区块；页面结构语义化 |
| P2-3 | 种植牙页面 | 使用模板填充内容；FAQ 包含：种植牙能用多久、种植牙疼吗、种植牙多少钱；加入 FAQPage Schema |
| P2-4 | 正畸矫正页面 | 使用模板填充内容；FAQ 包含：隐形矫正价格、矫正要多久、成人还能矫正吗；加入 FAQPage Schema |
| P2-5 | 医生团队页面 | 读取 Doctor 数据展示医生卡片；不使用了「专家」「权威」等词汇；加入 Physician Schema |
| P2-6 | 联系我们页面 | 读取 Clinic 数据展示 4 家分店信息；包含地址、电话、营业时间、地图占位 |
| P2-7 | 关于我们页面 | 机构介绍、发展历程、资质荣誉展示 |
| P2-8 | 第二阶段验收 | 所有页面在浏览器中正常显示；TypeScript 无报错；Lighthouse 可运行测试 |

### 第三阶段：内容建设与知识库（约 1–1.5 周）

**目标**：搭建知识库系统，撰写并录入初始内容。

| 任务 ID | 任务名称 | 验收标准 |
|---------|---------|---------|
| P3-1 | 知识库列表页开发 | 读取 Article 数据展示文章列表；支持分类筛选；加入 ItemList Schema |
| P3-2 | 知识库详情页开发 | Portable Text 渲染正文；文章开头提供 40-80 字快速答案（GEO 优化）；相关文章推荐；加入 Article Schema |
| P3-3 | 就诊指南页面 | 预约流程说明、营业时间、地址、交通指引 |
| P3-4 | 撰写并录入 10 篇科普文章 | 覆盖种植牙、正畸、口腔护理、牙周、儿童口腔；每篇 1500-2500 字；包含问答式小标题；引用权威来源和统计数据；在 Sanity 后台录入完成 |
| P3-5 | 第三阶段验收 | 文章列表和详情页正常显示；内容无绝对化用语和功效断言；TypeScript 无报错 |

### 第四阶段：在线预约 + 后台数据闭环（约 1 周）

**目标**：实现预约表单提交，并在 Sanity 后台可查看管理。

| 任务 ID | 任务名称 | 验收标准 |
|---------|---------|---------|
| P4-1 | 预约表单页面开发 | 包含字段：姓名、电话、预约项目、期望时间、症状描述；前端表单验证 |
| P4-2 | 预约数据写入 Sanity | 表单提交后通过 Sanity API 创建 Booking 文档；提交成功显示确认信息 |
| P4-3 | 预约管理后台视图 | 在 Sanity Studio 中为 Booking 创建列表视图；支持按状态筛选；显示提交时间 |
| P4-4 | 隐私政策页面 | 包含个人信息收集说明、使用目的、用户权利、联系方式 |
| P4-5 | 第四阶段验收 | 表单提交成功并在 Sanity 后台可见；TypeScript 无报错；构建成功 |

### 第五阶段：GEO 优化 + 性能优化 + 上线准备（约 1 周）

**目标**：完成 GEO 优化、性能优化、合规审查，准备上线。

| 任务 ID | 任务名称 | 验收标准 |
|---------|---------|---------|
| P5-1 | GEO 优化 | 创建 `llms.txt`；所有 FAQ 页面使用 FAQPage Schema；所有文章页面使用 Article Schema；页面首段提供快速答案；引用权威来源和统计数据 |
| P5-2 | 性能优化 | 图片使用 Next.js Image 并实现懒加载；设置关键图片 `priority`；核心页面预渲染；Lighthouse 性能评分 > 90 |
| P5-3 | 合规终审 | 全站排查无绝对化用语；无功效断言；无患者 testimonials；无患者前后对比图；机构名称统一为「上海普惠口腔」；添加 ICP 备案号占位 |
| P5-4 | 构建与交付 | 静态导出完整站点；验证所有页面链接可用；整理上线交付清单 |

---

## 五、合规检查清单

在每一阶段的页面开发完成后，均需执行以下检查：

- [ ] 无绝对化用语：最佳、第一、最专业、根治、彻底等
- [ ] 无功效断言：成功率 99%、永不复发、立竿见影等
- [ ] 无患者 testimonials / 患者感谢信
- [ ] 无患者前后对比图
- [ ] 诊疗科目使用规范医学术语
- [ ] 医生信息客观真实，不使用「专家」「权威」等主观评价
- [ ] 机构名称与执业许可一致（上海普惠口腔）

---

## 六、关键成功指标

| 指标 | 目标 | 测量方式 |
|-----|------|---------|
| 页面加载速度 | < 2 秒 | Lighthouse |
| Lighthouse 性能评分 | > 90 | Lighthouse |
| 移动端适配 | 完美 | 手动测试（320px - 1920px） |
| 核心页面数量 | 15+ | 统计 |
| 科普文章数量 | 10+ | 统计 |
| FAQ 问答数量 | 50+ | 统计 |
| 合规检查通过 | 100% | 人工检查 |
| AI 引用率（GEO） | 15-25% | Perplexity / ChatGPT 测试 |

---

## 七、风险与应对

| 风险 | 可能性 | 影响 | 应对措施 |
|-----|-------|------|---------|
| 医疗广告法违规 | 中 | 高 | 每阶段结束时执行合规检查；避免绝对化用语和功效断言 |
| Sanity 免费额度不足 | 低 | 中 | 初期内容量和访问量较小，免费版够用；后续可升级或迁移自研 |
| 内容被 AI 引用率低 | 中 | 中 | 优化 GEO，添加权威引用和统计数据；使用问答式标题和快速答案 |
| 项目延期 | 中 | 中 | 分阶段交付，优先完成核心页面；后台功能分阶段上线 |
| ICP 备案延迟 | 中 | 中 | 提前启动备案流程；先使用临时域名或 Vercel 预览地址 |
| 后续迁移自研后台 | 中 | 低 | 数据结构清晰，API 接口标准化，降低迁移成本 |

---

## 八、待确认&待补充事项

### 待确认（需项目启动前明确）
1. [ ] Sanity 项目注册邮箱地址（建议使用机构官方邮箱）
2. [ ] 是否使用单一主域名（如 `www.puhuikouq.com`），还是各分店子域名？
3. [ ] ICP 备案主体和域名

### 待补充（可在开发过程中逐步提供）
1. [ ] 4 家分店的详细地址、电话、营业时间
2. [ ] 医生详细信息（姓名、学历、执业资格、专业方向、从业年限）
3. [ ] 医生职业照
4. [ ] 机构发展历程和资质荣誉素材
5. [ ] 门店外观图、内部环境图
6. [ ] 诊所特色介绍素材（需用客观描述重写）
7. [ ] 真实的患者常见问题（用于生成 FAQ）

---

## 九、团队分工与接下来行动

### 下一步行动
1. **用户确认**：审阅本实施计划，确认技术方案和阶段划分
2. **提供邮箱**：用于注册 Sanity 免费项目
3. **启动开发**：确认后进入第一阶段（基础架构 + Sanity 集成）

### 当前占位策略
- 地址和电话：使用占位符（如「上海市XX区XX路XX号，电话 021-XXXX-XXXX」），后续替换
- 医生信息：先录入 2-3 条示例数据用于页面开发，后续批量补充
- 文章内容：先撰写并录入 10 篇通用科普文章，部分诊所定制内容后续补充

---

*本文档将在开发过程中持续更新，记录实际进度和变更事项。*
