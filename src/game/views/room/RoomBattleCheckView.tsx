import { changeEntity, changeItemCheck, changeScene } from "../../actions"
import { useGame } from "../../context"
import { findEntityBattleChecks, findRoom } from "../../helpers"

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
  return battleChecks.map((itemCheck) => (
    <p key={itemCheck.name}><a onClick={handleNextFn(itemCheck.name)}>{itemCheck.title}</a></p>
  ))
}

export const RoomBattleCheckView = () => {
  const { state } = useGame()
  const room = findRoom(state)(state.roomName)
  const entities = room.entities.reduce((sum, entityName) => [...sum, ...findEntityBattleChecks(state)(entityName)], [])
  if (entities.length === 0) {
    return false
  }
  return (
    <>
      {room.entities.map((entityName) => <EntityBattleCheckListView key={entityName} entityName={entityName} />)}
    </>
  )
}