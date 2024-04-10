import { changeEntity, changeScene, changeSkillCheck } from "../../actions"
import { useGame } from "../../context"
import { findEntitySkillChecks, findRoom } from "../../helpers"

export const EntitySkillCheckListView = ({
  entityName,
}: {
  entityName: string
}) => {
  const { state, dispatch } = useGame()
  const skillChecks = findEntitySkillChecks(state)(entityName)
  if (skillChecks.length === 0) {
    return false
  }
  const handleNextFn = (name) => () => {
    dispatch(changeEntity(entityName))
    dispatch(changeSkillCheck(name))
    dispatch(changeScene('skill-check'))
  }
  return skillChecks.map(({ name, title }) => (
    <p key={name}><a onClick={handleNextFn(name)}>{title}</a></p>
  ))
}

export const RoomSkillCheckView = () => {
  const { state } = useGame()
  const room = findRoom(state)(state.roomName)
  const entities = room.entities.reduce((sum, entityName) => [...sum, findEntitySkillChecks(state)(entityName)], [])
  if (entities.length === 0) {
    return false
  }
  return (
    <>
      {room.entities.map((entityName) => <EntitySkillCheckListView key={entityName} entityName={entityName} />)}
    </>
  )
}