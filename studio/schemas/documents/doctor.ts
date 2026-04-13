import { defineField, defineType } from 'sanity'

export const doctor = defineType({
  name: 'doctor',
  title: '医生',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '姓名',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: '照片',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: '替代文本',
          initialValue: '医生照片',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'education',
      title: '教育背景',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'qualifications',
      title: '执业资质',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'specialties',
      title: '诊疗方向',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'yearsOfPractice',
      title: '执业年限',
      type: 'number',
      validation: (Rule) => Rule.required().min(0).integer(),
    }),
    defineField({
      name: 'bio',
      title: '个人简介',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required().max(500),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      yearsOfPractice: 'yearsOfPractice',
      media: 'photo',
    },
    prepare({ title, yearsOfPractice, media }) {
      return {
        title,
        subtitle: `执业 ${yearsOfPractice} 年`,
        media,
      }
    },
  },
})
