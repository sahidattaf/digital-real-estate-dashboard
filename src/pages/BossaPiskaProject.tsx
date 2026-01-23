import { Map, TrendingUp, Users, HardHat } from 'lucide-react';
import DevelopmentTimeline from '@/components/features/projects/DevelopmentTimeline';
import BossaMasterPlan from '@/components/features/projects/BossaMasterPlan';

const StatCard = ({ icon: Icon, label, value, sub }: { icon: any, label: string, value: string, sub: string }) => (
    <div className="glass-card p-5 rounded-xl">
        <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-ocean-600/20 rounded-lg text-ocean-400">
                <Icon size={20} />
            </div>
            <span className="text-xs text-emerald-400 font-medium bg-emerald-500/10 px-2 py-1 rounded-full">{sub}</span>
        </div>
        <div className="text-2xl font-bold text-white mb-1">{value}</div>
        <div className="text-sm text-slate-400">{label}</div>
    </div>
);

const BossaPiskaProject = () => {
    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Bossa Piska Project (15,000m²)</h1>
                <p className="text-slate-400">Phase 2 Development Tracker • Willemstad, Curaçao</p>
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard icon={Map} label="Total Area" value="15,000 m²" sub="100% Secured" />
                <StatCard icon={HardHat} label="Construction Status" value="Phase 1" sub="On Schedule" />
                <StatCard icon={TrendingUp} label="Project Value" value="$12.5M" sub="+15% YoY" />
                <StatCard icon={Users} label="Investors" value="42" sub="3 Slots Left" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Visual / Map Area */}
                <div className="lg:col-span-2">
                    <BossaMasterPlan />
                </div>

                {/* Timeline */}
                <div className="h-full">
                    <DevelopmentTimeline />
                </div>
            </div>
        </div>
    );
};

export default BossaPiskaProject;
