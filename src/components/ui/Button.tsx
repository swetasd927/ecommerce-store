import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "../../lib/cn";

export type ButtonVariant = "primary" | "secondary" | "outline" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-500 text-white hover:bg-brand-600 dark:bg-brand-500 dark:hover:bg-brand-600",
  secondary:
    "bg-gray-100 text-ink-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-ink-dark dark:hover:bg-gray-700",
  outline:
    "border border-gray-300 bg-transparent text-ink-900 hover:border-brand-500 hover:text-brand-600 dark:border-gray-700 dark:text-ink-dark dark:hover:border-brand-500 dark:hover:text-brand-500",
  danger:
    "bg-danger-500 text-white hover:bg-danger-600 dark:bg-danger-600 dark:hover:bg-danger-700",
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

/**
 * Base reusable button. 
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      className,
      disabled,
      children,
      ...rest
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "rounded-theme shadow-theme inline-flex items-center justify-center gap-2 font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none",
          VARIANT_STYLES[variant],
          SIZE_STYLES[size],
          fullWidth && "w-full",
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;