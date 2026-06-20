import React from "react"
import type { GatsbyBrowser } from "gatsby"
import "@fontsource-variable/geist"
import "@fontsource-variable/geist-mono"
import "@fontsource/stix-two-text/400.css"
import "@fontsource/stix-two-text/400-italic.css"
import "@fontsource/stix-two-text/600.css"
import "./src/styles/global.css"
import { AppProvider } from "./src/context/App"
import { Wrapper } from "./src/components/Wrapper"

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({ element, props }) => (
  <AppProvider element={element} location={props.location}>
    <Wrapper>{element}</Wrapper>
  </AppProvider>
)
