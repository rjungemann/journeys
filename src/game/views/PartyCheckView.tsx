import {
  addTag,
  changeScene,
  removeTag,
  partyCheck,
} from '../actions'
import { useGame } from '../context'
import { findEntity, findPartyCheck, tagExistsGlobally } from '../helpers'
import { matchTags } from '../utils'
import { T } from './T'

export const NoPartyCheckView = ({ entityName }: { entityName: string }) => {
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
    dispatch(changeScene('room'))
  }

  const split = tag.split(':')
  const name = split[1]
  const pc = findPartyCheck(state)(name)
  const hasTag = tagExistsGlobally(state)(pc.conditionTag)
  if (!hasTag) {
    return <NoPartyCheckView entityName={entity.name} />
  }
  return (
    <>
      <h2>Talking to {entity.title}</h2>
      <p><T path={pc.stringKey} /></p>
      <p>
        <a onClick={handleNext}>Continue</a>.
      </p>
    </>
  )
}
