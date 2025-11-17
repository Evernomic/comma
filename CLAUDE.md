# CLAUDE.md - AI Assistant Guide for Nucelo

> **Last Updated**: 2025-11-17
> **Purpose**: Comprehensive guide for AI assistants working with the Nucelo codebase

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Key Architecture Patterns](#key-architecture-patterns)
5. [Development Workflow](#development-workflow)
6. [Code Conventions](#code-conventions)
7. [Common Tasks](#common-tasks)
8. [Important Files Reference](#important-files-reference)
9. [Security Considerations](#security-considerations)
10. [Troubleshooting](#troubleshooting)

---

## Project Overview

**Nucelo** is an open-source minimal blogging platform built with Next.js 15, React 19, and TypeScript. It's a multi-tenant SaaS application that allows users to create personal websites, publish articles, showcase projects, manage bookmarks, and build email newsletters with integrated analytics.

### Key Features
- Rich text editor (TipTap) with Notion-like experience
- Real-time analytics via Tinybird
- Email newsletter management with Resend
- Custom domain support per user site
- Password-protected user sites
- Subscription plans (Free/Pro) via Lemon Squeezy
- Multi-tenant architecture with dynamic routing

### License
GNU Affero General Public License (AGPLv3)

### Repository
- **Author**: manafov (@themanafov)
- **URL**: https://github.com/themanafov/nucelo

---

## Technology Stack

### Core Framework
- **Next.js 15.1.3** - App Router with Turbo mode
- **React 19.0.0** - Latest React with concurrent features
- **TypeScript 5.7.3** - Type-safe development
- **Node.js** - Runtime environment

### Database & ORM
- **PostgreSQL** via Neon (serverless)
- **Prisma 6.2.1** - Type-safe ORM
- **@prisma/adapter-neon** - Edge runtime support
- **@neondatabase/serverless** - Serverless connections

### Authentication
- **NextAuth.js 4.24.11** - Session management
- **Providers**: Google OAuth, GitHub OAuth, Email (magic links)
- **@next-auth/prisma-adapter** - Database adapter

### Content Editor
- **TipTap 2.x** - Extensible rich text editor
- **Extensions**: color, highlight, image, link, task lists, typography, underline
- **tiptap-markdown** - Markdown serialization
- **@tiptap-pro/extension-file-handler** - File upload handling

### Styling
- **Tailwind CSS 3.4.17** - Utility-first CSS
- **PostCSS** with nesting support
- **class-variance-authority** - Component variant management
- **Radix UI** - Headless accessible components
- **Lucide React** - Icon library
- **Framer Motion 11.18.0** - Animations

### Data & State Management
- **SWR** - Data fetching and caching
- **Zustand** - Global state management
- **React Hook Form** - Form handling
- **Zod** - Runtime schema validation

### Analytics & Email
- **Tinybird** - Real-time analytics engine
- **Resend** - Email service provider
- **React Email** - Email template components
- **@vercel/analytics** - Vercel Analytics

### Infrastructure
- **Vercel** - Hosting and deployments
- **Vercel Blob** - File storage
- **Upstash Redis** - Rate limiting
- **Lemon Squeezy** - Payment processing
- **LogSnag** - Event logging (optional)

### Utilities
- **date-fns** - Date manipulation
- **nanoid** - ID generation
- **slugify** - URL slug creation
- **ky** - Modern HTTP client
- **sharp** - Image processing

---

## Project Structure

```
/home/user/nucelo/
├── .github/                     # GitHub workflows and config
│   └── dependabot.yml          # Dependency update automation
│
├── emails/                      # React Email templates
│   ├── magic-link.tsx          # Authentication email
│   └── newsletter.tsx          # Newsletter template
│
├── prisma/                      # Database schema
│   └── schema.prisma           # Prisma data models
│
├── public/                      # Static assets
│   ├── _static/                # Images and static content
│   ├── fonts/                  # Ubuntu font family
│   └── [favicon files]         # Various favicon formats
│
├── src/                         # Source code root
│   │
│   ├── app/                     # Next.js App Router
│   │   ├── (app)/              # Protected app routes (requires auth)
│   │   │   ├── analytics/      # User analytics dashboard
│   │   │   ├── articles/       # Article management
│   │   │   ├── bookmarks/      # Bookmark management
│   │   │   ├── projects/       # Project management
│   │   │   ├── settings/       # User settings
│   │   │   └── subscribers/    # Newsletter subscribers
│   │   │
│   │   ├── (home)/             # Public marketing pages
│   │   │   ├── home/           # Landing page
│   │   │   ├── login/          # Login page
│   │   │   ├── privacy/        # Privacy policy
│   │   │   └── signup/         # Signup page
│   │   │
│   │   ├── (protected)/        # Password-protected page handler
│   │   ├── (unsubscribe)/      # Newsletter unsubscribe flow
│   │   │
│   │   ├── (user)/             # Public user profile pages
│   │   │   └── user/[domain]/  # Dynamic user sites
│   │   │       ├── [slug]/     # Article detail
│   │   │       ├── articles/   # Article list
│   │   │       ├── bookmarks/  # Bookmark list
│   │   │       └── projects/   # Project list/detail
│   │   │
│   │   ├── api/                # API routes (31 endpoints)
│   │   │   ├── articles/       # Article CRUD + analytics
│   │   │   ├── auth/           # NextAuth handlers
│   │   │   ├── bookmarks/      # Bookmark CRUD + tracking
│   │   │   ├── collections/    # Collection CRUD
│   │   │   ├── domains/        # Custom domain management
│   │   │   ├── export/         # Content export (MD/CSV)
│   │   │   ├── og/             # OG image generation
│   │   │   ├── projects/       # Project CRUD + analytics
│   │   │   ├── subscribers/    # Newsletter subscribers
│   │   │   ├── upload/         # File upload to Blob
│   │   │   ├── users/          # User profile updates
│   │   │   └── webhooks/       # Payment webhooks
│   │   │
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── not-found.tsx       # 404 page
│   │   ├── robots.ts           # Robots.txt generation
│   │   ├── sitemap.ts          # Sitemap generation
│   │   └── manifest.ts         # PWA manifest
│   │
│   ├── components/              # React components
│   │   ├── analytics/          # Chart components (Recharts)
│   │   ├── articles/           # Article UI components
│   │   ├── bookmarks/          # Bookmark UI components
│   │   ├── domain/             # Domain management UI
│   │   ├── editor/             # TipTap editor components
│   │   ├── forms/              # Form components
│   │   ├── layout/             # Layout components (header, nav, etc.)
│   │   ├── markdown/           # Markdown rendering
│   │   ├── projects/           # Project UI components
│   │   ├── providers/          # Context providers
│   │   ├── shared/             # Shared/reusable components
│   │   └── ui/                 # Radix UI-based primitives
│   │
│   ├── config/                  # Configuration files
│   │   ├── app.ts              # App navigation structure
│   │   ├── marketing.ts        # Marketing page config
│   │   ├── site.ts             # Site metadata
│   │   ├── subscriptions.ts    # Plan definitions (Free/Pro)
│   │   └── user-page.ts        # User page navigation
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── use-app-command.ts  # Command palette
│   │   ├── use-copy-to-clipboard.ts
│   │   └── use-navigation.ts   # Navigation helpers
│   │
│   ├── lib/                     # Core business logic
│   │   ├── actions/            # Server actions (mutations)
│   │   │   ├── articles.ts     # Article CRUD
│   │   │   ├── bookmarks.ts    # Bookmark CRUD
│   │   │   ├── collections.ts  # Collection CRUD
│   │   │   ├── projects.ts     # Project CRUD
│   │   │   ├── subscribers.ts  # Subscriber management
│   │   │   └── users.ts        # User updates
│   │   │
│   │   ├── constants/          # Constants and regex patterns
│   │   ├── fetchers/           # Data fetching functions
│   │   │   ├── articles.ts     # Article queries
│   │   │   ├── bookmarks.ts    # Bookmark queries
│   │   │   ├── projects.ts     # Project queries
│   │   │   ├── subscribers.ts  # Subscriber queries
│   │   │   └── users.ts        # User queries
│   │   │
│   │   ├── validations/        # Zod schemas
│   │   │   ├── article.ts      # Article validation
│   │   │   ├── auth.ts         # Auth validation
│   │   │   ├── bookmark.ts     # Bookmark validation
│   │   │   ├── project.ts      # Project validation
│   │   │   ├── subscribe.ts    # Subscriber validation
│   │   │   └── user.ts         # User validation
│   │   │
│   │   ├── analytics.ts        # Tinybird helpers
│   │   ├── auth.ts             # NextAuth config + guard middleware
│   │   ├── db.ts               # Prisma client singleton
│   │   ├── domains.ts          # Domain management (Vercel API)
│   │   ├── edge.ts             # Edge runtime utilities
│   │   ├── log.ts              # LogSnag integration
│   │   ├── ratelimit.ts        # Upstash rate limiting
│   │   ├── resend.ts           # Resend client
│   │   ├── subscription.ts     # Subscription logic
│   │   ├── tinybird.ts         # Tinybird client
│   │   └── utils.ts            # Utility functions
│   │
│   ├── styles/                  # Global styles
│   │   ├── globals.css         # Tailwind imports + custom CSS
│   │   ├── editor.css          # TipTap editor styles
│   │   └── prose.css           # Typography/prose styles
│   │
│   ├── types/                   # TypeScript types
│   │   ├── index.d.ts          # Custom type definitions
│   │   └── next-auth.d.ts      # NextAuth type extensions
│   │
│   └── middleware.ts            # Multi-tenant routing middleware
│
├── .env.example                 # Environment variables template
├── .eslintrc.json              # ESLint configuration
├── .gitignore                  # Git ignore patterns
├── .npmrc                      # NPM config (TipTap registry)
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies and scripts
├── postcss.config.mjs          # PostCSS configuration
├── prettier.config.mjs         # Prettier configuration
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── CLAUDE.md                   # This file
```

---

## Key Architecture Patterns

### 1. Multi-Tenant Routing (middleware.ts)

The middleware handles complex routing logic based on hostname:

```typescript
// Pattern: hostname determines which app to serve
app.nucelo.com        → Protected app routes (requires auth)
username.nucelo.co    → User's public site
custom-domain.com     → User's custom domain site
nucelo.com            → Marketing site (or redirects to app if logged in)
```

**Key behaviors**:
- Session-based authentication checks
- Password protection for user sites (cookie-based)
- Dynamic URL rewriting for multi-tenancy
- Automatic redirects for authenticated users

**Location**: `/home/user/nucelo/src/middleware.ts`

### 2. Guard Middleware Pattern (lib/auth.ts)

Higher-order function that wraps API routes with authentication, authorization, and validation:

```typescript
// Usage in API routes
export const POST = guard(
  async ({ user, plan, body }) => {
    // Your handler logic with validated data
  },
  {
    requiredPlan: "Pro", // Optional: restrict to Pro users
    schemas: {
      bodySchema: articleCreateSchema,     // Validates request body
      contextSchema: articleIdSchema,      // Validates route params
      searchParamsSchema: querySchema,     // Validates query params
    },
  }
);
```

**Features**:
- Automatic session validation (401 if not authenticated)
- Plan enforcement (401 if Pro required but user is Free)
- Zod schema validation (422 on validation errors)
- Type-safe request/response handling

**Location**: `/home/user/nucelo/src/lib/auth.ts:119-212`

### 3. Server Actions Pattern

Server actions are defined in `src/lib/actions/` with `"use server"` directive:

```typescript
// Pattern: actions/*.ts
"use server";

export async function createArticle(
  authorId: string,
  data: ArticleCreateSchema,
) {
  return await db.article.create({
    data: { ...data, authorId },
  });
}
```

**Conventions**:
- All database mutations go through server actions
- Validation schemas imported from `lib/validations/`
- Permission checks inline (e.g., `authorId` matching)
- Return database models or IDs

**Files**:
- `/home/user/nucelo/src/lib/actions/articles.ts`
- `/home/user/nucelo/src/lib/actions/bookmarks.ts`
- `/home/user/nucelo/src/lib/actions/projects.ts`
- `/home/user/nucelo/src/lib/actions/users.ts`
- `/home/user/nucelo/src/lib/actions/subscribers.ts`
- `/home/user/nucelo/src/lib/actions/collections.ts`

### 4. Data Fetchers Pattern

Server-side data fetching functions in `src/lib/fetchers/`:

```typescript
// Pattern: fetchers/*.ts
export async function getArticlesByAuthor(authorId: string) {
  return await db.article.findMany({
    where: { authorId },
    orderBy: { createdAt: "desc" },
  });
}
```

**Conventions**:
- Used in Server Components and API routes
- No "use server" directive (not actions)
- Pure query functions (no mutations)
- Return Prisma models or null

### 5. Validation Schema Pattern

Zod schemas in `src/lib/validations/`:

```typescript
// Pattern: validations/*.ts
export const articleCreateSchema = z.object({
  title: z.string().min(1).max(120),
  content: z.string().optional(),
  published: z.boolean().default(false),
});

export const articlePatchSchema = articleCreateSchema.partial();
```

**Conventions**:
- One file per entity (article, bookmark, project, user)
- Export both full and partial schemas
- Use for API route validation and form validation
- Custom regex validators in `lib/constants/`

### 6. API Route Structure

RESTful API design with guard middleware:

```
/api/[resource]/route.ts          → GET (list), POST (create)
/api/[resource]/[id]/route.ts     → GET (detail), PATCH (update), DELETE
/api/[resource]/[id]/[action]/route.ts → POST (specific actions)
```

**Example**: Article analytics endpoint
```
/api/articles/[articleId]/analytics/[property]/route.ts
```

**Total**: 31 API routes

### 7. Route Groups (App Router)

Next.js route groups organize layouts without affecting URLs:

- **(app)** - Protected routes requiring authentication
- **(home)** - Public marketing pages
- **(user)** - Dynamic user profile pages
- **(protected)** - Password-protected content entry
- **(unsubscribe)** - Newsletter unsubscribe flow

**Effect**: Each group can have its own `layout.tsx` with different providers/nav.

### 8. Analytics Architecture

**Tinybird pipelines** track user interactions:

```typescript
// Pattern: Send events to Tinybird
await trackAnalytics({
  event: "article_view",
  articleId: "...",
  country: "US",
  device: "Desktop",
  // ... metadata
});
```

**Tracked entities**: Articles, Projects, Bookmarks
**Metrics**: views, countries, devices, OS, browsers, referrers
**Time intervals**: 1h, 24h, 7d, 30d, 90d, all-time

**Location**: `/home/user/nucelo/src/lib/analytics.ts`, `/home/user/nucelo/src/lib/tinybird.ts`

### 9. Rate Limiting Pattern

Upstash Redis-based rate limiting:

```typescript
// Pattern: Rate limit by key
const { success } = await rateLimit.newsletter.limit(
  `newsletter:${userId}:${articleId}`
);
if (!success) {
  return new Response("Rate limit exceeded", { status: 429 });
}
```

**Configured limits**:
- Newsletter sending: 2 per day per article
- Extendable for other endpoints

**Location**: `/home/user/nucelo/src/lib/ratelimit.ts`

### 10. Custom Domain Management

Vercel API integration for custom domains:

```typescript
// Pattern: Add/remove domains programmatically
await addDomain(domain); // Adds to Vercel project
await removeDomain(domain); // Removes from Vercel project
```

**Flow**:
1. User adds custom domain in settings
2. API calls Vercel to add domain
3. User configures DNS (A/CNAME records)
4. Vercel verifies and provisions SSL
5. Middleware routes traffic to user's site

**Location**: `/home/user/nucelo/src/lib/domains.ts`

---

## Development Workflow

### Environment Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/themanafov/nucelo.git
   cd nucelo
   ```

2. **Install dependencies**
   ```bash
   npm install
   # Note: TipTap Pro requires TIPTAP_TOKEN in .npmrc
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Fill in required values (see .env.example)
   ```

4. **Set up database**
   ```bash
   npx prisma generate
   npx prisma db push
   # Or: npx prisma migrate dev
   ```

5. **Start development server**
   ```bash
   npm run dev
   # Opens on http://localhost:3000
   ```

### NPM Scripts

```json
{
  "dev": "next dev --turbo",           // Development with Turbo
  "build": "next build",               // Production build
  "start": "next start",               // Production server
  "lint": "next lint",                 // ESLint
  "email": "email dev --port 7777",    // Email template preview
  "format": "prettier --write ...",    // Format code
  "postinstall": "prisma generate"     // Auto-generate Prisma client
}
```

### Environment Variables

**Critical variables** (see `/home/user/nucelo/.env.example` for full list):

```bash
# Core
NEXT_PUBLIC_URL="https://nucelo.com"
NEXT_PUBLIC_APP_URL="https://app.nucelo.com"
NEXT_PUBLIC_APP_DOMAIN="nucelo.com"
NEXT_PUBLIC_USER_DOMAIN="nucelo.co"

# Database (Neon)
DATABASE_URL=                        # PostgreSQL connection string
DIRECT_URL=                          # Direct connection (for migrations)

# Auth
NEXTAUTH_SECRET=                     # Random secret (64+ chars)
NEXTAUTH_URL=                        # App URL
GOOGLE_CLIENT_ID=                    # Google OAuth
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=                    # GitHub OAuth
GITHUB_CLIENT_SECRET=

# Email
RESEND_API_KEY=                      # Resend API key

# Storage
BLOB_READ_WRITE_TOKEN=               # Vercel Blob

# Rate Limiting
UPSTASH_REDIS_REST_URL=              # Upstash Redis
UPSTASH_REDIS_REST_TOKEN=

# Analytics
TINYBIRD_API_KEY=                    # Tinybird
TINYBIRD_API_URL="https://api.tinybird.co"

# Payments
SQUEEZY_API_KEY=                     # Lemon Squeezy
SQUEEZY_STORE_ID=
SQUEEZY_WEBHOOK_SECRET=
NUCELO_PRO_ID=                       # Pro plan product ID

# Domain Management
VERCEL_AUTH_TOKEN=                   # Vercel API token
VERCEL_PROJECT_ID=                   # Project ID
VERCEL_TEAM_ID=                      # Team ID

# Optional
LOGSNAG_TOKEN=                       # LogSnag logging
TIPTAP_TOKEN=                        # TipTap Pro extensions
```

### Database Migrations

**Using Prisma**:

```bash
# Development (push schema changes)
npx prisma db push

# Production (create migration)
npx prisma migrate dev --name describe_changes

# Apply migrations
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate

# Prisma Studio (GUI)
npx prisma studio
```

**Schema location**: `/home/user/nucelo/prisma/schema.prisma`

**Main models**: User, Article, Project, Bookmark, Collection, Subscriber, Account, Session

### Code Formatting

```bash
# Format all files
npm run format

# Or manually
npx prettier --write "**/*.{js,jsx,ts,tsx,mdx}"
```

**Configuration**: `/home/user/nucelo/prettier.config.mjs`

**Plugins**:
- `prettier-plugin-organize-imports` - Auto-sort imports
- `prettier-plugin-tailwindcss` - Sort Tailwind classes

### Linting

```bash
npm run lint
```

**Configuration**: `/home/user/nucelo/.eslintrc.json`

### Email Template Development

```bash
npm run email
# Opens React Email dev server on http://localhost:7777
```

**Templates location**: `/home/user/nucelo/emails/`

---

## Code Conventions

### TypeScript Conventions

1. **Strict mode enabled** - No implicit any, null checks enforced
2. **Path aliases**:
   - `@/*` → `./src/*`
   - `@/emails/*` → `./emails/*`
3. **Type imports**: Use `import type` for type-only imports
4. **Prisma types**: Import from `@prisma/client` (auto-generated)
5. **Zod inference**: Use `z.infer<typeof schema>` for type extraction

### Component Conventions

1. **Client vs Server Components**:
   - Default: Server Components (no directive)
   - Client: Add `"use client"` at top of file
   - Use client components for: interactivity, hooks, browser APIs

2. **Component structure**:
   ```typescript
   // imports
   import { ... } from "..."

   // types
   interface ComponentProps {
     ...
   }

   // component
   export function Component({ props }: ComponentProps) {
     return <div>...</div>
   }
   ```

3. **Naming**:
   - Components: PascalCase (`ArticleCard.tsx`)
   - Files: kebab-case or PascalCase (both accepted)
   - Hooks: camelCase with "use" prefix (`useArticle.ts`)

### Styling Conventions

1. **Tailwind utility classes** - Primary styling method
2. **CSS variables** - For theme colors (defined in `globals.css`)
3. **Class composition**:
   ```typescript
   import { cn } from "@/lib/utils" // tailwind-merge + clsx

   <div className={cn("base-class", conditional && "conditional-class")} />
   ```

4. **Component variants**:
   ```typescript
   import { cva } from "class-variance-authority"

   const buttonVariants = cva("base-classes", {
     variants: {
       variant: { default: "...", destructive: "..." },
       size: { sm: "...", lg: "..." },
     },
   })
   ```

5. **Custom CSS** - Only when Tailwind is insufficient (in `styles/` folder)

### File Organization

1. **Co-locate related files**:
   ```
   components/
     articles/
       article-card.tsx
       article-form.tsx
       article-list.tsx
   ```

2. **Barrel exports** - Avoid unless necessary (Next.js tree-shaking)

3. **Single responsibility** - One component/function per file

### API Route Conventions

1. **Use guard middleware** for protected routes
2. **Zod validation** for all inputs
3. **Error responses**:
   - `401` - Unauthorized (no session or plan mismatch)
   - `422` - Unprocessable Entity (validation error)
   - `429` - Too Many Requests (rate limit)
   - `500` - Internal Server Error (caught exceptions)

4. **Success responses**:
   - `200` - Success with data
   - `201` - Created
   - `204` - Success with no content

### Database Conventions

1. **All queries through Prisma**
2. **Use transactions** for multi-model operations:
   ```typescript
   await db.$transaction([
     db.article.create(...),
     db.subscriber.updateMany(...),
   ])
   ```

3. **Soft deletes** - Not implemented (hard deletes used)
4. **Timestamps** - `createdAt` and `updatedAt` auto-managed by Prisma

### Git Conventions

**Commit message format**:
```
type: brief description

Examples:
feat: add bookmark collections
fix: resolve article publish date bug
refactor: simplify analytics queries
docs: update README setup instructions
```

**Branch naming**:
```
feature/description
fix/description
refactor/description
```

---

## Common Tasks

### Adding a New API Route

1. **Create route file**:
   ```typescript
   // app/api/example/route.ts
   import { guard } from "@/lib/auth"
   import { exampleSchema } from "@/lib/validations/example"

   export const POST = guard(
     async ({ user, body }) => {
       // Your logic
       return Response.json({ success: true })
     },
     { schemas: { bodySchema: exampleSchema } }
   )
   ```

2. **Create validation schema**:
   ```typescript
   // lib/validations/example.ts
   import { z } from "zod"

   export const exampleSchema = z.object({
     field: z.string().min(1),
   })
   ```

3. **Add server action** (if needed):
   ```typescript
   // lib/actions/example.ts
   "use server"
   import { db } from "../db"

   export async function createExample(data: ExampleSchema) {
     return await db.example.create({ data })
   }
   ```

### Adding a New Page

1. **Create page file** in appropriate route group:
   ```typescript
   // app/(app)/example/page.tsx
   import { getUser } from "@/lib/fetchers/users"

   export default async function ExamplePage() {
     const user = await getUser()
     return <div>Example Page</div>
   }
   ```

2. **Update navigation config**:
   ```typescript
   // config/app.ts
   export const appConfig = {
     navigation: [
       { href: "/example", label: "Example" },
     ],
   }
   ```

### Adding a New Component

1. **Create component file**:
   ```typescript
   // components/example/example-card.tsx
   "use client" // if needs interactivity

   interface ExampleCardProps {
     title: string
   }

   export function ExampleCard({ title }: ExampleCardProps) {
     return <div>{title}</div>
   }
   ```

2. **Use in page**:
   ```typescript
   import { ExampleCard } from "@/components/example/example-card"
   ```

### Updating Database Schema

1. **Edit Prisma schema**:
   ```prisma
   // prisma/schema.prisma
   model Example {
     id        String   @id @default(cuid())
     field     String
     createdAt DateTime @default(now())
   }
   ```

2. **Generate migration**:
   ```bash
   npx prisma migrate dev --name add_example_model
   ```

3. **Update TypeScript types**:
   ```bash
   npx prisma generate
   ```

### Adding Analytics Tracking

1. **Send event to Tinybird**:
   ```typescript
   import { trackAnalytics } from "@/lib/analytics"

   await trackAnalytics({
     event: "example_action",
     exampleId: "...",
     metadata: { ... },
   })
   ```

2. **Create Tinybird pipeline** (via Tinybird console)

3. **Query analytics**:
   ```typescript
   import { getAnalytics } from "@/lib/tinybird"

   const data = await getAnalytics("example_action", { ... })
   ```

### Sending Emails

1. **Create email template**:
   ```typescript
   // emails/example-email.tsx
   import { Html, Text } from "@react-email/components"

   export default function ExampleEmail({ name }: { name: string }) {
     return (
       <Html>
         <Text>Hello {name}</Text>
       </Html>
     )
   }
   ```

2. **Send email**:
   ```typescript
   import { resend } from "@/lib/resend"
   import ExampleEmail from "@/emails/example-email"

   await resend.emails.send({
     from: "noreply@nucelo.com",
     to: "user@example.com",
     subject: "Example",
     react: ExampleEmail({ name: "User" }),
   })
   ```

### Rate Limiting an Endpoint

1. **Define rate limit**:
   ```typescript
   // lib/ratelimit.ts
   export const rateLimit = {
     example: new Ratelimit({
       redis,
       limiter: Ratelimit.slidingWindow(10, "1 h"), // 10 requests per hour
     }),
   }
   ```

2. **Apply in API route**:
   ```typescript
   const { success } = await rateLimit.example.limit(userId)
   if (!success) {
     return new Response("Rate limit exceeded", { status: 429 })
   }
   ```

---

## Important Files Reference

### Configuration Files

| File | Purpose | Location |
|------|---------|----------|
| `next.config.ts` | Next.js configuration | `/home/user/nucelo/next.config.ts` |
| `tsconfig.json` | TypeScript compiler config | `/home/user/nucelo/tsconfig.json` |
| `tailwind.config.ts` | Tailwind CSS config | `/home/user/nucelo/tailwind.config.ts` |
| `postcss.config.mjs` | PostCSS plugins | `/home/user/nucelo/postcss.config.mjs` |
| `prettier.config.mjs` | Code formatting rules | `/home/user/nucelo/prettier.config.mjs` |
| `.eslintrc.json` | Linting rules | `/home/user/nucelo/.eslintrc.json` |
| `.npmrc` | NPM registry config | `/home/user/nucelo/.npmrc` |

### Core Application Files

| File | Purpose | Location |
|------|---------|----------|
| `middleware.ts` | Multi-tenant routing | `/home/user/nucelo/src/middleware.ts` |
| `lib/auth.ts` | Auth config + guard | `/home/user/nucelo/src/lib/auth.ts` |
| `lib/db.ts` | Prisma client | `/home/user/nucelo/src/lib/db.ts` |
| `lib/utils.ts` | Utility functions | `/home/user/nucelo/src/lib/utils.ts` |
| `prisma/schema.prisma` | Database schema | `/home/user/nucelo/prisma/schema.prisma` |

### Configuration Modules

| File | Purpose | Location |
|------|---------|----------|
| `config/site.ts` | Site metadata | `/home/user/nucelo/src/config/site.ts` |
| `config/subscriptions.ts` | Plan definitions | `/home/user/nucelo/src/config/subscriptions.ts` |
| `config/app.ts` | App navigation | `/home/user/nucleo/src/config/app.ts` |

### Styling Files

| File | Purpose | Location |
|------|---------|----------|
| `styles/globals.css` | Global styles + Tailwind | `/home/user/nucelo/src/styles/globals.css` |
| `styles/editor.css` | TipTap editor styles | `/home/user/nucelo/src/styles/editor.css` |
| `styles/prose.css` | Typography styles | `/home/user/nucelo/src/styles/prose.css` |

---

## Security Considerations

### Authentication & Authorization

1. **Session validation** - All protected routes check session via guard middleware
2. **Plan enforcement** - Pro features blocked for Free users
3. **Resource ownership** - Always verify `authorId` matches session user
4. **Password protection** - User sites can be password-protected via cookies

### Input Validation

1. **Zod schemas** - All API inputs validated with Zod
2. **SQL injection** - Prevented by Prisma (parameterized queries)
3. **XSS prevention** - React auto-escapes, TipTap sanitizes HTML
4. **CSRF protection** - Next.js built-in CSRF tokens

### Rate Limiting

1. **Newsletter sending** - 2 per day per article
2. **Upstash Redis** - Distributed rate limiting
3. **Extendable** - Add limits for registration, API calls, etc.

### Environment Variables

1. **Never commit `.env`** - Use `.env.example` as template
2. **Server-side only** - Don't prefix secrets with `NEXT_PUBLIC_`
3. **Rotation** - Rotate secrets regularly (NEXTAUTH_SECRET, API keys)

### File Uploads

1. **Vercel Blob** - Trusted storage provider
2. **Sharp** - Image processing (resize, optimize)
3. **File validation** - Validate file types and sizes
4. **Access control** - Verify user owns uploaded files

### Custom Domains

1. **Vercel API** - Trusted domain provisioning
2. **SSL certificates** - Auto-provisioned by Vercel
3. **DNS validation** - User must configure DNS records

---

## Troubleshooting

### Common Issues

#### 1. Prisma Client Not Generated
**Error**: `Cannot find module '@prisma/client'`

**Solution**:
```bash
npx prisma generate
```

#### 2. Environment Variables Not Loaded
**Error**: `undefined` values for env vars

**Solution**:
- Ensure `.env` exists (copy from `.env.example`)
- Restart dev server after adding env vars
- Check variable names match exactly (case-sensitive)

#### 3. TipTap Extensions Not Installing
**Error**: `401 Unauthorized` during npm install

**Solution**:
- Add `TIPTAP_TOKEN` to `.npmrc`:
  ```
  @tiptap-pro:registry=https://registry.tiptap.dev/
  //registry.tiptap.dev/:_authToken=${TIPTAP_TOKEN}
  ```
- Get token from https://tiptap.dev

#### 4. Database Connection Errors
**Error**: `Can't reach database server`

**Solution**:
- Verify `DATABASE_URL` in `.env`
- Check Neon dashboard for connection string
- Use `DIRECT_URL` for migrations
- Ensure database is not paused (Neon auto-pauses)

#### 5. Next.js Build Errors
**Error**: Type errors during `npm run build`

**Solution**:
- Run `npm run lint` to see all errors
- Check for missing types: `npm i --save-dev @types/node @types/react @types/react-dom`
- Ensure all imports are correct

#### 6. Middleware Redirects Not Working
**Error**: 404 on custom domains or user subdomains

**Solution**:
- Check `NEXT_PUBLIC_USER_DOMAIN` and `NEXT_PUBLIC_APP_DOMAIN` in `.env`
- Verify middleware matcher in `middleware.ts`
- Test locally with `hosts` file:
  ```
  127.0.0.1 app.nucelo.test
  127.0.0.1 user.nucelo.test
  ```

#### 7. Email Not Sending
**Error**: Magic link or newsletter not received

**Solution**:
- Verify `RESEND_API_KEY` in `.env`
- Check Resend dashboard for sending limits
- In development, magic link logged to console (not sent)
- Check spam folder

#### 8. Analytics Not Tracking
**Error**: No data in analytics dashboard

**Solution**:
- Verify `TINYBIRD_API_KEY` and `TINYBIRD_API_URL` in `.env`
- Check Tinybird pipelines are created
- Ensure analytics events are being sent (check network tab)
- Verify time zone settings

#### 9. Subscription/Payment Issues
**Error**: Pro plan not activating

**Solution**:
- Verify `SQUEEZY_API_KEY`, `SQUEEZY_STORE_ID`, `NUCLEO_PRO_ID` in `.env`
- Check webhook secret matches Lemon Squeezy settings
- Test webhook endpoint: `/api/webhooks/squeezy`
- Check user's subscription status in database

#### 10. Rate Limiting Not Working
**Error**: Users can exceed rate limits

**Solution**:
- Verify `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` in `.env`
- Check Upstash dashboard for Redis instance status
- Test rate limit manually (send multiple requests)
- Ensure unique keys per user/action

### Debug Mode

Enable verbose logging in development:

```typescript
// lib/db.ts
const db = new PrismaClient({
  log: ["query", "error", "warn"],
})
```

### Vercel Deployment Issues

1. **Environment variables** - Set in Vercel dashboard
2. **Build command** - Should be `npm run build`
3. **Output directory** - `.next` (auto-detected)
4. **Node version** - Ensure compatible version (18.x+)
5. **Edge runtime** - Ensure middleware and edge routes use edge-compatible packages

### Performance Optimization

1. **Image optimization** - Use Next.js `<Image>` component
2. **Code splitting** - Use dynamic imports for large components
3. **Database indexing** - Add indexes for frequently queried fields
4. **Caching** - Use SWR for client-side caching
5. **Edge runtime** - Use for latency-sensitive routes

---

## Additional Resources

### Documentation Links
- **Next.js**: https://nextjs.org/docs
- **React**: https://react.dev
- **TypeScript**: https://www.typescriptlang.org/docs
- **Prisma**: https://www.prisma.io/docs
- **TipTap**: https://tiptap.dev/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **NextAuth.js**: https://next-auth.js.org/getting-started
- **Zod**: https://zod.dev
- **SWR**: https://swr.vercel.app
- **Radix UI**: https://www.radix-ui.com/primitives

### Service Dashboards
- **Neon**: https://console.neon.tech
- **Vercel**: https://vercel.com/dashboard
- **Upstash**: https://console.upstash.com
- **Tinybird**: https://ui.tinybird.co
- **Resend**: https://resend.com/overview
- **Lemon Squeezy**: https://app.lemonsqueezy.com

### Community
- **GitHub Issues**: https://github.com/themanafov/nucelo/issues
- **Discussions**: https://github.com/themanafov/nucelo/discussions

---

## Changelog

**2025-11-17** - Initial CLAUDE.md creation
- Comprehensive codebase documentation
- Architecture patterns documented
- Development workflow established
- Code conventions defined
- Common tasks outlined
- Troubleshooting guide added

---

## Contributing

When making changes:

1. **Read this file first** - Understand architecture and conventions
2. **Follow patterns** - Use existing patterns for consistency
3. **Test thoroughly** - Test locally before committing
4. **Update docs** - Update this file if architecture changes
5. **Format code** - Run `npm run format` before committing

---

**End of CLAUDE.md** - Last updated 2025-11-17
