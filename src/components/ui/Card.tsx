import React from "react"

type Props = {
  as?: React.ElementType
  hover?: boolean
  className?: string
  children: React.ReactNode
  [key: string]: unknown
}

const base = "rounded-win border border-line bg-panel shadow-card"

export const Card: React.FC<Props> = ({ as: Tag = "div", hover, className, children, ...rest }) => (
  <Tag
    className={`${base}${hover ? " transition-colors hover:border-accent-ink" : ""}${className ? ` ${className}` : ""}`}
    {...rest}
  >
    {children}
  </Tag>
)
