import { changeChoice, changeDialogue, changeItemCheck, changeScene, changeSkillCheck } from "../actions"
import { useGame } from "../context"
import { tagExitsGlobally } from "../helpers"
import { capitalize, commaSeparateComponents } from "../utils"

export const EntityDescriptionView = ({ entityName }: { entityName: string }) => {
  const { state } = useGame()
  const entity = state.entities.filter((entity) => entity.name === entityName)[0]!
  const descriptions = entity.tags.reduce((sum, tag) => {
    const [_, name] = tag.match(/^description:(.*)$/) || []
    return !name ? sum : [...sum, ...state.descriptions.filter((d) => d.name === name)]
  }, [])
  return (
    descriptions.map((description) => {
      if (description.conditionTag) {
        const hasTag = tagExitsGlobally(state)(description.conditionTag)
        return hasTag ? <p key={description.name}>{description.message}</p> : null
      } else {
        return <p key={description.name}>{description.message}</p>
      }
    })
  )
}

export const EntityConversibleView = ({ entityName }: { entityName: string }) => {
  const { state, dispatch } = useGame()
  const entity = state.entities.filter((e) => e.name === entityName)[0]!
  const dialogueNames = entity.tags.reduce(
    (sum, tag) => {
      const match = tag.match(/^dialogue:([^:]+):(\d+)$/)
      const name = match?.[1]
      return name ? [...sum, name] : sum
    },
    []
  )
  const dialogues = dialogueNames.map((name) => state.dialogues.filter((d) => d.name === name)[0]!)
  const handleNextFn = (dialogue) => (event) => {
    dispatch(changeDialogue(dialogue.name))
    dispatch(changeScene('dialogue'))
  }
  return (
    dialogues.length > 0
    ? (
      <p>
        Would you like to talk about
        {' '}
        {
          commaSeparateComponents(
            dialogues.map((dialogue) => (
              <a key={dialogue.name} onClick={handleNextFn(dialogue)}>{dialogue.topic}</a>
            )),
            'or'
          )
        }?
      </p>
    )
    : null
  )
}

export const EntityChoiceListView = ({ entityName }: { entityName: string }) => {
  const { state, dispatch } = useGame()
  const object = state.entities.filter((e) => e.name === entityName)[0]!
  const choices = object.tags.reduce(
    (sum, tag) => {
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
    },
    []
  )
  const handleNextFn = (name) => (event) => {
    dispatch(changeChoice(name))
    dispatch(changeScene('choice'))
  }
  return (
    <p>
      {
        commaSeparateComponents(
          choices.map((choice) => {
            return <a onClick={handleNextFn(choice.name)}>{choice.title}</a>
          }),
          'or'
        )
      }
    </p>
  )
}

export const EntityItemCheckListView = ({ entityName }: { entityName: string }) => {
  const { state, dispatch } = useGame()
  const object = state.entities.filter((e) => e.name === entityName)[0]!
  const itemChecks = object.tags.reduce(
    (sum, tag) => {
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
    },
    []
  )
  const handleNextFn = (name) => (event) => {
    dispatch(changeItemCheck(name))
    dispatch(changeScene('item-check'))
  }
  return (
    <p>
      {
        commaSeparateComponents(
          itemChecks.map((itemCheck) => (
            <a onClick={handleNextFn(itemCheck.name)}>{itemCheck.title}</a>
          )),
          'or'
        )
      }
    </p>
  )
}

export const EntitySkillCheckListView = ({ entityName }: { entityName: string }) => {
  const { state, dispatch } = useGame()
  const object = state.entities.filter((e) => e.name === entityName)[0]!
  const data = object.tags.reduce(
    (sum, tag) => {
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
    },
    []
  )
  const handleNextFn = (name) => (event) => {
    dispatch(changeSkillCheck(name))
    dispatch(changeScene('skill-check'))
  }
  return (
    <p>
      {
        commaSeparateComponents(
          data.map(({ name, title }) => (
            <a onClick={handleNextFn(name)}>{title}</a>
          )),
          'or'
        )
      }
    </p>
  )
}

export const EntityView = () => {
  const { state, dispatch } = useGame()
  const handleLeave = () => {
    dispatch(changeScene('room'))
  }
  const entity = state.entities.filter((e) => e.name === state.entityName)[0]!
  return (
    <>
      <h2>{capitalize(entity.title)}</h2>
      <EntityDescriptionView entityName={state.entityName} />
      <EntityChoiceListView entityName={state.entityName} />
      <EntityConversibleView entityName={state.entityName} />
      <EntityItemCheckListView entityName={state.entityName} />
      <EntitySkillCheckListView entityName={state.entityName} />
      <p>
        <a onClick={handleLeave}>Go Back</a>.
      </p>
    </>
  )
}