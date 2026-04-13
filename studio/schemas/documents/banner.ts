import { defineField, defineType } from 'sanity'

export const banner = defineType({
  name: 'banner',
  title: '首页 Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '标题',
      type: 'string',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'subtitle',
      title: '副标题',
      type: 'string',
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: 'image',
      title: '背景图片',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: '替代文本',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: '链接',
      description: '点击 Banner 后跳转的页面路径（如 /services/implant）',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: '排序',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'active',
      title: '启用',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      active: 'active',
      media: 'image',
    },
    prepare({ title, active, media }) {
      return {
        title,
        subtitle: active ? '已启用' : '已停用',
        media,
      }
    },
  },
})
