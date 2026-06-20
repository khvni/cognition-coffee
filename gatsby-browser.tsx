import React from "react"
import type { GatsbyBrowser } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import "@fontsource-variable/geist"
import "@fontsource-variable/geist-mono"
import "@fontsource/stix-two-text/400.css"
import "@fontsource/stix-two-text/400-italic.css"
import "@fontsource/stix-two-text/600.css"
import "@fontsource/stix-two-text/700.css"
import "./src/styles/global.css"
import { AppProvider } from "./src/context/App"
import { Wrapper } from "./src/components/Wrapper"
import { mdxComponents } from "./src/components/mdx"

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({ element }) => (
  <MDXProvider components={mdxComponents}>{element}</MDXProvider>
)

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({ element, props }) => (
  <AppProvider element={element} location={props.location}>
    <Wrapper>{element}</Wrapper>
  </AppProvider>
)
