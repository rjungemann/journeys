import { changeEntity, changeRoom, changeScene, movePartyRoom } from "../actions"
import { useGame } from "../context"
import { capitalize, commaSeparateComponents, hasMatchingTag } from "../utils"

export const RoomTidbits = () => {
  const { state, dispatch } = useGame()
  const room = state.rooms.filter((room) => room.name === state.roomName)[0]!
  const tidbits = room.tidbits.map((tn) => state.tidbits.filter((tidbit) => tidbit.name === tn)[0]!)
  return (
    <>
      {
        tidbits.map((tidbit) => {
          const hasTag = hasMatchingTag(state, tidbit.conditionTag)
          return (
            hasTag
            ? (
              <p key={tidbit.name}>{tidbit.attachment.message}</p>
            )
            : null
          )
        })
      }
    </>
  )
}

export const RoomExits = () => {
  const { state, dispatch } = useGame()
  const handleExitFn = (exitName) => (event) => {
    const room = state.rooms.filter((room) => room.name === state.roomName)[0]!
    const exit = room.exits.filter((exit) => exit.name === exitName)[0]!
    dispatch(movePartyRoom(room.name, exit.to))
    dispatch(changeRoom(exit.to))
  }
  const room = state.rooms.filter((room) => room.name === state.roomName)[0]!
  return (
    room.exits.length > 0
    ? (
      <p>
        There {room.exits.length === 1 ? 'is an exit' : 'are exits'}
        {' '}
        {
          commaSeparateComponents(
            room.exits.map((exit) => {
              const room = state.rooms.filter((r) => r.name === exit.to)[0]!
              return (
                <span key={exit.name}>
                  to the <a onClick={handleExitFn(exit.name)} title={`${capitalize(exit.title)}, leading to the {room.title}`}>{exit.title}</a>
                </span>
              )
            })
          )
        }.
      </p>
    )
    : null
  )
}

export const RoomEntities = () => {
  const { state, dispatch } = useGame()
  const handleEntityFn = (entity) => (event) => {
    dispatch(changeEntity(entity.name))
    dispatch(changeScene('entity'))
  }
  const room = state.rooms.filter((room) => room.name === state.roomName)[0]!
  const party = state.party.map((en) => state.entities.filter((e) => e.name === en)[0]!)
  const otherEntities = room
    .entities
    .filter((entityName) => !state.party.some((en) => en === entityName))
    .map((entityName) => state.entities.filter((e) => e.name === entityName)[0]!)
  return (
    <>
      <p>
        From the party,
        {' '}
        {
          commaSeparateComponents(
            party.map((entity) => {
              return (
                <a key={entity.name} onClick={handleEntityFn(entity)}>{entity.title}</a>
              )
            })
          )
        }
        {' '}
        {state.party.length === 1 ? 'is' : 'are'} here.
      </p>
      {
        (otherEntities.length > 0)
        ? (
          <p>
            Also in the room:
            {' '}
            {
              commaSeparateComponents(
                otherEntities.map((entity) => {
                  return (
                    <a key={entity.name} onClick={handleEntityFn(entity)}>{entity.title}</a>
                  )
                })
              )
            }.
          </p>
        )
        : null
      }
    </>
  )
}

export const RoomView = () => {
  const { state } = useGame()
  if (state.sceneName !== 'room') {
    return null
  }
  const room = state.rooms.filter((room) => room.name === state.roomName)[0]!
  return (
    <>
      <h2>{capitalize(room.title)}</h2>
      <RoomTidbits />
      <RoomEntities />
      <RoomExits />
    </>
  )
}