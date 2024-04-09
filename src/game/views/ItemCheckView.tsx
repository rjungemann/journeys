import { addTag, changeScene, removeTag, itemCheck } from '../actions'
import { useGame } from '../context'
import { findEntity, findItemCheck, tagExistsGlobally } from '../helpers'
import { matchTags } from '../utils'
import { T } from './T'

export const NoItemCheckView = ({ entityName }: { entityName: string }) => {
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

export const ItemCheckView = () => {
  const { state, dispatch } = useGame()
  const entity = findEntity(state)(state.entityName)
  const tag = matchTags(entity.tags, /item-check:([^:]+)$/)[0]
  if (!tag) {
    return <NoItemCheckView entityName={entity.name} />
  }
  const split = tag.split(':')
  const name = split[1]
  const ic = findItemCheck(state)(name)
  const hasTag = tagExistsGlobally(state)(ic.conditionTag)
  if (!hasTag) {
    return <NoItemCheckView entityName={entity.name} />
  }

  const handleNext = () => {
    dispatch(removeTag(entity.name, tag))
    const subject = findEntity(state)(state.partyRepresentativeName)
    dispatch(itemCheck(subject.name, ic.name))
    dispatch(addTag(entity.name, `item-check:${ic.name}:done`))
    dispatch(changeScene('room'))
  }
  return (
    <>
      <h2>Talking to {entity.title}</h2>
      <p><T path={ic.stringKey} /></p>
      <p>
        <a onClick={handleNext}>Continue</a>.
      </p>
    </>
  )
}
