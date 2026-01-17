export type PropertyType = 'residential' | 'commercial' | 'land' | 'mixed';
export type ListingType = 'sale' | 'rent' | 'both';
export type PropertyStatus = 'available' | 'reserved' | 'sold' | 'rented';

export interface Property {
    id: string;
    title: string;
    description: string;
    property_type: PropertyType;
    listing_type: ListingType;
    price_usd: number;
    price_ang?: number; // Optional local currency
    size_m2: number;
    bedrooms?: number;
    bathrooms?: number;
    location_lat?: number;
    location_lng?: number;
    address: string;
    status: PropertyStatus;
    images: string[];
    amenities: string[];
}

export interface PropertyFilter {
    type?: PropertyType;
    minPrice?: number;
    maxPrice?: number;
    listingType?: ListingType;
}
