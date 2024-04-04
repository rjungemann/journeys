import { resetState, showInspector } from "../actions"
import { useGame, useTheme } from "../context"

export const InspectorView = () => {
  const { state, dispatch } = useGame()
  const { theme, setTheme } = useTheme()
  const toggleInspector = (event) => {
    dispatch(showInspector(!state.showInspector))
  }
  const toggleTheme = (event) => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  const handleReset = (event) => {
    dispatch(resetState())
  }
  return (
    <div className="inspector-toggle">
      <p>
        <button onClick={toggleInspector}>{state.showInspector ? 'Hide Inspector' : 'Show Inspector'}</button>
      </p>

      {
        state.showInspector
        ? (
          <>
            <p>
              <a onClick={toggleTheme}>{theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}</a>
              {' | '}
              <a onClick={handleReset}>Reset State</a>
            </p>
            <pre className="code">
              {JSON.stringify(state, null, 2)}
            </pre>
          </>
        )
        : null
      }
    </div>
  )
}