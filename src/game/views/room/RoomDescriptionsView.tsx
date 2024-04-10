import { useGame } from "../../context"
import { findEntityDescriptions, findRoom } from "../../helpers"
import { T } from "../T"

export const EntityDescriptionView = ({
  entityName,
}: {
  entityName: string
}) => {
  const { state } = useGame()
  const descriptions = findEntityDescriptions(state)(entityName)
  return descriptions.map((description) => (
    <p key={description.name}><T path={description.stringKey} /></p>
  ))
}

export const RoomDescriptionsView = () => {
  const { state } = useGame()
  const room = findRoom(state)(state.roomName)
  const entities = room.entities.reduce((sum, entityName) => [...sum, findEntityDescriptions(state)(entityName)], [])
  if (entities.length === 0) {
    return false
  }
  return (
    <>
      {room.entities.map((entityName) => <EntityDescriptionView key={entityName} entityName={entityName} />)}
    </>
  )
}