import React from "react"
import { SITE_CONTAINER } from "@/lib/layout"

type Props = {
  as?: React.ElementType
  className?: string
  children: React.ReactNode
  [key: string]: unknown
}

export const Container: React.FC<Props> = ({ as: Tag = "div", className, children, ...rest }) => (
  <Tag className={SITE_CONTAINER + (className ? ` ${className}` : "")} {...rest}>{children}</Tag>
)
