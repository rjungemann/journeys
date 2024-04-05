import { resetState, showInspector } from "../actions"
import { useGame, useTheme } from "../context"
import { findField } from "../helpers"
import { commaSeparateStrings } from "../utils"

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
  const { ticks, partyRepresentativeName, party, sceneName, roomName, entityName, skillCheckName, itemCheckName, choiceName } = state
  const abriged = { ticks, partyRepresentativeName, party, sceneName, roomName, entityName, skillCheckName, itemCheckName, choiceName }
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

            <h3>Abriged State</h3>
            <pre className="code">
              {JSON.stringify(abriged, null, 2)}
            </pre>
            {
              state.fieldName
              ? (
                <>
                  <h3>Field State</h3>
                  <pre className="code">
                    {JSON.stringify(findField(state)(state.fieldName), null, 2)}
                  </pre>
                </>
              )
              : null
            }
            <>
              <h3>Full State</h3>
              <pre className="code">
                {JSON.stringify(state, null, 2)}
              </pre>
            </>
          </>
        )
        : null
      }
    </div>
  )
}