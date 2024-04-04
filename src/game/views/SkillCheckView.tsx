import { addTag, changeScene, removeLastSkillCheckEvent, removeTag, skillCheck } from "../actions"
import { useGame } from "../context"
import { SkillCheck } from "../data"
import { commaSeparateStrings } from "../utils"

export const SkillCheckPreView = () => {
  const { state, dispatch } = useGame()
  const sc = state.skillChecks.filter((sc) => sc.name === state.skillCheckName)[0]
  if (!sc) {
    return null
  }
  if (sc.result) {
    return null
  }
  const object = state.entities.filter((e) => e.name === state.entityName)[0]!
  const subject = state.entities.filter((e) => e.name === state.partyRepresentativeName)[0]!
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
  const dice = '2d6'
  const { tag, name, characteristic, skill, tn } = data
  const characteristicValue = subject.characteristics[characteristic]
  const characteristicBonus = Math.max(characteristicValue - 7.0, -2.0)
  const skillValue = subject.skills[skill]
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
  const skillCheck = state.skillChecks.filter((sc) => sc.name === state.skillCheckName)[0]!
  if (!skillCheck || !skillCheck.result) {
    return null
  }
  const object = state.entities.filter((e) => e.name === state.entityName)[0]!
  const { objectName, skillCheckName, characteristicName, characteristicValue, skillName, skillValue, roll, total, tn, isSuccess } = skillCheck.result
  if (object.tags.some((t) => t === `skill-check:${skillCheckName}:success` || t === `skill-check:${skillCheckName}:failure`)) {
    return null
  }
  const handleNext = () => {
    console.log('skill check done', objectName)
    // Add the success or failure tag to the object, such ass `skill-check:fix-1:success`
    dispatch(addTag(objectName, `skill-check:${skillCheckName}:${isSuccess ? 'success' : 'failure'}`))

    dispatch(changeScene('entity'))
    dispatch(removeLastSkillCheckEvent())
  }
  const dice = '2d6'
  const characteristicBonus = Math.max(characteristicValue - 7.0, -2.0)
  return (
    <>
      <p className="skill-formula">
        <em>
          <ruby>{characteristicBonus}<rp>(</rp><rt>{characteristicName} bonus</rt><rp>)</rp></ruby>
          {skillValue < 0 ? ' - ' : ' + '}
          <ruby>{Math.abs(skillValue)}<rp>(</rp><rt>{skillName}</rt><rp>)</rp></ruby>
          {' + '}
          <ruby><span className="placeholder">{roll.rolls.map((n) => n.toString()).join(' + ')}</span><rp>(</rp><rt>{dice}</rt><rp>)</rp></ruby>
          {' = '}
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

export const SkillCheckPartial = ({ skillCheck }: { skillCheck: SkillCheck }) => {
  const { state, dispatch } = useGame()
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

export const SkillCheckView = () => {
  const { state, dispatch } = useGame()
  if (state.sceneName !== 'skill-check') {
    return null
  }
  const skillCheck = state.skillChecks.filter((sc) => sc.name === state.skillCheckName)[0]
  if (!skillCheck) {
    return null
  }
  return (
    <SkillCheckPartial skillCheck={skillCheck} />
  )
}