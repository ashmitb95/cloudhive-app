# CloudHive Feature Idea Portal

This project is a proof of concept for CloudHive's internal feature idea submission tool. It allows employees to submit, explore, and vote on feature ideas for the Integration Hub product.

## Project Structure

```
cloudhive-app/
├── src/ 
   ├── app/                  # Next.js App Router pages
   ├── components/           # Reusable UI components
   ├── constants/            # App constants (priorities, routes)
   ├── data/                 # Static JSON data (employees, ideas)
   ├── features/             # Feature-specific components and logic
   ├── lib/                  # Utility functions, API helpers, server actions
   └── types/                # TypeScript type definitions
```

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Run the development server:
   ```bash
   pnpm dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **Idea Submission Form**: Submit new feature ideas with summary, description, employee selection, and priority.
- **Idea List & Voting**: View ideas sorted by upvotes, vote on ideas, and delete ideas.
- **Idea Exploration**: Click on an idea to view its full details.
- **Search Functionality**: Search ideas by keywords in summary or description.
- **Pagination**: Display 20 ideas per page for better performance.

## Technical Details

- Built with Next.js 15, React 19, TypeScript, and TailwindCSS.
- Uses pnpm as the package manager.
- RadixUI for accessible UI components.
- Server Actions or REST APIs for data interactions.
- TanStack Query for client-side state management.
- React Hook Form for form management.

## UI Components

We use RadixUI primitives wrapped in custom components to ensure:
- Accessibility
- Consistent styling
- Flexibility in customization
- Type safety 