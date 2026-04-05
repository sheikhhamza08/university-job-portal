import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function Dialog({ ...props }) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({ className, ...props }) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 z-50",
        "bg-black/30 backdrop-blur-[2px]",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className,
      )}
      {...props}
    />
  );
}

function DialogContent({ className, children, ...props }) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          // positioning
          "fixed top-1/2 left-1/2 z-50",
          "-translate-x-1/2 -translate-y-1/2",
          "w-full max-w-[calc(100%-2rem)] sm:max-w-lg",
          // surface — uses your theme tokens
          "bg-background rounded-2xl",
          "border-[0.5px] border-[oklch(0.929_0.013_255.508)]",
          "shadow-[0_8px_40px_oklch(0_0_0/0.10)]",
          // layout
          "grid gap-0 p-0 overflow-hidden",
          // font
          "[font-family:'Sora',sans-serif]",
          // animations
          "duration-200",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          className,
        )}
        {...props}
      >
        {children}

        {/* Close button */}
        {/* <DialogPrimitive.Close
          className={cn(
            "absolute top-4 right-4 z-10",
            "w-7 h-7 rounded-lg",
            "flex items-center justify-center",
            "border-[0.5px] border-[oklch(0.929_0.013_255.508)]",
            "bg-transparent text-[oklch(0.554_0.046_257.417)]",
            "transition-colors duration-150",
            "hover:bg-[oklch(0.968_0.007_247.896)] hover:text-[oklch(0.129_0.042_264.695)]",
            "focus:outline-none focus:ring-2 focus:ring-[oklch(0.704_0.04_256.788)] focus:ring-offset-1",
            "disabled:pointer-events-none",
            "[&_svg]:size-3.5 [&_svg]:pointer-events-none [&_svg]:shrink-0",
          )}
        >
          <XIcon />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close> */}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        "flex flex-col gap-1",
        "sm:px-6 sm:pt-6 pt-3 sm:pb-4",
        className,
      )}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        "px-6 py-4",
        "border-t border-[oklch(0.929_0.013_255.508)]",
        "bg-[oklch(0.984_0.003_247.858)]",
        className,
      )}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "text-sm font-bold leading-none pr-8",
        "text-[oklch(0.129_0.042_264.695)]",
        "tracking-[-0.02em]",
        "[font-family:'Sora',sans-serif]",
        className,
      )}
      {...props}
    />
  );
}

function DialogDescription({ className, ...props }) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-xs leading-relaxed",
        "text-[oklch(0.554_0.046_257.417)]",
        "[font-family:'Sora',sans-serif]",
        className,
      )}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
