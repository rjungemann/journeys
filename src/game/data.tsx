export type Game = {
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
  choiceName: string | null
  choices: Choice[]
  descriptions: Description[]
}

type Choice = {
  name: string
  title: string
  conditionTag: string
  message: string
  options: Option[]
}

type Option = {
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