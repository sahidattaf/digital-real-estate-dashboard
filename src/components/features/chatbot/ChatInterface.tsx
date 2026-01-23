import { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import propertiesData from '@/data/properties.json';
import { Property } from '@/types/property';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

// STEP 1: Intent Parsing Types & Logic
interface UserIntent {
    listingType?: 'sale' | 'rent';
    type?: 'residential' | 'commercial' | 'land';
    minPrice?: number;
    maxPrice?: number;
    phase?: string;
    status: 'available' | 'reserved' | 'sold'; // Default 'available'
}

const parseIntent = (query: string): UserIntent => {
    const lowerQuery = query.toLowerCase();
    const intent: UserIntent = { status: 'available' };

    // Transaction Type
    if (lowerQuery.match(/\b(rent|lease)\b/)) intent.listingType = 'rent';
    if (lowerQuery.match(/\b(buy|sale|purchase)\b/)) intent.listingType = 'sale';

    // Property Type
    if (lowerQuery.match(/\b(villa|home|house|apartment|residence|studio)\b/)) intent.type = 'residential';
    if (lowerQuery.match(/\b(commercial|office|store|shop|retail)\b/)) intent.type = 'commercial';
    if (lowerQuery.match(/\b(land|lot|plot|ground)\b/)) intent.type = 'land';

    // Phase
    const phaseMatch = lowerQuery.match(/\bphase\s?(\d+)/);
    if (phaseMatch) intent.phase = phaseMatch[1];
    else if (lowerQuery.includes('bossa piska')) intent.phase = '2';
    else if (lowerQuery.includes('vista royal') || lowerQuery.includes('punda') || lowerQuery.includes('pietermaai')) intent.phase = '1';
    else if (lowerQuery.includes('beach') || lowerQuery.includes('jan thiel')) intent.phase = '3';

    // Price Constraints
    // Examples: "under 1m", "max 500k", "< 200000"
    const maxPriceMatch = lowerQuery.match(/(?:under|less than|max|<)\s?\$?(\d+(?:[.,]\d+)?)(k|m)?/i);
    if (maxPriceMatch) {
        let val = parseFloat(maxPriceMatch[1].replace(/,/g, ''));
        if (maxPriceMatch[2] === 'k') val *= 1000;
        if (maxPriceMatch[2] === 'm') val *= 1000000;
        intent.maxPrice = val;
    }

    // Examples: "over 500k", "min 1m", "> 200000"
    const minPriceMatch = lowerQuery.match(/(?:over|more than|min|>)\s?\$?(\d+(?:[.,]\d+)?)(k|m)?/i);
    if (minPriceMatch) {
        let val = parseFloat(minPriceMatch[1].replace(/,/g, ''));
        if (minPriceMatch[2] === 'k') val *= 1000;
        if (minPriceMatch[2] === 'm') val *= 1000000;
        intent.minPrice = val;
    }

    // Status Override (if user explicitly asks for sold/reserved)
    if (lowerQuery.includes('sold')) intent.status = 'sold';
    if (lowerQuery.includes('reserved') && !lowerQuery.includes('available')) intent.status = 'reserved';
    if (lowerQuery.includes('all') || lowerQuery.includes('everything')) intent.status = undefined as any; // Trick to show all

    return intent;
};

// STEP 2 & 3: Retrieval & Ranking
const retrieveAndRank = (intent: UserIntent): { properties: Property[], explanation: string, confidenceScore: number } => {
    let matches = propertiesData as unknown as Property[];
    let explanationParts: string[] = [];

    // Filter Step
    if (intent.status) {
        matches = matches.filter(p => p.status === intent.status);
        explanationParts.push(`Status: ${intent.status}`);
    } else if (intent.status === undefined) {
        explanationParts.push(`Status: All`);
    }

    if (intent.listingType) {
        matches = matches.filter(p => p.listing_type === intent.listingType || p.listing_type === 'both');
        explanationParts.push(`For: ${intent.listingType}`);
    }

    if (intent.type) {
        matches = matches.filter(p => p.type === intent.type || (intent.type === 'land' && p.id.startsWith('plot_')));
        explanationParts.push(`Type: ${intent.type}`);
    }

    if (intent.phase) {
        matches = matches.filter(p => p.phase === intent.phase);
        explanationParts.push(`Phase: ${intent.phase}`);
    }

    if (intent.maxPrice) {
        matches = matches.filter(p => p.price.amount <= intent.maxPrice!);
        explanationParts.push(`Max Price: $${intent.maxPrice.toLocaleString()}`);
    }

    if (intent.minPrice) {
        matches = matches.filter(p => p.price.amount >= intent.minPrice!);
        explanationParts.push(`Min Price: $${intent.minPrice.toLocaleString()}`);
    }

    // Compute Confidence Score
    // confidenceScore indicates how much of the inventory matches the user’s intent.
    const totalInventory = propertiesData.length;
    const confidenceScore = Math.round((matches.length / totalInventory) * 100);

    // Ranking Step
    matches.sort((a, b) => {
        // Priority 1: Closest price to constraint (if maxPrice provided)
        if (intent.maxPrice) {
            const diffA = intent.maxPrice - a.price.amount;
            const diffB = intent.maxPrice - b.price.amount;
            if (diffA !== diffB) return diffA - diffB; // Smaller difference comes first (closer to limit)
        }

        // Priority 2: Exact Phase Match
        if (intent.phase) {
            if (a.phase === intent.phase && b.phase !== intent.phase) return -1;
            if (b.phase === intent.phase && a.phase !== intent.phase) return 1;
        }

        // Priority 3: Smaller Area First (Affordability/Availability bias)
        if (a.area_m2 !== b.area_m2) return a.area_m2 - b.area_m2;

        // Priority 4: Stable ID Sort
        return a.id.localeCompare(b.id);
    });

    return {
        properties: matches,
        explanation: explanationParts.join(', ') || 'Showing all listings',
        confidenceScore
    };
};


const ChatInterface = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Bon bini! I'm Bossa, your AI real estate assistant. I have direct access to our live property database. Ask me about villas under $1M, available land in Phase 2, or commercial spaces!",
            sender: 'ai',
            timestamp: new Date(),
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        // 1. User Message
        const userMsg: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // 2. RAG Pipeline Execution
        setTimeout(() => {
            const intent = parseIntent(userMsg.text);
            const { properties, explanation, confidenceScore } = retrieveAndRank(intent);

            // Log Internal Confidence Score
            if (import.meta.env.DEV) {
                console.log(`[RAG-Internal] Confidence Score: ${confidenceScore}% (${properties.length}/${propertiesData.length} matches)`);
            }

            let responseText = "";

            if (properties.length === 0) {
                responseText = `Based on our current listings, there are no matching properties.\n\nWhy these results?\n• Criteria: ${explanation}\n• We currently have 0 matches in our database.`;
            } else {
                const topResults = properties.slice(0, 3);
                const list = topResults.map(p =>
                    `• **[${p.id}]** ${p.type.charAt(0).toUpperCase() + p.type.slice(1)} in Phase ${p.phase}\n   Price: ${p.price.label || '$' + p.price.amount.toLocaleString()} | Area: ${p.area_m2}m² | Status: ${p.status}`
                ).join('\n\n');

                responseText = `Here are the top matches:\n\n${list}`;

                if (properties.length > 3) {
                    responseText += `\n\n*(And ${properties.length - 3} more properties available)*`;
                }

                // Mandatory Explanation Block
                responseText += `\n\n**Why these results?**\n• Filtered by: ${explanation}\n• Ranked by: Price proximity & size.`;
            }

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: responseText,
                sender: 'ai',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiMsg]);
            setIsTyping(false);
        }, 800);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.95 }}
                    className="fixed bottom-6 right-6 w-96 h-[600px] glass-panel rounded-2xl flex flex-col shadow-2xl z-50 overflow-hidden border border-ocean-500/30"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-ocean-600 to-ocean-800 p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <Bot className="text-white" size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">Bossa Assistant</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="text-xs text-ocean-100 font-medium">Live • Properties DB</span>
                                </div>
                            </div>
                        </div>
                        <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-navy-900/50">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={cn(
                                    "flex gap-3 max-w-[85%]",
                                    msg.sender === 'user' ? "ml-auto flex-row-reverse" : ""
                                )}
                            >
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                    msg.sender === 'user' ? "bg-sunset-500" : "bg-ocean-600"
                                )}>
                                    {msg.sender === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
                                </div>
                                <div className={cn(
                                    "p-3 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed",
                                    msg.sender === 'user'
                                        ? "bg-sunset-500/20 border border-sunset-500/30 text-white rounded-tr-none"
                                        : "bg-ocean-600/20 border border-ocean-600/30 text-white rounded-tl-none"
                                )}>
                                    <p>{msg.text}</p>
                                    <span className="text-[10px] text-slate-400 mt-2 block opacity-70">
                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex gap-3 max-w-[85%]">
                                <div className="w-8 h-8 rounded-full bg-ocean-600 flex items-center justify-center shrink-0">
                                    <Bot size={16} className="text-white" />
                                </div>
                                <div className="bg-ocean-600/20 border border-ocean-600/30 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                                    <div className="w-2 h-2 bg-ocean-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <div className="w-2 h-2 bg-ocean-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <div className="w-2 h-2 bg-ocean-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-navy-900 border-t border-white/5">
                        <div className="relative">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Plots under $500k in Phase 2..."
                                className="w-full bg-navy-800 text-white placeholder:text-slate-500 rounded-xl pl-4 pr-12 py-3 border border-white/10 focus:outline-none focus:border-ocean-500 focus:ring-1 focus:ring-ocean-500 transition-all shadow-inner"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!inputValue.trim()}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-ocean-600 text-white rounded-lg hover:bg-ocean-500 disabled:opacity-50 disabled:hover:bg-ocean-600 transition-colors"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                        <div className="mt-2 flex items-center justify-center gap-1.5">
                            <Sparkles size={12} className="text-emerald-400" />
                            <span className="text-[10px] text-slate-400">Deterministic RAG Pipeline Active</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ChatInterface;
