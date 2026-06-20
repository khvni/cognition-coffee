import React from "react"

type Props = {
  direction?: "vertical" | "horizontal"
  gap?: string
  as?: React.ElementType
  className?: string
  children: React.ReactNode
  [key: string]: unknown
}

export const Stack: React.FC<Props> = ({
  direction = "vertical",
  gap = "gap-3",
  as: Tag = "div",
  className,
  children,
  ...rest
}) => (
  <Tag
    className={`flex ${direction === "horizontal" ? "flex-row items-center" : "flex-col"} ${gap}${className ? ` ${className}` : ""}`}
    {...rest}
  >
    {children}
  </Tag>
)
