import { BattleCheck, Choice, Description, Dialogue, Entity, Exit, Field, Game, Item, ItemCheck, PartyCheck, Room, SkillCheck } from "./data"

export const findEntity = (state: Game) => (name: string): Entity => {
  return state.entities.filter((e) => e.name === name)[0]!
}

export const findItem = (state: Game) => (name: string): Item => {
  return state.items.filter((e) => e.name === name)[0]!
}

export const findParty = (state: Game) => (): Entity[] => {
  return state.party.map((en) => state.entities.filter((e) => e.name === en)[0]!)
}

export const findNonPartyEntitiesInRoom = (state: Game) => (roomName: string) => {
  const room = findRoom(state)(roomName)
  const otherEntities = room
    .entities
    .filter((entityName) => !state.party.some((en) => en === entityName))
    .map((entityName) => state.entities.filter((e) => e.name === entityName)[0]!)
  return otherEntities
}

export const findRoom = (state: Game) => (name: string): Room => {
  return state.rooms.filter((r) => r.name === name)[0]!
}

export const findExit = (state: Game) => (name: string, exitName: string): Exit => {
  const room = findRoom(state)(name)
  return room.exits.filter((e) => e.name === exitName)[0]!
}

export const findDescription = (state: Game) => (name: string): Description => {
  return state.descriptions.filter((d) => d.name === name)[0]!
}

export const findDialogue = (state: Game) => (name: string): Dialogue => {
  return state.dialogues.filter((d) => d.name === name)[0]!
}

export const findChoice = (state: Game) => (name: string): Choice => {
  return state.choices.filter((c) => c.name === name)[0]!
}

export const findSkillCheck = (state: Game) => (name: string): SkillCheck => {
  return state.skillChecks.filter((sc) => sc.name === name)[0]!
}

export const findItemCheck = (state: Game) => (name: string): ItemCheck => {
  return state.itemChecks.filter((ic) => ic.name === name)[0]!
}

export const findPartyCheck = (state: Game) => (name: string): PartyCheck => {
  return state.partyChecks.filter((pc) => pc.name === name)[0]!
}

export const findBattleCheck = (state: Game) => (name: string): BattleCheck => {
  return state.battleChecks.filter((bc) => bc.name === name)[0]!
}

export const findField = (state: Game) => (name: string): Field => {
  return state.fields.filter((f) => f.name === name)[0]!
}

export const moveEntity = (state: Game) => (from: string, to: string, entityName: string): Game => {
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

export const moveParty = (state: Game) => (from: string, to: string): Game => {
  let updatedState = { ...state }
  for (let entityName of state.party) {
    updatedState = moveEntity(updatedState)(from, to, entityName)
  }
  return updatedState
}

export const addTag = (state: Game) => (entityName: string, tag: string): Game => {
  const entity = state.entities.filter((e) => e.name === entityName)[0]!
  const updatedEntity = { ...entity, tags: [...entity.tags, tag] }
  const updatedEntities = [...state.entities.filter((e) => e.name !== entityName), updatedEntity]
  return { ...state, entities: updatedEntities }
}

export const removeTag = (state: Game) => (entityName: string, tag: string): Game => {
  const entity = state.entities.filter((e) => e.name === entityName)[0]!
  const updatedEntity = { ...entity, tags: entity.tags.filter((t) => t !== tag) }
  const updatedEntities = [...state.entities.filter((e) => e.name !== entityName), updatedEntity]
  return { ...state, entities: updatedEntities }
}

export const tagExitsGlobally = (state: Game) => (tag: string): boolean => {
  for (let entity of state.entities) {
    for (let t of entity.tags) {
      if (t === tag) {
        return true
      }
    }
  }
  return false
}

// TODO: Update to use STR/DEX/END in a flexible way
export const isEntityDead = (state: Game) => (entityName: string): boolean => {
  const entity = findEntity(state)(entityName)
  const healthCharacteristic = 'endurance'
  const health = entity.characteristics[healthCharacteristic]!
  return health <= 0
}

export const isCombatOver = (state: Game) => (): boolean => {
  const field = findField(state)(state.fieldName)
  const remainingTeams = field.sides.filter((side) => side.team.filter((n) => isEntityDead(state)(n)).length === 0)
  return remainingTeams.length < 2
}