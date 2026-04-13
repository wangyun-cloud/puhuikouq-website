import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { structure } from './structure'

// NOTE: Replace `projectId` with your actual Sanity project ID.
// Run `npx sanity@latest manage` after creating a project to retrieve it,
// or run `npx sanity@latest init` interactively to create a new project.
export default defineConfig({
  name: 'default',
  title: '上海普惠口腔 CMS',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'YOUR_PROJECT_ID',
  dataset: 'production',

  plugins: [structureTool({ structure }), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
