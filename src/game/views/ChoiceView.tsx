import { addTag, changeScene, removeTag } from '../actions'
import { useGame } from '../context'
import { findChoice, findEntity, tagExitsGlobally } from '../helpers'
import { matchTags } from '../utils'
import { tFn, useT } from './T'

export const NoChoiceView = ({ entityName }: { entityName: string }) => {
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

export const ChoiceView = () => {
  const { state, dispatch } = useGame()
  const { t } = useT()
  const entity = findEntity(state)(state.entityName)
  const tag = matchTags(entity.tags, /choice:([^:]+)$/)[0]
  if (!tag) {
    return <NoChoiceView entityName={entity.name} />
  }
  const split = tag.split(':')
  const name = split[1]
  const choice = findChoice(state)(name)
  if (choice.conditionTag) {
    const hasTag = tagExitsGlobally(state)(choice.conditionTag)
    if (!hasTag) {
      return <NoChoiceView entityName={entity.name} />
    }
  }

  const handleNextFn = (option) => () => {
    dispatch(removeTag(entity.name, tag))
    dispatch(addTag(entity.name, `choice:${choice.name}:${option.name}`))
    dispatch(changeScene('room'))
  }
  return (
    <>
      <h2>Talking to {entity.title}</h2>
      <p>{t(choice.stringKey)}</p>
      <p>
        {choice.options.map((option, i) => {
          return (
            <span key={i}>
              <a onClick={handleNextFn(option)}>{t(option.stringKey)}</a>
              {i < choice.options.length - 1 ? <br /> : null}
            </span>
          )
        })}
      </p>
    </>
  )
}
