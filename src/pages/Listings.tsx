import { useEffect, useState } from 'react';
import { fetchProperties } from '@/lib/api';
import { Property } from '@/types/property';
import ListingCard from '@/components/features/listings/ListingCard';
import ListingFilters from '@/components/features/listings/ListingFilters';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Listings = () => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    const [filters, setFilters] = useState({
        search: '',
        status: '',
        type: '',
        priceRange: ''
    });

    useEffect(() => {
        const loadProperties = async () => {
            const data = await fetchProperties();
            setProperties(data);
            setLoading(false);
        };
        loadProperties();
    }, []);

    const filteredProperties = properties.filter(property => {
        // Search Filter
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            const matchesSearch =
                property.title.toLowerCase().includes(searchTerm) ||
                property.address.toLowerCase().includes(searchTerm);
            if (!matchesSearch) return false;
        }

        // Status Filter
        if (filters.status && property.listing_type !== filters.status) return false;

        // Type Filter
        if (filters.type && property.property_type !== filters.type) return false;

        // Price Filter
        if (filters.priceRange) {
            const [min, max] = filters.priceRange.split('-').map(val => val === '1000000+' ? 1000000 : Number(val));
            if (filters.priceRange === '1000000+') {
                if (property.price_usd < 1000000) return false;
            } else {
                if (property.price_usd < min || property.price_usd > max) return false;
            }
        }

        return true;
    });

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Find Your Dream Property</h1>
                <p className="text-slate-400">Explore the finest real estate in Curaçao.</p>
            </div>

            <ListingFilters filters={filters} setFilters={setFilters} />

            {loading ? (
                <div className="flex flex-col items-center justify-center h-64 text-ocean-400">
                    <Loader2 size={40} className="animate-spin mb-4" />
                    <p className="text-sm font-medium animate-pulse">Loading Properties...</p>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {filteredProperties.length > 0 ? (
                        filteredProperties.map((property) => (
                            <ListingCard key={property.id} property={property} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 text-slate-500">
                            No properties found matching your criteria.
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export default Listings;
