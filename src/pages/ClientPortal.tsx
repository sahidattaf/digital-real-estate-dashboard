import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, FileText, History, AlertCircle, Upload, Check, Wallet } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

const Documents = [
    { id: '1', name: 'Passport/ID Scan', date: '2024-03-15', status: 'verified', type: 'identity' },
    { id: '2', name: 'Source of Funds', date: '2024-03-16', status: 'pending', type: 'financial' },
    { id: '3', name: 'Reservation Agreement - Unit 12B', date: '2024-03-10', status: 'signed', type: 'contract' },
];

const Transactions = [
    { id: 'tx_1', property: 'Unit 12B Reservation', amount: '$5,000.00', date: '2024-03-10', status: 'completed' },
];

const ClientPortal = () => {
    const [kycStatus, setKycStatus] = useState<'pending' | 'verified'>('pending');

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Client Portal</h1>
                    <p className="text-slate-400">Manage your identity, documents, and investments.</p>
                </div>
                <div className="flex items-center gap-3 bg-navy-800 p-3 rounded-xl border border-white/5">
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                        <Wallet size={20} className="text-white" />
                    </div>
                    <div>
                        <div className="text-xs text-slate-400">Connected Wallet</div>
                        <div className="text-sm font-mono text-ocean-400">0x71C...9A23</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* KYC Status Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel p-6 rounded-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-24 bg-ocean-500/10 blur-[80px] rounded-full" />

                    <div className="flex items-start justify-between mb-6">
                        <div className="p-3 bg-ocean-600/20 rounded-xl">
                            <ShieldCheck size={24} className="text-ocean-400" />
                        </div>
                        <Badge variant={kycStatus === 'verified' ? 'success' : 'warning'}>
                            {kycStatus === 'verified' ? 'VERIFIED' : 'ACTION REQUIRED'}
                        </Badge>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">Identity Verification (KYC)</h3>
                    <p className="text-slate-400 text-sm mb-6">
                        Complete your KYC verification to participate in property tokenization and sales events.
                    </p>

                    {kycStatus === 'pending' ? (
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm text-slate-300">
                                <Check size={16} className="text-emerald-500" />
                                <span>Email Verification</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-300">
                                <Check size={16} className="text-emerald-500" />
                                <span>Phone Linked</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-300">
                                <AlertCircle size={16} className="text-amber-500" />
                                <span>Valid ID Upload</span>
                            </div>

                            <button
                                onClick={() => setKycStatus('verified')} // Mock action
                                className="w-full mt-4 py-2.5 bg-ocean-600 hover:bg-ocean-500 text-white rounded-lg font-medium transition-colors"
                            >
                                Complete Verification
                            </button>
                        </div>
                    ) : (
                        <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl flex items-center gap-3 text-emerald-400">
                            <Check size={20} />
                            <span className="font-medium">You are fully verified!</span>
                        </div>
                    )}
                </motion.div>

                {/* Document Vault */}
                <div className="lg:col-span-2 glass-panel p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <FileText size={20} className="text-ocean-400" />
                            Document Vault
                        </h3>
                        <button className="flex items-center gap-2 text-sm text-ocean-400 hover:text-white transition-colors">
                            <Upload size={16} />
                            Upload New
                        </button>
                    </div>

                    <div className="space-y-3">
                        {Documents.map((doc) => (
                            <div key={doc.id} className="flex items-center justify-between p-4 bg-navy-800/40 border border-white/5 rounded-xl hover:border-white/10 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                                        <FileText size={18} />
                                    </div>
                                    <div>
                                        <div className="font-medium text-white">{doc.name}</div>
                                        <div className="text-xs text-slate-500 uppercase tracking-wider">{doc.type} • {doc.date}</div>
                                    </div>
                                </div>
                                <Badge variant={doc.status === 'verified' || doc.status === 'signed' ? 'secondary' : 'warning'} className="capitalize">
                                    {doc.status}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="lg:col-span-3 glass-panel p-6 rounded-2xl">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                        <History size={20} className="text-sunset-500" />
                        Transaction History
                    </h3>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="text-slate-500 text-xs uppercase tracking-wider border-b border-white/5">
                                <tr>
                                    <th className="pb-3 pl-4">Description</th>
                                    <th className="pb-3">Date</th>
                                    <th className="pb-3">Amount</th>
                                    <th className="pb-3 pr-4 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {Transactions.map((tx) => (
                                    <tr key={tx.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                        <td className="py-4 pl-4 font-medium text-white">{tx.property}</td>
                                        <td className="py-4 text-slate-400">{tx.date}</td>
                                        <td className="py-4 text-white font-mono">{tx.amount}</td>
                                        <td className="py-4 pr-4 text-right">
                                            <Badge variant="success" className="bg-emerald-500/20 text-emerald-400 border-none">
                                                {tx.status}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientPortal;
