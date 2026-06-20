import React from "react"

type Props = { children: React.ReactNode }
type State = { hasError: boolean }

/** Branded app-shell boundary: contains a render failure behind a calm, on-brand fallback. */
export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("App shell render error", error, info.componentStack)
  }

  render() {
    if (!this.state.hasError) return this.props.children
    return (
      <div className="grid min-h-screen place-items-center bg-canvas px-6 text-ink">
        <div className="max-w-sm text-center">
          <p className="text-[15px] font-semibold tracking-tight">
            cognition<span className="text-accent-ink">.coffee</span>
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-muted">
            Something went sideways while rendering. A reload usually pours a fresh cup.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-5 inline-flex min-h-[40px] items-center rounded-md border border-line px-4 text-[13px] text-ink transition-colors hover:bg-panel"
          >
            Reload
          </button>
        </div>
      </div>
    )
  }
}
