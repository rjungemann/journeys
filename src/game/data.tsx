export const DESCRIPTION_ATTACHMENT = 'DESCRIPTION_ATTACHMENT'
export const SKILL_CHECK_ATTACHMENT = 'SKILL_CHECK_ATTACHMENT'

export type Game = {
  showInspector: boolean
  sceneName: string
  roomName: string
  rooms: Room[]
  party: string[]
  entityName: string | null
  entities: Entity[]
  items: Item[]
  dialogues: Dialogue[]
  log: LogItem[]
  skillCheckName: string | null
  skillChecks: SkillCheck[]
  choices: Choice[]
  descriptions: Description[]
}

type Choice = {
  name: string
  message: string
  options: Option[]
}

type Option = {
  name: string
  message: string
}

// TODO: Replace tidbits with descriptions
// TODO: Entities
// TODO: Items
export type Description = {
  name: string
  conditionTag: string | null
  message: string
}

// TODO: Optional conditionTag
export type Dialogue = {
  name: string
  conditionTag: string | null
  topic: string
  messages: string[]
}

// TODO: Tags on rooms
export type Room = {
  name: string
  title: string
  exits: Exit[]
  entities: string[]
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