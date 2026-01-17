import { Blocks, Link, ExternalLink } from 'lucide-react';
import TokenMinter from '@/components/features/blockchain/TokenMinter';
import { Badge } from '@/components/ui/Badge';

const TokenizedAssets = [
    { id: '1', name: 'Downtown Commercial Space', token_id: '#4492', contract: '0x23...88ea', status: 'fractionalized' },
    { id: '2', name: 'Coral Estate Villa', token_id: '#4493', contract: '0x23...88ea', status: 'unique' },
];

const Tokenization = () => {
    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Blockchain Registry</h1>
                    <p className="text-slate-400">Tokenize assets and manage smart contracts.</p>
                </div>
                <Badge variant="outline" className="border-purple-500/50 text-purple-300 gap-2 px-3 py-1">
                    <Blocks size={14} />
                    Testnet Active
                </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Minter Column */}
                <div>
                    <TokenMinter />
                </div>

                {/* Assets List */}
                <div className="lg:col-span-2 glass-panel p-6 rounded-2xl">
                    <h3 className="text-xl font-bold text-white mb-6">Tokenized Portfolio</h3>

                    <div className="space-y-4">
                        {TokenizedAssets.map((asset) => (
                            <div key={asset.id} className="flex items-center justify-between p-4 bg-navy-800/40 border border-white/5 rounded-xl group hover:border-purple-500/30 transition-colors">
                                <div>
                                    <h4 className="font-bold text-white">{asset.name}</h4>
                                    <div className="flex items-center gap-3 mt-1">
                                        <Badge variant="secondary" className="text-[10px] bg-white/10 text-slate-300 hover:bg-white/20">
                                            {asset.status.toUpperCase()}
                                        </Badge>
                                        <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                                            <Link size={10} />
                                            {asset.contract}
                                        </span>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div className="text-xs text-slate-500 mb-1">Token ID</div>
                                    <div className="font-mono text-purple-400 font-bold">{asset.token_id}</div>
                                </div>
                            </div>
                        ))}

                        <button className="w-full py-3 mt-4 border border-dashed border-white/10 rounded-xl text-slate-400 hover:text-white hover:border-white/20 transition-colors flex items-center justify-center gap-2">
                            <ExternalLink size={16} />
                            View on PolygonScan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tokenization;
