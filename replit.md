# Car Sales Radar Dashboard

## Overview

Car Sales Radar is a Korean automotive sales analytics dashboard that tracks and displays "rapidly rising" car models based on month-over-month sales performance. The application consumes data derived from KAMA (Korea Automobile Manufacturers Association) and KAIDA (Korea Automobile Importers & Distributors Association) official statistics via Danawa Auto.

The core value proposition is scoring and ranking car models by their sales momentum using a weighted algorithm that considers absolute sales growth, percentage growth, and rank changes. Users can toggle between domestic and imported vehicle markets and filter results by various criteria.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style variant)
- **Build Tool**: Vite with custom plugins for Replit integration

The frontend follows a component-based architecture with:
- Page components in `client/src/pages/`
- Reusable UI components in `client/src/components/`
- shadcn/ui primitives in `client/src/components/ui/`
- Custom hooks in `client/src/hooks/`

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Pattern**: RESTful JSON endpoints under `/api/`

Key endpoints:
- `GET /api/months` - Returns available data months
- `GET /api/radar` - Returns scored model data for a given month and nation

### Data Layer
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Location**: `shared/schema.ts` (shared between client and server)
- **Validation**: Zod schemas for runtime type checking

Currently uses in-memory mock data (`server/storage.ts`) with hardcoded sample models. The storage interface (`IStorage`) is designed for easy database integration.

### Scoring Algorithm
Models are scored using z-score normalization across three weighted factors:
- 55% - Absolute month-over-month change (momAbs)
- 35% - Percentage growth capped at 500% (momPct)  
- 10% - Rank position change (rankChange)

### Shared Code
The `shared/` directory contains TypeScript types and Zod schemas used by both frontend and backend, ensuring type safety across the full stack.

### Build System
- Development: Vite dev server with HMR proxied through Express
- Production: Vite builds static assets to `dist/public/`, esbuild bundles server to `dist/index.cjs`

## External Dependencies

### Database
- **PostgreSQL**: Primary database (connection via `DATABASE_URL` environment variable)
- **Drizzle Kit**: Database migrations in `./migrations/`

### Third-Party Data Source
- **Danawa Auto**: Sales data sourced from `auto.danawa.com` using URL patterns for domestic and import markets. Data is derived/scored rather than republished directly due to usage restrictions noted in the attached requirements.

### Frontend Libraries
- **Radix UI**: Accessible component primitives (dialogs, dropdowns, tabs, etc.)
- **Lucide React**: Icon library
- **date-fns**: Date formatting utilities
- **Embla Carousel**: Carousel functionality
- **Recharts**: Charting library (via shadcn/ui chart component)

### Session Management
- **connect-pg-simple**: PostgreSQL session store (available but not currently wired)
- **express-session**: Session middleware support

### Design System
- Material Design 3 principles adapted for data dashboard use case
- Noto Sans KR (Korean) + Inter fonts via Google Fonts CDN
- Dark/light theme support with system preference detection