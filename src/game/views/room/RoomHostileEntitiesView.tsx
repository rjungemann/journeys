import { changeField, changeScene, createField } from "../../actions"
import { useGame } from "../../context"
import { findAlliedHostileEntities, findOpenlyHostileEntities } from "../../helpers"
import { commaSeparateStrings, smallUid } from "../../utils"

export const RoomHostileEntitiesView = () => {
  const { state, dispatch } = useGame()
  const openlyHostileEntities = findOpenlyHostileEntities(state)(state.roomName)
  const alliedHostileEntities = findAlliedHostileEntities(state)(state.roomName)
  const hostileEntities = [...openlyHostileEntities, ...alliedHostileEntities]
  const startFight = () => {
    const uid = smallUid()
    dispatch(
      createField(`field-${uid}`, [
        state.party,
        hostileEntities.map((e) => e.name),
      ]),
    )
    dispatch(changeField(`field-${uid}`))
    dispatch(changeScene('combat'))
  }
  if (hostileEntities.length === 0) {
    return false
  }
  return (
    <>
      <h3>Potential Hostiles</h3>
      <p>
        <a onClick={startFight}>Start fight</a> with{' '}
        {commaSeparateStrings(hostileEntities.map((e) => e.title))}?
      </p>
    </>
  )
}