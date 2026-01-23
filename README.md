# Digital Real Estate Dashboard (Bossa Estate)

A modern, high-performance dashboard for viewing, managing, and tokenizing real estate assets in Curaçao. Built with React, TypeScript, and Vite.

## 🚀 Features

* **Interactive Master Plans**: Visual plot selection for development projects (Bossa Piska).
* **Property Listings**: robust filtering and search for available properties.
* **Tokenization Preview**: Interface for minting NFT deeds (Testnet demo).
* **Client Portal**: KYC and document tracking for investors.

## 🛠 Tech Stack

* **Frontend**: React 18, TypeScript, Vite
* **Styling**: TailwindCSS, Framer Motion, Lucide Icons
* **State**: Zustand + React Context
* **Data**: JSON-based Single Source of Truth (v0.3)

## 📦 Getting Started

1. Clone the repository
2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the development server:

    ```bash
    npm run dev
    ```

## 🏗 Architecture (v0.3)

See [docs/architecture.md](./docs/architecture.md) for detailed system design and backend migration plans.

### Key Changes in v0.3

* **Unified Data Model**: All properties and plots are served from `src/data/properties.json`.
* **Interactive Drawer**: New slide-over details view for map plots.
* **Inquiry System**: Capture leads directly from the map view (currently saved to LocalStorage).
* **Normalized Types**: strict `Property` TypeScript interfaces.

## 📝 Roadmap

* [x] Phase 1: Static Dashboard
* [x] Phase 2: Interactive Lists & Maps (current)
* [ ] Phase 3: Supabase Backend Integration
* [ ] Phase 4: Web3 Wallet Real Integration
