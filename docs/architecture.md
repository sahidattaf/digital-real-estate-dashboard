# v0.3 Architecture Overview

## Overview

The Digital Real Estate Dashboard is a React-based single-page application (SPA) designed to showcase real estate assets, process inquiries, and handle future tokenization logic.

Version 0.3 introduces a unified data source ("Single Source of Truth") to ensure consistency across the List View and Map View.

## High-Level Diagram

```mermaid
graph TD
    A[Client Browser] --> B[React App (Vite)]
    B --> C[Properties Store (properties.json)]
    
    subgraph "Frontend Layer"
        D[Pages]
        E[Components]
        F[Hooks/API]
    end
    
    B --> D
    D --> E
    E --> F
    F --> C
    
    subgraph "Data & State"
        C
        G[LocalStorage (Inquiries)]
    end
    
    subgraph "Future Backend (Planned)"
        H[Supabase / Postgres]
        I[Edge Functions]
    end
    
    F -.-> H
```

## Data Model

### Property

We use a normalized JSON structure (`src/data/properties.json`) to drive the app.

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier (e.g., `prop_001`, `plot_a_1`) |
| `type` | enum | `residential`, `commercial`, `land` |
| `status` | enum | `available`, `reserved`, `sold` |
| `price` | object | `{ amount: number, currency: "USD", label?: string }` |
| `location` | object | Address and coordinates/map positioning |
| `phase` | string | Development phase (e.g., "1", "2") |

### Inquiry Handling (v0.3)

Currently, inquiries are captured via a form in the Property Drawer and persisted to `localStorage` under the key `bossa_inquiries`.

**Schema:**

```json
{
  "id": "uuid",
  "propertyId": "string",
  "name": "string",
  "email": "string",
  "message": "string",
  "timestamp": "ISO8601"
}
```

### AI Chatbot (RAG-lite)

The "Bossa Assistant" uses a frontend-only Retrieval-Augmented Generation (RAG) approach.

1. **Index**: It loads `src/data/properties.json` into memory.
2. **Retrieval**: Uses regex-based intent classification to filter properties by:
    * Price (e.g., "under $1M")
    * Type (e.g., "villa", "land")
    * Status (e.g., "available")
    * Phase (e.g., "Phase 2")
3. **Generation**: Constructs a natural language response summarizing the top matching results.

## Migration Path to Backend

To move to a production backend (v1.0):

1. **Database**: set up a Postgres database (e.g., Supabase).
    * Table: `properties` (Mirror the JSON schema)
    * Table: `inquiries` (Linked to properties)
    * Table: `users` (Auth)
2. **API Layer**: Replace `src/lib/api.ts` implementation.
    * `fetchProperties` -> `supabase.from('properties').select('*')`
    * `submitInquiry` -> `supabase.from('inquiries').insert(...)`
3. **Authentication**: Integrate Supabase Auth for the "Client Portal".

## Component Architecture

* **Pages**: Route-level components (`Listings.tsx`, `BossaPiskaProject.tsx`).
* **Features**: Domain-specific logic (`ListingCard`, `BossaMasterPlan`).
* **UI**: Generic, reusable components (`Badge`, `Button`).
