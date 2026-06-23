import React from "react"
import type { GatsbySSR } from "gatsby"
import { AppProvider } from "./src/context/App"
import { Wrapper } from "./src/components/Wrapper"

export const wrapPageElement: GatsbySSR["wrapPageElement"] = ({ element, props }) => {
  if (props.location.pathname.startsWith("/admin")) return <>{element}</>
  return (
    <AppProvider element={element} location={props.location}>
      <Wrapper>{element}</Wrapper>
    </AppProvider>
  )
}
