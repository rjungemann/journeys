import { addTag, changeScene, removeTag } from "../actions"
import { useGame } from "../context"
import { hasMatchingTag, matchTags } from "../utils"

export const DialogueView = () => {
  const { state, dispatch } = useGame()
  if (state.sceneName !== 'dialogue') {
    return null
  }
  const entity = state.entities.filter((e) => e.name === state.entityName)[0]!
  const tag = matchTags(entity.tags, /dialogue:([^:]+):(\d+)$/)[0]
  const handleLeave = () => {
    dispatch(changeScene('entity'))
  }
  if (!tag) {
    return (
      <>
        <h2>Talking to {entity.title}</h2>
        <p>
          <a onClick={handleLeave}>Leave</a>.
        </p>
      </>
    )
  }
  const split = tag.split(':')
  const [name, index] = [split[1], parseInt(split[2], 10)]
  const dialogue = state.dialogues.filter((d) => d.name === name)[0]!
  if (dialogue.conditionTag) {
    const hasTag = hasMatchingTag(state, dialogue.conditionTag)
    if (!hasTag) {
      return (
        <>
          <h2>Talking to {entity.title}</h2>
          <p>
            <a onClick={handleLeave}>Leave</a>.
          </p>
        </>
      )
    }
  }

  const message = dialogue.messages[index]!
  const handleNext = () => {
    dispatch(removeTag(entity.name, tag))
    if (index >= dialogue.messages.length - 1) {
      dispatch(addTag(entity.name, `dialogue:${name}:done`))
      dispatch(changeScene('entity'))
    } else {
      dispatch(addTag(entity.name, `dialogue:${name}:${index + 1}`))
    }
  }
  return (
    <>
      <h2>Talking to {entity.title}</h2>
      <p>{message}</p>
      <p>
        <a onClick={handleNext}>Next</a>.
      </p>
    </>
  )
}