import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

interface Zone {
    id: string;
    name: string;
    type: 'commercial' | 'residential' | 'hospitality';
    size: string;
    status: 'planned' | 'development' | 'available';
    description: string;
    top: string;
    left: string;
}

const ZONES: Zone[] = [
    { id: '1', name: 'Bossa Ocean Club', type: 'commercial', size: '5,000 m²', status: 'development', description: 'Premium beachfront dining and leisure club.', top: '40%', left: '30%' },
    { id: '2', name: 'Coral Estate Villas', type: 'residential', size: '450,000 m²', status: 'available', description: 'Exclusive luxury villas with private ocean access.', top: '25%', left: '60%' },
    { id: '3', name: 'The Pyramound Hotel', type: 'hospitality', size: '120,000 m²', status: 'planned', description: '5-Star eco-resort with 200 suites.', top: '60%', left: '70%' },
];

const BeachMasterPlan = () => {
    const [selectedZone, setSelectedZone] = useState<Zone | null>(null);

    return (
        <div className="relative w-full h-[600px] rounded-2xl overflow-hidden glass-panel group">
            {/* Map Background */}
            <img
                src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=2832&auto=format&fit=crop"
                alt="Willemstad Beach Master Plan"
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
            />

            {/* Dark Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/20 to-transparent pointer-events-none" />

            {/* Interactive Pins */}
            {ZONES.map((zone) => (
                <button
                    key={zone.id}
                    onClick={() => setSelectedZone(zone)}
                    className={cn(
                        "absolute transform -translate-x-1/2 -translate-y-1/2 group/pin transition-all duration-300",
                        selectedZone?.id === zone.id ? "scale-125 z-20" : "scale-100 hover:scale-110 z-10"
                    )}
                    style={{ top: zone.top, left: zone.left }}
                >
                    <div className="relative">
                        <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm border-2 transition-colors",
                            zone.type === 'commercial' ? "bg-sunset-500/80 border-sunset-400 text-white" :
                                zone.type === 'hospitality' ? "bg-purple-500/80 border-purple-400 text-white" :
                                    "bg-ocean-600/80 border-ocean-400 text-white"
                        )}>
                            <MapPin size={16} fill="currentColor" />
                        </div>
                        {/* Pulse Effect */}
                        <div className={cn(
                            "absolute inset-0 rounded-full animate-ping opacity-75",
                            zone.type === 'commercial' ? "bg-sunset-500" :
                                zone.type === 'hospitality' ? "bg-purple-500" :
                                    "bg-ocean-600"
                        )} />
                    </div>

                    {/* Hover Label */}
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/pin:opacity-100 transition-opacity bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none">
                        {zone.name}
                    </div>
                </button>
            ))}

            {/* Selected Zone Card Overlay */}
            <AnimatePresence>
                {selectedZone && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="absolute top-6 right-6 w-80 glass-card p-5 rounded-xl z-30"
                    >
                        <div className="flex justify-between items-start mb-3">
                            <Badge variant="outline" className="uppercase tracking-wider text-[10px] border-white/20 text-slate-300">
                                {selectedZone.type}
                            </Badge>
                            <button onClick={() => setSelectedZone(null)} className="text-slate-400 hover:text-white">
                                <span className="sr-only">Close</span>
                                ✕
                            </button>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-1">{selectedZone.name}</h3>
                        <p className="text-sm text-ocean-400 font-medium mb-3">{selectedZone.size} • {selectedZone.status}</p>

                        <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                            {selectedZone.description}
                        </p>

                        <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                            View Details <ArrowRight size={14} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Legend */}
            <div className="absolute bottom-6 left-6 flex flex-col gap-2 pointer-events-none">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-sunset-500 border border-white/20" />
                    <span className="text-xs text-white shadow-black drop-shadow-md">Commercial</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-ocean-500 border border-white/20" />
                    <span className="text-xs text-white shadow-black drop-shadow-md">Residential</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-purple-500 border border-white/20" />
                    <span className="text-xs text-white shadow-black drop-shadow-md">Hospitality</span>
                </div>
            </div>
        </div>
    );
};

export default BeachMasterPlan;
