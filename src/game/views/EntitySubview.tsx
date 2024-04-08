import {
  changeChoice,
  changeDialogue,
  changeEntity,
  changeItemCheck,
  changeScene,
  changeSkillCheck,
} from '../actions'
import { useGame } from '../context'
import { Description } from '../data'
import { findEntity, findItem, tagExitsGlobally } from '../helpers'
import { commaSeparateComponents } from '../utils'
import { useT } from './T'

export const EntityDescriptionView = ({
  entityName,
}: {
  entityName: string
}) => {
  const { state } = useGame()
  const { t } = useT()
  const entity = findEntity(state)(entityName)
  const descriptions = entity.tags.reduce<Description[]>((sum, tag) => {
    const [_, name] = tag.match(/^description:(.*)$/) || []
    return !name
      ? sum
      : [...sum, ...state.descriptions.filter((d) => d.name === name)]
  }, [])
  return descriptions.map((description) => {
    if (description.conditionTag) {
      const hasTag = tagExitsGlobally(state)(description.conditionTag)
      return hasTag ? <p key={description.name}>{t(description.stringKey)}</p> : null
    } else {
      return <p key={description.name}>{t(description.stringKey)}</p>
    }
  })
}

export const EntityDialogueView = ({ entityName }: { entityName: string }) => {
  const { state, dispatch } = useGame()
  const entity = findEntity(state)(entityName)
  const dialogueNames = entity.tags.reduce((sum, tag) => {
    const match = tag.match(/^dialogue:([^:]+):(\d+)$/)
    const name = match?.[1]
    return name ? [...sum, name] : sum
  }, [])
  const dialogues = dialogueNames.map(
    (name) => state.dialogues.filter((d) => d.name === name)[0]!,
  )
  const handleNextFn = (dialogue) => (event) => {
    dispatch(changeEntity(entityName))
    dispatch(changeDialogue(dialogue.name))
    dispatch(changeScene('dialogue'))
  }
  return dialogues.length > 0 ? (
    <p>
      Would you like to talk about{' '}
      {commaSeparateComponents(
        dialogues.map((dialogue) => (
          <a key={dialogue.name} onClick={handleNextFn(dialogue)}>
            {dialogue.topic}
          </a>
        )),
        'or',
      )}
      ?
    </p>
  ) : null
}

export const EntityChoiceListView = ({
  entityName,
}: {
  entityName: string
}) => {
  const { state, dispatch } = useGame()
  const object = findEntity(state)(entityName)
  const choices = object.tags.reduce((sum, tag) => {
    const [_, name] = tag.match(/^choice:([^:]+)$/) || []
    if (!name) {
      return sum
    }
    const choice = state.choices.filter((c) => c.name === name)[0]!
    if (choice.conditionTag) {
      const hasTag = tagExitsGlobally(state)(choice.conditionTag)
      return hasTag ? [...sum, choice] : sum
    } else {
      return [...sum, choice]
    }
  }, [])
  const handleNextFn = (name) => (event) => {
    dispatch(changeEntity(entityName))
    dispatch(changeChoice(name))
    dispatch(changeScene('choice'))
  }
  return (
    <p>
      {commaSeparateComponents(
        choices.map((choice) => {
          return <a onClick={handleNextFn(choice.name)}>{choice.title}</a>
        }),
        'or',
      )}
    </p>
  )
}

export const EntityItemCheckListView = ({
  entityName,
}: {
  entityName: string
}) => {
  const { state, dispatch } = useGame()
  const object = findEntity(state)(entityName)
  const itemChecks = object.tags.reduce((sum, tag) => {
    const [_, name] = tag.match(/^item-check:([^:]+)$/) || []
    if (!name) {
      return sum
    }
    const itemCheck = state.itemChecks.filter((c) => c.name === name)[0]!
    if (itemCheck.conditionTag) {
      const hasTag = tagExitsGlobally(state)(itemCheck.conditionTag)
      return hasTag ? [...sum, itemCheck] : sum
    } else {
      return [...sum, itemCheck]
    }
  }, [])
  const handleNextFn = (name) => (event) => {
    dispatch(changeEntity(entityName))
    dispatch(changeItemCheck(name))
    dispatch(changeScene('item-check'))
  }
  return (
    <p>
      {commaSeparateComponents(
        itemChecks.map((itemCheck) => (
          <a onClick={handleNextFn(itemCheck.name)}>{itemCheck.title}</a>
        )),
        'or',
      )}
    </p>
  )
}

export const EntityPartyCheckListView = ({
  entityName,
}: {
  entityName: string
}) => {
  const { state, dispatch } = useGame()
  const object = findEntity(state)(entityName)
  const partyChecks = object.tags.reduce((sum, tag) => {
    const [_, name] = tag.match(/^party-check:([^:]+)$/) || []
    if (!name) {
      return sum
    }
    const partyCheck = state.partyChecks.filter((c) => c.name === name)[0]!
    if (partyCheck.conditionTag) {
      const hasTag = tagExitsGlobally(state)(partyCheck.conditionTag)
      return hasTag ? [...sum, partyCheck] : sum
    } else {
      return [...sum, partyCheck]
    }
  }, [])
  const handleNextFn = (name) => (event) => {
    dispatch(changeEntity(entityName))
    dispatch(changeItemCheck(name))
    dispatch(changeScene('party-check'))
  }
  return (
    <p>
      {commaSeparateComponents(
        partyChecks.map((itemCheck) => (
          <a onClick={handleNextFn(itemCheck.name)}>{itemCheck.title}</a>
        )),
        'or',
      )}
    </p>
  )
}

