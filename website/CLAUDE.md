# Website Development Notes

## Project Setup

- Next.js 14 with App Router, TypeScript, Tailwind CSS v3.4
- shadcn/ui components installed (uses `class-variance-authority` + `cn` pattern)
- Static export configured: `output: 'export'` with `distDir: 'dist'`

## Important Gotchas

### Font Loading During Static Export
When using `next/font/google` with static export, the build attempts to download Google fonts at build time. This can fail in network-restricted environments. Use system fonts for reliable builds:

```tsx
// Recommended: System font stack for Chinese content
font-family: "PingFang SC", "Microsoft YaHei", "Hiragino Sans GB", system-ui, sans-serif;
```

### shadcn/ui with Tailwind v3
The shadcn CLI may install v4-style components even on Next.js 14 projects. If you see errors about missing classes like `outline-ring/50` or imports like `@import "tw-animate-css"`, ensure globals.css uses standard Tailwind v3 directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Design Tokens
Custom colors are defined as CSS variables in `src/app/globals.css` and mapped in `tailwind.config.ts`:
- Primary: `#1e6ba8` (medical blue)
- Secondary/Background: `#f5f0e8` / `#faf8f5` (warm beige/cream)
