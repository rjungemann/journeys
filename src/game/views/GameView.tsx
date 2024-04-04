import { useEffect, useState } from "react"
import { DialogueView } from "./DialogueView"
import { EntityView } from "./EntityView"
import { InspectorView } from "./InspectorView"
import { RoomView } from "./RoomView"
import { SkillCheckView } from "./SkillCheckView"
import { useGame } from "../context"
import { moveEntityRoom } from "../actions"
import { dice } from "../utils"
import { ChoiceView } from "./ChoiceView"
import { ItemCheckView } from "./ItemCheckView"

export const GameView = () => {
  const { state, dispatch } = useGame()
  useEffect(() => {
    const interval = setInterval(() => {
      const roll = dice('2d6').sum
      if (roll > 6) {
        const entityName = 'kynon-morgan'
        const room = state.rooms.filter((r) => r.entities.some((en) => en === entityName))[0]!
        const exit = room.exits[Math.floor(Math.random() * room.exits.length)]
        console.info(`${entityName} moved from ${room.name} to ${exit.to}`)
        dispatch(moveEntityRoom(room.name, exit.to, entityName))
      }
    }, 5000)
    return () => {
      clearInterval(interval)
    }
  })
  return (
    <>
      <RoomView />
      <EntityView />
      <DialogueView />
      <ChoiceView />
      <ItemCheckView />
      <SkillCheckView />
      <InspectorView />
    </>
  )
}