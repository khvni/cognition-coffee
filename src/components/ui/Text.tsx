import React from "react"
import { text as presets, type TextPreset } from "@/lib/tokens"

type Props = {
  as?: React.ElementType
  preset?: TextPreset
  className?: string
  children: React.ReactNode
}

export const Text: React.FC<Props> = ({ as: Tag = "span", preset, className, children }) => (
  <Tag className={`${preset ? presets[preset] : ""}${className ? ` ${className}` : ""}`}>{children}</Tag>
)
