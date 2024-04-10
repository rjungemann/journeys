import { changeRoom, movePartyRoom } from "../../actions"
import { useGame } from "../../context"
import { findExit, findRoom } from "../../helpers"
import { capitalize, commaSeparateComponents } from "../../utils"

export const RoomExitsView = () => {
  const { state, dispatch } = useGame()
  const handleExitFn = (exitName: string) => () => {
    const room = findRoom(state)(state.roomName)
    const exit = findExit(state)(state.roomName, exitName)
    dispatch(movePartyRoom(room.name, exit.to))
    dispatch(changeRoom(exit.to))
  }
  const room = findRoom(state)(state.roomName)
  if (room.exits.length === 0) {
    return false
  }
  return (
    <>
      <p>
        There {room.exits.length === 1 ? 'is an exit' : 'are exits'}{' '}
        {commaSeparateComponents(
          room.exits.map((exit) => {
            const room = findRoom(state)(exit.to)
            const title = `${capitalize(exit.title)}, leading to the ${room.title}`
            return (
              <span key={exit.name}>
                to the{' '}
                <a onClick={handleExitFn(exit.name)} title={title}>
                  {exit.title}
                </a>
              </span>
            )
          }),
        )}
        .
      </p>
    </>
  )
}