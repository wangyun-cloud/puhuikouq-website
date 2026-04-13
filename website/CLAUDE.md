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

### Sanity Client Integration
- `@sanity/client` and `@sanity/image-url` are installed in the website package
- Data fetching utilities live in `src/lib/sanity.ts`
- The client must be created **lazily** to avoid build errors when `NEXT_PUBLIC_SANITY_PROJECT_ID` is not yet configured
- Use `isSanityConfigured()` to gracefully handle missing project ID in pages

### SEO Configuration
- Use Next.js 14 App Router native files: `robots.ts` and `sitemap.ts`
- Metadata is configured in `src/app/layout.tsx` with OpenGraph and Twitter Card defaults
- `next-sitemap` is installed but not actively used; prefer native `sitemap.ts` for static export

### Component Composition with `@base-ui/react`
- Base UI components use a `render` prop for custom element composition, NOT `asChild` like Radix
- Example: `<SheetTrigger render={<Button variant="ghost">Open</Button>} />`
- To support `asChild` on `Button`, install `@radix-ui/react-slot` and wrap with `Slot` component

### Graceful Image Fallbacks for Missing Sanity Assets
When Sanity is not configured or images are missing, avoid broken `<Image>` placeholders. Use CSS gradient fallbacks instead:

```tsx
{hasImage ? (
  <Image src={imageUrl} alt={alt} fill unoptimized />
) : (
  <div className="absolute inset-0 bg-gradient-to-br from-medical-blue via-medical-blue-light to-warm-beige" />
)}
```

For doctor/avatar placeholders, render initials on a gradient background rather than a broken image.

### Schema.org JSON-LD in App Router
Inject structured data directly in React Server Components using a `<script>` tag:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(localBusinessSchema),
  }}
/>
```

### Static Export and `searchParams`
In Next.js 14 with `output: 'export'`, `searchParams` cannot be accessed in server components because it causes a dynamic rendering bailout. Use a client component with `useSearchParams` wrapped in `<Suspense>`:

```tsx
// page.tsx (server component)
import { Suspense } from "react";

<Suspense fallback={null}>
  <FilterClientComponent />
</Suspense>
```

### Portable Text Rendering
- Install `@portabletext/react` for rendering Sanity Portable Text content
- Define custom components for `block`, `list`, `listItem`, `marks`, and `types`
- `@portabletext/react` warns about unknown block styles like `bullet` and `number` even though they're handled by `list`/`listItem`. Add them to `components.block` to silence warnings:

```tsx
block: {
  normal: ({ children }) => <p>{children}</p>,
  bullet: ({ children }) => <>{children}</>,
  number: ({ children }) => <>{children}</>,
}
```

### GROQ Reference Dereferencing
Fetch full referenced documents in a single query using the `->` operator:

```groq
*[_type == "article" && slug.current == $slug][0] {
  ...,
  relatedArticles[]-> {
    _id, title, slug { current }, excerpt
  }
}
```

### Extracting Fallback Content to Shared Files
When fallback data becomes large (e.g., 10+ knowledge base articles), extract it from page files into a shared library file like `src/lib/article-content.ts`:
- Keeps page files under 800 lines
- Allows reuse across list page (`/knowledge/page.tsx`) and detail page (`/knowledge/[slug]/page.tsx`)
- Use helper functions to generate Portable Text blocks to reduce repetition
- Export both the full article record (for detail pages) and a stripped list variant (for list pages)

### Forms with Static Export
Server Actions are **not supported** with `output: 'export'` in Next.js 14. For forms that need to write data (e.g., creating a Sanity document), use this pattern:

1. Create an API route (`app/api/xxx/route.ts`) that handles the POST request
2. Have the client component form submit via `fetch` to the API route
3. The API route performs the Sanity write using `getSanityWriteClient()` with a server-side token

```tsx
// Client form component
async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const res = await fetch("/api/booking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = await res.json();
  // handle success/error
}
```

This keeps the write token server-side while still working with static export builds.
