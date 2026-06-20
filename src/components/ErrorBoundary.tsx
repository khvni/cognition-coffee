import React from "react"

type Props = { children: React.ReactNode }
type State = { hasError: boolean }

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info.componentStack)
  }

  render() {
    if (!this.state.hasError) return this.props.children
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 bg-canvas p-8 text-center">
        <p className="text-[15px] font-medium tracking-tight text-ink">
          Cognition <span className="text-accent-ink">Coffee</span>
        </p>
        <p className="text-[14px] text-muted">Something went sideways.</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-md border border-line bg-panel px-4 py-2 text-[13px] text-ink transition-colors hover:bg-canvas"
        >
          Reload
        </button>
      </div>
    )
  }
}
