import { addTag, changeScene, removeLastSkillCheckEvent, removeTag, skillCheck } from "../actions"
import { useGame } from "../context"
import { commaSeparateStrings } from "../utils"

export const SkillCheckPreView = () => {
  const { state, dispatch } = useGame()
  if (state.lastSkillCheckEvent) {
    return null
  }
  const object = state.entities.filter((e) => e.name === state.entityName)[0]!
  const subject = state.entities.filter((e) => state.party.some((en) => e.name === en))[0]!
  const data = object.tags.reduce(
    (sum, tag) => {
      const [_, name] = tag.match(/^skill-check:([^:]+)$/) || []
      if (!name) {
        return sum
      }
      const { title, characteristic, skill, tn } = state.skillChecks.filter((sc) => sc.name === name)[0]!
      return [...sum, { tag, title, name, characteristic, skill, tn }]
    },
    []
  )[0]
  if (!data) {
    return null
  }
  const { tag, name, title, characteristic, skill, tn } = data
  const characteristicValue = subject.characteristics[characteristic]
  const skillValue = subject.skills[skill]
  const handleTry = () => {
    dispatch(skillCheck(subject.name, object.name, name, characteristic, skill, '2d6', tn))
    dispatch(removeTag(object.name, tag))
  }
  return (
    <>
      <p>{characteristicValue} ({characteristic}) + {skillValue} ({skill}) = {tn}</p>
      <p><a onClick={handleTry}>Try</a>.</p>
    </>
  )
}

export const SkillCheckPostView = () => {
  const { state, dispatch } = useGame()
  const object = state.entities.filter((e) => e.name === state.entityName)[0]!
  if (!state.lastSkillCheckEvent) {
    return null
  }
  const { objectName, skillCheckName, characteristicValue, skillValue, roll, total, tn, isSuccess } = state.lastSkillCheckEvent
  if (object.tags.some((t) => t === `skill-check:${skillCheckName}:success` || t === `skill-check:${skillCheckName}:failure`)) {
    return null
  }
  const handleNext = () => {
    // TODO: Hard-coded to first character
    dispatch(addTag(objectName, `skill-check:${skillCheckName}:${isSuccess ? 'success' : 'failure'}`))
    dispatch(changeScene('entity'))
    dispatch(removeLastSkillCheckEvent())
  }
  const entity = state.entities.filter((e) => e.name === state.entityName)[0]!
  return (
    <>
      <p>
        You rolled
        {' '}
        <em>{`${commaSeparateStrings(roll.rolls.map((n) => n.toString()))} (${roll.rolls.length}d${roll.sides})`}</em>
        {' '}
        and got
        {' '}
        <em>{total} ({characteristicValue} {skillValue < 0 ? '-' : '+'} {Math.abs(skillValue)} + {roll.sum})</em>
        {' '}
        but you needed at least <em>{tn}</em>.
        {' '}
        <em>{isSuccess ? 'Success!' : 'Fail.'}</em>
        {' '}
      </p>
      <p>
        <a onClick={handleNext}>Continue</a>.
      </p>
    </>
  )
}

export const SkillCheckView = () => {
  const { state, dispatch } = useGame()
  if (state.sceneName !== 'skill-check') {
    return
  }
  const skillCheck = state.skillChecks.filter((sc) => sc.name === state.skillCheckName)[0]
  if (!skillCheck) {
    return null
  }
  const handleLeave = (event) => {
    dispatch(changeScene('entity'))
  }
  return (
    <>
      <h2>{skillCheck.title}</h2>
      <SkillCheckPreView />
      <SkillCheckPostView />
      <p>
        <a onClick={handleLeave}>Leave</a>.
      </p>
    </>
  )
}