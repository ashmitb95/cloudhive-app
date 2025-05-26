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


## Technical Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Radix UI** for accessible UI components
- **TanStack Query** for client-side state management
- **React Hook Form** for forms
- **pnpm** as the package manager


## Path Aliases

- The `@/` alias points to `src/`, so module imports need to follow the following convention:
  ```ts
  import Button from '@/components/ui/button'
  import { getIdeas } from '@/lib/actions/server-ideas'
  ```

## Constraints

 - The ideas.json file is present in src/data instead of the root of the app.
 - ~~The styling is minimal/non-existent. It appears there's an issue with the tailwind configuration that I am still debugging. It causes all of the tailwind styling to not get applied.~~
 -  ~~As an extension of the previous point, The components used in this repo are styled radix-ui components. The wrappers were initially created for them but due to styling issues, became diffcult to root-cause why the UI wasnt looking the way it should, and therefore were removed.~~ Project is missing wrappers for extensible reusable primitives
 - While not part of the scope, I intended to deploy this app to vercel to make it ready for use, without needing to check out the repo. The build keeps throwing 500 errors for the listing page.
 The app is therefore deployed to vercel, however not working as expected. Curious to find out why. Did not get the time just yet.