import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Building2, Users, Map, Umbrella, MessageSquare, Wallet, Coins } from 'lucide-react';
import { cn } from '@/lib/utils';
import ChatInterface from '@/components/features/chatbot/ChatInterface';
import { useWallet } from '@/lib/store/wallet';

const SidebarItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive
                    ? "bg-ocean-600 text-white shadow-lg shadow-ocean-900/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
            )
        }
    >
        <Icon size={20} />
        <span className="font-medium">{label}</span>
    </NavLink>
);

const DashboardLayout = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const { isConnected, address, connect, disconnect } = useWallet();

    return (
        <div className="flex h-screen bg-navy-900 text-white overflow-hidden bg-[url('https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=2664&auto=format&fit=crop')] bg-cover bg-center">
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-navy-900/90 backdrop-blur-sm z-0" />

            {/* Sidebar */}
            <aside className="relative z-10 w-72 h-full glass-panel border-r border-white/5 flex flex-col p-6">
                <div className="mb-10 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-ocean-400 to-ocean-600 rounded-lg flex items-center justify-center shadow-lg">
                        <Building2 className="text-white" size={24} />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight">Bossa Estate</h1>
                </div>

                <nav className="flex-1 space-y-2">
                    <SidebarItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
                    <SidebarItem to="/listings" icon={Building2} label="Properties" />
                    <SidebarItem to="/client-portal" icon={Users} label="Client Portal" />

                    <div className="my-6 border-t border-white/5 mx-2" />
                    <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Projects</p>

                    <SidebarItem to="/bossa-piska" icon={Map} label="Bossa Piska (15k)" />
                    <SidebarItem to="/beach-project" icon={Umbrella} label="Beach Project (1.2M)" />
                    <SidebarItem to="/tokenization" icon={Coins} label="Token Assets" />
                </nav>

                <div className="mt-auto">
                    <button
                        onClick={() => setIsChatOpen(!isChatOpen)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-sunset-500 to-orange-600 text-white font-medium shadow-lg hover:shadow-orange-900/20 transition-all"
                    >
                        <MessageSquare size={20} />
                        <span>Bossa Assistant</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="relative z-10 flex-1 flex flex-col overflow-hidden">
                <header className="h-20 px-8 flex items-center justify-between glass-panel border-b border-white/5">
                    <h2 className="text-xl font-semibold text-white">Overview</h2>
                    <div className="flex items-center gap-4">
                        {isConnected ? (
                            <button
                                onClick={disconnect}
                                className="flex items-center gap-2 bg-gradient-to-r from-ocean-600/20 to-ocean-400/20 border border-ocean-500/30 text-ocean-300 px-5 py-2.5 rounded-lg font-medium transition-all hover:bg-ocean-600/30"
                            >
                                <Wallet size={18} />
                                {address}
                            </button>
                        ) : (
                            <button
                                onClick={() => connect()}
                                className="bg-ocean-600 hover:bg-ocean-500 text-white px-5 py-2.5 rounded-lg font-medium transition-colors border border-ocean-400/30 shadow-lg shadow-ocean-900/20"
                            >
                                Connect Wallet
                            </button>
                        )}
                        <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-slate-600" />
                    </div>
                </header>

                <div className="flex-1 overflow-auto p-8">
                    <Outlet />
                </div>
            </main>

            {/* Chatbot Overlay */}
            <ChatInterface isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </div>
    );
};

export default DashboardLayout;
