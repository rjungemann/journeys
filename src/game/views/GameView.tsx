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
import { useWanderingBehaviors } from "../behaviors"

export const GameView = () => {
  const { state } = useGame()
  const { theme } = useTheme()
  useWanderingBehaviors()

  return (
    <div className={`theme-${theme}`}>
      <div>
        <img src={theme === 'dark' ? logoDark : logoLight} width={515/3} height={80/3} />
      </div>
      {state.sceneName === 'entity' ? <EntityView /> : null}
      {state.sceneName === 'dialogue' ? <DialogueView /> : null}
      {state.sceneName === 'choice' ? <ChoiceView /> : null}
      {state.sceneName === 'room' ? <RoomView /> : null}
      {state.sceneName === 'item-check' ? <ItemCheckView /> : null}
      {state.sceneName === 'skill-check' ? <SkillCheckView /> : null}
      <InspectorView />
    </div>
  )
}