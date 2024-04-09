import { useGame } from "../../context"
import { findEntity, findEntityDescriptions, findRoom } from "../../helpers"
import { T } from "../T"

export const EntityDescriptionView = ({
  entityName,
}: {
  entityName: string
}) => {
  const { state } = useGame()
  const entity = findEntity(state)(entityName)
  const descriptions = findEntityDescriptions(state)(entityName)
  return (
    <>
      <h4>{entity.title}</h4>
      {
        descriptions
        .map((description) => {
          return (
            <p key={description.name}><T path={description.stringKey} /></p>
          )
        })
      }
    </>
  )
}

export const RoomDescriptionsView = () => {
  const { state } = useGame()
  const room = findRoom(state)(state.roomName)
  const isShown = room.entities.some((entityName) => findEntityDescriptions(state)(entityName).length > 0)
  if (!isShown) {
    return false
  }
  return (
    <>
      <h3>Descriptions</h3>
      {room.entities.map((entityName) => <EntityDescriptionView key={entityName} entityName={entityName} />)}
    </>
  )
}