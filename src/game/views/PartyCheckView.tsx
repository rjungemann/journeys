import { addTag, changeScene, removeTag, itemCheck, partyCheck } from "../actions"
import { useGame } from "../context"
import { findEntity, findPartyCheck, tagExitsGlobally } from "../helpers"
import { matchTags } from "../utils"

export const NoPartyCheckView = ({ entityName }: { entityName: string }) => {
  const { state, dispatch } = useGame()
  const entity = findEntity(state)(entityName)
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

export const PartyCheckView = () => {
  const { state, dispatch } = useGame()
  const entity = findEntity(state)(state.entityName)
  const tag = matchTags(entity.tags, /party-check:([^:]+)$/)[0]
  if (!tag) {
    return <NoPartyCheckView entityName={entity.name} />
  }

  const handleNext = () => {
    dispatch(removeTag(entity.name, tag))
    const pc = findPartyCheck(state)(state.partyCheckName)
    dispatch(partyCheck(pc.name))
    dispatch(addTag(entity.name, `party-check:${pc.name}:done`))
    dispatch(changeScene('entity'))
  }

  const split = tag.split(':')
  const name = split[1]
  const pc = findPartyCheck(state)(name)
  if (pc.conditionTag) {
    const hasTag = tagExitsGlobally(state)(pc.conditionTag)
    if (!hasTag) {
      return <NoPartyCheckView entityName={entity.name} />
    }
  }
  return (
    <>
      <h2>Talking to {entity.title}</h2>
      <p>{pc.message}</p>
      <p>
        <a onClick={handleNext}>Continue</a>.
      </p>
    </>
  )
}