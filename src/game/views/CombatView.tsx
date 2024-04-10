import {
  BARRIER_OBSTACLE,
  COVER_OBSTACLE,
  FieldEntity,
  TEAMMATE,
} from '../data'
import { useGame } from '../context'
import { findEntity, findField, isCombatOver, isEntityDead } from '../helpers'
import {
  addTag,
  changeScene,
  fieldCombatComplete,
  fieldRandomlyMoveAll,
  incrementFieldInitiative,
} from '../actions'
import { capitalize } from '../utils'
import { useEffect, useRef } from 'react'

export const DEFAULT_RADAR_OBJECT_COLOR = '#666666'

const scale = (
  inLow: number,
  inHigh: number,
  outLow: number,
  outHigh: number,
  input: number,
) => {
  const ratio = (input - inLow) / (inHigh - inLow)
  return ratio * (outHigh - outLow) + outLow
}

const width = 400
const height = 100
const zoom = 1.25

export const RadarObstacle = ({
  obstacleName,
  i,
}: {
  obstacleName: string
  i: number
}) => {
  const { state } = useGame()
  const field = findField(state)(state.fieldName)
  const midpointX =
    field.teammates.reduce((sum, tm) => sum + tm.x, 0) / field.teammates.length
  const formulaX = (x) =>
    scale(
      0,
      width,
      -(width * (zoom - 1.0)),
      width + width * (zoom - 1.0),
      width * 0.5 + x - midpointX,
    )

  const obstacle = field.obstacles.filter((o) => o.name === obstacleName)[0]!
  const { type, name, x } = obstacle
  const label = type === BARRIER_OBSTACLE ? 'Barrier' : 'Cover'
  return (
    <g key={obstacle.name} className="obstacle">
      <line
        key={name}
        x1={formulaX(x)}
        y1={0}
        x2={formulaX(x)}
        y2={height}
        opacity={0.5}
        strokeWidth={BARRIER_OBSTACLE ? 4 : 2}
      />
    </g>
  )
}

export const RadarTeammate = ({
  teammateName,
  i,
}: {
  teammateName: string
  i: number
}) => {
  const { state } = useGame()

  const isDead = isEntityDead(state)(teammateName)
  if (isDead) {
    return false
  }

  const field = findField(state)(state.fieldName)
  const midpointX =
    field.teammates.reduce((sum, tm) => sum + tm.x, 0) / field.teammates.length
  const formulaX = (x) =>
    scale(
      0,
      width,
      -(width * (zoom - 1.0)),
      width + width * (zoom - 1.0),
      width * 0.5 + x - midpointX,
    )

  const teammate = field.teammates.filter((o) => o.name === teammateName)[0]!
  const entity = findEntity(state)(teammate.name)
  const color = entity.color
  const { name, x } = teammate
  const side = field.sides.filter((side) =>
    side.team.some((t) => t === teammate.name),
  )[0]!
  return (
    <g key={teammate.name}>
      <line
        key={name}
        x1={formulaX(x)}
        y1={0}
        x2={formulaX(x)}
        y2={height}
        stroke={color}
      />
      <text
        x={formulaX(x) + 2}
        y={16 + 16 * i}
        fontSize={'0.4em'}
        fontWeight={'400'}
        style={{ fill: color }}
      >
        {entity.title} ({side.title})
      </text>
    </g>
  )
}

export const RadarView = () => {
  const { state } = useGame()
  const field = findField(state)(state.fieldName)
  const { teammates, obstacles } = field
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {obstacles.map((obstacle, i) => (
        <RadarObstacle
          key={obstacle.name}
          obstacleName={obstacle.name}
          i={i}
        />
      ))}
      {teammates.map((teammate, i) => (
        <RadarTeammate
          key={teammate.name}
          teammateName={teammate.name}
          i={i}
        />
      ))}
    </svg>
  )
}

