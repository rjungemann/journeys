import { BARRIER_OBSTACLE, COVER_OBSTACLE, Field, FieldEntity, TEAMMATE } from "../data"
import { useGame } from "../context"
import { findEntity, findField } from "../helpers"
import { fieldRandomlyMoveAll, incrementFieldInitiative } from "../actions"
import { capitalize } from "../utils"
import { useEffect } from "react"

export const RadarObstacle = ({ obstacleName, i }: { obstacleName: string, i: number }) => {
  const { state } = useGame()
  const field = findField(state)(state.fieldName)
  const tms = field.teammates.map((tm) => {
    return { ...tm, x: Math.random() < 0.5 ? tm.x - tm.movement : tm.x + tm.movement }
  })
  const midpointX = tms.reduce((sum, tm) => sum + tm.x, 0) / tms.length
  const formulaX = (x) => 200 + x - midpointX

  const obstacle = field.obstacles.filter((o) => o.name === obstacleName)[0]!
  const { type, name, x } = obstacle
  const color = '#666666'
  const label = type === BARRIER_OBSTACLE ? 'Barrier' : 'Cover'
  return (
    <g key={obstacle.name}>
      <line key={name} x1={formulaX(x)} y1={0} x2={formulaX(x)} y2={100} stroke={color} opacity={0.5} />
      <circle cx={formulaX(x)} cy={100 - 5} r={5} fill={color} />
      <text x={formulaX(x) + 2} y={16 + 16 * i} fontSize={'0.5em'} style={{ fill: color }}>{label}</text>
    </g>
  )
}

export const RadarTeammate = ({ teammateName, i }: { teammateName: string, i: number }) => {
  const { state } = useGame()
  const field = findField(state)(state.fieldName)
  const { sides } = field
  const tms = field.teammates.map((tm) => {
    return { ...tm, x: Math.random() < 0.5 ? tm.x - tm.movement : tm.x + tm.movement }
  })
  const midpointX = tms.reduce((sum, tm) => sum + tm.x, 0) / tms.length
  const formulaX = (x) => 200 + x - midpointX

  const teammate = field.teammates.filter((o) => o.name === teammateName)[0]!
  const color = '#999999'
  const { name, x } = teammate
  const side = sides.filter((side) => side.team.some((t) => t === teammate.name))[0]!
  return (
    <g key={teammate.name}>
      <line key={name} x1={formulaX(x)} y1={0} x2={formulaX(x)} y2={100} stroke={color} opacity={0.5} />
      <circle cx={formulaX(x)} cy={100 - 5} r={5} fill={color} />
      <text x={formulaX(x) + 2} y={16 + 16 * i} fontSize={'0.4em'} style={{ fill: color }}>{teammate.name} ({side.name})</text>
    </g>
  )
}

export const RadarView = () => {
  const { state } = useGame()
  const field = findField(state)(state.fieldName)
  const { teammates, obstacles } = field
  const tms = field.teammates.map((tm) => {
    return { ...tm, x: Math.random() < 0.5 ? tm.x - tm.movement : tm.x + tm.movement }
  })
  const midpointX = tms.reduce((sum, tm) => sum + tm.x, 0) / tms.length
  return (
    <>
      <svg viewBox="0 0 400 100" style={{ border: '1px solid white' }} xmlns="http://www.w3.org/2000/svg">
        <line x1={200} y1={0} x2={200} y2={100} stroke={'white'} opacity={0.5} />
        {obstacles.map((obstacle, i) => <RadarObstacle obstacleName={obstacle.name} i={i} />)}
        {teammates.map((teammate, i) => <RadarTeammate teammateName={teammate.name} i={i} />)}
      </svg>
    </>
  )
}

export const FieldEntityListView = () => {
  const { state } = useGame()
  const field = findField(state)(state.fieldName)
  const { teammates, obstacles } = field
  const ordered: FieldEntity[] = [...teammates, ...obstacles].sort((a, b) => a.x - b.x)
  return (
    <>
      <h3>Along <em>x</em> Axis</h3>
      {
        ordered.map((fieldEntity, i) => {
          if (fieldEntity.type === BARRIER_OBSTACLE) {
            return (
              <span key={fieldEntity.name}>Barrier {fieldEntity.x.toFixed(0)}{i < ordered.length - 1 ? <br /> : null}</span>
            )
          }
          if (fieldEntity.type === COVER_OBSTACLE) {
            return (
              <span key={fieldEntity.name}>Cover {fieldEntity.x.toFixed(0)}{i < ordered.length - 1 ? <br /> : null}</span>
            )
          }
          if (fieldEntity.type === TEAMMATE) {
            const entity = findEntity(state)(fieldEntity.name)
            return (
              <span key={fieldEntity.name}>{capitalize(entity.title)} {fieldEntity.x.toFixed(0)}{i < ordered.length - 1 ? <br /> : null}</span>
            )
          }
          throw new Error(`Unrecognized field entity type ${JSON.stringify(fieldEntity)}`)
        })
      }
    </>
  )
}

export const FieldInitiativeListView = () => {
  const { state } = useGame()
  const field = findField(state)(state.fieldName)
  const { teammates, obstacles } = field
  const ordered: FieldEntity[] = [...teammates, ...obstacles].sort((a, b) => a.x - b.x)
  return (
    <>
      <h3>Initiative</h3>
      {
        field.initiativePairs.map(([value, teammateName], i) => {
          const currentName = field.initiativePairs[field.initiativeIndex][1]
          const entity = findEntity(state)(teammateName)
          console.log(currentName, teammateName)
          return (
            <span key={teammateName}>{currentName === teammateName ? <strong>{entity.title}</strong> : entity.title} – {value}{i < ordered.length - 1 ? <br /> : null}</span>
          )
        })
      }
    </>
  )
}

// TODO: Coverage and obstacles
export const CombatView = () => {
  const { state, dispatch } = useGame()
  const field = findField(state)(state.fieldName)
  useEffect(() => {
    console.log('tick', state.ticks)
    dispatch(incrementFieldInitiative(field.name))
  }, [state.ticks])
  const handleStep = () => {
    dispatch(fieldRandomlyMoveAll(state.fieldName))
  }
  return (
    <>
      <h2>Combat</h2>
      <RadarView />
      <p>
        <button onClick={handleStep}>Step</button>
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignContent: 'space-between' }}>
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