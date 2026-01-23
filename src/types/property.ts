export type PropertyType = 'residential' | 'commercial' | 'land' | 'mixed';
export type ListingType = 'sale' | 'rent' | 'both';
export type PropertyStatus = 'available' | 'reserved' | 'sold' | 'rented';

export interface PropertyPrice {
    amount: number;
    currency: string;
    period?: 'monthly' | 'yearly';
    label?: string; // For display like "From $450k" or "Not for sale"
}

export interface MapPosition {
    top: string;
    left: string;
}

export interface PropertyLocation {
    address: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
    map_position?: MapPosition;
}

export interface PropertySpecifications {
    bedrooms?: number;
    bathrooms?: number;
}

export interface Property {
    id: string;
    title: string;
    description: string;
    type: PropertyType;
    listing_type: ListingType;
    status: PropertyStatus;
    price: PropertyPrice;
    area_m2: number;
    location: PropertyLocation;
    images: string[];
    amenities: string[];
    specifications?: PropertySpecifications;
    phase?: string;
    plot_number?: string;
}

export interface PropertyFilter {
    type?: PropertyType;
    minPrice?: number;
    maxPrice?: number;
    listingType?: ListingType;
}
