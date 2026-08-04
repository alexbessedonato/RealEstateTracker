# Rentaly

Rentaly is a property operations dashboard for landlords and small portfolio owners. Track properties, tenants, managers, and finances in one place — built with React, TypeScript, and Supabase.

Logged-out visitors see a marketing landing page. Authenticated users get a dashboard with property tables, financial summaries, and management flows for tenants and property managers.

## Features

- **Landing page** — hero, feature overview, how-it-works, and sign-up CTAs at `/` for unauthenticated users
- **Dashboard** — authenticated portfolio view at `/dashboard` with properties, financials, managers, and tenants
- **Properties** — list, add, edit, and delete properties with rent, mortgage, manager, and tenant info; upload insurance and contract documents to Supabase Storage
- **Financial overview** — total rent, total mortgage, and net income across the portfolio (via Supabase RPC)
- **Managers** — add, edit, and delete property managers with company and contact details; deleting a manager unlinks their properties
- **Tenants** — add, edit, and delete tenants and link them to properties; deleting a tenant unlinks them from their property
- **Authentication** — email login, sign-up, and logout with session-aware UI and route guards (protected routes redirect to `/login`; login/signup redirect to `/dashboard` when already authenticated)

## Tech Stack

| Layer | Tools |
|---|---|
| Frontend | React 19, TypeScript, Vite |
| Routing | TanStack Router |
| Data fetching | TanStack Query |
| Auth state | Supabase Auth + Nanostores |
| Backend | Supabase (Postgres, Storage, RPC) |
| UI | Tailwind CSS, shadcn/ui, Lucide icons, Sonner |
| Package manager | pnpm |

## Project Structure

```text
src/
├── app/                    # App shell (QueryClientProvider, router)
├── components/
│   ├── layout/             # NavigationBar, MainLayout, AuthMenu, etc.
│   └── ui/                 # shadcn primitives (Button, Card, Table, …)
├── features/
│   ├── auth/
│   │   ├── api/            # Supabase auth I/O
│   │   ├── hooks/mutations.ts
│   │   ├── store/          # $auth nanostore
│   │   ├── pages/          # LoginPage, SignUpPage
│   │   └── components/
│   ├── properties/
│   │   ├── api/
│   │   ├── hooks/          # queries + usePropertiesList
│   │   ├── pages/          # AddPropertyPage, EditPropertyPage
│   │   ├── components/
│   │   ├── constants/
│   │   └── utils/
│   ├── managers/
│   │   └── pages/          # AddManagerPage, EditManagerPage
│   ├── tenants/
│   │   └── pages/          # AddTenantPage, EditTenantPage
│   └── financials/
├── pages/
│   ├── dashboard/          # Auth-gated dashboard shell
│   └── landing/            # Marketing page + DashboardPreview
├── routes/                 # TanStack Router route tree
├── lib/                    # supabaseClient, utils
└── utils/
```

### Architecture conventions

Each feature follows a consistent, folder-based layout:

```
features/{name}/
├── api/{name}.ts           # Pure Supabase I/O (no React)
├── hooks/queries.ts        # useXQuery + useAddXMutation
├── hooks/mutations.ts      # Auth only (login / signup / logout)
├── hooks/use{X}List.ts     # Screen-level hooks when needed
├── components/             # Feature UI (lists, forms, buttons)
├── pages/                  # Route-level screens
├── constants/              # Query keys, select strings
├── types.ts
└── utils/                  # Optional helpers (e.g. file upload paths)
```

**Key rules:**

- `api/` handles all Supabase reads and writes
- React Query hooks live in `hooks/queries.ts` (and `hooks/mutations.ts` for auth)
- Route screens live inside `features/{name}/pages/`
- Auth session is stored in a Nanostore (`$auth`), not React Query
- `pages/` holds cross-feature shells (dashboard, landing) — not feature logic
- Route guards live in `routes/router.ts` using `beforeLoad` + `throw redirect()` against the `$auth` nanostore
- Data writes are scoped per user: properties use `user_id`; managers and tenants use `owner_id`

### Technical highlights

Worth calling out in portfolio reviews or interviews:

