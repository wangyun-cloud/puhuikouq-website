# Sanity Studio (上海普惠口腔 CMS)

## Setup Requirements

To fully start the Sanity Studio, a valid Sanity project ID is required:

1. Create a free Sanity account at https://sanity.io
2. Create a new project via the web dashboard or CLI:
   ```bash
   npx sanity@latest login
   npx sanity@latest init
   ```
3. Copy the project ID into `studio/.env`:
   ```
   SANITY_STUDIO_PROJECT_ID=your_actual_project_id
   ```
4. Update `sanity.config.ts` and `sanity.cli.ts` if you want to hardcode the project ID instead of using env vars.

## Scripts

- `npm run dev` — Start Sanity Studio in development mode
- `npm run build` — Build the studio for deployment
- `npm run deploy` — Deploy the studio to Sanity's hosted environment

## Content Schemas

All schemas are defined in `schemas/documents/`:

| Schema | Purpose |
|--------|---------|
| `article` | Knowledge base articles (种植牙, 正畸, 口腔护理, etc.) |
| `doctor` | Doctor profiles with education, specialties, years of practice |
| `clinic` | Clinic locations with address, phone, hours |
| `booking` | Online appointment requests |
| `banner` | Homepage carousel slides |

## Known Constraints

- The `production` dataset is used by default.
- Images uploaded through Sanity Studio are stored in Sanity's asset CDN.
- The `booking` document has a read-only `submittedAt` field that auto-populates on creation.
