import { changeChoice, changeEntity, changeScene } from "../../actions"
import { useGame } from "../../context"
import { findEntity, findEntityChoices, findRoom } from "../../helpers"
import { commaSeparateComponents } from "../../utils"

export const EntityChoiceListView = ({
  entityName,
}: {
  entityName: string
}) => {
  const { state, dispatch } = useGame()
  const choices = findEntityChoices(state)(entityName)
  const handleNextFn = (name) => () => {
    dispatch(changeEntity(entityName))
    dispatch(changeChoice(name))
    dispatch(changeScene('choice'))
  }
  if (choices.length === 0) {
    return false
  }
  const entity = findEntity(state)(entityName)
  return (
    <>
      <h4>{entity.title}</h4>
      <p>
        {commaSeparateComponents(
          choices.map((choice) => {
            return <a key={choice.name} onClick={handleNextFn(choice.name)}>{choice.title}</a>
          }),
          'or',
        )}
      </p>
    </>
  )
}

export const RoomChoiceView = () => {
  const { state } = useGame()
  const room = findRoom(state)(state.roomName)
  const isShown = room.entities.some((entityName) => findEntityChoices(state)(entityName).length > 0)
  if (!isShown) {
    return false
  }
  return (
    <>
      <h3>Choices</h3>
      {room.entities.map((entityName) => <EntityChoiceListView key={entityName} entityName={entityName} />)}
    </>
  )
}