- **Server-side financials via RPC** — portfolio totals (rent, mortgage, net) come from a Supabase Postgres function (`get_user_financials`) instead of summing rows on the client, so aggregation stays authoritative and cheap to call from the dashboard
- **Relational selects** — property list queries use nested PostgREST selects (manager + tenants in one round trip) via typed select constants, avoiding N+1 fetches for the table view
- **Document uploads** — property insurance and contracts go to Supabase Storage with path helpers, short-lived signed URLs for viewing, and cleanup when files are replaced or properties are deleted
- **Referential cleanup on delete** — deleting a manager or property unlinks related rows (`manager_id` / tenant links) before remove, so the UI never shows orphaned associations
- **Cross-domain cache invalidation** — mutating a property, manager, or tenant invalidates related React Query caches (e.g. property writes also refresh financials and tenants) so the dashboard stays consistent without ad-hoc refetches; logout clears the query cache with `removeQueries`
- **Auth session sync** — Supabase `onAuthStateChange` keeps a Nanostore (`$auth`) in sync; TanStack Router `beforeLoad` guards and query `enabled` flags both read from that store so UI, routing, and data fetching share one auth source of truth
- **Password recovery flow** — reset email → redirect to `/confirm-new-password` → `updateUser` password change, with field-level confirmation validation
- **i18n** — `i18next` with HTTP-loaded locales (en/es/fr/de), browser language detection, and toast/form copy driven from translation files rather than hardcoded strings
- **Feature-sliced layout** — each domain owns `api` / `hooks` / `pages` / `components` so Supabase I/O stays pure, React Query stays next to the feature, and route screens stay thin — easier to extend than a flat `components/` + `services/` dump

## Routes

| Path | Screen | Auth |
|---|---|---|
| `/` | Landing page | Public |
| `/dashboard` | Dashboard (properties, financials, managers, tenants) | Protected |
| `/login` | Login | Public (redirects to `/dashboard` if logged in) |
| `/signup` | Sign up | Public (redirects to `/dashboard` if logged in) |
| `/add-property` | Add property form | Protected |
| `/edit-property/$propertyId` | Edit property form (with delete) | Protected |
| `/add-manager` | Add manager form | Protected |
| `/edit-manager/$managerId` | Edit manager form (with delete) | Protected |
| `/add-tenant` | Add tenant form | Protected |
| `/edit-tenant/$tenantId` | Edit tenant form (with delete) | Protected |

Click a row in the properties, managers, or tenants table to open its edit page.

## Local Development

### Prerequisites

- Node.js >= 20
- pnpm >= 9
- A Supabase project with matching tables, storage buckets, and RPC functions

### Environment variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_anon_key
```

### Install and run

```bash
pnpm install
pnpm run dev
```

Dev server: `http://localhost:5173`

### Scripts

| Command | Description |
|---|---|
| `pnpm run dev` | Start development server |
| `pnpm run build` | Type-check and create production build |
| `pnpm run preview` | Preview production build locally |
| `pnpm run lint` | Run ESLint |

## Deployment (Vercel)

This is a Vite SPA, deploy to Vercel (or any static host) with the environment variables above configured in the hosting dashboard.

**Vercel settings:**

| Setting | Value |
|---|---|
| Framework Preset | Vite |
| Build Command | `pnpm run build` |
| Output Directory | `dist` |
| Install Command | `pnpm install` |

**Environment variables** (set in Vercel → Settings → Environment Variables):

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY`

**SPA routing** — add a `vercel.json` at the project root so client-side routes work on refresh:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**Supabase auth** — in your Supabase dashboard (Authentication → URL Configuration), set:

- **Site URL** → your production URL (e.g. `https://your-app.vercel.app`)
- **Redirect URLs** → same URL + `http://localhost:5173`

After pushing to `main`, Vercel auto-deploys. Confirm the latest deployment commit matches your local `main` branch.

## Roadmap

- Role-based access control via Supabase RLS policies
- Query `enabled` guards tied to auth status across all features
- Property detail page and portfolio search
- Integration and end-to-end tests for key flows

## License

This project is licensed under the **Rentaly Non-Commercial + No-AI License v1.0**.

Summary:

- Contributions are welcome
- Commercial use is not allowed without written permission
- AI/ML training or model-development use is not allowed without written permission
- Attribution to Alex Besse Donato is required

See [LICENSE](LICENSE), [NOTICE](NOTICE), and [CONTRIBUTING.md](CONTRIBUTING.md) for full terms.
