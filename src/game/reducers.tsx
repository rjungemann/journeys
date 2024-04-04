import { ADD_TAG, Action, AddTagAction, CHANGE_CHOICE, CHANGE_DIALOGUE, CHANGE_ENTITY, CHANGE_ITEM_CHECK, CHANGE_ROOM, CHANGE_SCENE, CHANGE_SKILL_CHECK, ChangeChoiceAction, ChangeDialogueAction, ChangeEntityAction, ChangeItemCheckAction, ChangeRoomAction, ChangeSceneAction, ChangeSkillCheckAction, ITEM_CHECK, ItemCheckAction, MOVE_ENTITY_ROOM, MOVE_PARTY_ROOM, MoveEntityRoomAction, MovePartyRoomAction, REMOVE_LAST_SKILL_CHECK_EVENT, REMOVE_TAG, RESET_STATE, RemoveLastSkillCheckEventAction, RemoveTagAction, ResetStateAction, SHOW_INSPECTOR, SKILL_CHECK, ShowInspectorAction, SkillCheckAction, moveEntityRoom } from "./actions"
import { Game, ITEM_CHECK_VARIANT_GIVE, ITEM_CHECK_VARIANT_TAKE, ITEM_CHECK_VARIANT_VERIFY } from "./data"
import { defaultGame } from "./defaultGame"
import { dice } from "./utils"

export const moveEntity = (state: Game) => (from: string, to: string, entityName: string) => {
  const fromRoom = state.rooms.filter((s) => s.name === from)[0]!
  const updatedFrom = {
    ...fromRoom,
    entities: fromRoom.entities.filter((en) => en !== entityName)
  }
  const toRoom = state.rooms.filter((s) => s.name === to)[0]!
  const updatedTo = {
    ...toRoom,
    entities: [...toRoom.entities, entityName]
  }

  const rooms = state.rooms.filter((s) => s.name !== from && s.name !== to)

  return { ...state, rooms: [...rooms, updatedFrom, updatedTo] }
}

export const moveParty = (state: Game) => (from: string, to: string) => {
  let updatedState = { ...state }
  for (let entityName of state.party) {
    updatedState = moveEntity(updatedState)(from, to, entityName)
  }
  return updatedState
}

export const addTag = (state: Game) => (entityName: string, tag: string) => {
  const entity = state.entities.filter((e) => e.name === entityName)[0]!
  const updatedEntity = { ...entity, tags: [...entity.tags, tag] }
  const updatedEntities = [...state.entities.filter((e) => e.name !== entityName), updatedEntity]
  return { ...state, entities: updatedEntities }
}

export const removeTag = (state: Game) => (entityName: string, tag: string) => {
  const entity = state.entities.filter((e) => e.name === entityName)[0]!
  const updatedEntity = { ...entity, tags: entity.tags.filter((t) => t !== tag) }
  const updatedEntities = [...state.entities.filter((e) => e.name !== entityName), updatedEntity]
  return { ...state, entities: updatedEntities }
}

export const resetStateReducer = (state: Game, action: ResetStateAction) => {
  return { ...defaultGame }
}

export const showInspectorReducer = (state: Game, action: ShowInspectorAction) => {
  const { state: showInspector } = action
  return { ...state, showInspector }
}

export const changeSceneReducer = (state: Game, action: ChangeSceneAction) => {
  const { sceneName } = action
  return { ...state, sceneName }
}

export const changeRoomReducer = (state: Game, action: ChangeRoomAction) => {
  const { roomName } = action
  return { ...state, roomName }
}

export const changeEntityReducer = (state: Game, action: ChangeEntityAction) => {
  const { entityName } = action
  return { ...state, entityName }
}

export const changeDialogueReducer = (state: Game, action: ChangeDialogueAction) => {
  const { dialogueName } = action
  return { ...state, dialogueName }
}

export const changeChoiceReducer = (state: Game, action: ChangeChoiceAction) => {
  const { choiceName } = action
  return { ...state, choiceName }
}

export const changeItemCheckReducer = (state: Game, action: ChangeItemCheckAction) => {
  const { itemCheckName } = action
  return { ...state, itemCheckName }
}

export const changeSkillCheckReducer = (state: Game, action: ChangeSkillCheckAction) => {
  const { skillCheckName } = action
  return { ...state, skillCheckName }
}

export const removeLastSkillCheckEventReducer = (state: Game, action: RemoveLastSkillCheckEventAction) => {
  return { ...state, lastSkillCheckEvent: null }
}

export const moveEntityRoomReducer = (state: Game, action: MoveEntityRoomAction) => {
  const { from, to, entityName } = action
  return moveEntity(state)(from, to, entityName)
}

export const movePartyRoomReducer = (state: Game, action: MovePartyRoomAction) => {
  const { from, to } = action
  return moveParty(state)(from, to)
}

