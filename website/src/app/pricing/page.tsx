import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, Info, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "收费标准 - 上海普惠口腔",
  description:
    "上海普惠口腔收费标准公示，涵盖种植牙、牙齿矫正、牙齿修复、补牙、拔牙等项目价格，明码标价，放心就诊。",
};

interface MaterialCardProps {
  name: string;
  subtitle?: string;
  priceRef?: string;
  pros: string[];
  cons: string[];
  tag?: string;
}

function MaterialCard({ name, subtitle, priceRef, pros, cons, tag }: MaterialCardProps) {
  return (
    <div className="rounded-xl border border-[#e8e4db] bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-base font-semibold text-[#1c1917]">{name}</h4>
        {tag && (
          <Badge className="bg-[#0d7377]/10 text-[#0d7377] hover:bg-[#0d7377]/10">
            {tag}
          </Badge>
        )}
      </div>
      {subtitle && <p className="mb-2 text-sm text-[#78716c]">{subtitle}</p>}
      {priceRef && (
        <p className="mb-3 text-sm font-medium text-[#0d7377]">{priceRef}</p>
      )}
      <div className="space-y-3">
        <div>
          <p className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-[#0d7377]">
            <CheckCircle2 className="h-3.5 w-3.5" />
            优点
          </p>
          <ul className="space-y-1">
            {pros.map((p, i) => (
              <li key={i} className="text-sm text-[#57534e]">
                · {p}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-[#e86a33]">
            <AlertCircle className="h-3.5 w-3.5" />
            缺点
          </p>
          <ul className="space-y-1">
            {cons.map((c, i) => (
              <li key={i} className="text-sm text-[#57534e]">
                · {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

interface PriceRowProps {
  item: string;
  original?: string;
  member?: string;
  note?: string;
}

function PriceRow({ item, original, member, note }: PriceRowProps) {
  return (
    <tr className="border-b border-[#e8e4db] last:border-b-0">
      <td className="py-3 pr-4 text-sm font-medium text-[#1c1917]">{item}</td>
      <td className="py-3 pr-4 text-sm text-[#78716c] line-through">{original || "—"}</td>
      <td className="py-3 pr-4 text-sm font-semibold text-[#0d7377]">{member || "—"}</td>
      <td className="py-3 text-sm text-[#57534e]">{note || ""}</td>
    </tr>
  );
}

function SectionTitle({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold tracking-tight text-[#1c1917] md:text-2xl">
        {children}
      </h2>
      {subtitle && <p className="mt-2 text-sm text-[#78716c]">{subtitle}</p>}
    </div>
  );
}

function PriceTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#e8e4db] bg-white">
      <table className="w-full min-w-[640px]">
        <thead className="bg-[#f9f7f2]">
          <tr>
            <th className="py-3 pr-4 pl-4 text-left text-sm font-semibold text-[#1c1917]">项目</th>
            <th className="py-3 pr-4 text-left text-sm font-semibold text-[#1c1917]">原价</th>
            <th className="py-3 pr-4 text-left text-sm font-semibold text-[#1c1917]">会员价</th>
            <th className="py-3 pr-4 text-left text-sm font-semibold text-[#1c1917]">备注</th>
          </tr>
        </thead>
        <tbody className="text-left">{children}</tbody>
      </table>
    </div>
  );
}

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-[#f9f7f2] py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-medium tracking-wide text-[#78716c]">
              价格透明 · 明码标价
            </p>
            <h1 className="mb-4 text-3xl font-semibold tracking-tight text-[#1c1917] md:text-4xl">
              收费标准
            </h1>
            <p className="text-base leading-relaxed text-[#57534e] md:text-lg">
              以下为我院常见口腔诊疗项目参考价格，实际费用需经医生面诊检查、制定方案后确定。
              我们承诺无隐形消费，让您就诊更安心。
            </p>
          </div>
        </div>
      </section>

      <div className="container py-12 md:py-16">
        <div className="mx-auto max-w-5xl space-y-16">
          {/* 种植牙 */}
          <section>
            <SectionTitle subtitle="包含种植体、基台及牙冠费用，不含植骨及提升手术">
              种植牙
            </SectionTitle>
            <PriceTable>
              <PriceRow item="登腾（韩国）" original="5980/颗" member="2480/颗" note="每日限5颗，含国产全瓷牙冠" />
              <PriceRow item="奥齿泰（韩国）" original="6980/颗" member="4980/颗" note="标准款，含国产全瓷牙冠" />
              <PriceRow item="瑞士 ITI" original="8980/颗" member="6963/颗" note="含国产全瓷牙冠" />
              <PriceRow item="诺贝尔 CC" original="15800/颗" member="6007/颗" note="含国产全瓷牙冠" />
              <PriceRow item="诺贝尔 PCC" original="16800/颗" member="6989/颗" note="含国产全瓷牙冠" />
              <PriceRow item="ITI 瑞锆亲水" original="15800/颗" member="10457/颗" note="含国产全瓷牙冠，适合骨质条件欠佳者" />
            </PriceTable>
            <p className="mt-3 text-xs text-[#78716c]">
              * 升级威兰德牙冠加收 1000 元/颗；升级 Lava 牙冠加收 1800 元/颗。半口/全口种植支持即刻负重，详情请咨询医生。
            </p>

            <div className="mt-8">
              <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-[#1c1917]">
                <Info className="h-4 w-4 text-[#0d7377]" />
                种植体材料对比
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <MaterialCard
                  name="登腾（韩国）"
                  priceRef="会员价 2480 元/颗起"
                  tag="高性价比"
                  pros={["价格实惠，适合预算有限患者", "临床使用广泛，稳定性良好"]}
                  cons={["品牌溢价能力弱于欧美系", "长期大规模临床追踪数据略短"]}
                />
                <MaterialCard
                  name="奥齿泰（韩国）"
                  priceRef="会员价 4980 元/颗"
                  tag="均衡之选"
                  pros={["表面处理技术成熟，骨结合快", "适应症较广，性价比较高"]}
                  cons={["高端产品线不如瑞士/瑞典丰富", "品牌认知度略低于一线欧美品牌"]}
                />
                <MaterialCard
                  name="瑞士 ITI"
                  priceRef="会员价 6963 元/颗"
                  tag="经典可靠"
                  pros={["国际一线品牌，科研数据丰富", "质保体系完善，长期成功率高"]}
                  cons={["价格高于韩系种植体", "对医生技术要求较高"]}
                />
                <MaterialCard
                  name="诺贝尔 Nobel"
                  priceRef="会员价 6007 元/颗起"
                  tag="高端首选"
                  pros={["种植牙领域先驱技术", "All-on-4/即刻负重能力强", "终身质保体系"]}
                  cons={["价格最高", "对牙槽骨条件要求相对严格"]}
                />
                <MaterialCard
                  name="ITI 瑞锆亲水"
                  priceRef="会员价 10457 元/颗"
                  tag="复杂病例优选"
                  pros={["亲水表面，骨结合速度更快", "适合糖尿病、骨质疏松等愈合欠佳者", "成功率极高"]}
                  cons={["价格昂贵", "并非所有患者都需要亲水表面处理"]}
                />
              </div>
            </div>

            <div className="mt-8">
              <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-[#1c1917]">
                <Info className="h-4 w-4 text-[#0d7377]" />
                牙冠材料对比
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <MaterialCard
                  name="国产全瓷（爱尔创）"
                  priceRef="含在种植套餐内"
                  tag="经济实惠"
                  pros={["价格亲民", "无金属，不影响核磁共振", "美观度可满足日常需求"]}
                  cons={["强度略低于进口氧化锆", "长期使用崩瓷风险稍高"]}
                />
                <MaterialCard
                  name="威兰德（德国）"
                  priceRef="升级 +1000 元/颗"
                  tag="中高端"
                  pros={["高强度氧化锆，精密度高", "美观自然，生物相容性佳", "边缘密合度好"]}
                  cons={["价格中等偏上", "色泽通透性略逊于铸瓷"]}
                />
                <MaterialCard
                  name="Lava（美国 3M）"
                  priceRef="升级 +1800 元/颗"
                  tag="顶级氧化锆"
                  pros={["强度和美观兼具", "边缘密合度极佳", "全球顶级品牌，质量稳定"]}
                  cons={["价格最高", "对医生备牙和技工技术要求高"]}
                />
              </div>
            </div>
          </section>

          {/* 牙齿修复 */}
          <section className="border-t border-[#e8e4db] pt-16">
            <SectionTitle subtitle="固定修复、活动修复及美学贴面">
              牙齿修复
            </SectionTitle>
            <PriceTable>
              <PriceRow item="国产全瓷牙冠" original="1000/颗" member="—" />
              <PriceRow item="爱尔创全瓷牙冠" original="1580/颗" member="—" />
              <PriceRow item="威兰德全瓷牙冠" original="3000/颗" member="—" />
              <PriceRow item="Lava 全瓷牙冠" original="4800/颗" member="—" />
              <PriceRow item="嵌体" original="1000/颗" member="—" />
              <PriceRow item="E.max 铸瓷贴面" original="3000/颗" member="—" />
              <PriceRow item="隐形义齿（含1颗）" original="500" member="—" />
              <PriceRow item="钴铬支架（小）" original="1500" member="—" note="不含牙" />
              <PriceRow item="纯钛支架（小）" original="1800" member="—" note="不含牙" />
              <PriceRow item="吸附性义齿（半口）" original="8000" member="—" note="含牙" />
              <PriceRow item="吸附性义齿（全口）" original="15000" member="—" note="含牙" />
            </PriceTable>

            <div className="mt-8">
              <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-[#1c1917]">
                <Info className="h-4 w-4 text-[#0d7377]" />
                修复材料对比
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <MaterialCard
                  name="钴铬合金支架"
                  priceRef="1500~2000 元"
                  tag="耐用"
                  pros={["强度高，不易变形", "价格适中，维修方便"]}
                  cons={["重量较重，佩戴异物感明显", "部分患者可能对金属过敏"]}
                />
                <MaterialCard
                  name="纯钛支架"
                  priceRef="1800~3500 元"
                  tag="舒适"
                  pros={["重量轻，佩戴舒适", "生物相容性极佳，几乎不过敏", "耐腐蚀"]}
                  cons={["价格高于钴铬", "加工难度稍大，维修需专业设备"]}
                />
                <MaterialCard
                  name="吸附性义齿"
                  priceRef="8000~15000 元"
                  tag="高固位"
                  pros={["固位力好，咀嚼效率高", "无需手术，适合不适合种植的患者", "恢复面部支撑"]}
                  cons={["价格较高", "需要定期调整", "对口腔黏膜条件要求高"]}
                />
              </div>
            </div>
          </section>

          {/* 牙齿矫正 */}
          <section className="border-t border-[#e8e4db] pt-16">
            <SectionTitle subtitle="固定矫正、隐形矫正及儿童早期干预">
              牙齿矫正
            </SectionTitle>
            <PriceTable>
              <PriceRow item="西湖巴尔金属自锁" original="12800" member="—" note="未成年人" />
              <PriceRow item="西湖巴尔金属自锁" original="15800" member="—" note="成年人" />
              <PriceRow item="Damon 进口自锁" original="19000" member="—" note="未成年人" />
              <PriceRow item="Damon 进口自锁" original="21800" member="—" note="成年人" />
              <PriceRow item="Damon 进口陶瓷自锁" original="22000" member="—" note="未成年人" />
              <PriceRow item="Damon 进口陶瓷自锁" original="23800" member="—" note="成年人" />
              <PriceRow item="时代天使 COMFOS" original="22900" member="—" note="五年服务" />
              <PriceRow item="时代天使标准版" original="29800" member="—" />
              <PriceRow item="时代天使冠军版" original="38000" member="—" />
              <PriceRow item="隐适美标准版" original="38000" member="—" note="不拔牙或拔1颗前牙" />
              <PriceRow item="隐适美成人版" original="42000" member="—" note="拔前磨牙" />
              <PriceRow item="隐适美完整版" original="48000" member="—" note="Ma+拔牙" />
            </PriceTable>

            <div className="mt-8">
              <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-[#1c1917]">
                <Info className="h-4 w-4 text-[#0d7377]" />
                矫正方式对比
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <MaterialCard
                  name="金属自锁托槽"
                  priceRef="12800~21800 元"
                  tag="经典高效"
                  pros={["摩擦力小，疗程可能缩短", "复诊间隔可延长", "适应症最广"]}
                  cons={["美观度差，影响社交形象", "口腔异物感明显，易磨嘴", "清洁难度大"]}
                />
                <MaterialCard
                  name="陶瓷自锁托槽"
                  priceRef="22000~23800 元"
                  tag="半隐形"
                  pros={["美观度优于金属托槽", "性能接近金属自锁", "不易被察觉"]}
                  cons={["托槽较厚，舒适度一般", "费用更高", "深色食物可能染色"]}
                />
                <MaterialCard
                  name="时代天使隐形矫正"
                  priceRef="22900~38000 元"
                  tag="国产隐形龙头"
                  pros={["透明美观，可摘戴", "便于清洁和进食", "价格相对进口隐形较低"]}
                  cons={["对佩戴依从性要求极高", "复杂病例控制力可能略逊于隐适美", "需频繁更换牙套"]}
                />
                <MaterialCard
                  name="隐适美 Invisalign"
                  priceRef="38000~48000 元"
                  tag="隐形矫正标杆"
                  pros={["技术最成熟，适应症广泛", "材料柔软，佩戴舒适", "方案精准度高"]}
                  cons={["价格最高", "极度依赖患者自律", "简单病例性价比不高"]}
                />
                <MaterialCard
                  name="MRC / ETA 儿童早期矫正"
                  priceRef="4000~4500 元/个"
                  tag="早期干预"
                  pros={["可纠正口呼吸、吮指等不良习惯", "促进颌骨正常发育", "费用低，非侵入"]}
                  cons={["需配合肌功能训练", "每天佩戴时间要求高", "效果因人而异，需定期复查"]}
                />
              </div>
            </div>
          </section>

          {/* 补牙材料 */}
          <section className="border-t border-[#e8e4db] pt-16">
            <SectionTitle subtitle="不同补牙材料适用于不同龋坏部位和预算">
              补牙材料
            </SectionTitle>
            <PriceTable>
              <PriceRow item="普通玻璃离子" original="100/颗" member="—" />
              <PriceRow item="进口玻璃离子" original="200/颗" member="—" />
              <PriceRow item="松风树脂" original="200/颗" member="—" />
              <PriceRow item="3M Z250 树脂" original="300/颗" member="—" />
              <PriceRow item="3M Z350 纳米树脂" original="500/颗" member="—" />
              <PriceRow item="3M P60 后牙树脂" original="800/颗" member="—" />
              <PriceRow item="义获嘉美学树脂" original="1000/颗" member="—" />
            </PriceTable>

            <div className="mt-8">
              <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-[#1c1917]">
                <Info className="h-4 w-4 text-[#0d7377]" />
                补牙材料对比
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <MaterialCard
                  name="玻璃离子"
                  priceRef="100~200 元/颗"
                  tag="温和防护"
                  pros={["释放氟离子，有一定防龋作用", "对牙髓刺激小", "操作简单，价格低"]}
                  cons={["强度和耐磨性差", "美观度一般，颜色选择少", "易磨损，使用寿命较短"]}
                />
                <MaterialCard
                  name="3M Z250"
                  priceRef="300 元/颗"
                  tag="经典之选"
                  pros={["品牌经典，临床使用时间长", "颜色选择较多", "耐磨性尚可"]}
                  cons={["硬度一般，不适合大面积缺损", "抛光性和边缘封闭性中等"]}
                />
                <MaterialCard
                  name="3M Z350"
                  priceRef="500 元/颗"
                  tag="美观耐用"
                  pros={["纳米级颗粒，抛光性极佳", "颜色稳定性好，不易变色", "边缘封闭性好"]}
                  cons={["价格高于 Z250", "对医生分层充填技术要求高"]}
                />
                <MaterialCard
                  name="3M P60"
                  priceRef="800 元/颗"
                  tag="后牙专用"
                  pros={["专为后牙设计，硬度极高", "抗压耐磨，适合大面积充填", "咀嚼受力表现好"]}
                  cons={["颜色通透性略逊，主要推荐后牙", "价格较高"]}
                />
                <MaterialCard
                  name="义获嘉美学树脂"
                  priceRef="1000 元/颗"
                  tag="前牙美学"
                  pros={["极佳的美观效果", "颜色层次丰富，仿真度高", "前牙修复首选"]}
                  cons={["价格最高", "对医生审美和技术要求极高", "硬度不如 P60，不推荐后牙"]}
                />
              </div>
            </div>
          </section>

          {/* 综合诊疗 */}
          <section className="border-t border-[#e8e4db] pt-16">
            <SectionTitle subtitle="根管治疗、拔牙及牙周基础治疗">
              综合诊疗
            </SectionTitle>
            <PriceTable>
              <PriceRow item="前牙根管治疗" original="800/颗" member="—" />
              <PriceRow item="前磨牙根管治疗" original="1200/颗" member="—" />
              <PriceRow item="磨牙根管治疗" original="1500/颗" member="—" />
              <PriceRow item="热牙胶加收" original="+300/颗" member="—" />
              <PriceRow item="显微根管加收" original="+1000/颗" member="—" />
              <PriceRow item="松动牙/残根拔除" original="60~300/颗" member="—" />
              <PriceRow item="前牙拔除" original="300/颗" member="—" />
              <PriceRow item="后牙拔除" original="460/颗" member="—" />
              <PriceRow item="上颌正位智齿" original="600/颗" member="—" />
              <PriceRow item="下颌正位智齿" original="800/颗" member="—" />
              <PriceRow item="阻生智齿" original="1000~3500/颗" member="—" note="视难度而定" />
              <PriceRow item="超声洗牙" original="160" member="—" />
              <PriceRow item="喷砂洁牙" original="360" member="—" />
              <PriceRow item="舒适化洁牙" original="580" member="—" />
            </PriceTable>
          </section>

          {/* 温馨提示 */}
          <section className="rounded-xl border border-[#e8e4db] bg-[#f9f7f2] p-6 md:p-8">
            <h3 className="mb-4 text-base font-semibold text-[#1c1917]">温馨提示</h3>
            <ul className="space-y-2 text-sm text-[#57534e]">
              <li>· 以上价格仅供参考，实际费用以医生面诊后的治疗方案为准。</li>
              <li>· 种植牙价格包含种植体、基台及牙冠；不含植骨、内/外提升等附加手术费用。</li>
              <li>· 矫正费用通常包含全程矫治器及复诊费用，具体以签署的治疗协议为准。</li>
              <li>· 如遇节假日促销活动，部分项目可能享有额外优惠，请咨询前台或致电了解。</li>
            </ul>
          </section>
        </div>
      </div>

      {/* CTA */}
      <section className="bg-[#1c1917] py-16 text-white md:py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight md:text-3xl">
              还有疑问？欢迎咨询
            </h2>
            <p className="mb-8 text-white/80">
              我们的客服人员将为您详细解答价格及治疗方案相关问题
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-md bg-[#0d7377] px-8 hover:bg-[#0a5c5f]">
                <Link href="/booking">在线预约</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-md border-white/30 bg-transparent px-8 text-white hover:bg-white/10"
              >
                <a href="tel:021-58660039" className="inline-flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  021-5866 0039
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
