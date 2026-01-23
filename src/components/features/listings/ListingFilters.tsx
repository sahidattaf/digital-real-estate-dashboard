import { Search, SlidersHorizontal } from 'lucide-react';

interface FilterState {
    search: string;
    status: string;
    type: string;
    priceRange: string;
}

interface ListingFiltersProps {
    filters: FilterState;
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const ListingFilters = ({ filters, setFilters }: ListingFiltersProps) => {
    const handleChange = (key: keyof FilterState, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="w-full glass-panel p-4 rounded-xl flex flex-col md:flex-row gap-4 mb-8">

            {/* Search Input */}
            <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => handleChange('search', e.target.value)}
                    placeholder="Search properties by location, name..."
                    className="w-full bg-navy-800/50 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-ocean-600 transition-all"
                />
            </div>

            {/* Dropdowns */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0">
                <select
                    value={filters.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className="bg-navy-800/50 text-white border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ocean-600"
                >
                    <option value="">Status (All)</option>
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                </select>

                <select
                    value={filters.type}
                    onChange={(e) => handleChange('type', e.target.value)}
                    className="bg-navy-800/50 text-white border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ocean-600"
                >
                    <option value="">Type (All)</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="land">Land</option>
                </select>

                <select
                    value={filters.priceRange}
                    onChange={(e) => handleChange('priceRange', e.target.value)}
                    className="bg-navy-800/50 text-white border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ocean-600"
                >
                    <option value="">Price Range</option>
                    <option value="0-500000">$0 - $500k</option>
                    <option value="500000-1000000">$500k - $1M</option>
                    <option value="1000000+">$1M+</option>
                </select>

                <button className="flex items-center gap-2 px-4 py-2.5 bg-ocean-600/10 text-ocean-400 hover:bg-ocean-600/20 border border-ocean-600/30 rounded-lg transition-colors whitespace-nowrap">
                    <SlidersHorizontal size={16} />
                    <span className="text-sm font-medium">Advanced</span>
                </button>
            </div>
        </div>
    );
};

export default ListingFilters;
