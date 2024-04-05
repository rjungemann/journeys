import { useEffect } from "react"
import { useGame } from "./context"
import { dice } from "./utils"
import { moveEntityRoom } from "./actions"

export const useWanderingBehaviors = () => {
  const { state, dispatch } = useGame()
  useEffect(() => {
    state.entities.forEach((entity) => {
      if (entity.tags.some((t) => t === 'wandering')) {
        const roll = dice('2d6').sum
        if (roll > 6) {
          const room = state.rooms.filter((r) => r.entities.some((en) => en === entity.name))[0]!
          const exit = room.exits[Math.floor(Math.random() * room.exits.length)]
          console.info(`${entity.name} moved from ${room.name} to ${exit.to}`)
          dispatch(moveEntityRoom(room.name, exit.to, entity.name))
        }
      }
    })
  }, [state.ticks])
}