export const addTagReducer = (state: Game, action: AddTagAction) => {
  const { entityName, tag } = action
  return addTag(state)(entityName, tag)
}

export const removeTagReducer = (state: Game, action: RemoveTagAction) => {
  const { entityName, tag } = action
  return removeTag(state)(entityName, tag)
}

export const skillCheckReducer = (state: Game, action: SkillCheckAction) => {
  const { name, subjectName, objectName, skillCheckName, skillName, characteristicName, dice: d, tn } = action
  const subject = state.entities.filter((s) => s.name === subjectName)[0]!
  const object = state.entities.filter((s) => s.name === objectName)[0]
  const roll = dice(d)
  const characteristicValue = subject.characteristics[characteristicName]!
  const skillValue = subject.skills[skillName] || -3.0
  const total = Math.max(characteristicValue - 7.0, -2.0) + skillValue + roll.sum
  const isSuccess = total >= tn
  const result = {
    subjectName,
    objectName,
    skillCheckName,
    characteristicName,
    characteristicValue,
    skillName,
    skillValue,
    dice: d,
    roll,
    total,
    tn,
    isSuccess,
  }
  const skillCheck = state.skillChecks.filter((sc) => sc.name === name)[0]!
  const otherSkillChecks = state.skillChecks.filter((sc) => sc.name !== name)
  return {
    ...state,
    skillChecks: [...otherSkillChecks, { ...skillCheck, result }],
  }
}

export const itemCheckReducer = (state: Game, action: ItemCheckAction) => {
  const { subjectName, itemCheckName } = action
  const subject = state.entities.filter((s) => s.name === subjectName)[0]!
  const otherEntities = state.entities.filter((s) => s.name !== subjectName)
  const itemCheck = state.itemChecks.filter((ic) => ic.name === itemCheckName)[0]!
  if (itemCheck.variant.type === ITEM_CHECK_VARIANT_GIVE) {
    const updatedInventory = [...subject.inventory, itemCheck.itemName]
    const updatedSubject = { ...subject, inventory: updatedInventory }
    return { ...state, entities: [...otherEntities, updatedSubject] }
  }
  if (itemCheck.variant.type === ITEM_CHECK_VARIANT_TAKE) {
    const hasItem = subject.inventory.some((itemName) => itemName === itemCheck.itemName)
    // TODO: Do something different than throw
    if (!hasItem) {
      throw new Error(`Character does not have item ${itemCheck.itemName}`)
    }
    const updatedInventory = subject.inventory.filter((itemName) => itemName !== itemCheck.itemName)
    const updatedSubject = { ...subject, inventory: updatedInventory }
    return { ...state, entities: [...otherEntities, updatedSubject] }
  }
  if (itemCheck.variant.type === ITEM_CHECK_VARIANT_VERIFY) {
    const hasItem = subject.inventory.some((itemName) => itemName === itemCheck.itemName)
    // TODO: Do something different than throw
    if (!hasItem) {
      throw new Error(`Character does not have item ${itemCheck.itemName}`)
    }
    return state
  }
  throw new Error(`Unrecognized item check variant for ${itemCheck.name}`)
}

export const gameReducer = (state: Game, action: Action) => {
  const { type } = action
  if (type === RESET_STATE) {
    return resetStateReducer(state, action)
  }
  if (type === SHOW_INSPECTOR) {
    return showInspectorReducer(state, action)
  }
  if (type === CHANGE_SCENE) {
    return changeSceneReducer(state, action)
  }
  if (type === CHANGE_ROOM) {
    return changeRoomReducer(state, action)
  }
  if (type === CHANGE_ENTITY) {
    return changeEntityReducer(state, action)
  }
  if (type === CHANGE_DIALOGUE) {
    return changeDialogueReducer(state, action)
  }
  if (type === CHANGE_CHOICE) {
    return changeChoiceReducer(state, action)
  }
  if (type === CHANGE_ITEM_CHECK) {
    return changeItemCheckReducer(state, action)
  }
  if (type === CHANGE_SKILL_CHECK) {
    return changeSkillCheckReducer(state, action)
  }
  if (type === REMOVE_LAST_SKILL_CHECK_EVENT) {
    return removeLastSkillCheckEventReducer(state, action)
  }
  if (type === MOVE_ENTITY_ROOM) {
    return moveEntityRoomReducer(state, action)
  }
  if (type === MOVE_PARTY_ROOM) {
    return movePartyRoomReducer(state, action)
  }
  if (type === ADD_TAG) {
    return addTagReducer(state, action)
  }
  if (type === REMOVE_TAG) {
    return removeTagReducer(state, action)
  }
  if (type === SKILL_CHECK) {
    return skillCheckReducer(state, action)
  }
  if (type === ITEM_CHECK) {
    return itemCheckReducer(state, action)
  }
  throw new Error('Unrecognized action')
}