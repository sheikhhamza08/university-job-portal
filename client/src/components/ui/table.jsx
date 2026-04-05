import * as React from "react";
import { cn } from "@/lib/utils";

const colors = {
  darkNavy: "#1B2C62",
  brightBlue: "#0393DA",
  lightBlue: "#8CB2CF",
  white: "#FDFEFE",
};

function Table({ className, ...props }) {
  return (
    <div
      data-slot="table-container"
      className={cn(
        "relative w-full overflow-x-auto rounded-xl border",
        className,
      )}
      style={{ borderColor: `${colors.lightBlue}20` }}
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      style={{ borderBottomColor: `${colors.lightBlue}20` }}
      {...props}
    />
  );
}

function TableBody({ className, ...props }) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn("border-t font-medium [&>tr]:last:border-b-0", className)}
      style={{
        backgroundColor: `${colors.lightBlue}05`,
        borderTopColor: `${colors.lightBlue}20`,
      }}
      {...props}
    />
  );
}

function TableRow({ className, ...props }) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b transition-all duration-200 hover:bg-gray-50",
        className,
      )}
      style={{ borderBottomColor: `${colors.lightBlue}15` }}
      {...props}
    />
  );
}

function TableHead({ className, ...props }) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-12 px-4 text-left align-middle font-semibold text-sm whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      style={{ color: colors.darkNavy }}
      {...props}
    />
  );
}

function TableCell({ className, ...props }) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-3 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      style={{ color: colors.lightBlue }}
      {...props}
    />
  );
}

function TableCaption({ className, ...props }) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-sm py-3", className)}
      style={{ color: colors.lightBlue }}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
