import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { colors } from "../../utils/colors";
import { cn } from "../../lib/utils";

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className,
    )}
    style={{ color: colors.darkNavy }}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
