import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  // FIX: rounded-md → rounded-full for a modern pill shape (fits job portal style)
  "inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/70",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",

        // FIX: added `ghost` variant — was used in LatestJobCards but didn't exist,
        // causing a silent fallback to `default` styling.
        ghost:
          "border-transparent bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",

        // TIP: semantic variants for the DBS Job Portal use cases
        // Use these instead of hardcoding colors in className on each Badge

        // Positions — blue
        positions:
          "border-blue-100 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",

        // Job type (Full-time, Contract, etc.) — red/coral
        jobType:
          "border-red-100 bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-300 dark:border-red-800",

        // Salary — purple
        salary:
          "border-purple-100 bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800",

        // New / Open status — green
        success:
          "border-green-100 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 dark:border-green-800",

        // Warning / Closing soon — amber
        warning:
          "border-amber-100 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({ className, variant, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };

/* ─────────────────────────────────────────────
   USAGE GUIDE — DBS Job Portal badges
   ─────────────────────────────────────────────

   BEFORE (hardcoded colors, ghost variant missing):
   <Badge className="text-blue-700 font-bold" variant="ghost">{job.position} Positions</Badge>
   <Badge className="text-[#F83002] font-bold" variant="ghost">{job.jobType}</Badge>
   <Badge className="text-[#7209b7] font-bold" variant="ghost">{job.salary} LPA</Badge>

   AFTER (semantic variants, no hardcoded colors):
   <Badge variant="positions">{job.position} Position{job.position > 1 ? 's' : ''}</Badge>
   <Badge variant="jobType">{job.jobType}</Badge>
   <Badge variant="salary">{job.salary} LPA</Badge>

   Other available variants:
   <Badge variant="success">New</Badge>
   <Badge variant="warning">Closing Soon</Badge>
   <Badge variant="destructive">Expired</Badge>
   <Badge variant="outline">Remote</Badge>
───────────────────────────────────────────── */
