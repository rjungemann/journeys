import { useGame } from "../context"
import { findField } from "../helpers"

export const InspectorView = () => {
  const { state } = useGame()
  const { ticks, partyRepresentativeName, party, sceneName, roomName, entityName, skillCheckName, itemCheckName, choiceName } = state
  const abriged = { ticks, partyRepresentativeName, party, sceneName, roomName, entityName, skillCheckName, itemCheckName, choiceName }
  return (
    state.showInspector
    ? (
      <div className="inspector-toggle">
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
      </div>
    )
    : null
  )
}