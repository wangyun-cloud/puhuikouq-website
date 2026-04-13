import { defineField, defineType } from 'sanity'

export const clinic = defineType({
  name: 'clinic',
  title: '门诊',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '门诊名称',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: '地址',
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
      name: 'hours',
      title: '营业时间',
      type: 'string',
      initialValue: '周一至周日 09:00-18:00',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mapUrl',
      title: '地图链接',
      type: 'url',
    }),
    defineField({
      name: 'image',
      title: '门诊照片',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: '替代文本',
        },
      ],
    }),
    defineField({
      name: 'order',
      title: '排序',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      address: 'address',
      media: 'image',
    },
    prepare({ title, address, media }) {
      return {
        title,
        subtitle: address,
        media,
      }
    },
  },
})
