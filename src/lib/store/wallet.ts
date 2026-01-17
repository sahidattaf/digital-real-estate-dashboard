import { create } from 'zustand';

interface WalletState {
    address: string | null;
    balance: string | null;
    isConnected: boolean;
    connect: () => Promise<void>;
    disconnect: () => void;
}

export const useWallet = create<WalletState>((set) => ({
    address: null,
    balance: null,
    isConnected: false,
    connect: async () => {
        // Simulate connection delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        set({
            address: '0x71C...9A23',
            balance: '12.5 ETH',
            isConnected: true,
        });
    },
    disconnect: () => set({ address: null, balance: null, isConnected: false }),
}));
