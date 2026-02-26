# Project Dashboard

A mini SaaS project management dashboard built with Next.js 15, Tailwind CSS, and Supabase.

**Live Demo**: [https://dashboard-alpha-one-22.vercel.app](https://dashboard-alpha-one-22.vercel.app/login)

## Features

- **Authentication**: Sign up, sign in, and logout with Supabase Auth
- View, create, edit, and delete projects
- Filter projects by status (Active, On Hold, Completed)
- Search projects by name
- Sortable table columns
- Responsive design (table on desktop, cards on mobile)
- Dark mode support

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (JWT-based)
- **Validation**: Zod

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/dashboard.git
cd dashboard
npm install
```

### 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Go to **Settings** → **API** and copy your:
   - Project URL (e.g., `https://abcxyz.supabase.co`)
   - anon public key

### 3. Set up the database

Run this SQL in Supabase SQL Editor:

```sql
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  status text NOT NULL CHECK (status IN ('active', 'on_hold', 'completed')),
  deadline date NOT NULL,
  assigned_to text NOT NULL,
  budget numeric(12,2) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Disable RLS for development (or set up policies for production)
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
```

### 4. Configure environment variables

Create a `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 6. Create an account

1. Navigate to `/signup` to create a new account
2. Check your email for the confirmation link
3. Sign in at `/login`

### 7. (Optional) Seed sample data

```bash
npm run seed
```

## Deployment

### Vercel

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

### Supabase Auth Configuration

For production, configure your auth settings in Supabase:
1. Go to **Authentication** → **URL Configuration**
2. Set your **Site URL** to your Vercel deployment URL
3. Add your deployment URL to **Redirect URLs**

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/projects | List all projects (query: ?status=active&search=term) |
| POST | /api/projects | Create a new project |
| GET | /api/projects/[id] | Get project by ID |
| PUT | /api/projects/[id] | Update project by ID |
| DELETE | /api/projects/[id] | Delete project by ID |

## Project Structure

```
src/
├── app/
│   ├── api/projects/       # API routes
│   ├── auth/callback/      # Auth callback handler
│   ├── login/              # Login page
│   ├── signup/             # Signup page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Dashboard page (protected)
│   ├── loading.tsx         # Loading skeleton
│   └── error.tsx           # Error boundary
├── components/
│   ├── Header.tsx          # Header with logout
│   ├── ProjectTable.tsx    # Interactive table
│   ├── ProjectModal.tsx    # Add/edit form
│   ├── SearchFilter.tsx    # Search & filter
│   └── StatusBadge.tsx     # Status indicator
├── lib/
│   ├── supabase-server.ts  # Server-side Supabase client
│   ├── supabase-browser.ts # Browser-side Supabase client
│   ├── types.ts            # TypeScript types
│   └── validations.ts      # Zod schemas
└── middleware.ts           # Auth middleware
```

## Other Projects

Check out [Brand Echo](https://brand-echo.ai/) - an AI-powered platform for brand monitoring and social listening. If you're interested in working together or exploring similar solutions, feel free to reach out!

## License

MIT
