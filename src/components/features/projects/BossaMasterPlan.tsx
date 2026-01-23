import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Home, TreePine } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

interface Plot {
    id: string;
    title: string;
    type: 'villa' | 'apartment' | 'amenity';
    area: string;
    price: string;
    status: 'sold' | 'available' | 'reserved';
    description: string;
    top: string;
    left: string;
}

const PLOTS: Plot[] = [
    {
        id: '1',
        title: 'Cluster A: Ocean Villas',
        type: 'villa',
        area: '500m² avg',
        price: 'From $450k',
        status: 'available',
        description: 'Prime plots with elevated ocean views. Perfect for custom 3-4 bedroom villas.',
        top: '30%',
        left: '20%'
    },
    {
        id: '2',
        title: 'Cluster B: Garden Residences',
        type: 'apartment',
        area: '120m² units',
        price: 'From $280k',
        status: 'reserved',
        description: 'Low-rise boutique apartments surrounding the central tropical garden.',
        top: '50%',
        left: '50%'
    },
    {
        id: '3',
        title: 'Community Wellness Center',
        type: 'amenity',
        area: '1,200m²',
        price: 'Not for sale',
        status: 'sold',
        description: 'Shared facility including gym, yoga studio, and co-working space.',
        top: '70%',
        left: '75%'
    },
];

const BossaMasterPlan = () => {
    const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);

    return (
        <div className="relative w-full h-[500px] rounded-2xl overflow-hidden glass-panel group shadow-2xl transition-all hover:shadow-emerald-900/20">
            {/* Map Background */}
            <img
                src="https://images.unsplash.com/photo-1544984243-ec57ea16fe25?q=80&w=2574&auto=format&fit=crop"
                alt="Bossa Piska Master Plan"
                className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-navy-900/40 group-hover:bg-navy-900/20 transition-colors duration-500" />

            {/* Interactive Pins */}
            {PLOTS.map((plot) => (
                <button
                    key={plot.id}
                    onClick={() => setSelectedPlot(plot)}
                    className={cn(
                        "absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
                        selectedPlot?.id === plot.id ? "scale-125 z-20" : "scale-100 hover:scale-110 z-10"
                    )}
                    style={{ top: plot.top, left: plot.left }}
                >
                    <div className="relative">
                        <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md border-2 transition-all",
                            plot.type === 'villa' ? "bg-emerald-600/90 border-emerald-400 text-white" :
                                plot.type === 'apartment' ? "bg-ocean-600/90 border-ocean-400 text-white" :
                                    "bg-orange-500/90 border-orange-400 text-white"
                        )}>
                            {plot.type === 'amenity' ? <TreePine size={18} /> : <Home size={18} />}
                        </div>

                        {/* Status Indicator Dot */}
                        <div className={cn(
                            "absolute -top-1 -right-1 w-3 h-3 rounded-full border border-white",
                            plot.status === 'available' ? "bg-green-500" :
                                plot.status === 'reserved' ? "bg-yellow-500" : "bg-red-500"
                        )} />

                        {/* Ripple Effect for Available Plots */}
                        {plot.status === 'available' && (
                            <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-30 -z-10" />
                        )}
                    </div>
                </button>
            ))}

            {/* Selected Plot Card */}
            <AnimatePresence>
                {selectedPlot && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80 glass-panel p-5 rounded-xl z-30 border border-white/10 shadow-2xl bg-navy-900/90 backdrop-blur-xl"
                    >
                        <div className="flex justify-between items-start mb-3">
                            <Badge variant={selectedPlot.status === 'available' ? 'success' : selectedPlot.status === 'reserved' ? 'warning' : 'secondary'}>
                                {selectedPlot.status.toUpperCase()}
                            </Badge>
                            <button onClick={() => setSelectedPlot(null)} className="text-slate-400 hover:text-white transition-colors">
                                ✕
                            </button>
                        </div>

                        <h3 className="text-lg font-bold text-white mb-1">{selectedPlot.title}</h3>
                        <div className="text-sm text-emerald-400 font-mono mb-3">{selectedPlot.price} • {selectedPlot.area}</div>

                        <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                            {selectedPlot.description}
                        </p>

                        <div className="flex gap-2">
                            <button className="flex-1 py-2 bg-ocean-600 hover:bg-ocean-500 text-white rounded-lg text-sm font-medium transition-colors">
                                View Details
                            </button>
                            {selectedPlot.status === 'available' && (
                                <button className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors">
                                    <ArrowRight size={18} />
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Legend - positioned simpler than Beach Map */}
            <div className="absolute top-6 left-6 flex gap-3 pointer-events-none">
                <div className="glass-chip px-3 py-1 flex items-center gap-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/5">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-[10px] text-white">Available</span>
                </div>
                <div className="glass-chip px-3 py-1 flex items-center gap-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/5">
                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                    <span className="text-[10px] text-white">Reserved</span>
                </div>
            </div>
        </div>
    );
};

export default BossaMasterPlan;
