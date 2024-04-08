import { addTag, changeScene, removeTag, skillCheck } from "../actions"
import { useGame } from "../context"
import { SkillCheck } from "../data"
import { findEntity, findSkillCheck } from "../helpers"

export const SkillCheckPreView = () => {
  const { state, dispatch } = useGame()
  const sc = findSkillCheck(state)(state.skillCheckName)
  if (!sc || sc.result) {
    return null
  }
  const object = findEntity(state)(state.entityName)
  const subject = findEntity(state)(state.partyRepresentativeName)
  const [tag, sc2] = object.tags.reduce(
    (sum, tag) => {
      const [_, name] = tag.match(/^skill-check:([^:]+)$/) || []
      if (!name) {
        return sum
      }
      return [...sum, [tag, findSkillCheck(state)(name)]]
    },
    []
  )[0]
  const dice = '2d6'
  const { name, characteristic, skill, tn } = sc2
  const characteristicValue = subject.characteristics[characteristic]
  const characteristicBonus = Math.max(characteristicValue - 7.0, -2.0)
  const skillValue = subject.skills[skill] || -3
  const handleTry = () => {
    dispatch(skillCheck(name, subject.name, object.name, name, characteristic, skill, dice, tn))
    dispatch(removeTag(object.name, tag))
  }
  return (
    <>
      <p className="skill-formula">
        <em>
          <ruby>{characteristicBonus}<rp>(</rp><rt>{characteristic} bonus</rt><rp>)</rp></ruby>
          {' + '}
          <ruby>{skillValue}<rp>(</rp><rt>{skill}</rt><rp>)</rp></ruby>
          {' + '}
          <ruby><span className="placeholder">?</span><rp>(</rp><rt>{dice}</rt><rp>)</rp></ruby>
          {' '}&ge;{' '}
          <ruby>{tn}<rp>(</rp><rt>target number</rt><rp>)</rp></ruby>
        </em>
      </p>
      <p>You will need to roll at least <em>{tn - (characteristicBonus - skillValue)}</em> to succeed.</p>
      <p><a onClick={handleTry}>Try</a>.</p>
    </>
  )
}

export const SkillCheckPostView = () => {
  const { state, dispatch } = useGame()
  const skillCheck = findSkillCheck(state)(state.skillCheckName)
  if (!skillCheck || !skillCheck.result) {
    return null
  }
  const object = findEntity(state)(state.entityName)
  const { characteristic, skill, name, dice } = skillCheck
  const { objectName } = skillCheck.result
  const { characteristicValue, skillValue, roll, total, tn, isSuccess } = skillCheck.result
  if (object.tags.some((t) => t === `skill-check:${name}:success`)) {
    return null
  }
  if (object.tags.some((t) => t === `skill-check:${name}:failure`)) {
    return null
  }
  const handleNext = () => {
    // Add the success or failure tag to the object, such ass `skill-check:fix-1:success`
    dispatch(addTag(objectName, `skill-check:${name}:${isSuccess ? 'success' : 'failure'}`))
    dispatch(changeScene('room'))
  }
  const characteristicBonus = Math.max(characteristicValue - 7.0, -2.0)
  return (
    <>
      <p className="skill-formula">
        <em>
          <ruby>{characteristicBonus}<rp>(</rp><rt>{name} bonus</rt><rp>)</rp></ruby>
          {skillValue < 0 ? ' - ' : ' + '}
          <ruby>{Math.abs(skillValue)}<rp>(</rp><rt>{skill}</rt><rp>)</rp></ruby>
          {' + '}
          <ruby><span className="placeholder">{roll.rolls.map((n) => n.toString()).join(' + ')}</span><rp>(</rp><rt>{dice}</rt><rp>)</rp></ruby>
          {' ≔ '}
          <ruby>{total}<rp>(</rp><rt>total</rt><rp>)</rp></ruby>
          {isSuccess ? ' ≥ ' : ' ≱ '}
          <ruby>{tn}<rp>(</rp><rt>target number</rt><rp>)</rp></ruby>
        </em>
      </p>
      <p>
        You rolled <em>{total}</em> {isSuccess ? 'and' : 'but'}
        {' '}
        you needed at least <em>{tn}</em>.
        {' '}
        <em>{isSuccess ? 'Success!' : 'Fail.'}</em>
      </p>
      <p>
        <a onClick={handleNext}>Continue</a>.
      </p>
    </>
  )
}

export const SkillCheckView = () => {
  const { state, dispatch } = useGame()
  const skillCheck = state.skillChecks.filter((sc) => sc.name === state.skillCheckName)[0]
  if (!skillCheck) {
    return null
  }
  const handleLeave = (event) => {
    dispatch(changeScene('room'))
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