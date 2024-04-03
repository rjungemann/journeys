import { DialogueView } from "./DialogueView"
import { EntityView } from "./EntityView"
import { InspectorView } from "./InspectorView"
import { RoomView } from "./RoomView"
import { SkillCheckView } from "./SkillCheckView"

export const GameView = () => {
  return (
    <main>
      <RoomView />
      <EntityView />
      <DialogueView />
      <SkillCheckView />
      <InspectorView />
    </main>
  )
}