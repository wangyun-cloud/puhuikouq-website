import { NextRequest, NextResponse } from "next/server";
import { getSanityWriteClient, isSanityConfigured } from "@/lib/sanity";

const serviceLabels: Record<string, string> = {
  implant: "种植牙",
  orthodontics: "牙齿矫正",
  restoration: "牙齿修复",
  periodontal: "牙周治疗",
  pediatric: "儿童口腔",
  checkup: "口腔检查",
  other: "其他",
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function validateBookingForm(data: {
  name: string;
  phone: string;
  service: string;
  symptoms?: string;
}): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.length < 2 || data.name.length > 20) {
    errors.name = "请输入2-20个字符的姓名";
  }

  const phoneRegex = /^1[3-9]\d{9}$/;
  if (!data.phone || !phoneRegex.test(data.phone)) {
    errors.phone = "请输入有效的11位手机号码";
  }

  if (!data.service || !serviceLabels[data.service]) {
    errors.service = "请选择预约项目";
  }

  if (data.symptoms && data.symptoms.length > 500) {
    errors.symptoms = "症状描述不能超过500字";
  }

  return errors;
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(request: NextRequest) {
  if (!isSanityConfigured()) {
    return NextResponse.json(
      {
        success: false,
        message: "预约系统暂不可用，请拨打电话 021-5866 0039 进行预约",
      },
      { status: 503, headers: corsHeaders }
    );
  }

  try {
    const body = await request.json();
    const errors = validateBookingForm(body);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "请检查表单填写是否正确",
          errors,
        },
        { status: 400, headers: corsHeaders }
      );
    }

    const doc: {
      _type: "booking";
      name: string;
      phone: string;
      service: string;
      submittedAt: string;
      status: "pending";
      preferredDate?: string;
      symptoms?: string;
      clinic?: { _type: "reference"; _ref: string };
    } = {
      _type: "booking",
      name: body.name.trim(),
      phone: body.phone.trim(),
      service: body.service,
      submittedAt: new Date().toISOString(),
      status: "pending",
    };

    if (body.preferredDate) {
      doc.preferredDate = body.preferredDate;
    }

    if (body.symptoms) {
      doc.symptoms = body.symptoms.trim();
    }

    if (body.clinic) {
      doc.clinic = {
        _type: "reference",
        _ref: body.clinic,
      };
    }

    await getSanityWriteClient().create(doc);

    return NextResponse.json(
      {
        success: true,
        message: "预约提交成功！我们的工作人员会尽快与您联系确认。",
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        success: false,
        message: `预约提交失败，请稍后重试或拨打电话预约。错误：${message}`,
      },
      { status: 500, headers: corsHeaders }
    );
  }
}
