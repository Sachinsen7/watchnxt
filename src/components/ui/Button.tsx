import { Button as HeroButton, type ButtonProps as HeroButtonProps } from "@heroui/react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends Omit<HeroButtonProps, "variant"> {
  /** Extends HeroUI's variant enum with WatchNXT-specific looks. */
  variant?: HeroButtonProps["variant"] | "gradient" | "glass-icon";
}

/**
 * HeroUI's own `radius` prop generates a theme-scoped class (e.g. `rounded-large`) that has
 * repeatedly failed to compile in this app's build (same root cause as the Input/Select/Switch
 * rendering bugs — HeroUI's internals aren't fully covered by our Tailwind content scan). Rather
 * than debug that per-button, every radius is forced here with an `!important` Tailwind class we
 * control directly, so it's guaranteed to render regardless of what HeroUI does internally.
 */
const radiusClass: Record<NonNullable<HeroButtonProps["radius"]>, string> = {
  none: "!rounded-none",
  sm: "!rounded-sm",
  md: "!rounded-md",
  lg: "!rounded-lg",
  full: "!rounded-full",
};

/**
 * Thin theming layer over HeroUI's Button — `gradient` reproduces the
 * orange CTA glow used on every primary action (Watch Live, Send OTP,
 * Subscribe) per DESIGN_SYSTEM.md §3.3; `glass-icon` is the circular
 * translucent icon button (heart/bell/share) seen throughout the cards.
 */
export function Button({ variant = "solid", radius, className, ...props }: ButtonProps) {
  const forcedRadius = radiusClass[radius ?? "md"];

  if (variant === "gradient") {
    return (
      <HeroButton
        {...props}
        radius={radius}
        variant="solid"
        className={cn(
          "bg-gradient-cta font-semibold text-white shadow-glow-cta",
          "transition-transform hover:brightness-110 active:scale-[0.97]",
          forcedRadius,
          className,
        )}
      />
    );
  }

  if (variant === "glass-icon") {
    return (
      <HeroButton
        {...props}
        isIconOnly
        variant="flat"
        radius="full"
        disableRipple
        className={cn(
          "border-none bg-surface-raised/70 text-text-secondary backdrop-blur outline-none",
          "hover:text-text-primary hover:bg-surface-raised transition-colors",
          "!rounded-full",
          className,
        )}
      />
    );
  }

  return (
    <HeroButton
      {...props}
      radius={radius}
      variant={variant}
      disableRipple
      className={cn("border-none outline-none", forcedRadius, className)}
    />
  );
}
