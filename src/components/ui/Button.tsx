import React from "react"

const variants = {
  primary: "bg-ink text-panel hover:bg-ink/90",
  secondary: "border border-line bg-panel text-ink hover:bg-canvas",
  ghost: "text-muted hover:bg-panel hover:text-ink",
} as const

type Variant = keyof typeof variants

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: "sm" | "md"
}

const base = "inline-flex items-center justify-center rounded-md font-sans transition-colors"

const sizes = {
  sm: "min-h-[32px] px-3 text-[13px]",
  md: "min-h-[40px] px-4 text-[14px]",
} as const

export const Button: React.FC<Props> = ({
  variant = "secondary",
  size = "md",
  className,
  children,
  ...rest
}) => (
  <button
    type="button"
    className={`${base} ${sizes[size]} ${variants[variant]}${className ? ` ${className}` : ""}`}
    {...rest}
  >
    {children}
  </button>
)
