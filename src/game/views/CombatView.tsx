import { useState } from "react"
import { BARRIER_OBSTACLE, COVER_OBSTACLE, Field } from "../data"
import { useGame } from "../context"
import { findEntity, findField } from "../helpers"
import { fieldRandomlyMoveAll } from "../actions"

// TODO: Coverage and obstacles
export const CombatView = () => {
  const { state, dispatch } = useGame()
  const field = findField(state)(state.fieldName)
  const { teammates, obstacles, sides } = field
  const tms = field.teammates.map((tm) => {
    return { ...tm, x: Math.random() < 0.5 ? tm.x - tm.movement : tm.x + tm.movement }
  })
  const midpointX = tms.reduce((sum, tm) => sum + tm.x, 0) / tms.length
  const formulaX = (x) => 200 + x - midpointX
  const handleStep = () => {
    dispatch(fieldRandomlyMoveAll(state.fieldName))
  }
  const ordered = [...teammates, ...obstacles].sort((a, b) => a.x - b.x)
  return (
    <>
      <h2>Combat</h2>
      <svg viewBox="0 0 400 100" style={{ border: '1px solid white' }} xmlns="http://www.w3.org/2000/svg">
        <line x1={200} y1={0} x2={200} y2={100} stroke={'white'} opacity={0.5} />
        {
          obstacles.map((obstacle, i) => {
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
          })
        }
        {
          teammates.map((teammate, i) => {
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
          })
        }
      </svg>
      <p>
        <button onClick={handleStep}>Step</button>
      </p>
    </>
  )
}