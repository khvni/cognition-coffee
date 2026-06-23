import React from "react"
import type { GatsbySSR } from "gatsby"
import { AppProvider } from "./src/context/App"
import { Wrapper } from "./src/components/Wrapper"

const MODE_SCRIPT = `
(function() {
  try {
    var w = window.innerWidth || 0
    var ua = navigator.userAgent || ""
    var mobile = /Android|iPhone|iPad|iPod/i.test(ua) || w <= 768
    if (mobile) { document.documentElement.dataset.ccMode = "site"; return }
    var saved = localStorage.getItem("ccvm.experience")
    var mode = saved || (w < 880 ? "site" : "os")
    document.documentElement.dataset.ccMode = mode
  } catch (e) {
    document.documentElement.dataset.ccMode = "site"
  }
})()
`

export const onRenderBody: GatsbySSR["onRenderBody"] = ({ setHeadComponents }) => {
  setHeadComponents([
    <script key="cc-mode" dangerouslySetInnerHTML={{ __html: MODE_SCRIPT }} />,
  ])
}

export const wrapPageElement: GatsbySSR["wrapPageElement"] = ({ element, props }) => {
  if (props.location.pathname.startsWith("/admin")) return <>{element}</>
  return (
    <AppProvider element={element} location={props.location}>
      <Wrapper>{element}</Wrapper>
    </AppProvider>
  )
}
