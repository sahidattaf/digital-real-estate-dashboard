import BeachMasterPlan from '@/components/features/projects/BeachMasterPlan';
import { Utensils, Anchor, Waves, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

const AnalysisCard = ({ title, value, label }: { title: string, value: string, label: string }) => (
    <div className="bg-navy-800/50 border border-white/5 p-4 rounded-xl">
        <h4 className="text-slate-400 text-sm mb-1">{title}</h4>
        <div className="text-2xl font-bold text-white mb-1">{value}</div>
        <p className="text-xs text-emerald-400">{label}</p>
    </div>
);

const BeachProject = () => {
    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Willemstad Beach Project</h1>
                    <p className="text-slate-400 text-lg">Phase 3 • 1,222,222 m² Development Master Plan</p>
                </div>
                <button className="bg-ocean-600 hover:bg-ocean-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-ocean-500/30 flex items-center gap-2">
                    Download Prospectus <ArrowUpRight size={18} />
                </button>
            </div>

            {/* Interactive Master Plan */}
            <BeachMasterPlan />

            {/* Key Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Restaurant Highlight */}
                <div className="md:col-span-2 glass-panel p-6 rounded-2xl flex flex-col md:flex-row gap-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-sunset-500/10 blur-[100px] rounded-full" />

                    <div className="w-full md:w-1/2 h-64 md:h-auto rounded-xl overflow-hidden relative">
                        <img
                            src="https://images.unsplash.com/photo-1578474843222-9593bc88d8b0?q=80&w=2670&auto=format&fit=crop"
                            alt="Luxury Beach Restaurant"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4">
                            <Badge variant="default" className="bg-sunset-500 hover:bg-sunset-600">dining</Badge>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-center relative z-10">
                        <div className="flex items-center gap-2 text-sunset-500 mb-2">
                            <Utensils size={20} />
                            <span className="font-bold tracking-wide text-sm">CONCEPT HIGHLIGHT</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-3">Bossa Ocean Club & Restaurant</h2>
                        <p className="text-slate-400 mb-6 leading-relaxed">
                            A world-class culinary destination integrating local Curaçao flavors with high-end sustainable dining.
                            Features 300-seat capacity, private event decks, and direct marina access.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 text-white/80">
                                <Anchor size={18} className="text-ocean-400" />
                                <span className="text-sm font-medium">Private Marina</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/80">
                                <Waves size={18} className="text-ocean-400" />
                                <span className="text-sm font-medium">Infinity Pools</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Investment Quick Stats */}
                <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <ArrowUpRight size={20} className="text-emerald-500" />
                        Investment Data
                    </h3>
                    <AnalysisCard
                        title="Acquisition Cost"
                        value="$4,200,000"
                        label="Phase 3 Land Only"
                    />
                    <AnalysisCard
                        title="Projected ROI"
                        value="18.5%"
                        label="5-Year Horizon"
                    />
                    <AnalysisCard
                        title="Total Developable"
                        value="1.2M m²"
                        label="Mixed-use Zoning"
                    />

                    <button className="mt-auto w-full py-3 rounded-lg border border-ocean-500/50 text-ocean-400 hover:bg-ocean-600/10 font-medium transition-colors">
                        View Financial Model
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BeachProject;
