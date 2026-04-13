import { sanityFetch, isSanityConfigured } from "@/lib/sanity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Clinic {
  _id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
}

const clinicsQuery = `*[_type == "clinic"] | order(order asc) {
  _id,
  name,
  address,
  phone,
  hours
}`;

export default async function SanityTestPage() {
  let clinics: Clinic[] = [];
  let error: string | null = null;

  if (!isSanityConfigured()) {
    error =
      "Sanity 尚未配置。请在 website/.env.local 中设置 NEXT_PUBLIC_SANITY_PROJECT_ID，并确保 Sanity Studio 中有诊所数据。";
  } else {
    try {
      clinics = await sanityFetch<Clinic[]>({
        query: clinicsQuery,
        tags: ["clinic"],
      });
    } catch (err) {
      error = err instanceof Error ? err.message : "获取数据失败";
    }
  }

  return (
    <div className="container py-12">
      <h1 className="mb-6 text-2xl font-bold text-primary">Sanity 数据连接测试</h1>

      {!isSanityConfigured() && (
        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-800">
          <p className="font-medium">Sanity 项目 ID 未配置</p>
          <p className="mt-1 text-sm">
            请在 <code>website/.env.local</code> 文件中添加：
          </p>
          <pre className="mt-2 rounded bg-white p-2 text-sm">
            NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
          </pre>
          <p className="mt-2 text-sm">
            并确保 Studio 中已导入诊所数据（<code>studio/sample-data/clinic-sample.ndjson</code>）。
          </p>
        </div>
      )}

      {error && isSanityConfigured() && (
        <div className="mb-6 rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-destructive">
          <p className="font-medium">获取数据时出错</p>
          <p className="mt-1 text-sm">{error}</p>
        </div>
      )}

      {clinics.length === 0 && !error ? (
        <p className="text-muted-foreground">暂无诊所数据</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {clinics.map((clinic) => (
            <Card key={clinic._id}>
              <CardHeader>
                <CardTitle>{clinic.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <span className="font-medium text-foreground">地址：</span>
                  {clinic.address}
                </p>
                <p>
                  <span className="font-medium text-foreground">电话：</span>
                  {clinic.phone}
                </p>
                <p>
                  <span className="font-medium text-foreground">营业时间：</span>
                  {clinic.hours}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
