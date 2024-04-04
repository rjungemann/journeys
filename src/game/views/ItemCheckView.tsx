import { addTag, changeScene, removeTag, itemCheck } from "../actions"
import { useGame } from "../context"
import { hasMatchingTag, matchTags } from "../utils"

export const ItemCheckView = () => {
  const { state, dispatch } = useGame()
  if (state.sceneName !== 'item-check') {
    return null
  }
  const entity = state.entities.filter((e) => e.name === state.entityName)[0]!
  const tag = matchTags(entity.tags, /item-check:([^:]+)$/)[0]
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
  const ic = state.itemChecks.filter((ic) => ic.name === name)[0]!
  if (ic.conditionTag) {
    const hasTag = hasMatchingTag(state, ic.conditionTag)
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

  const handleNext = () => {
    dispatch(removeTag(entity.name, tag))
    // TODO: Hard-coded to first party member
    const subject = state.entities.filter((e) => e.name === state.party[0])[0]!
    dispatch(itemCheck(subject.name, ic.name))
    dispatch(addTag(entity.name, `item-check:${ic.name}:done`))
    dispatch(changeScene('entity'))
  }
  return (
    <>
      <h2>Talking to {entity.title}</h2>
      <p>{ic.message}</p>
      <p>
        <a onClick={handleNext}>Continue</a>.
      </p>
    </>
  )
}