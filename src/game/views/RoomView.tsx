import { useGame } from '../context'
import { findRoom } from '../helpers'
import { RoomBattleCheckView } from './room/RoomBattleCheckView'
import { RoomChoiceView } from './room/RoomChoiceView'
import { RoomDescriptionsView } from './room/RoomDescriptionsView'
import { RoomDialoguesView } from './room/RoomDialoguesView'
import { RoomExitsView } from './room/RoomExitsView'
import { RoomHostileEntitiesView } from './room/RoomHostileEntitiesView'
import { RoomItemCheckView } from './room/RoomItemCheckView'
import { RoomOtherEntitiesView } from './room/RoomOtherEntitiesView'
import { RoomPartyCheckView } from './room/RoomPartyCheckView'
import { RoomPartyEntitiesView } from './room/RoomPartyEntitiesView'
import { RoomSkillCheckView } from './room/RoomSkillCheckView'

export const RoomView = () => {
  const { state } = useGame()
  const room = findRoom(state)(state.roomName)
  return (
    <>
      <h2>{room.title}</h2>
      <RoomDescriptionsView />
      <RoomDialoguesView />
      <RoomChoiceView />
      <RoomSkillCheckView />
      <RoomItemCheckView />
      <RoomPartyCheckView />
      <RoomBattleCheckView />
      <RoomPartyEntitiesView />
      <RoomOtherEntitiesView />
      <RoomHostileEntitiesView />
      <RoomExitsView />
    </>
  )
}
