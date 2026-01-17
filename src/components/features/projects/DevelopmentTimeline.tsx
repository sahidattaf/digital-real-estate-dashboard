import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TimelineEvent {
    id: string;
    title: string;
    date: string;
    status: 'completed' | 'in-progress' | 'upcoming';
    description: string;
}

const EVENTS: TimelineEvent[] = [
    { id: '1', title: 'Land Acquisition', date: 'Q1 2024', status: 'completed', description: 'Secured 15,000m² prime location.' },
    { id: '2', title: 'Architectural Planning', date: 'Q2 2024', status: 'completed', description: 'Master plan and unit designs finalized.' },
    { id: '3', title: 'Ground Breaking', date: 'Q3 2024', status: 'in-progress', description: 'Site preparation and foundation work.' },
    { id: '4', title: 'Phase 1 Sales Launch', date: 'Q4 2024', status: 'upcoming', description: 'Pre-sales opening to priority list.' },
    { id: '5', title: 'Structure Completion', date: 'Q2 2025', status: 'upcoming', description: 'Main structural work finished.' },
];

const DevelopmentTimeline = () => {
    return (
        <div className="glass-panel p-6 rounded-2xl h-full">
            <h3 className="text-xl font-bold text-white mb-6">Development Progress</h3>

            <div className="relative pl-4 border-l border-white/10 space-y-8">
                {EVENTS.map((event, index) => (
                    <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative"
                    >
                        {/* Dot Indicator */}
                        <div className={cn(
                            "absolute -left-[25px] top-1 w-4 h-4 rounded-full border-2 bg-navy-900",
                            event.status === 'completed' ? "border-emerald-500 text-emerald-500" :
                                event.status === 'in-progress' ? "border-ocean-500 text-ocean-500" :
                                    "border-slate-600 text-slate-600"
                        )}>
                            {event.status === 'completed' && <div className="w-full h-full bg-emerald-500 rounded-full scale-50" />}
                            {event.status === 'in-progress' && <div className="w-full h-full bg-ocean-500 rounded-full scale-50 animate-pulse" />}
                        </div>

                        <div>
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white/5 text-slate-400 mb-1 inline-block">
                                {event.date}
                            </span>
                            <h4 className={cn("font-bold text-lg", event.status === 'upcoming' ? "text-slate-500" : "text-white")}>
                                {event.title}
                            </h4>
                            <p className="text-sm text-slate-400 mt-1">{event.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default DevelopmentTimeline;
