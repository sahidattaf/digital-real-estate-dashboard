import { Property } from '@/types/property';
import propertiesData from '@/data/properties.json';

// In a real app, this would be an API call to a backend (Supabase/Postgres)
// For v0.3, we use a simulation delay with our Single Source of Truth JSON

export async function fetchProperties(): Promise<Property[]> {
    // Cast the JSON data to the Property type
    // In a real scenario, we would validate this data with Zod or similar
    const data = propertiesData as unknown as Property[];

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 600);
    });
}

// Helper to fetch a single property by ID
export async function fetchPropertyById(id: string): Promise<Property | undefined> {
    const properties = await fetchProperties();
    return properties.find(p => p.id === id);
}

// Helper to fetch properties by Phase (e.g. for Map views)
export async function fetchPropertiesByPhase(phase: string): Promise<Property[]> {
    const properties = await fetchProperties();
    return properties.filter(p => p.phase === phase);
}

