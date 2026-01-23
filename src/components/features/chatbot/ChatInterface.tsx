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

    // RAG-lite Logic: Simple intent classification and keyword filtering
    const queryProperties = (query: string): string => {
        const lowerQuery = query.toLowerCase();
        let filtered: Property[] = propertiesData as unknown as Property[];

        // 1. Filter by Phase
        if (lowerQuery.includes('phase 1') || lowerQuery.includes('vista royal') || lowerQuery.includes('punda') || lowerQuery.includes('pietermaai')) {
            filtered = filtered.filter(p => p.phase === '1');
        } else if (lowerQuery.includes('phase 2') || lowerQuery.includes('bossa piska')) {
            filtered = filtered.filter(p => p.phase === '2');
        } else if (lowerQuery.includes('phase 3') || lowerQuery.includes('beach') || lowerQuery.includes('jan thiel')) {
            filtered = filtered.filter(p => p.phase === '3');
        }

        // 2. Filter by Type
        if (lowerQuery.includes('villa') || lowerQuery.includes('home') || lowerQuery.includes('house') || lowerQuery.includes('apartment') || lowerQuery.includes('residential')) {
            filtered = filtered.filter(p => p.type === 'residential');
        } else if (lowerQuery.includes('land') || lowerQuery.includes('lot') || lowerQuery.includes('plot')) {
            filtered = filtered.filter(p => p.type === 'land' || (p.type === 'residential' && p.id.startsWith('plot_'))); // Handle plots in master plan
        } else if (lowerQuery.includes('commercial') || lowerQuery.includes('office') || lowerQuery.includes('store') || lowerQuery.includes('shop')) {
            filtered = filtered.filter(p => p.type === 'commercial');
        }

        // 3. Filter by Status
        if (lowerQuery.includes('available')) {
            filtered = filtered.filter(p => p.status === 'available');
        } else if (lowerQuery.includes('sold')) {
            filtered = filtered.filter(p => p.status === 'sold');
        } else if (lowerQuery.includes('rent')) {
            filtered = filtered.filter(p => p.listing_type === 'rent');
        }

        // 4. Filter by Price (Simple "under X" logic)
        const priceMatch = lowerQuery.match(/(?:under|less than|<)\s?\$?(\d+(?:[.,]\d+)?)(k|m)?/i);
        if (priceMatch) {
            let limit = parseFloat(priceMatch[1].replace(',', ''));
            const multiplier = priceMatch[2];
            if (multiplier === 'k') limit *= 1000;
            if (multiplier === 'm') limit *= 1000000;

            filtered = filtered.filter(p => p.price.amount <= limit);
        }

        // Generate Response
        if (filtered.length === 0) {
            return "I couldn't find any properties matching those criteria. Try broadening your search (e.g., 'available properties').";
        }

        if (filtered.length === propertiesData.length && query.length < 10) {
            return "I have " + filtered.length + " properties in total. Could you be more specific? For example, 'do you have villas under $1M?'";
        }

        const topResults = filtered.slice(0, 3);
        const resultString = topResults.map(p =>
            `• ${p.title} (${p.status}): ${p.price.label || '$' + p.price.amount.toLocaleString()}`
        ).join('\n');

        let reply = `I found ${filtered.length} matching propert${filtered.length === 1 ? 'y' : 'ies'}:\n${resultString}`;

        if (filtered.length > 3) {
            reply += `\n\nAnd ${filtered.length - 3} more... Check the Listings page for the full view!`;
        }

        return reply;
    };

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // Process Query
        const responseText = queryProperties(inputValue);

        setTimeout(() => {
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: responseText,
                sender: 'ai',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1000);
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
                                    <span className="text-xs text-ocean-100 font-medium">Online • v0.3</span>
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
                                    "p-3 rounded-2xl text-sm whitespace-pre-wrap",
                                    msg.sender === 'user'
                                        ? "bg-sunset-500/20 border border-sunset-500/30 text-white rounded-tr-none"
                                        : "bg-ocean-600/20 border border-ocean-600/30 text-white rounded-tl-none"
                                )}>
                                    <p>{msg.text}</p>
                                    <span className="text-[10px] text-slate-400 mt-1 block opacity-70">
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
                                placeholder="Do you have villas under $1M?"
                                className="w-full bg-navy-800 text-white placeholder:text-slate-500 rounded-xl pl-4 pr-12 py-3 border border-white/10 focus:outline-none focus:border-ocean-500 focus:ring-1 focus:ring-ocean-500 transition-all"
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
                            <span className="text-[10px] text-slate-400">Connected to Live Property DB (v0.3)</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ChatInterface;
