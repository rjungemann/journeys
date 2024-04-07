import { z } from 'zod'

// Usage:
//
//   const json = '{}'
//   const data = JSON.parse(json)
//   const game = GameSchema.parse(data) // throws if invalid Game
//

export const OptionSchema = z.object({
  name: z.string(),
  message: z.string()
})

export type Option = z.infer<typeof OptionSchema>

export const ChoiceSchema = z.object({
  name: z.string(),
  title: z.string(),
  conditionTag: z.nullable(z.string()),
  message: z.string(),
  options: OptionSchema.array()
})

export type Choice = z.infer<typeof ChoiceSchema>

export const DescriptionSchema = z.object({
  name: z.string(),
  conditionTag: z.nullable(z.string()),
  message: z.string()
})

// TODO: Items
// TODO: Rooms
export type Description = z.infer<typeof DescriptionSchema>

export const DialogueSchema = z.object({
  name: z.string(),
  conditionTag: z.nullable(z.string()),
  topic: z.string(),
  messages: z.string().array()
})

export type Dialogue = z.infer<typeof DialogueSchema>

export const ExitSchema = z.object({
  name: z.string(),
  title: z.string(),
  to: z.string()
})

export type Exit = z.infer<typeof ExitSchema>

const RoomSchema = z.object({
  name: z.string(),
  title: z.string(),
  exits: ExitSchema.array(),
  entities: z.string().array(),
  tags: z.string().array()
})

export type Room = z.infer<typeof RoomSchema>

export const CharacteristicsSchema = z.object({
  strength: z.number(),
  dexterity: z.number(),
  endurance: z.number(),
  intelligence: z.number(),
  education: z.number(),
  socialStanding: z.number(),
  psionicStrength: z.number()
})

export type Characteristics = z.infer<typeof CharacteristicsSchema>

export const EntitySchema = z.object({
  name: z.string(),
  title: z.string(),
  color: z.string(),
  characteristics: z.optional(CharacteristicsSchema),
  skills: z.optional(z.record(z.string(), z.number())),
  tags: z.string().array(),
  inventory: z.string().array()
})

export type Entity = z.infer<typeof EntitySchema>

// TODO: `type` field to differentiate kinds of items
export const ItemSchema = z.object({
  name: z.string(),
  title: z.string(),
  rounds: z.nullable(z.number()),
  tags: z.string().array(),
  damage: z.string(),
  isEquipped: z.boolean()
})

export type Item = z.infer<typeof ItemSchema>

export const LogItemSchema = z.object({
  message: z.string()
})

export type LogItem = z.infer<typeof LogItemSchema>

export const SkillCheckResultSchema = z.object({
  subjectName: z.string(),
  objectName: z.nullable(z.string()),
  skillCheckName: z.string(),
  characteristicName: z.string(),
  skillName: z.string(),
  characteristicValue: z.number(),
  skillValue: z.number(),
  dice: z.string(),
  roll: z.object({
    rolls: z.number().array(),
    sum: z.number(),
    sides: z.number()
  }),
  total: z.number(),
  tn: z.number(),
  isSuccess: z.boolean()
})

export type SkillCheckResult = z.infer<typeof SkillCheckResultSchema>

export const SkillCheckSchema = z.object({
  name: z.string(),
  conditionTag: z.nullable(z.string()),
  title: z.string(),
  characteristic: z.string(),
  skill: z.string(),
  tn: z.number(),
  result: z.nullable(SkillCheckResultSchema)
})

export type SkillCheck = z.infer<typeof SkillCheckSchema>

export const ITEM_CHECK_VARIANT_GIVE = 'ITEM_CHECK_VARIANT_GIVE'
export const ITEM_CHECK_VARIANT_TAKE = 'ITEM_CHECK_VARIANT_TAKE'
export const ITEM_CHECK_VARIANT_VERIFY = 'ITEM_CHECK_VARIANT_VERIFY'

