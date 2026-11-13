# GHB Farms website

Static-exported Next.js rebuild of [ghbfarms.co.za](https://ghbfarms.co.za), replacing the previous WordPress/aglet-theme site.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Produces a static export in `out/`, ready to upload to the cPanel host via FTP. Before building for deployment, set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in `.env.local` to the real Web3Forms access key — it is baked in at build time, so the real key must be present before running `npm run build` for deployment (not just dropped onto the host afterward).

## Stack

- Next.js (App Router, `output: "export"`)
- Tailwind CSS v4
- shadcn/ui, lucide-react
- Content lives as typed data in `content/*.ts`, consumed by thin route files in `app/`
