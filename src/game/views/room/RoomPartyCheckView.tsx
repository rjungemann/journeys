import { changeEntity, changeItemCheck, changeScene } from "../../actions"
import { useGame } from "../../context"
import { findEntityPartyChecks, findRoom } from "../../helpers"
import { commaSeparateComponents } from "../../utils"

export const EntityPartyCheckListView = ({
  entityName,
}: {
  entityName: string
}) => {
  const { state, dispatch } = useGame()
  const partyChecks = findEntityPartyChecks(state)(entityName)
  if (partyChecks.length === 0) {
    return null
  }
  const handleNextFn = (name) => (event) => {
    dispatch(changeEntity(entityName))
    dispatch(changeItemCheck(name))
    dispatch(changeScene('party-check'))
  }
  return (
    <p>
      {commaSeparateComponents(
        partyChecks.map((itemCheck) => (
          <a key={itemCheck.name} onClick={handleNextFn(itemCheck.name)}>{itemCheck.title}</a>
        )),
        'or',
      )}
    </p>
  )
}

export const RoomPartyCheckView = () => {
  const { state } = useGame()
  const room = findRoom(state)(state.roomName)
  const isShown = room.entities.some((entityName) => findEntityPartyChecks(state)(entityName).length > 0)
  if (!isShown) {
    return null
  }
  return (
    <>
      <h3>Party Checks</h3>
      {room.entities.map((entityName) => <EntityPartyCheckListView key={entityName} entityName={entityName} />)}
    </>
  )
}