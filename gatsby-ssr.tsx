import React from "react"
import type { GatsbySSR } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { AppProvider } from "./src/context/App"
import { Wrapper } from "./src/components/Wrapper"
import { mdxComponents } from "./src/components/mdx"

export const wrapRootElement: GatsbySSR["wrapRootElement"] = ({ element }) => (
  <MDXProvider components={mdxComponents}>{element}</MDXProvider>
)

export const wrapPageElement: GatsbySSR["wrapPageElement"] = ({ element, props }) => (
  <AppProvider element={element} location={props.location}>
    <Wrapper>{element}</Wrapper>
  </AppProvider>
)
