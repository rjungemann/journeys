import { changeEntity, changeScene, changeSkillCheck } from "../../actions"
import { useGame } from "../../context"
import { findEntitySkillChecks, findRoom } from "../../helpers"
import { commaSeparateComponents } from "../../utils"

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
  return (
    <p>
      {commaSeparateComponents(
        skillChecks.map(({ name, title }) => (
          <a key={name} onClick={handleNextFn(name)}>{title}</a>
        )),
        'or',
      )}
    </p>
  )
}

export const RoomSkillCheckView = () => {
  const { state } = useGame()
  const room = findRoom(state)(state.roomName)
  const isShown = room.entities.some((entityName) => findEntitySkillChecks(state)(entityName).length > 0)
  if (!isShown) {
    return false
  }
  return (
    <>
      <h3>Skill Checks</h3>
      {room.entities.map((entityName) => <EntitySkillCheckListView key={entityName} entityName={entityName} />)}
    </>
  )
}