import { changeDialogue, changeEntity, changeScene } from "../../actions"
import { useGame } from "../../context"
import { findEntityDialogues, findRoom } from "../../helpers"
import { commaSeparateComponents } from "../../utils"

export const EntityDialogueView = ({ entityName }: { entityName: string }) => {
  const { state, dispatch } = useGame()
  const dialogues = findEntityDialogues(state)(entityName)
  const handleNextFn = (dialogue) => () => {
    dispatch(changeEntity(entityName))
    dispatch(changeDialogue(dialogue.name))
    dispatch(changeScene('dialogue'))
  }
  if (dialogues.length === 0) {
    return false
  }
  return dialogues.map((dialogue) => (
    <p key={dialogue.name}>
      <a onClick={handleNextFn(dialogue)}>
        {dialogue.topic}
      </a>
    </p>
  ))
}

export const RoomDialoguesView = () => {
  const { state } = useGame()
  const room = findRoom(state)(state.roomName)
  const entities = room.entities.reduce((sum, entityName) => [...sum, findEntityDialogues(state)(entityName)], [])
  if (entities.length === 0) {
    return false
  }
  return (
    <>
      {room.entities.map((entityName) => <EntityDialogueView key={entityName} entityName={entityName} />)}
    </>
  )
}