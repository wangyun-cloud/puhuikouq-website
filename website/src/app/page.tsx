import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background p-8">
      <main className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-bold text-primary">上海普惠口腔</h1>
        <p className="max-w-md text-lg text-muted-foreground">
          专业口腔医疗服务，守护您的每一颗牙齿
        </p>
        <Button size="lg">立即预约</Button>
      </main>
    </div>
  );
}
