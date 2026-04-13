"use client";

import { useState, FormEvent } from "react";
import { Calendar, Phone, User, ClipboardList, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ClinicOption {
  _id: string;
  name: string;
}

interface BookingFormProps {
  clinics: ClinicOption[];
}

interface FormErrors {
  name?: string;
  phone?: string;
  service?: string;
  symptoms?: string;
  general?: string;
}

const serviceOptions = [
  { value: "implant", label: "种植牙" },
  { value: "orthodontics", label: "牙齿矫正" },
  { value: "restoration", label: "牙齿修复" },
  { value: "periodontal", label: "牙周治疗" },
  { value: "pediatric", label: "儿童口腔" },
  { value: "checkup", label: "口腔检查" },
  { value: "other", label: "其他" },
];

function getTomorrow(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
}

function getMaxDate(): string {
  const max = new Date();
  max.setMonth(max.getMonth() + 3);
  return max.toISOString().split("T")[0];
}

function validateForm(data: {
  name: string;
  phone: string;
  service: string;
  symptoms?: string;
}): FormErrors {
  const errors: FormErrors = {};

  if (!data.name || data.name.length < 2 || data.name.length > 20) {
    errors.name = "请输入2-20个字符的姓名";
  }

  const phoneRegex = /^1[3-9]\d{9}$/;
  if (!data.phone || !phoneRegex.test(data.phone)) {
    errors.phone = "请输入有效的11位手机号码";
  }

  if (!data.service) {
    errors.service = "请选择预约项目";
  }

  if (data.symptoms && data.symptoms.length > 500) {
    errors.symptoms = "症状描述不能超过500字";
  }

  return errors;
}

export function BookingForm({ clinics }: BookingFormProps) {
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name")?.toString().trim() || "",
      phone: formData.get("phone")?.toString().trim() || "",
      service: formData.get("service")?.toString() || "",
      preferredDate: formData.get("preferredDate")?.toString() || undefined,
      symptoms: formData.get("symptoms")?.toString().trim() || undefined,
      clinic: formData.get("clinic")?.toString() || undefined,
    };

    const validationErrors = validateForm(payload);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setMessage("请检查表单填写是否正确");
      return;
    }

    setIsPending(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setSuccess(true);
        setMessage(result.message);
      } else {
        setMessage(result.message || "预约提交失败，请稍后重试");
        if (result.errors) {
          setErrors(result.errors);
        }
      }
    } catch {
      setMessage("网络异常，请稍后重试或拨打电话预约");
    } finally {
      setIsPending(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-xl bg-green-50 p-8 text-center">
        <CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-600" />
        <h2 className="mb-2 text-xl font-semibold text-green-800">预约成功</h2>
        <p className="text-green-700">{message}</p>
        <div className="mt-6">
          <Button asChild variant="outline">
            <a href="/">返回首页</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {message && !success && (
        <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
          {message}
        </div>
      )}

      <div className="space-y-1.5">
        <label htmlFor="name" className="flex items-center gap-1.5 text-sm font-medium">
          <User className="h-4 w-4 text-muted-foreground" />
          姓名 <span className="text-destructive">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={2}
          maxLength={20}
          placeholder="请输入您的姓名"
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-ring transition-all focus-visible:ring-2"
        />
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="phone" className="flex items-center gap-1.5 text-sm font-medium">
          <Phone className="h-4 w-4 text-muted-foreground" />
          联系电话 <span className="text-destructive">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          pattern="^1[3-9]\d{9}$"
          maxLength={11}
          placeholder="请输入11位手机号码"
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-ring transition-all focus-visible:ring-2"
        />
        {errors.phone && (
          <p className="text-xs text-destructive">{errors.phone}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="service" className="flex items-center gap-1.5 text-sm font-medium">
          <ClipboardList className="h-4 w-4 text-muted-foreground" />
          预约项目 <span className="text-destructive">*</span>
        </label>
        <select
          id="service"
          name="service"
          required
          defaultValue=""
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-ring transition-all focus-visible:ring-2"
        >
          <option value="" disabled>
            请选择预约项目
          </option>
          {serviceOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.service && (
          <p className="text-xs text-destructive">{errors.service}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="preferredDate" className="flex items-center gap-1.5 text-sm font-medium">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          期望就诊日期
        </label>
        <input
          id="preferredDate"
          name="preferredDate"
          type="date"
          min={getTomorrow()}
          max={getMaxDate()}
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-ring transition-all focus-visible:ring-2"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="clinic" className="flex items-center gap-1.5 text-sm font-medium">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          选择门诊
        </label>
        <select
          id="clinic"
          name="clinic"
          defaultValue=""
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-ring transition-all focus-visible:ring-2"
        >
          <option value="">请选择就近门诊（可选）</option>
          {clinics.map((clinic) => (
            <option key={clinic._id} value={clinic._id}>
              {clinic.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="symptoms" className="flex items-center gap-1.5 text-sm font-medium">
          <ClipboardList className="h-4 w-4 text-muted-foreground" />
          症状描述
        </label>
        <textarea
          id="symptoms"
          name="symptoms"
          rows={4}
          maxLength={500}
          placeholder="请简要描述您的口腔问题或就诊需求，方便我们为您安排合适的医生"
          className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-ring transition-all focus-visible:ring-2"
        />
        {errors.symptoms && (
          <p className="text-xs text-destructive">{errors.symptoms}</p>
        )}
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={isPending}
        >
          {isPending ? "提交中..." : "提交预约"}
        </Button>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        提交即表示您同意我们的
        <a href="/privacy" className="text-primary hover:underline">
          隐私政策
        </a>
        ，我们会对您的个人信息严格保密。
      </p>
    </form>
  );
}
