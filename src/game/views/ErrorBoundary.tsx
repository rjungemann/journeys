import { Component, PropsWithChildren } from "react"
import { GAME_KEY, GameConsumer, ThemeConsumer, useTheme } from "../context"
import { HeadView } from "./HeadView"

export type ErrorBoundaryState = {
  error: Error | null
}

export class ErrorBoundary extends Component {
  state: ErrorBoundaryState = { error: null }
  props: PropsWithChildren

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { error }
  }

  render() {
    const resetStorage = () => {
      localStorage.removeItem(GAME_KEY)
      window.location.reload()
    }
    if (this.state.error) {
      // You can render any custom fallback UI
      return (
        <ThemeConsumer>
          {({ theme }) => {
            return (
              <GameConsumer>
                {({ state }) => {
                  return (
                    <div className={`theme-${theme}`}>
                      <HeadView />
                      <h2>An error occurred.</h2>
                      <h3>{this.state.error.name}: {this.state.error.message}</h3>
                      <p><a onClick={resetStorage}>Reset Storage</a></p>
                      <pre className="code">{JSON.stringify(state, null, 2)}</pre>
                    </div>
                  )
                }}
              </GameConsumer>
            )
          }}
        </ThemeConsumer>
      )
    }
    return this.props.children
  }
}