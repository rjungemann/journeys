import { changeEntity, changeItemCheck, changeScene } from "../../actions"
import { useGame } from "../../context"
import { findEntityBattleChecks, findRoom } from "../../helpers"
import { commaSeparateComponents } from "../../utils"

export const EntityBattleCheckListView = ({
  entityName,
}: {
  entityName: string
}) => {
  const { state, dispatch } = useGame()
  const battleChecks = findEntityBattleChecks(state)(entityName)
  const handleNextFn = (name) => () => {
    dispatch(changeEntity(entityName))
    dispatch(changeItemCheck(name))
    dispatch(changeScene('battle-check'))
  }
  return (
    <p>
      {commaSeparateComponents(
        battleChecks.map((itemCheck) => (
          <a onClick={handleNextFn(itemCheck.name)}>{itemCheck.title}</a>
        )),
        'or',
      )}
    </p>
  )
}

export const RoomBattleCheckView = () => {
  const { state, dispatch } = useGame()
  const room = findRoom(state)(state.roomName)
  const isShown = room.entities.some((entityName) => findEntityBattleChecks(state)(entityName).length > 0)
  if (!isShown) {
    return false
  }
  return (
    <>
      {room.entities.map((entityName) => <EntityBattleCheckListView key={entityName} entityName={entityName} />)}
    </>
  )
}