import { showInspector } from "../actions"
import { useGame } from "../context"

export const InspectorView = () => {
  const { state, dispatch } = useGame()
  const toggleInspector = (event) => {
    dispatch(showInspector(!state.showInspector))
  }
  return (
    <>
      <a onClick={toggleInspector}>{state.showInspector ? 'Hide Inspector' : 'Show Inspector'}</a>
      {
        state.showInspector
        ? (
          <pre className="code">
            {JSON.stringify(state, null, 2)}
          </pre>
        )
        : null
      }
    </>
  )
}