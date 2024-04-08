import { useEffect } from 'react'
import { useGame } from './context'
import { dice } from './utils'
import { moveEntityRoom } from './actions'
import { findField } from './helpers'

export const useWanderingBehaviors = () => {
  const { state, dispatch } = useGame()
  useEffect(() => {
    state.entities.forEach((entity) => {
      if (entity.tags.some((t) => t === 'wandering')) {
        const roll = dice('2d6').sum
        if (roll > 6) {
          const room = state.rooms.filter((r) =>
            r.entities.some((en) => en === entity.name),
          )[0]!
          const exit = room.exits[Math.floor(Math.random() * room.exits.length)]
          console.info(`${entity.name} moved from ${room.name} to ${exit.to}`)
          dispatch(moveEntityRoom(room.name, exit.to, entity.name))
        }
      }
    })
  }, [state.ticks])
}

// TODO: Figure out what to do with this
export const useActsDuringCombat = () => {
  const { state } = useGame()
  useEffect(() => {
    if (!state.fieldName) {
      return
    }
    const field = findField(state)(state.fieldName)
    const [_, entityName] = field.initiativePairs[field.initiativeIndex]
    const teammate = field.teammates.filter((tm) => tm.name === entityName)[0]!

    const leftX = teammate.x - teammate.movement
    const rightX = teammate.x + teammate.movement
    const averageX =
      field.teammates.reduce((s, tm) => s + tm.x, 0) / field.teammates.length
    const isLeftBusier =
      Math.abs(averageX - leftX) < Math.abs(averageX - rightX)

    // TODO: Move away from busy area and try to make a shot
    // TODO: Make sure it's your turn
    console.log('isLeftBusier', entityName, isLeftBusier)
  }, [state.ticks])
}
