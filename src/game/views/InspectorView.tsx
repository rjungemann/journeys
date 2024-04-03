import { resetState, showInspector } from "../actions"
import { useGame } from "../context"

export const InspectorView = () => {
  const { state, dispatch } = useGame()
  const toggleInspector = (event) => {
    dispatch(showInspector(!state.showInspector))
  }
  const handleReset = (event) => {
    dispatch(resetState())
  }
  return (
    <>
      <p className="inspector-toggle">
        <button onClick={toggleInspector}>{state.showInspector ? 'Hide Inspector' : 'Show Inspector'}</button>
      </p>
      {
        state.showInspector
        ? (
          <>
            <a onClick={handleReset}>Reset State</a>
            <pre className="code">
              {JSON.stringify(state, null, 2)}
            </pre>
          </>
        )
        : null
      }
    </>
  )
}