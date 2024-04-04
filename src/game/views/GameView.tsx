import { DialogueView } from "./DialogueView"
import { EntityView } from "./EntityView"
import { InspectorView } from "./InspectorView"
import { RoomView } from "./RoomView"
import { SkillCheckView } from "./SkillCheckView"
import { useGame, useTheme } from "../context"
import { ChoiceView } from "./ChoiceView"
import { ItemCheckView } from "./ItemCheckView"
// @ts-ignore
import logoLight from './logo-light-2x.png'
// @ts-ignore
import logoDark from './logo-dark-2x.png'

export const GameView = () => {
  const { state, dispatch } = useGame()
  const { theme, setTheme } = useTheme()
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const roll = dice('2d6').sum
  //     if (roll > 6) {
  //       const entityName = 'kynon-morgan'
  //       const room = state.rooms.filter((r) => r.entities.some((en) => en === entityName))[0]!
  //       const exit = room.exits[Math.floor(Math.random() * room.exits.length)]
  //       console.info(`${entityName} moved from ${room.name} to ${exit.to}`)
  //       dispatch(moveEntityRoom(room.name, exit.to, entityName))
  //     }
  //   }, 5000)
  //   return () => {
  //     clearInterval(interval)
  //   }
  // })
  return (
    <div className={`theme-${theme}`}>
      <div>
        <img src={theme === 'dark' ? logoDark : logoLight} width={515/3} height={80/3} />
      </div>
      <RoomView />
      <EntityView />
      <DialogueView />
      <ChoiceView />
      <ItemCheckView />
      <SkillCheckView />
      <InspectorView />
    </div>
  )
}