export const ItemCheckVariantSchema = z.object({
  type: z.enum([ITEM_CHECK_VARIANT_GIVE, ITEM_CHECK_VARIANT_TAKE, ITEM_CHECK_VARIANT_VERIFY])
})

export type ItemCheckVariant = z.infer<typeof ItemCheckVariantSchema>

export const ItemCheckSchema = z.object({
  name: z.string(),
  conditionTag: z.nullable(z.string()),
  title: z.string(),
  message: z.string(),
  variant: ItemCheckVariantSchema,
  itemName: z.string()
})

export type ItemCheck = z.infer<typeof ItemCheckSchema>

export const PARTY_CHECK_VARIANT_PRESENT = 'PARTY_CHECK_VARIANT_PRESENT'
export const PARTY_CHECK_VARIANT_ABSENT = 'PARTY_CHECK_VARIANT_ABSENT'

export const PartyCheckVariantSchema = z.object({
  type: z.enum([PARTY_CHECK_VARIANT_PRESENT, PARTY_CHECK_VARIANT_ABSENT])
})

export type PartyCheckVariant = z.infer<typeof PartyCheckVariantSchema>

export const PartyCheckSchema = z.object({
  name: z.string(),
  conditionTag: z.nullable(z.string()),
  title: z.string(),
  message: z.string(),
  variant: PartyCheckVariantSchema,
  itemName: z.string()
})

export type PartyCheck = z.infer<typeof PartyCheckSchema>

export const TEAMMATE = 'TEAMMATE'
export const COVER_OBSTACLE = 'COVER_OBSTACLE'
export const BARRIER_OBSTACLE = 'BARRIER_OBSTACLE'

export const ObstacleSchema = z.object({
  name: z.string(),
  type: z.enum([COVER_OBSTACLE, BARRIER_OBSTACLE]),
  x: z.number(),
  movement: z.number()
})

export type Obstacle = z.infer<typeof ObstacleSchema>

export const TeammateSchema = z.object({
  name: z.string(),
  type: z.enum([TEAMMATE]),
  x: z.number(),
  movement: z.number()
})

export type Teammate = z.infer<typeof TeammateSchema>

export const FieldEntitySchema = z.union([TeammateSchema, ObstacleSchema])

export type FieldEntity = z.infer<typeof FieldEntitySchema>

export const SideSchema = z.object({
  name: z.string(),
  title: z.string(),
  team: z.string().array()
})

export type Side = z.infer<typeof SideSchema>

export const FieldSchema = z.object({
  name: z.string(),
  sides: z.array(SideSchema),
  obstacles: z.array(ObstacleSchema),
  teammates: z.array(TeammateSchema),
  initiativePairs: z.array(z.tuple([z.number(), z.string()])),
  initiativeIndex: z.number()
})

export type Field = z.infer<typeof FieldSchema>

export const GameSchema = z.object({
  ticks: z.number(),
  showInspector: z.boolean(),
  sceneName: z.string(),
  editSceneName: z.string(),
  previousSceneName: z.string(),
  roomName: z.string(),
  editRoomName: z.string(),
  characteristicLabels: z.record(z.string(), z.string()),
  skillLabels: z.record(z.string(), z.string()),
  rooms: RoomSchema.array(),
  partyRepresentativeName: z.string(),
  party: z.string().array(),
  entityName: z.nullable(z.string()),
  entities: EntitySchema.array(),
  items: ItemSchema.array(),
  dialogues: DialogueSchema.array(),
  log: LogItemSchema.array(),
  skillCheckName: z.nullable(z.string()),
  skillChecks: SkillCheckSchema.array(),
  itemCheckName: z.nullable(z.string()),
  itemChecks: ItemCheckSchema.array(),
  partyCheckName: z.nullable(z.string()),
  partyChecks: PartyCheckSchema.array(),
  choiceName: z.nullable(z.string()),
  choices: ChoiceSchema.array(),
  descriptions: DescriptionSchema.array(),
  fieldName: z.nullable(z.string()),
  fields: FieldSchema.array()
})

export type Game = z.infer<typeof GameSchema>
