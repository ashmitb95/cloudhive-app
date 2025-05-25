# CloudHive Feature Idea Portal

This project is a proof of concept for CloudHive's internal feature idea submission tool. It allows employees to submit, explore, and vote on feature ideas for the Integration Hub product.

---

## Project Structure

```
cloudhive-app/
└── src/
    ├── app/          # Next.js App Router (pages, layouts, entry)
    ├── components/   # Reusable UI components (e.g., ui/)
    ├── constants/    # App-wide constants (priorities, routes, etc.)
    ├── data/         # Static JSON data (e.g., employees.json)
    ├── features/     # Feature modules (e.g., ideas/)
    ├── lib/          # Utilities, server actions, schemas
    ├── providers/    # React context and providers (e.g., QueryProvider)
    └── types/        # TypeScript type definitions
```

---

## Getting Started

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Run the development server:**
   ```bash
   pnpm dev
   ```

3. **Open** [http://localhost:3000](http://localhost:3000) in your browser.


## Features

- **Idea Submission:** Submit new feature ideas with summary, description, employee selection, and priority.
- **Idea Feed & Voting:** View ideas in a responsive, centered timeline/feed. Vote on ideas and see upvote/downvote counts.
- **Idea Details:** Click on an idea to view its full details.
- **Search & Filter:** Search ideas by keywords, filter by status, and sort by newest, oldest, or priority.
- **Pagination:** Display 20 ideas per page for performance.
- **Modern UI:** Responsive, accessible, and visually appealing feed layout.


## Technical Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **TailwindCSS** for styling
- **Radix UI** for accessible UI primitives
- **TanStack Query** for client-side state management
- **React Hook Form** for forms
- **pnpm** as the package manager


## Path Aliases

- The `@/` alias points to `src/`, so you can import modules like:
  ```ts
  import Button from '@/components/ui/button'
  import { getIdeas } from '@/lib/actions/server-ideas'
  ```

## Usage

- **Submit an idea:** Click "Submit Idea" in the header.
- **Browse ideas:** Use the search bar, filters, and pagination controls.
- **Vote:** Click the thumbs up/down icons on each idea card.
- **Responsive:** The feed is always centered and 50% of the viewport on desktop, full width on mobile.