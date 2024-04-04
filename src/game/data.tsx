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
  tidbits: Tidbit[]
}

// TODO: Entities
// TODO: Items
export type Tidbit = {
  name: string
  conditionTag: string | null
  // TODO: Other attachment types?
  attachment: Attachment
}

// EJS + Markdown
// TODO: `locals`
export type DescriptionAttachment = {
  message: string,
  // locals: Record<string, any>
}

export type Attachment = DescriptionAttachment

export type Dialogue = {
  name: string
  topic: string
  messages: string[]
}

// TODO: Tags on rooms
export type Room = {
  name: string
  title: string
  exits: Exit[]
  entities: string[]
  tidbits: string[]
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
  tidbits: string[]
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