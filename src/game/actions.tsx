export const RESET_STATE = 'RESET_STATE'
export const SHOW_INSPECTOR = 'SHOW_INSPECTOR'
export const CHANGE_SCENE = 'CHANGE_SCENE'
export const CHANGE_ROOM = 'CHANGE_ROOM'
export const CHANGE_ENTITY = 'CHANGE_ENTITY'
export const CHANGE_DIALOGUE = 'CHANGE_DIALOGUE'
export const CHANGE_CHOICE = 'CHANGE_CHOICE'
export const CHANGE_SKILL_CHECK = 'CHANGE_SKILL_CHECK'
export const CHANGE_ITEM_CHECK = 'CHANGE_ITEM_CHECK'
export const CHANGE_FIELD = 'CHANGE_FIELD'
export const REMOVE_LAST_SKILL_CHECK_EVENT = 'REMOVE_LAST_SKILL_CHECK_EVENT'
export const MOVE_ENTITY_ROOM = 'MOVE_ENTITY_ROOM'
export const MOVE_PARTY_ROOM = 'MOVE_PARTY_ROOM'
export const ADD_TAG = 'ADD_TAG'
export const REMOVE_TAG = 'REMOVE_TAG'
export const SKILL_CHECK = 'SKILL_CHECK'
export const ITEM_CHECK = 'ITEM_CHECK'
export const PARTY_CHECK = 'PARTY_CHECK'
export const CREATE_FIELD = 'CREATE_FIELD'
export const FIELD_RANDOMLY_MOVE_ALL = 'FIELD_RANDOMLY_MOVE_ALL'

export type ResetStateAction = {
  type: 'RESET_STATE'
}

export type ShowInspectorAction = {
  type: 'SHOW_INSPECTOR'
  state: boolean
}

export type ChangeSceneAction = {
  type: 'CHANGE_SCENE'
  sceneName: string
}

export type ChangeRoomAction = {
  type: 'CHANGE_ROOM'
  roomName: string
}

export type ChangeEntityAction = {
  type: 'CHANGE_ENTITY'
  entityName: string
}

export type ChangeDialogueAction = {
  type: 'CHANGE_DIALOGUE'
  dialogueName: string
}

export type ChangeChoiceAction = {
  type: 'CHANGE_CHOICE'
  choiceName: string
}

export type ChangeSkillCheckAction = {
  type: 'CHANGE_SKILL_CHECK'
  skillCheckName: string
}

export type ChangeItemCheckAction = {
  type: 'CHANGE_ITEM_CHECK'
  itemCheckName: string
}

export type ChangeFieldAction = {
  type: 'CHANGE_FIELD'
  fieldName: string
}

export type MoveEntityAction = {
  type: 'MOVE_ENTITY'
  from: string
  to: string
  entityName: string
}

export type MoveEntityRoomAction = {
  type: 'MOVE_ENTITY_ROOM'
  from: string
  to: string
  entityName: string
}

export type MovePartyAction = {
  type: 'MOVE_PARTY'
  from: string
  to: string
}

export type MovePartyRoomAction = {
  type: 'MOVE_PARTY_ROOM'
  from: string
  to: string
}

export type RemoveTagAction = {
  type: 'REMOVE_TAG',
  entityName: string,
  tag: string,
}

export type AddTagAction = {
  type: 'ADD_TAG',
  entityName: string,
  tag: string,
}

export type SkillCheckAction = {
  type: 'SKILL_CHECK'
  name: string
  subjectName: string
  objectName: string | null
  skillCheckName: string
  characteristicName: string
  skillName: string
  dice: string
  tn: number
}

export type ItemCheckAction = {
  type: 'ITEM_CHECK'
  subjectName: string
  itemCheckName: string
}

export type PartyCheckAction = {
  type: 'PARTY_CHECK'
  partyCheckName: string
}

