import { addTag, changeScene, removeTag } from "../actions"
import { useGame } from "../context"
import { matchTag } from "../utils"

export const DialogueView = () => {
  const { state, dispatch } = useGame()
  if (state.sceneName !== 'dialogue') {
    return null
  }
  const entity = state.entities.filter((e) => e.name === state.entityName)[0]!
  const tag = matchTag(entity.tags, /dialogue:([^:]+):(\d+)$/)[0]
  if (!tag) {
    const handleLeave = () => {
      dispatch(changeScene('entity'))
    }
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
  const message = dialogue.messages[index]!
  const handleNext = () => {
    dispatch(removeTag(entity.name, tag))
    if (index >= dialogue.messages.length - 1) {
      const afterTags = entity.tags.reduce(
        (sum, oldTag) => {
          const match = oldTag.match(/^dialogue:([^:]+):tag:(.+)$/) || []
          const [_, name, newTag] = match
          if (!name) {
            return sum
          }
          return [...sum, [oldTag, newTag]]
        },
        []
      )
      afterTags.forEach(([oldTag, newTag]) => {
        dispatch(removeTag(entity.name, oldTag))
        dispatch(addTag(entity.name, newTag))
      })
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