import { Map, HardHat, TrendingUp, Users, Anchor, Waves } from 'lucide-react';
import type { Project } from '@/types/project';

export const PROJECTS: Project[] = [
    {
        id: 'bossa-piska',
        phase: '2',
        name: 'Bossa Piska Project',
        subtitle: 'Phase 2 Development Tracker • Willemstad, Curaçao',
        totalArea: '15,000 m²',
        mapImageUrl: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?q=80&w=2574&auto=format&fit=crop',
        mapImageAlt: 'Bossa Piska Master Plan',
        stats: [
            { icon: Map,        label: 'Total Area',          value: '15,000 m²', badge: '100% Secured' },
            { icon: HardHat,    label: 'Construction Status', value: 'Phase 1',   badge: 'On Schedule'  },
            { icon: TrendingUp, label: 'Project Value',       value: '$12.5M',    badge: '+15% YoY'     },
            { icon: Users,      label: 'Investors',           value: '42',        badge: '3 Slots Left' },
        ],
        timeline: [
            { id: '1', title: 'Land Acquisition',       date: 'Q1 2024', status: 'completed',   description: 'Secured 15,000m² prime location.' },
            { id: '2', title: 'Architectural Planning',  date: 'Q2 2024', status: 'completed',   description: 'Master plan and unit designs finalized.' },
            { id: '3', title: 'Ground Breaking',         date: 'Q3 2024', status: 'in-progress', description: 'Site preparation and foundation work.' },
            { id: '4', title: 'Phase 1 Sales Launch',    date: 'Q4 2024', status: 'upcoming',    description: 'Pre-sales opening to priority list.' },
            { id: '5', title: 'Structure Completion',    date: 'Q2 2025', status: 'upcoming',    description: 'Main structural work finished.' },
        ],
        // BossaMasterPlan fetches live Property records by phase — no static zones needed
        zones: [],
    },

    {
        id: 'beach',
        phase: '3',
        name: 'Willemstad Beach Project',
        subtitle: 'Phase 3 • 1,222,222 m² Development Master Plan',
        totalArea: '1,222,222 m²',
        mapImageUrl: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=2832&auto=format&fit=crop',
        mapImageAlt: 'Willemstad Beach Master Plan',
        stats: [],
        timeline: [],
        zones: [
            {
                id: '1',
                name: 'Bossa Ocean Club',
                type: 'commercial',
                size: '5,000 m²',
                status: 'development',
                description: 'Premium beachfront dining and leisure club.',
                position: { top: '40%', left: '30%' },
            },
            {
                id: '2',
                name: 'Coral Estate Villas',
                type: 'residential',
                size: '450,000 m²',
                status: 'available',
                description: 'Exclusive luxury villas with private ocean access.',
                position: { top: '25%', left: '60%' },
            },
            {
                id: '3',
                name: 'The Pyramound Hotel',
                type: 'hospitality',
                size: '120,000 m²',
                status: 'planned',
                description: '5-Star eco-resort with 200 suites.',
                position: { top: '60%', left: '70%' },
            },
        ],
        highlight: {
            imageUrl: 'https://images.unsplash.com/photo-1578474843222-9593bc88d8b0?q=80&w=2670&auto=format&fit=crop',
            imageAlt: 'Luxury Beach Restaurant',
            badgeLabel: 'dining',
            title: 'Bossa Ocean Club & Restaurant',
            description:
                'A world-class culinary destination integrating local Curaçao flavors with high-end sustainable dining. Features 300-seat capacity, private event decks, and direct marina access.',
            features: [
                { icon: Anchor, label: 'Private Marina' },
                { icon: Waves,  label: 'Infinity Pools' },
            ],
        },
        investmentData: [
            { title: 'Acquisition Cost',   value: '$4,200,000', label: 'Phase 3 Land Only'  },
            { title: 'Projected ROI',      value: '18.5%',      label: '5-Year Horizon'     },
            { title: 'Total Developable',  value: '1.2M m²',   label: 'Mixed-use Zoning'   },
        ],
        prospectusUrl: '#',
        financialModelUrl: '#',
    },
];

export const getProject = (id: string): Project | undefined =>
    PROJECTS.find((p) => p.id === id);

export const getProjectByPhase = (phase: string): Project | undefined =>
    PROJECTS.find((p) => p.phase === phase);
