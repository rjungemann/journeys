import { useGame } from "../../context"
import { findNonPartyEntitiesInRoom } from "../../helpers"
import { commaSeparateStrings } from "../../utils"

export const RoomOtherEntitiesView = () => {
  const { state } = useGame()
  const otherEntities = findNonPartyEntitiesInRoom(state)(state.roomName)
  return otherEntities.length > 0 ? (
    <>
      <p>
        In the room {otherEntities.length === 1 ? 'is' : 'are'}{' '}
        {commaSeparateStrings( otherEntities.map((entity) => entity.title) )}.
      </p>
    </>
  ) : null
}