export const EntityBattleCheckListView = ({
  entityName,
}: {
  entityName: string
}) => {
  const { state, dispatch } = useGame()
  const object = findEntity(state)(entityName)
  const battleChecks = object.tags.reduce((sum, tag) => {
    const [_, name] = tag.match(/^battle-check:([^:]+)$/) || []
    if (!name) {
      return sum
    }
    const battleCheck = state.partyChecks.filter((c) => c.name === name)[0]!
    if (battleCheck.conditionTag) {
      const hasTag = tagExitsGlobally(state)(battleCheck.conditionTag)
      return hasTag ? [...sum, battleCheck] : sum
    } else {
      return [...sum, battleCheck]
    }
  }, [])
  const handleNextFn = (name) => (event) => {
    dispatch(changeEntity(entityName))
    dispatch(changeItemCheck(name))
    dispatch(changeScene('battle-check'))
  }
  return (
    <p>
      {commaSeparateComponents(
        battleChecks.map((itemCheck) => (
          <a onClick={handleNextFn(itemCheck.name)}>{itemCheck.title}</a>
        )),
        'or',
      )}
    </p>
  )
}

export const EntitySkillCheckListView = ({
  entityName,
}: {
  entityName: string
}) => {
  const { state, dispatch } = useGame()
  const object = findEntity(state)(entityName)
  const data = object.tags.reduce((sum, tag) => {
    const [_, name] = tag.match(/^skill-check:([^:]+)$/) || []
    if (!name) {
      return sum
    }
    const skillCheck = state.skillChecks.filter((sc) => sc.name === name)[0]!
    if (skillCheck.conditionTag) {
      const hasTag = tagExitsGlobally(state)(skillCheck.conditionTag)
      return hasTag ? [...sum, { name, title: skillCheck.title }] : sum
    } else {
      return [...sum, { name, title: skillCheck.title }]
    }
  }, [])
  const handleNextFn = (name) => (event) => {
    dispatch(changeEntity(entityName))
    dispatch(changeSkillCheck(name))
    dispatch(changeScene('skill-check'))
  }
  return (
    <p>
      {commaSeparateComponents(
        data.map(({ name, title }) => (
          <a onClick={handleNextFn(name)}>{title}</a>
        )),
        'or',
      )}
    </p>
  )
}

export const EntityCharacteristics = ({
  entityName,
}: {
  entityName: string
}) => {
  const { state } = useGame()
  const entity = findEntity(state)(entityName)
  const characteristicData = Object.keys(entity.characteristics || {}).map(
    (name) => {
      const label = state.characteristicLabels[name]
      const value = entity.characteristics[name]
      const bonus = Math.max(value - 7, -2)
      return { name, label, value, bonus }
    },
  )
  return characteristicData.length > 0 ? (
    <div>
      <h4>Characteristics</h4>
      {characteristicData.map(({ name, label, value, bonus }) => (
        <div key={name}>
          <span style={{ fontWeight: 'bold', marginRight: '0.5em' }}>
            {label}
          </span>{' '}
          {value} {`(${bonus})`}
        </div>
      ))}
    </div>
  ) : null
}

export const EntitySkills = ({ entityName }: { entityName: string }) => {
  const { state } = useGame()
  const entity = findEntity(state)(entityName)
  const skillData = Object.keys(entity.skills || {}).map((name) => {
    const label = state.skillLabels[name]
    const value = entity.skills[name]
    return { name, label, value }
  })
  return skillData.length > 0 ? (
    <div>
      <h4>Skills</h4>
      {skillData.map(({ name, label, value }) => (
        <div key={name}>
          <span style={{ fontWeight: 'bold', marginRight: '0.7em' }}>
            {label}
          </span>{' '}
          {value}
        </div>
      ))}
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

export const EntityStats = ({ entityName }: { entityName: string }) => {
  const { state } = useGame()
  const entity = findEntity(state)(entityName)
  const characteristicData = Object.keys(entity.characteristics || {}).map(
    (name) => {
      const label = state.characteristicLabels[name]
      const value = entity.characteristics[name]
      return { name, label, value }
    },
  )
  const skillData = Object.keys(entity.skills || {}).map((name) => {
    const label = state.skillLabels[name]
    const value = entity.skills[name]
    return { name, label, value }
  })
  return (
    <>
      {characteristicData.length > 0 || skillData.length > 0 ? (
        <div className="entity-stats">
          <EntityCharacteristics entityName={entityName} />
          <EntitySkills entityName={entityName} />
          <EntityInventory entityName={entityName} />
        </div>
      ) : null}
    </>
  )
}

export const EntitySubview = ({ entityName }: { entityName: string }) => {
  return (
    <>
      <EntityDescriptionView entityName={entityName} />
      <EntityChoiceListView entityName={entityName} />
      <EntityDialogueView entityName={entityName} />
      <EntityItemCheckListView entityName={entityName} />
      <EntityPartyCheckListView entityName={entityName} />
      <EntityBattleCheckListView entityName={entityName} />
      <EntitySkillCheckListView entityName={entityName} />
      <EntityStats entityName={entityName} />
    </>
  )
}
