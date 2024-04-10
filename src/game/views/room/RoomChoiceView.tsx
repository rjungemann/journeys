import { changeChoice, changeEntity, changeScene } from "../../actions"
import { useGame } from "../../context"
import { findEntityChoices, findRoom } from "../../helpers"

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
  return choices.map((choice) => (
    <p key={choice.name}><a onClick={handleNextFn(choice.name)}>{choice.title}</a></p>
  ))
}

export const RoomChoiceView = () => {
  const { state } = useGame()
  const room = findRoom(state)(state.roomName)
  const entities = room.entities.reduce((sum, entityName) => [...sum, findEntityChoices(state)(entityName)], [])
  if (entities.length === 0) {
    return false
  }
  return (
    <>
      {room.entities.map((entityName) => <EntityChoiceListView key={entityName} entityName={entityName} />)}
    </>
  )
}