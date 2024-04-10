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
  return (
    <>
      <p>
        Would you like to talk about{' '}
        {commaSeparateComponents(
          dialogues.map((dialogue) => (
            <a key={dialogue.name} onClick={handleNextFn(dialogue)}>
              {dialogue.topic}
            </a>
          )),
          'or',
        )}
      </p>
    </>
  )
}

export const RoomDialoguesView = () => {
  const { state } = useGame()
  const room = findRoom(state)(state.roomName)
  const isShown = room.entities.some((entityName) => findEntityDialogues(state)(entityName).length > 0)
  if (!isShown) {
    return false
  }
  return (
    <>
      {room.entities.map((entityName) => <EntityDialogueView key={entityName} entityName={entityName} />)}
    </>
  )
}