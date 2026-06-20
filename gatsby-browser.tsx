import React from "react"
import type { GatsbyBrowser } from "gatsby"
import "@fontsource-variable/geist"
import "@fontsource-variable/geist-mono"
import "./src/styles/global.css"
import { AppProvider } from "./src/context/App"
import { Wrapper } from "./src/components/Wrapper"

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({ element, props }) => (
  <AppProvider element={element} location={props.location}>
    <Wrapper>{element}</Wrapper>
  </AppProvider>
)
