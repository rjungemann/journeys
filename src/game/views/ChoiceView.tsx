import { addTag, changeScene, removeTag } from "../actions"
import { useGame } from "../context"
import { hasMatchingTag, matchTags } from "../utils"

export const ChoiceView = () => {
  const { state, dispatch } = useGame()
  if (state.sceneName !== 'choice') {
    return null
  }
  const entity = state.entities.filter((e) => e.name === state.entityName)[0]!
  const tag = matchTags(entity.tags, /choice:([^:]+)$/)[0]
  const handleLeave = () => {
    // TODO: Don't hard-code to entity, keep track of scene to go back to
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
  const name = split[1]
  const choice = state.choices.filter((c) => c.name === name)[0]!
  if (choice.conditionTag) {
    const hasTag = hasMatchingTag(state, choice.conditionTag)
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

  const handleNextFn = (option) => () => {
    dispatch(removeTag(entity.name, tag))
    dispatch(addTag(entity.name, `choice:${choice.name}:${option.name}`))
    dispatch(changeScene('entity'))
  }
  return (
    <>
      <h2>Talking to {entity.title}</h2>
      <p>{choice.message}</p>
      <p>
        {choice.options.map((option, i) => {
          return (
            <span key={i}>
              <a onClick={handleNextFn(option)}>{option.message}</a>
              {i < choice.options.length - 1 ? <br /> : null}
            </span>
          )
        })}
      </p>
    </>
  )
}