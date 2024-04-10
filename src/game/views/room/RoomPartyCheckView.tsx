import { changeEntity, changeItemCheck, changeScene } from "../../actions"
import { useGame } from "../../context"
import { findEntityPartyChecks, findRoom } from "../../helpers"

export const EntityPartyCheckListView = ({
  entityName,
}: {
  entityName: string
}) => {
  const { state, dispatch } = useGame()
  const partyChecks = findEntityPartyChecks(state)(entityName)
  if (partyChecks.length === 0) {
    return false
  }
  const handleNextFn = (name) => (event) => {
    dispatch(changeEntity(entityName))
    dispatch(changeItemCheck(name))
    dispatch(changeScene('party-check'))
  }
  return partyChecks.map((itemCheck) => (
    <p key={itemCheck.name}><a onClick={handleNextFn(itemCheck.name)}>{itemCheck.title}</a></p>
  ))
}

export const RoomPartyCheckView = () => {
  const { state } = useGame()
  const room = findRoom(state)(state.roomName)
  const entities = room.entities.reduce((sum, entityName) => [...sum, findEntityPartyChecks(state)(entityName)], [])
  if (entities.length === 0) {
    return false
  }
  return (
    <>
      {room.entities.map((entityName) => <EntityPartyCheckListView key={entityName} entityName={entityName} />)}
    </>
  )
}