import React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default: "bg-ocean-600 text-white hover:bg-ocean-700",
                secondary: "bg-ocean-100 text-ocean-900 hover:bg-ocean-200",
                outline: "text-foreground border border-ocean-200",
                destructive: "bg-red-500 text-white hover:bg-red-600",
                success: "bg-emerald-500 text-white hover:bg-emerald-600",
                warning: "bg-amber-500 text-white hover:bg-amber-600",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

export { Badge, badgeVariants };
