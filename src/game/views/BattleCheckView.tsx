import { useEffect, useState } from "react"
import { addTag, changeScene, removeTag, itemCheck, partyCheck, battleCheck, createField, changeField } from "../actions"
import { useGame } from "../context"
import { BattleCheck } from "../data"
import { findBattleCheck, findEntity, findPartyCheck, tagExitsGlobally } from "../helpers"
import { matchTags, smallUid } from "../utils"

export const NoBattleCheckView = ({ entityName }: { entityName: string }) => {
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

export const BattleCheckView = () => {
  const { state, dispatch } = useGame()
  const entity = findEntity(state)(state.entityName)
  const tag = matchTags(entity.tags, /battle-check:([^:]+)$/)[0]
  if (!tag) {
    return <NoBattleCheckView entityName={entity.name} />
  }

  const handleNext = () => {
    const bc: BattleCheck = findBattleCheck(state)(state.battleCheckName)

    const uid = smallUid()
    const fieldName = `field-${uid}`
    dispatch(removeTag(entity.name, tag))
    dispatch(battleCheck(bc.name, fieldName))

    dispatch(createField(fieldName, [state.party, bc.entityNames]))
    dispatch(changeField(fieldName))
    dispatch(changeScene('combat'))
  }

  const split = tag.split(':')
  const name = split[1]
  const bc = findBattleCheck(state)(name)
  if (bc.conditionTag) {
    const hasTag = tagExitsGlobally(state)(bc.conditionTag)
    if (!hasTag) {
      return <NoBattleCheckView entityName={entity.name} />
    }
  }
  return (
    <>
      <h2>Talking to {entity.title}</h2>
      <p>{bc.message}</p>
      <p>
        <a onClick={handleNext}>Continue</a>.
      </p>
    </>
  )
}