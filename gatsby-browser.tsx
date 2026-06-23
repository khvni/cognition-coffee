import React from "react"
import type { GatsbyBrowser } from "gatsby"
import "@fontsource-variable/geist"
import "@fontsource-variable/geist-mono"
import "./src/styles/global.css"
import { AppProvider } from "./src/context/App"
import { Wrapper } from "./src/components/Wrapper"
import { initPostHog, trackEvent } from "./src/lib/posthog"

initPostHog()

export const onRouteUpdate: GatsbyBrowser["onRouteUpdate"] = ({ location }) => {
  if (typeof window !== "undefined") {
    trackEvent("page_view", { path: location.pathname })
  }
}

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({ element, props }) => {
  if (props.location.pathname.startsWith("/admin")) return <>{element}</>
  return (
    <AppProvider element={element} location={props.location}>
      <Wrapper>{element}</Wrapper>
    </AppProvider>
  )
}
