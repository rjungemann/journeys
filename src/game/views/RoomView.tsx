import { changeEntity, changeRoom, changeScene, movePartyRoom } from "../actions"
import { useGame } from "../context"
import { findExit, findNonPartyEntitiesInRoom, findParty, findRoom, tagExitsGlobally } from "../helpers"
import { capitalize, commaSeparateComponents } from "../utils"

export const RoomDescriptionsView = () => {
  const { state } = useGame()
  const room = findRoom(state)(state.roomName)
  const descriptions = room.tags.reduce((sum, tag) => {
    const [_, name] = tag.match(/^description:(.*)$/) || []
    return name ? [...sum, ...state.descriptions.filter((d) => d.name === name)] : sum
  }, [])
  return (
    <>
      {
        descriptions.map((description) => {
          if (description.conditionTag) {
            const hasTag = tagExitsGlobally(state)(description.conditionTag)
            return hasTag ? <p key={description.name}>{description.message}</p> : null
          } else {
            return <p key={description.name}>{description.message}</p>
          }
        })
      }
    </>
  )
}

export const RoomExitsView = () => {
  const { state, dispatch } = useGame()
  const handleExitFn = (exitName: string) => () => {
    const room = findRoom(state)(state.roomName)
    const exit = findExit(state)(state.roomName, exitName)
    dispatch(movePartyRoom(room.name, exit.to))
    dispatch(changeRoom(exit.to))
  }
  const room = findRoom(state)(state.roomName)
  return (
    room.exits.length > 0
    ? (
      <p>
        There {room.exits.length === 1 ? 'is an exit' : 'are exits'}
        {' '}
        {
          commaSeparateComponents(
            room.exits.map((exit) => {
              const room = findRoom(state)(exit.to)
              return (
                <span key={exit.name}>
                  to the <a onClick={handleExitFn(exit.name)} title={`${capitalize(exit.title)}, leading to the ${room.title}`}>{exit.title}</a>
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

export const RoomPartyEntitiesView = () => {
  const { state, dispatch } = useGame()
  const handleEntityFn = (entityName: string) => () => {
    dispatch(changeEntity(entityName))
    dispatch(changeScene('entity'))
  }
  const party = findParty(state)()
  return (
    <>
      <p>
        From the party,
        {' '}
        {
          commaSeparateComponents(
            party.map((entity) => {
              return <a key={entity.name} onClick={handleEntityFn(entity.name)}>{entity.title}</a>
            })
          )
        }
        {' '}
        {state.party.length === 1 ? 'is' : 'are'} here.
      </p>
    </>
  )
}

export const RoomOtherEntitiesView = () => {
  const { state, dispatch } = useGame()
  const handleEntityFn = (entity) => (event) => {
    dispatch(changeEntity(entity.name))
    dispatch(changeScene('entity'))
  }
  const otherEntities = findNonPartyEntitiesInRoom(state)(state.roomName)
  return (
    (otherEntities.length > 0)
    ? (
      <p>
        Also in the room:
        {' '}
        {
          commaSeparateComponents(
            otherEntities.map((entity) => {
              return <a key={entity.name} onClick={handleEntityFn(entity)}>{entity.title}</a>
            })
          )
        }.
      </p>
    )
    : null
  )
}

export const RoomView = () => {
  const { state } = useGame()
  const room = findRoom(state)(state.roomName)
  return (
    <>
      <h2>{capitalize(room.title)}</h2>
      <RoomDescriptionsView />
      <RoomPartyEntitiesView />
      <RoomOtherEntitiesView />
      <RoomExitsView />
    </>
  )
}