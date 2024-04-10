import { changeEntity, changeItemCheck, changeScene } from "../../actions"
import { useGame } from "../../context"
import { findEntityItemChecks, findRoom } from "../../helpers"

export const EntityItemCheckListView = ({
  entityName,
}: {
  entityName: string
}) => {
  const { state, dispatch } = useGame()
  const itemChecks = findEntityItemChecks(state)(entityName)
  if (itemChecks.length === 0) {
    return false
  }
  const handleNextFn = (name) => (event) => {
    dispatch(changeEntity(entityName))
    dispatch(changeItemCheck(name))
    dispatch(changeScene('item-check'))
  }
  return itemChecks.map((itemCheck) => (
    <p key={itemCheck.name}><a onClick={handleNextFn(itemCheck.name)}>{itemCheck.title}</a></p>
  ))
}

export const RoomItemCheckView = () => {
  const { state, dispatch } = useGame()
  const room = findRoom(state)(state.roomName)
  const entities = room.entities.reduce((sum, entityName) => [...sum, findEntityItemChecks(state)(entityName)], [])
  if (entities.length === 0) {
    return false
  }
  return (
    <>
      {room.entities.map((entityName) => <EntityItemCheckListView key={entityName} entityName={entityName} />)}
    </>
  )
}