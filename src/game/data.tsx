export type Game = {
  ticks: number
  showInspector: boolean
  sceneName: string
  roomName: string
  rooms: Room[]
  partyRepresentativeName: string
  party: string[]
  entityName: string | null
  entities: Entity[]
  items: Item[]
  dialogues: Dialogue[]
  log: LogItem[]
  skillCheckName: string | null
  skillChecks: SkillCheck[]
  itemCheckName: string | null
  itemChecks: ItemCheck[]
  partyCheckName: string | null
  partyChecks: PartyCheck[]
  choiceName: string | null
  choices: Choice[]
  descriptions: Description[]
  fieldName: string | null
  fields: Field[]
}

export type Choice = {
  name: string
  title: string
  conditionTag: string
  message: string
  options: Option[]
}

export type Option = {
  name: string
  message: string
}

// TODO: Items
// TODO: Rooms
export type Description = {
  name: string
  conditionTag: string | null
  message: string
}

export type Dialogue = {
  name: string
  conditionTag: string | null
  topic: string
  messages: string[]
}

export type Room = {
  name: string
  title: string
  exits: Exit[]
  entities: string[]
  tags: string[]
}

export type Exit = {
  name: string
  title: string
  to: string
}

export type Entity = {
  name: string
  title: string
  characteristics: Characteristics
  skills: Record<string, number>
  tags: string[]
  inventory: string[]
}

export type Characteristics = {
  strength: number
  dexterity: number
  endurance: number
  intelligence: number
  education: number
  socialStanding: number
  psionicStrength: number
}

export type Weapon = {
  name: string
  title: string
  rounds: number | null
  tags: string[]
  damage: string
  isEquipped: boolean
}

export type Item = Weapon

export type LogItem = {
  message: string
}

export type SkillCheck = {
  name: string
  conditionTag: string | null,
  title: string
  characteristic: string
  skill: string
  tn: number
  result: SkillCheckResult | null
}

export type SkillCheckResult = {
  subjectName: string
  objectName: string | null
  skillCheckName: string
  characteristicName: string
  skillName: string
  characteristicValue: number
  skillValue: number
  dice: string
  roll: {
    rolls: number[]
    sum: number
    sides: number
  }
  total: number
  tn: number
  isSuccess: boolean
}

export type ItemCheck = {
  name: string
  conditionTag: string | null
  title: string
  message: string
  variant: ItemCheckVariant
  itemName: string
}

export type PartyCheck = {
  name: string
  conditionTag: string | null
  title: string
  message: string
  variant: PartyCheckVariant
  itemName: string
}

export const ITEM_CHECK_VARIANT_GIVE = 'ITEM_CHECK_VARIANT_GIVE'
export const ITEM_CHECK_VARIANT_TAKE = 'ITEM_CHECK_VARIANT_TAKE'
export const ITEM_CHECK_VARIANT_VERIFY = 'ITEM_CHECK_VARIANT_VERIFY'

export type ItemCheckVariantGive = {
  type: 'ITEM_CHECK_VARIANT_GIVE'
}
export type ItemCheckVariantTake = {
  type: 'ITEM_CHECK_VARIANT_TAKE'
}
export type ItemCheckVariantVerify = {
  type: 'ITEM_CHECK_VARIANT_VERIFY'
}
export type ItemCheckVariant = ItemCheckVariantGive | ItemCheckVariantTake | ItemCheckVariantVerify

export const PARTY_CHECK_VARIANT_PRESENT = 'PARTY_CHECK_VARIANT_PRESENT'
export const PARTY_CHECK_VARIANT_ABSENT = 'PARTY_CHECK_VARIANT_ABSENT'

export type PartyCheckVariantPresent = {
  type: 'PARTY_CHECK_VARIANT_PRESENT'
}
export type PartyCheckVariantAbsent = {
  type: 'PARTY_CHECK_VARIANT_ABSENT'
}
export type PartyCheckVariant = PartyCheckVariantPresent | PartyCheckVariantAbsent

export const COVER_OBSTACLE = 'COVER_OBSTACLE'
export const BARRIER_OBSTACLE = 'BARRIER_OBSTACLE'

export type Field = {
  name: string
  sides: Side[]
  obstacles: Obstacle[]
  teammates: Teammate[]
}

export type Teammate = {
  name: string
  x: number
  movement: number
}

export type Side = {
  name: string
  team: string[]
}

export type CoverObstacle = {
  name: string
  type: 'COVER_OBSTACLE'
  x: number
}

export type BarrierObstacle = {
  name: string
  type: 'BARRIER_OBSTACLE'
  x: number
}

export type Obstacle = CoverObstacle | BarrierObstacle