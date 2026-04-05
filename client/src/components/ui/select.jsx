import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const colors = {
  darkNavy: "#1B2C62",
  brightBlue: "#0393DA",
  lightBlue: "#8CB2CF",
  white: "#FDFEFE",
  primaryGradient: "linear-gradient(135deg, #1B2C62 0%, #0393DA 100%)",
  secondaryGradient: "linear-gradient(135deg, #0393DA 0%, #8CB2CF 100%)",
};

function Select({ ...props }) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({ ...props }) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({ ...props }) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({ className, size = "default", children, ...props }) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-full items-center justify-between gap-2 rounded-lg border bg-transparent px-4 py-5 text-sm whitespace-nowrap shadow-xs transition-all duration-200 outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-11 data-[size=sm]:h-9 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      style={{ borderColor: `${colors.lightBlue}30` }}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon
          className="size-4 opacity-50 transition-transform duration-200 group-data-[state=open]:rotate-180"
          style={{ color: colors.lightBlue }}
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({ className, children, position = "popper", ...props }) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-[var(--radix-select-content-available-height)] min-w-[8rem] origin-[var(--radix-select-content-transform-origin)] overflow-x-hidden overflow-y-auto rounded-xl border shadow-lg",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className,
        )}
        style={{
          backgroundColor: colors.white,
          borderColor: `${colors.lightBlue}20`,
          boxShadow:
            "0 10px 25px -5px rgba(27, 44, 98, 0.1), 0 8px 10px -6px rgba(27, 44, 98, 0.05)",
        }}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1.5",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1",
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({ className, ...props }) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("px-2 py-1.5 text-xs font-semibold", className)}
      style={{ color: colors.darkNavy }}
      {...props}
    />
  );
}

function SelectItem({ className, children, ...props }) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-lg py-2 pl-8 pr-2 text-sm outline-none transition-all duration-200 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      style={{ color: colors.darkNavy }}
      {...props}
    >
      <span className="absolute left-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" style={{ color: colors.brightBlue }} />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({ className, ...props }) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      style={{ backgroundColor: `${colors.lightBlue}20` }}
      {...props}
    />
  );
}

function SelectScrollUpButton({ className, ...props }) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1 hover:bg-gray-50 transition-colors duration-200",
        className,
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" style={{ color: colors.lightBlue }} />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({ className, ...props }) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1 hover:bg-gray-50 transition-colors duration-200",
        className,
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" style={{ color: colors.lightBlue }} />
    </SelectPrimitive.ScrollDownButton>
  );
}

// Custom styled components with DBS theme
const SelectItemWithIcon = React.forwardRef(
  ({ icon: Icon, children, ...props }, ref) => {
    return (
      <SelectItem ref={ref} {...props}>
        <div className="flex items-center gap-2">
          {Icon && (
            <Icon className="h-4 w-4" style={{ color: colors.lightBlue }} />
          )}
          <span>{children}</span>
        </div>
      </SelectItem>
    );
  },
);
SelectItemWithIcon.displayName = "SelectItemWithIcon";

const SelectTriggerWithIcon = React.forwardRef(
  ({ icon: Icon, children, ...props }, ref) => {
    return (
      <SelectTrigger ref={ref} {...props}>
        <div className="flex items-center gap-2">
          {Icon && (
            <Icon className="h-4 w-4" style={{ color: colors.lightBlue }} />
          )}
          {children}
        </div>
      </SelectTrigger>
    );
  },
);
SelectTriggerWithIcon.displayName = "SelectTriggerWithIcon";

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectItemWithIcon,
  SelectTriggerWithIcon,
};
