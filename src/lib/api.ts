import { Property } from '@/types/property';

// Mock Data matching the Seed Data in schema.sql
const MOCK_PROPERTIES: Property[] = [
    {
        id: 'prop_001',
        title: 'Luxury Oceanview Villa',
        description: 'Stunning 5-bedroom villa with panoramic views of the Caribbean Sea. Features infinity pool, smart home system, and private beach access.',
        property_type: 'residential',
        listing_type: 'sale',
        price_usd: 1250000,
        price_ang: 2225000,
        size_m2: 450,
        bedrooms: 5,
        bathrooms: 4.5,
        address: 'Vista Royal, Willemstad',
        status: 'available',
        images: [
            'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2671&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop'
        ],
        amenities: ['Pool', 'Ocean View', 'Smart Home', 'Garage']
    },
    {
        id: 'prop_002',
        title: 'Downtown Commercial Space',
        description: 'Prime retail location in the heart of Punda. High foot traffic area, perfect for a boutique or gallery.',
        property_type: 'commercial',
        listing_type: 'rent',
        price_usd: 3500, // Monthly
        size_m2: 120,
        address: 'Punda, Willemstad',
        status: 'available',
        images: [
            'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop'
        ],
        amenities: ['AC', 'Security', 'Storefront']
    },
    {
        id: 'prop_003',
        title: 'Beachfront Development Lot',
        description: 'Exclusive 2000m2 lot ready for development. Zoning approved for mixed-use restaurant and resort.',
        property_type: 'land',
        listing_type: 'sale',
        price_usd: 850000,
        size_m2: 2000,
        address: 'Jan Thiel, Willemstad',
        status: 'available',
        images: [
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2673&auto=format&fit=crop'
        ],
        amenities: ['Beach Access', 'Zoning Approved']
    },
    {
        id: 'prop_004',
        title: 'Modern City Apartment',
        description: 'Sleek 2-bedroom apartment with city views and rooftop terrace access.',
        property_type: 'residential',
        listing_type: 'rent',
        price_usd: 2200,
        size_m2: 110,
        bedrooms: 2,
        bathrooms: 2,
        address: 'Pietermaai, Willemstad',
        status: 'rented',
        images: [
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2670&auto=format&fit=crop'
        ],
        amenities: ['Rooftop', 'Gym', 'Wifi']
    }
];

export async function fetchProperties(): Promise<Property[]> {
    // Simulate network delay
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK_PROPERTIES);
        }, 800);
    });
}