export type CreateFieldAction = {
  type: 'CREATE_FIELD'
  fieldName: string
  sides: string[][]
}

export type FieldRandomlyMoveAllAction = {
  type: 'FIELD_RANDOMLY_MOVE_ALL'
  fieldName: string
}

export type Action =
  ResetStateAction
  | ShowInspectorAction
  | ChangeSceneAction
  | ChangeRoomAction
  | ChangeEntityAction
  | ChangeDialogueAction
  | ChangeChoiceAction
  | ChangeItemCheckAction
  | ChangeSkillCheckAction
  | ChangeFieldAction
  | MoveEntityAction
  | MoveEntityRoomAction
  | MovePartyAction
  | MovePartyRoomAction
  | RemoveTagAction
  | AddTagAction
  | SkillCheckAction
  | ItemCheckAction
  | PartyCheckAction
  | CreateFieldAction
  | FieldRandomlyMoveAllAction

export const resetState = (): ResetStateAction => ({
  type: RESET_STATE,
})

export const showInspector = (state: boolean): ShowInspectorAction => ({
  type: SHOW_INSPECTOR,
  state,
})

export const changeScene = (sceneName: string): ChangeSceneAction => ({
  type: CHANGE_SCENE,
  sceneName,
})

export const changeRoom = (roomName: string): ChangeRoomAction => ({
  type: CHANGE_ROOM,
  roomName,
})

export const changeEntity = (entityName: string): ChangeEntityAction => ({
  type: CHANGE_ENTITY,
  entityName,
})

export const changeDialogue = (dialogueName: string): ChangeDialogueAction => ({
  type: CHANGE_DIALOGUE,
  dialogueName,
})

export const changeChoice = (choiceName: string): ChangeChoiceAction => ({
  type: CHANGE_CHOICE,
  choiceName,
})

export const changeItemCheck = (itemCheckName: string): ChangeItemCheckAction => ({
  type: CHANGE_ITEM_CHECK,
  itemCheckName,
})

export const changeSkillCheck = (skillCheckName: string): ChangeSkillCheckAction => ({
  type: CHANGE_SKILL_CHECK,
  skillCheckName,
})

export const changeField = (fieldName: string): ChangeFieldAction => ({
  type: CHANGE_FIELD,
  fieldName,
})

export const moveEntityRoom = (from: string, to: string, entityName: string): MoveEntityRoomAction => ({
  type: MOVE_ENTITY_ROOM,
  from,
  to,
  entityName,
})

export const movePartyRoom = (from: string, to: string): MovePartyRoomAction => ({
  type: MOVE_PARTY_ROOM,
  from,
  to,
})

export const addTag = (entityName: string, tag: string): AddTagAction => ({
  type: ADD_TAG,
  entityName,
  tag,
})

export const removeTag = (entityName: string, tag: string): RemoveTagAction => ({
  type: REMOVE_TAG,
  entityName,
  tag,
})

export const skillCheck = (name: string, subjectName: string, objectName: string, skillCheckName: string, characteristicName: string, skillName: string, dice: string, tn: number): SkillCheckAction => ({
  type: SKILL_CHECK,
  name,
  subjectName,
  objectName,
  skillCheckName,
  characteristicName,
  skillName,
  dice,
  tn,
})

export const itemCheck = (subjectName: string, itemCheckName: string): ItemCheckAction => ({
  type: ITEM_CHECK,
  subjectName,
  itemCheckName,
})

export const partyCheck = (partyCheckName: string): PartyCheckAction => ({
  type: PARTY_CHECK,
  partyCheckName,
})

export const createField = (fieldName: string, sides: string[][]): CreateFieldAction => ({
  type: CREATE_FIELD,
  fieldName,
  sides,
})

export const fieldRandomlyMoveAll = (fieldName: string): FieldRandomlyMoveAllAction => ({
  type: FIELD_RANDOMLY_MOVE_ALL,
  fieldName,
})