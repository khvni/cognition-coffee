import React from "react"
import type { GatsbyBrowser } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import "@fontsource-variable/inter"
import "@fontsource/ibm-plex-mono/400.css"
import "@fontsource/ibm-plex-mono/500.css"
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
