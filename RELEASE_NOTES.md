# Release Notes

## v0.3.0 - The "Architecture" Update

*2024-03-20*

### 🌟 New Features

* **Single Source of Truth**: Migrated hardcoded mock data to a unified `src/data/properties.json` file. This ensures the Listing View and Map View always show consistent data.
* **Interactive Plot Drawer**: Clicking a plot on the Bossa Piska Master Plan now opens a smooth slide-over drawer with full details.
* **Inquiry Form**: Users can now submit interest for specific plots directly from the interface. Data is effectively simulated and preserved in LocalStorage.
* **Enhanced Filtering**: Property listings now support filtering by price range, type, and status, all powered by the new normalized data model.

### 🔧 Improvements

* **Refactored `api.ts`**: Simplified data fetching logic to simulate async network calls against the local JSON.
* **Strict Typing**: Updated `Property` and `Plot` interfaces to share a common schema, reducing code duplication.
* **Performance**: Optimized map rendering with better CSS positioning and reduced re-renders.

### 🐛 Bug Fixes

* Fixed Type consistency issues between "Listings" and "Map" views.
* Resolved layout shift when loading properties.

### 🔮 Next Steps

* Migration to Supabase for persistent data storage.
* Admin panel for managing property status.
