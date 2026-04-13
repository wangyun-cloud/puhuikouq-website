import { defineField, defineType } from 'sanity'

export const article = defineType({
  name: 'article',
  title: '文章',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '标题',
      type: 'string',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'slug',
      title: 'URL 标识',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: '分类',
      type: 'string',
      options: {
        list: [
          { title: '种植牙', value: 'implant' },
          { title: '正畸', value: 'orthodontics' },
          { title: '口腔护理', value: 'oral-care' },
          { title: '牙周', value: 'periodontal' },
          { title: '儿童口腔', value: 'pediatric' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: '摘要',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'quickAnswer',
      title: '快速回答（GEO 优化）',
      description: '40-80 字的精简回答，用于搜索引擎优化',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required().min(40).max(80),
    }),
    defineField({
      name: 'readTime',
      title: '阅读时长（分钟）',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(60),
    }),
    defineField({
      name: 'publishedAt',
      title: '发布日期',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: '正文内容',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: '替代文本',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'relatedArticles',
      title: '相关文章',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'article' }],
        },
      ],
      validation: (Rule) => Rule.unique().max(4),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      publishedAt: 'publishedAt',
    },
    prepare({ title, category, publishedAt }) {
      const categoryMap: Record<string, string> = {
        implant: '种植牙',
        orthodontics: '正畸',
        'oral-care': '口腔护理',
        periodontal: '牙周',
        pediatric: '儿童口腔',
      }
      return {
        title,
        subtitle: `${categoryMap[category] || category} · ${publishedAt ? new Date(publishedAt).toLocaleDateString('zh-CN') : ''}`,
      }
    },
  },
})
