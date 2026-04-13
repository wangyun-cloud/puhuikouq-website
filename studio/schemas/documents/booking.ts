import { defineField, defineType } from 'sanity'

export const booking = defineType({
  name: 'booking',
  title: '预约',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '姓名',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: '联系电话',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'service',
      title: '预约项目',
      type: 'string',
      options: {
        list: [
          { title: '种植牙', value: 'implant' },
          { title: '牙齿矫正', value: 'orthodontics' },
          { title: '牙齿修复', value: 'restoration' },
          { title: '牙周治疗', value: 'periodontal' },
          { title: '儿童口腔', value: 'pediatric' },
          { title: '口腔检查', value: 'checkup' },
          { title: '其他', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'preferredDate',
      title: '期望就诊日期',
      type: 'date',
    }),
    defineField({
      name: 'symptoms',
      title: '症状描述',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.max(500),
    }),
    defineField({
      name: 'clinic',
      title: '选择门诊',
      type: 'reference',
      to: [{ type: 'clinic' }],
    }),
    defineField({
      name: 'status',
      title: '预约状态',
      type: 'string',
      options: {
        list: [
          { title: '待处理', value: 'pending' },
          { title: '已确认', value: 'confirmed' },
          { title: '已完成', value: 'completed' },
          { title: '已取消', value: 'cancelled' },
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'submittedAt',
      title: '提交时间',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      name: 'name',
      phone: 'phone',
      service: 'service',
      status: 'status',
      submittedAt: 'submittedAt',
      clinicName: 'clinic.name',
    },
    prepare({ name, phone, service, status, submittedAt, clinicName }) {
      const serviceMap: Record<string, string> = {
        implant: '种植牙',
        orthodontics: '牙齿矫正',
        restoration: '牙齿修复',
        periodontal: '牙周治疗',
        pediatric: '儿童口腔',
        checkup: '口腔检查',
        other: '其他',
      }
      const statusMap: Record<string, string> = {
        pending: '待处理',
        confirmed: '已确认',
        completed: '已完成',
        cancelled: '已取消',
      }
      return {
        title: `${name} · ${phone}`,
        subtitle: `${serviceMap[service] || service} · ${clinicName ? `${clinicName} · ` : ''}${statusMap[status] || status} · ${submittedAt ? new Date(submittedAt).toLocaleString('zh-CN') : ''}`,
      }
    },
  },
})
