import type { LucideIcon } from 'lucide-react';

export type ProjectPhase = '1' | '2' | '3';
export type ZoneType = 'residential' | 'commercial' | 'hospitality' | 'land';
export type ZoneStatus = 'planned' | 'development' | 'available' | 'reserved' | 'sold';
export type TimelineEventStatus = 'completed' | 'in-progress' | 'upcoming';

export interface ProjectStat {
    icon?: LucideIcon;
    label: string;
    value: string;
    badge?: string;
}

export interface TimelineEvent {
    id: string;
    title: string;
    date: string;
    status: TimelineEventStatus;
    description: string;
}

export interface MapZone {
    id: string;
    name: string;
    type: ZoneType;
    size: string;
    status: ZoneStatus;
    description: string;
    position: { top: string; left: string };
}

export interface ProjectHighlight {
    imageUrl: string;
    imageAlt: string;
    badgeLabel: string;
    title: string;
    description: string;
    features: Array<{ icon: LucideIcon; label: string }>;
}

export interface InvestmentStat {
    title: string;
    value: string;
    label: string;
}

export interface Project {
    id: string;
    phase: ProjectPhase;
    name: string;
    subtitle: string;
    totalArea: string;
    mapImageUrl: string;
    mapImageAlt: string;
    stats: ProjectStat[];
    timeline: TimelineEvent[];
    zones: MapZone[];
    highlight?: ProjectHighlight;
    investmentData?: InvestmentStat[];
    prospectusUrl?: string;
    financialModelUrl?: string;
}
