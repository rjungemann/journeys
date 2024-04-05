import { ADD_TAG, Action, AddTagAction, CHANGE_CHOICE, CHANGE_DIALOGUE, CHANGE_ENTITY, CHANGE_FIELD, CHANGE_ITEM_CHECK, CHANGE_ROOM, CHANGE_SCENE, CHANGE_SKILL_CHECK, CREATE_FIELD, ChangeChoiceAction, ChangeDialogueAction, ChangeEntityAction, ChangeFieldAction, ChangeItemCheckAction, ChangeRoomAction, ChangeSceneAction, ChangeSkillCheckAction, CreateFieldAction, FIELD_RANDOMLY_MOVE_ALL, FieldRandomlyMoveAllAction, ITEM_CHECK, ItemCheckAction, MOVE_ENTITY_ROOM, MOVE_PARTY_ROOM, MoveEntityRoomAction, MovePartyRoomAction, REMOVE_LAST_SKILL_CHECK_EVENT, REMOVE_TAG, RESET_STATE, RemoveTagAction, ResetStateAction, SHOW_INSPECTOR, SKILL_CHECK, ShowInspectorAction, SkillCheckAction } from "./actions"
import { Field, Game, ITEM_CHECK_VARIANT_GIVE, ITEM_CHECK_VARIANT_TAKE, ITEM_CHECK_VARIANT_VERIFY, Teammate } from "./data"
import { defaultGame } from "./defaultGame"
import { addTag, findField, moveEntity, moveParty, removeTag } from "./helpers"
import { dice } from "./utils"

export const handleTicksReducer = (state: Game, action: Action) => {
  let n = 0
  if (action.type === MOVE_ENTITY_ROOM) {
    // If a party member moves, tick the clock
    if (state.party.some((en) => en === action.entityName)) {
      n++
    }
  }
  if (action.type === MOVE_PARTY_ROOM) {
    // If the party moves, tick the clock
    n++
  }
  if (action.type === SKILL_CHECK) {
    // Trigger a tick if a skill check is performed
    n++
  }
  if (action.type === ITEM_CHECK) {
    // Trigger a tick if an item check is performed
    n++
  }
  return { ...state, ticks: state.ticks + n }
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

export const changeFieldReducer = (state: Game, action: ChangeFieldAction) => {
  const { fieldName } = action
  return { ...state, fieldName }
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

const createFieldReducer = (state: Game, action: CreateFieldAction) => {
  const { fieldName, sides } = action
  const ss = sides.map((team, i) => {
    return { name: `team-${i + 1}`, title: `Team #${i + 1}`, team }
  })
  let obstacles = []
  for (let i = 0; i < 5; i++) {
    obstacles.push({
      name: `obstacle-${i + 1}`,
      x: Math.random() * 100 + 100
    })
  }
  const teammates: Teammate[] = sides.reduce<Teammate[]>((sum, names) => {
    const teammates = names.map((en) => ({ name: en, x: Math.random() * 100 + 100, movement: 5 }))
    return [...sum, ...teammates]
  }, [])
  const field: Field = { name: fieldName, sides: ss, obstacles, teammates }
  return { ...state, fields: [...state.fields, field] }
}

const fieldRandomlyMoveAllReducer = (state: Game, action: FieldRandomlyMoveAllAction) => {
  const { fieldName } = action
  const field = findField(state)(fieldName)
  const { teammates, obstacles, sides } = field
  const tms = field.teammates.map((tm) => {
    return { ...tm, x: Math.random() < 0.5 ? tm.x - tm.movement : tm.x + tm.movement }
  })
  const updatedField = { ...field, teammates: tms }
  const otherFields = state.fields.filter((f) => f.name !== fieldName)
  return { ...state, fields: [...otherFields, updatedField] }
}

export const gameReducer = (state: Game, action: Action) => {
  const { type } = action

  // Passively handle
  state = handleTicksReducer(state, action)

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
  if (type === CHANGE_FIELD) {
    return changeFieldReducer(state, action)
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
  if (type === CREATE_FIELD) {
    return createFieldReducer(state, action)
  }
  if (type === FIELD_RANDOMLY_MOVE_ALL) {
    return fieldRandomlyMoveAllReducer(state, action)
  }
  throw new Error(`Unrecognized action ${action.type}`)
}