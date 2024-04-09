import { addTag, changeScene, removeTag } from '../actions'
import { useGame } from '../context'
import { findDialogue, findEntity, tagExistsGlobally } from '../helpers'
import { matchTags } from '../utils'
import { useT } from './T'

export const NoDialogueView = ({ entityName }: { entityName: string }) => {
  const { state, dispatch } = useGame()
  const entity = findEntity(state)(entityName)
  const handleLeave = () => {
    dispatch(changeScene('room'))
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

export const DialogueView = () => {
  const { state, dispatch } = useGame()
  const { t } = useT()
  const entity = findEntity(state)(state.entityName)
  const tag = matchTags(entity.tags, /dialogue:([^:]+):(\d+)$/)[0]
  if (!tag) {
    return <NoDialogueView entityName={state.entityName} />
  }
  const split = tag.split(':')
  const [name, index] = [split[1], parseInt(split[2], 10)]
  const dialogue = findDialogue(state)(name)
  const hasTag = tagExistsGlobally(state)(dialogue.conditionTag)
  if (!hasTag) {
    return <NoDialogueView entityName={state.entityName} />
  }

  const message = t(dialogue.stringKeys[index]!)
  const handleNext = () => {
    dispatch(removeTag(entity.name, tag))
    if (index >= dialogue.stringKeys.length - 1) {
      dispatch(addTag(entity.name, `dialogue:${name}:done`))
      dispatch(changeScene('room'))
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