export const FieldEntityListView = () => {
  const { state } = useGame()
  const field = findField(state)(state.fieldName)
  const { teammates, obstacles } = field
  const ordered: FieldEntity[] = [...teammates, ...obstacles].sort(
    (a, b) => a.x - b.x,
  )
  return (
    <>
      <h3>
        Along <em>x</em> Axis
      </h3>
      {ordered.map((fieldEntity, i) => {
        if (fieldEntity.type === BARRIER_OBSTACLE) {
          return (
            <span key={fieldEntity.name}>
              Barrier @ {fieldEntity.x.toFixed(0)}m
              {i < ordered.length - 1 ? <br /> : null}
            </span>
          )
        }
        if (fieldEntity.type === COVER_OBSTACLE) {
          return (
            <span key={fieldEntity.name}>
              Cover @ {fieldEntity.x.toFixed(0)}m
              {i < ordered.length - 1 ? <br /> : null}
            </span>
          )
        }
        if (fieldEntity.type === TEAMMATE) {
          const entity = findEntity(state)(fieldEntity.name)
          const isDead = isEntityDead(state)(fieldEntity.name)
          if (isDead) {
            return false
          }
          const side = field.sides.filter((s) =>
            s.team.some((en) => en === entity.name),
          )[0]!
          return (
            <span key={fieldEntity.name} style={{ color: entity.color }}>
              {side.title} – {capitalize(entity.title)} @ {fieldEntity.x.toFixed(0)}m
              {i < ordered.length - 1 ? <br /> : null}
            </span>
          )
        }
        throw new Error(
          `Unrecognized field entity type ${JSON.stringify(fieldEntity)}`,
        )
      })}
    </>
  )
}

export const FieldInitiativeListView = () => {
  const { state } = useGame()
  const field = findField(state)(state.fieldName)
  const [_, entityName] = field.initiativePairs[field.initiativeIndex]
  const isInParty = state.party.some((n) => n === entityName)
  const { teammates, obstacles } = field
  const ordered: FieldEntity[] = [...teammates, ...obstacles].sort(
    (a, b) => a.x - b.x,
  )
  return (
    <>
      <h3>Turn Order</h3>
      <p>{isInParty ? 'Your Turn.' : 'Their Turn.'}</p>
      {field.initiativePairs
        .sort((a, b) => a[0] - b[0])
        .map(([value, teammateName], i) => {
          const currentName = field.initiativePairs[field.initiativeIndex][1]
          const entity = findEntity(state)(teammateName)
          const isDead = isEntityDead(state)(teammateName)
          return (
            <span key={teammateName} style={{ color: entity.color }}>
              {currentName === teammateName ? (
                <strong>{entity.title}</strong>
              ) : (
                entity.title
              )}
              {' – '}
              {isDead ? 'Dead' : value}
              {i < ordered.length - 1 ? <br /> : null}
            </span>
          )
        })}
    </>
  )
}

// TODO: Coverage and obstacles
export const CombatView = () => {
  const { state, dispatch } = useGame()
  const field = findField(state)(state.fieldName)

  // If in combat, when a turn is ticked, increment the field initiative
  // NOTE: This may need to be changed if actions aren't always user-initiated
  const previousTicksRef = useRef<number>()
  useEffect(() => {
    if (previousTicksRef.current && previousTicksRef.current !== state.ticks) {
      dispatch(incrementFieldInitiative(field.name))
    }
    previousTicksRef.current = state.ticks
  }, [state.ticks])

  // TODO: Temporary random behavior
  const handleStep = () => {
    dispatch(fieldRandomlyMoveAll(state.fieldName))
  }
  const handleDebugWin = () => {
    const battleChecks = state.battleChecks.filter(
      (bc) => bc.fieldName === state.fieldName,
    )
    for (let battleCheck of battleChecks) {
      dispatch(
        addTag(
          state.partyRepresentativeName,
          `battle-check:${battleCheck.name}:done`,
        ),
      )
    }
    dispatch(fieldCombatComplete(state.fieldName, true))
    dispatch(changeScene('room'))
  }
  const handleEndCombat = () => {
    const isPartyAlive =
      state.party.filter((n) => !isEntityDead(state)(n)).length > 0
    dispatch(fieldCombatComplete(state.fieldName, isPartyAlive))
    dispatch(changeScene(isPartyAlive ? 'room' : 'game-over'))
  }

  const isOver = isCombatOver(state)()

  return (
    <>
      <h2>Combat</h2>
      <RadarView />
      <p>
        {isOver ? (
          <>
            <button onClick={handleEndCombat}>End Combat</button>
          </>
        ) : (
          <>
            <button onClick={handleStep}>Step</button>{' '}
            <button onClick={handleDebugWin}>Debug Win</button>
          </>
        )}
      </p>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'space-between',
        }}
      >
        <div style={{ flexGrow: 1 }}>
          <FieldEntityListView />
        </div>
        <div style={{ flexGrow: 1 }}>
          <FieldInitiativeListView />
        </div>
      </div>
    </>
  )
}
