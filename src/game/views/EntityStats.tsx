import { useGame } from "../context"
import { findEntity, findItem } from "../helpers"
import { T } from "./T"

export const EntityCharacteristics = ({
  entityName,
}: {
  entityName: string
}) => {
  const { state } = useGame()
  const entity = findEntity(state)(entityName)
  const characteristicNames = Object.keys(entity.characteristics || {})
  return characteristicNames.length > 0 ? (
    <div>
      <h4>Characteristics</h4>
      {characteristicNames.map((name) => {
        const value = entity.characteristics[name]
        const bonus = Math.max(value - 7, -2)
        return (
          <div key={name}>
            <span style={{ fontWeight: 'bold', marginRight: '0.5em' }}>
              <T path={`characteristicLabels.${name}`} />
            </span>{' '}
            {value} {`(${bonus})`}
          </div>
        )
      })}
    </div>
  ) : null
}

export const EntitySkills = ({ entityName }: { entityName: string }) => {
  const { state } = useGame()
  const entity = findEntity(state)(entityName)
  const skillNames = Object.keys(entity.skills || {})
  return skillNames.length > 0 ? (
    <div>
      <h4>Skills</h4>
      {skillNames.map((name) => {
        const value = entity.skills[name]
        return (
          <div key={name}>
            <span style={{ fontWeight: 'bold', marginRight: '0.7em' }}>
              <T path={`skillLabels.${name}`} />
            </span>{' '}
            {value}
          </div>
        )
      })}
    </div>
  ) : null
}

export const EntityInventory = ({ entityName }: { entityName: string }) => {
  const { state } = useGame()
  const entity = findEntity(state)(entityName)
  const inventory = entity.inventory.map((name) => findItem(state)(name))
  return inventory.length > 0 ? (
    <div>
      <h4>Inventory</h4>
      {inventory.map((item) => (
        <div key={item.name}>
          <span style={{ marginRight: '0.7em' }}>{item.title}</span>
        </div>
      ))}
    </div>
  ) : null
}

// TODO: Figure out what to do with this
export const EntityStats = ({ entityName }: { entityName: string }) => {
  const { state } = useGame()
  const entity = findEntity(state)(entityName)
  return (
    <>
      {Object.keys(entity.characteristics || {}).length > 0 ||
      Object.keys(entity.skills || {}).length > 0 ? (
        <div className="entity-stats">
          <EntityCharacteristics entityName={entityName} />
          <EntitySkills entityName={entityName} />
          <EntityInventory entityName={entityName} />
        </div>
      ) : null}
    </>
  )
}