import { useNavigate } from 'react-router-dom';
import { Building2, Map, Umbrella, ArrowRight, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const DashboardCard = ({ title, desc, icon: Icon, to, color }: { title: string; desc: string; icon: any; to: string; color: string }) => {
    const navigate = useNavigate();
    return (
        <motion.div
            whileHover={{ y: -5 }}
            onClick={() => navigate(to)}
            className="glass-card p-6 rounded-2xl cursor-pointer group"
        >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${color} shadow-lg`}>
                <Icon size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-ocean-400 transition-colors">{title}</h3>
            <p className="text-slate-400 text-sm mb-6">{desc}</p>
            <div className="flex items-center gap-2 text-sm font-bold text-white/80 group-hover:text-white transition-colors">
                Explore <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </div>
        </motion.div>
    );
};

const Dashboard = () => {
    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-10">
                <h1 className="text-4xl font-bold text-white mb-2">Welcome Back, Investor</h1>
                <p className="text-slate-400 text-lg">Your gateway to Curaçao's premier digital real estate assets.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <DashboardCard
                    title="Property Listings"
                    desc="Browse exclusive villas, commercial spaces, and land plots."
                    icon={Building2}
                    to="/listings"
                    color="from-ocean-500 to-ocean-700"
                />
                <DashboardCard
                    title="Bossa Piska Project"
                    desc="Track the progress of our 15,000m² flagship development."
                    icon={Map}
                    to="/bossa-piska"
                    color="from-emerald-500 to-emerald-700"
                />
                <DashboardCard
                    title="Beach Master Plan"
                    desc="Discover the 1.2M m² vision for Willemstad's coastline."
                    icon={Umbrella}
                    to="/beach-project"
                    color="from-sunset-500 to-red-600"
                />
            </div>

            <div className="glass-panel p-8 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <TrendingUp size={20} className="text-ocean-400" />
                        Market Insights
                    </h3>
                    <span className="text-sm text-slate-500">Updated today</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-x divide-white/10">
                    <div className="px-4 first:pl-0">
                        <div className="text-sm text-slate-400 mb-1">Avg. Rental Yield</div>
                        <div className="text-3xl font-bold text-white">8.4%</div>
                        <div className="text-xs text-emerald-500 mt-1">↑ 0.5% vs last year</div>
                    </div>
                    <div className="px-4">
                        <div className="text-sm text-slate-400 mb-1">Property Value Index</div>
                        <div className="text-3xl font-bold text-white">142.5</div>
                        <div className="text-xs text-emerald-500 mt-1">↑ 2.1% this month</div>
                    </div>
                    <div className="px-4">
                        <div className="text-sm text-slate-400 mb-1">Active Projects</div>
                        <div className="text-3xl font-bold text-white">12</div>
                        <div className="text-xs text-ocean-400 mt-1">2 New this week</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
