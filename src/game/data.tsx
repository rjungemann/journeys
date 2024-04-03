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
  lastSkillCheckEvent: SkillCheckEvent | null
  skillCheckName: string | null
  skillChecks: SkillCheck[]
}

export type Dialogue = {
  name: string
  topic: string
  messages: string[]
}

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

export type SkillCheckEvent = {
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

export type SkillCheck = {
  name: string
  title: string
  characteristic: string
  skill: string
  tn: number
}