import { changeEntity, changeItemCheck, changeScene } from "../../actions"
import { useGame } from "../../context"
import { findEntityItemChecks, findRoom } from "../../helpers"
import { commaSeparateComponents } from "../../utils"

export const EntityItemCheckListView = ({
  entityName,
}: {
  entityName: string
}) => {
  const { state, dispatch } = useGame()
  const itemChecks = findEntityItemChecks(state)(entityName)
  if (itemChecks.length === 0) {
    return null
  }
  const handleNextFn = (name) => (event) => {
    dispatch(changeEntity(entityName))
    dispatch(changeItemCheck(name))
    dispatch(changeScene('item-check'))
  }
  return (
    <p>
      {commaSeparateComponents(
        itemChecks.map((itemCheck) => (
          <a key={itemCheck.name} onClick={handleNextFn(itemCheck.name)}>{itemCheck.title}</a>
        )),
        'or',
      )}
    </p>
  )
}

export const RoomItemCheckView = () => {
  const { state, dispatch } = useGame()
  const room = findRoom(state)(state.roomName)
  const isShown = room.entities.some((entityName) => findEntityItemChecks(state)(entityName).length > 0)
  if (!isShown) {
    return null
  }
  return (
    <>
      {room.entities.map((entityName) => <EntityItemCheckListView key={entityName} entityName={entityName} />)}
    </>
  )
}