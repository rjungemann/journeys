import { DialogueView } from "./DialogueView"
import { InspectorView } from "./InspectorView"
import { RoomView } from "./RoomView"
import { SkillCheckView } from "./SkillCheckView"
import { useGame, useTheme } from "../context"
import { ChoiceView } from "./ChoiceView"
import { ItemCheckView } from "./ItemCheckView"
import { useActsDuringCombat, useWanderingBehaviors } from "../behaviors"
import { CombatView } from "./CombatView"
import { HeadView } from "./HeadView"
import { GameOverView } from "./GameOverView"

export const GameView = () => {
  const { state } = useGame()
  const { theme } = useTheme()
  useWanderingBehaviors()
  useActsDuringCombat()

  return (
    <div className={`theme-${theme}`}>
      <HeadView />
      {state.sceneName === 'dialogue' ? <DialogueView /> : null}
      {state.sceneName === 'choice' ? <ChoiceView /> : null}
      {state.sceneName === 'room' ? <RoomView /> : null}
      {state.sceneName === 'item-check' ? <ItemCheckView /> : null}
      {state.sceneName === 'skill-check' ? <SkillCheckView /> : null}
      {state.sceneName === 'combat' ? <CombatView /> : null}
      {state.sceneName === 'game-over' ? <GameOverView /> : null}
      {state.sceneName === 'inspector' ? <InspectorView /> : null}
    </div>
  )
}