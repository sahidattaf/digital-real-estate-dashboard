import { Property } from '@/types/property';
import { Badge } from '@/components/ui/Badge';
import { MapPin, BedDouble, Bath, Ruler, ArrowRight, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface ListingCardProps {
    property: Property;
}

const ListingCard: React.FC<ListingCardProps> = ({ property }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="group relative flex flex-col glass-card rounded-2xl overflow-hidden"
        >
            {/* Image Section */}
            <div className="relative h-64 overflow-hidden">
                <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                    <Badge variant={property.status === 'available' ? 'success' : 'secondary'} className="backdrop-blur-md">
                        {property.status.toUpperCase()}
                    </Badge>
                </div>

                {/* Listing Type & Price Badge */}
                <div className="absolute top-4 right-4 flex gap-2">
                    <button className="p-2 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-ocean-500/80 transition-colors">
                        <Heart size={16} />
                    </button>
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-900 to-transparent p-4 pt-10">
                    <div className="flex justify-between items-end">
                        <Badge variant="default" className="capitalize bg-ocean-600/90 text-white border-none mb-2">
                            {property.property_type}
                        </Badge>
                        <span className="text-2xl font-bold text-white drop-shadow-lg">
                            ${property.price_usd.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-5 flex flex-col gap-3">
                <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-ocean-400 transition-colors line-clamp-1">
                        {property.title}
                    </h3>
                    <div className="flex items-center gap-1 text-slate-400 text-sm mt-1">
                        <MapPin size={14} />
                        <span>{property.address}</span>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5">
                    {property.bedrooms && (
                        <div className="flex items-center gap-2 text-slate-300">
                            <BedDouble size={16} className="text-ocean-400" />
                            <span className="text-sm font-medium">{property.bedrooms} Beds</span>
                        </div>
                    )}
                    {property.bathrooms && (
                        <div className="flex items-center gap-2 text-slate-300">
                            <Bath size={16} className="text-ocean-400" />
                            <span className="text-sm font-medium">{property.bathrooms} Baths</span>
                        </div>
                    )}
                    <div className="flex items-center gap-2 text-slate-300">
                        <Ruler size={16} className="text-ocean-400" />
                        <span className="text-sm font-medium">{property.size_m2}m²</span>
                    </div>
                </div>

                <div className="mt-auto pt-2 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">
                        {property.listing_type === 'sale' ? 'For Sale' : 'For Rent'}
                    </span>
                    <button className="flex items-center gap-1 text-ocean-400 text-sm font-bold hover:text-ocean-300 transition-colors group/btn">
                        Details <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ListingCard;
