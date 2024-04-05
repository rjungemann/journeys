import { Component, PropsWithChildren } from "react"
import { GAME_KEY, GameConsumer } from "../context"

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
        <GameConsumer>
          {
            (state) => {
              return (
                <>
                  <h1>An error occurred.</h1>
                  <h2>{this.state.error.name}: {this.state.error.message}</h2>
                  <button onClick={resetStorage}>Reset Storage</button>
                  <pre className="code">{JSON.stringify(state, null, 2)}</pre>
                </>
              )
            }
          }
        </GameConsumer>
      )
    }
    return this.props.children
  }
}