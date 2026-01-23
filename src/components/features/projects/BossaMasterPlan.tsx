import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Home, TreePine, X, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { fetchPropertiesByPhase } from '@/lib/api';
import { Property } from '@/types/property';

const BossaMasterPlan = () => {
    const [plots, setPlots] = useState<Property[]>([]);
    const [selectedPlot, setSelectedPlot] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);

    // Inquiry Form State
    const [inquiryMode, setInquiryMode] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const loadPlots = async () => {
            const data = await fetchPropertiesByPhase('2');
            setPlots(data);
            setLoading(false);
        };
        loadPlots();
    }, []);

    const handleInquirySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        // Simulate API call & Save to LocalStorage
        setTimeout(() => {
            const inquiry = {
                id: crypto.randomUUID(),
                propertyId: selectedPlot?.id,
                ...formData,
                timestamp: new Date().toISOString()
            };

            const existing = JSON.parse(localStorage.getItem('bossa_inquiries') || '[]');
            localStorage.setItem('bossa_inquiries', JSON.stringify([...existing, inquiry]));

            setSubmitting(false);
            setSuccess(true);

            // Reset after success
            setTimeout(() => {
                setSuccess(false);
                setInquiryMode(false);
                setFormData({ name: '', email: '', phone: '', message: '' });
                setSelectedPlot(null);
            }, 2000);
        }, 1500);
    };

    return (
        <div className="relative w-full h-[600px] rounded-2xl overflow-hidden glass-panel group shadow-2xl transition-all hover:shadow-emerald-900/20">
            {/* Map Background */}
            <img
                src="https://images.unsplash.com/photo-1544984243-ec57ea16fe25?q=80&w=2574&auto=format&fit=crop"
                alt="Bossa Piska Master Plan"
                className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-navy-900/40 group-hover:bg-navy-900/20 transition-colors duration-500" />

            {/* Loading State */}
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-navy-900/50 backdrop-blur-sm z-50">
                    <Loader2 className="animate-spin text-emerald-400" size={32} />
                </div>
            )}

            {/* Interactive Pins */}
            {plots.map((plot) => (
                <button
                    key={plot.id}
                    onClick={() => { setSelectedPlot(plot); setInquiryMode(false); }}
                    className={cn(
                        "absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
                        selectedPlot?.id === plot.id ? "scale-125 z-20" : "scale-100 hover:scale-110 z-10"
                    )}
                    style={{ top: plot.location.map_position?.top, left: plot.location.map_position?.left }}
                >
                    <div className="relative">
                        <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md border-2 transition-all",
                            plot.type === 'residential' ? "bg-emerald-600/90 border-emerald-400 text-white" :
                                plot.type === 'commercial' ? "bg-orange-500/90 border-orange-400 text-white" :
                                    "bg-ocean-600/90 border-ocean-400 text-white"
                        )}>
                            {plot.type === 'commercial' ? <TreePine size={18} /> : <Home size={18} />}
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

            {/* Drawer Overlay */}
            <AnimatePresence>
                {selectedPlot && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedPlot(null)}
                            className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm z-30"
                        />

                        {/* Drawer Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="absolute top-0 right-0 h-full w-full md:w-96 glass-panel border-l border-white/10 z-40 p-6 flex flex-col overflow-y-auto"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedPlot(null)}
                                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                            >
                                <X size={20} />
                            </button>

                            {/* Content or Inquiry Form */}
                            {!inquiryMode ? (
                                <>
                                    <div className="mb-6">
                                        <Badge variant={selectedPlot.status === 'available' ? 'success' : selectedPlot.status === 'reserved' ? 'warning' : 'secondary'} className="mb-3">
                                            {selectedPlot.status.toUpperCase()}
                                        </Badge>
                                        <h2 className="text-2xl font-bold text-white mb-1">{selectedPlot.title}</h2>
                                        <div className="text-emerald-400 font-mono text-lg font-bold">
                                            {selectedPlot.price.label || `$${selectedPlot.price.amount.toLocaleString()}`}
                                        </div>
                                    </div>

                                    <div className="h-48 w-full rounded-xl overflow-hidden mb-6 relative">
                                        <img src={selectedPlot.images[0]} alt={selectedPlot.title} className="w-full h-full object-cover" />
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex justify-between py-2 border-b border-white/5">
                                            <span className="text-slate-400">Total Area</span>
                                            <span className="text-white font-medium">{selectedPlot.area_m2} m²</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-white/5">
                                            <span className="text-slate-400">Plot Type</span>
                                            <span className="text-white font-medium capitalize">{selectedPlot.type}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-white/5">
                                            <span className="text-slate-400">Amenities</span>
                                            <span className="text-white font-medium text-right max-w-[50%]">{selectedPlot.amenities.join(', ')}</span>
                                        </div>
                                    </div>

                                    <p className="text-slate-300 leading-relaxed mb-8 flex-1">
                                        {selectedPlot.description}
                                    </p>

                                    {selectedPlot.status === 'available' ? (
                                        <button
                                            onClick={() => setInquiryMode(true)}
                                            className="w-full py-3 bg-ocean-600 hover:bg-ocean-500 text-white rounded-xl font-bold shadow-lg hover:shadow-ocean-500/20 transition-all flex items-center justify-center gap-2"
                                        >
                                            Inquire About This Plot <ArrowRight size={18} />
                                        </button>
                                    ) : (
                                        <button disabled className="w-full py-3 bg-slate-700 text-slate-400 rounded-xl font-medium cursor-not-allowed">
                                            Currently Unavailable
                                        </button>
                                    )}
                                </>
                            ) : (
                                <div className="flex-1 flex flex-col">
                                    <div className="mb-6">
                                        <button
                                            onClick={() => setInquiryMode(false)}
                                            className="text-sm text-ocean-400 hover:text-ocean-300 font-medium mb-4 flex items-center gap-1"
                                        >
                                            ← Back to Details
                                        </button>
                                        <h2 className="text-xl font-bold text-white mb-2">Interest Registration</h2>
                                        <p className="text-slate-400 text-sm">Fill out the form below to receive the plot prospectus.</p>
                                    </div>

                                    {success ? (
                                        <div className="flex-1 flex flex-col items-center justify-center text-center">
                                            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mb-4">
                                                <CheckCircle2 size={32} />
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2">Request Received!</h3>
                                            <p className="text-slate-400">Our sales team will contact you shortly.</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleInquirySubmit} className="space-y-4 flex-1">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Full Name</label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full bg-navy-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ocean-500 transition-colors"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email Address</label>
                                                <input
                                                    required
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full bg-navy-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ocean-500 transition-colors"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Phone (Optional)</label>
                                                <input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                    className="w-full bg-navy-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ocean-500 transition-colors"
                                                    placeholder="+1 (555) 000-0000"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Message</label>
                                                <textarea
                                                    rows={4}
                                                    value={formData.message}
                                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                                    className="w-full bg-navy-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ocean-500 transition-colors resize-none"
                                                    placeholder="I'm interested in this plot because..."
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={submitting}
                                                className="w-full py-3 bg-gradient-to-r from-ocean-600 to-ocean-500 hover:from-ocean-500 hover:to-ocean-400 text-white rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-wait"
                                            >
                                                {submitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                                                {submitting ? 'Sending...' : 'Submit Inquiry'}
                                            </button>
                                        </form>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Legend */}
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
