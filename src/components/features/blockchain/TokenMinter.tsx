import { useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { useWallet } from '@/lib/store/wallet';

const TokenMinter = () => {
    const { isConnected } = useWallet();
    const [minting, setMinting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [selectedProp, setSelectedProp] = useState('');

    const handleMint = () => {
        if (!selectedProp) return;
        setMinting(true);

        // Simulate Blockchain Transaction
        setTimeout(() => {
            setMinting(false);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        }, 2500);
    };

    return (
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400">
                    <Coins size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white">Asset Tokenization</h3>
                    <p className="text-sm text-slate-400">Mint NFT deeds for your properties.</p>
                </div>
            </div>

            {!isConnected ? (
                <div className="text-center py-8 text-slate-400">
                    Please connect your wallet to access tokenization features.
                </div>
            ) : (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Select Property Asset</label>
                        <select
                            value={selectedProp}
                            onChange={(e) => setSelectedProp(e.target.value)}
                            className="w-full bg-navy-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">-- Choose Property --</option>
                            <option value="prop_001">Luxury Oceanview Villa (ID: 001)</option>
                            <option value="prop_003">Beachfront Dev Lot (ID: 003)</option>
                        </select>
                    </div>

                    <div className="p-4 bg-navy-900/50 rounded-xl border border-white/5 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Token Standard</span>
                            <span className="text-white font-mono">ERC-721</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Network</span>
                            <span className="text-white">Polygon Amoy</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Minting Fee</span>
                            <span className="text-white">0.025 MATIC</span>
                        </div>
                    </div>

                    <button
                        onClick={handleMint}
                        disabled={minting || !selectedProp}
                        className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {minting ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                Minting on Blockchain...
                            </>
                        ) : success ? (
                            <>
                                <CheckCircle2 size={18} />
                                Asset Tokenized!
                            </>
                        ) : (
                            <>
                                Mint Property Token <ArrowRight size={18} />
                            </>
                        )}
                    </button>

                    {success && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center text-xs text-emerald-400 font-mono mt-2"
                        >
                            Tx Hash: 0x8a...3f29
                        </motion.div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TokenMinter;
