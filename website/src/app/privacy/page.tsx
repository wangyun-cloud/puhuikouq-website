import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "隐私政策",
  description:
    "上海普惠口腔隐私政策：了解我们如何收集、使用、存储和保护您的个人信息。",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-medical-blue via-medical-blue to-medical-blue-dark py-12 text-white md:py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-3 text-2xl font-bold md:text-3xl lg:text-4xl">
              隐私政策
            </h1>
            <p className="text-white/90 md:text-lg">
              我们重视您的个人信息安全，并承诺依法保护您的隐私权益
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-xl border bg-card p-6 shadow-sm md:p-10">
            <div className="prose prose-sm max-w-none text-foreground">
              <p className="text-muted-foreground">
                更新日期：2024年4月13日
              </p>

              <h2 className="mt-8 text-lg font-semibold">一、引言</h2>
              <p className="text-muted-foreground">
                上海普惠口腔（以下简称&ldquo;我们&rdquo;）高度重视用户的个人信息保护。本隐私政策依据《中华人民共和国个人信息保护法》等相关法律法规制定，旨在向您说明我们在提供服务过程中如何收集、使用、存储、共享和保护您的个人信息。
              </p>
              <p className="text-muted-foreground">
                请您在向我们提供个人信息前，仔细阅读并充分理解本隐私政策的全部内容。一旦您使用我们的服务，即视为您已同意本隐私政策的相关条款。
              </p>

              <h2 className="mt-8 text-lg font-semibold">二、我们收集的信息</h2>
              <p className="text-muted-foreground">
                为了向您提供口腔医疗服务，我们可能在以下场景中收集您的个人信息：
              </p>
              <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                <li>
                  <strong className="text-foreground">预约信息：</strong>
                  姓名、联系电话、预约项目、期望就诊日期、症状描述、选择门诊等。
                </li>
                <li>
                  <strong className="text-foreground">就诊信息：</strong>
                  病历资料、口腔检查影像、诊断结果、治疗方案等医疗数据。
                </li>
                <li>
                  <strong className="text-foreground">设备信息：</strong>
                  您访问我们网站时使用的浏览器类型、IP地址、访问时间等日志信息。
                </li>
              </ul>

              <h2 className="mt-8 text-lg font-semibold">三、信息的使用目的</h2>
              <p className="text-muted-foreground">
                我们收集您的个人信息仅用于以下目的：
              </p>
              <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                <li>处理您的在线预约请求，并与您确认就诊安排；</li>
                <li>为您提供口腔诊疗服务和后续随访；</li>
                <li>改进我们的服务质量，进行内部统计分析；</li>
                <li>在法律法规要求或允许的情况下，配合监管部门开展工作。</li>
              </ul>
              <p className="text-muted-foreground">
                未经您的明确同意，我们不会将您的个人信息用于上述目的之外的用途。
              </p>

              <h2 className="mt-8 text-lg font-semibold">四、信息的存储与安全</h2>
              <p className="text-muted-foreground">
                我们采取符合业界标准的安全防护措施保护您的个人信息，包括但不限于数据加密、访问控制、安全审计等技术手段。您的医疗信息将按照国家相关规定进行保存，保存期限不少于法定要求。
              </p>
              <p className="text-muted-foreground">
                如发生个人信息安全事件，我们将按照法律法规的要求，及时向您告知安全事件的基本情况、影响范围、已采取或将要采取的补救措施等。
              </p>

              <h2 className="mt-8 text-lg font-semibold">五、信息的共享与披露</h2>
              <p className="text-muted-foreground">
                我们严格保护您的个人信息，不会向任何无关第三方出售、出租或交换您的个人信息。仅在以下情形下，我们可能会共享或披露您的信息：
              </p>
              <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                <li>获得您的明确同意；</li>
                <li>为提供诊疗服务所必需，与我们合作的医疗机构或专业顾问共享；</li>
                <li>根据法律法规、行政或司法程序的要求必须披露。</li>
              </ul>

              <h2 className="mt-8 text-lg font-semibold">六、您的权利</h2>
              <p className="text-muted-foreground">
                根据《个人信息保护法》，您对您的个人信息享有以下权利：
              </p>
              <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                <li>
                  <strong className="text-foreground">知情权与决定权：</strong>
                  了解我们如何处理您的个人信息，并决定是否同意。
                </li>
                <li>
                  <strong className="text-foreground">查阅与复制权：</strong>
                  有权查阅、复制我们保存的您的个人信息。
                </li>
                <li>
                  <strong className="text-foreground">更正与补充权：</strong>
                  如您的个人信息有误，有权要求我们更正或补充。
                </li>
                <li>
                  <strong className="text-foreground">删除权：</strong>
                  在法定情形下，有权要求我们删除您的个人信息。
                </li>
                <li>
                  <strong className="text-foreground">撤回同意权：</strong>
                  有权随时撤回此前给予的个人信息处理同意。
                </li>
              </ul>
              <p className="text-muted-foreground">
                如需行使上述权利，请联系我们的客服热线：021-12345678。
              </p>

              <h2 className="mt-8 text-lg font-semibold">七、未成年人保护</h2>
              <p className="text-muted-foreground">
                我们重视未成年人的个人信息保护。未满14周岁的未成年人使用我们的服务时，应当在监护人的陪同下进行，并由监护人代为提供必要的个人信息。我们会采取特殊措施保护未成年人的医疗隐私。
              </p>

              <h2 className="mt-8 text-lg font-semibold">八、政策更新</h2>
              <p className="text-muted-foreground">
                我们可能会根据法律法规的变化或服务调整，适时更新本隐私政策。更新后的政策将在本网站公布，请您定期查阅。如政策有重大变更，我们将通过适当方式通知您。
              </p>

              <h2 className="mt-8 text-lg font-semibold">九、联系我们</h2>
              <p className="text-muted-foreground">
                如您对本隐私政策有任何疑问、意见或建议，欢迎通过以下方式与我们联系：
              </p>
              <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                <li>客服电话：021-12345678</li>
                <li>服务时间：周一至周日 08:00 - 20:00</li>
                <li>总部地址：上海市浦东新区陆家嘴环路1000号</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
