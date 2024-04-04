import { changeDialogue, changeScene, changeSkillCheck } from "../actions"
import { useGame } from "../context"
import { capitalize, commaSeparateComponents, hasMatchingTag, matchTags } from "../utils"

export const EntityTidbitsView = () => {
  const { state, dispatch } = useGame()
  const entity = state.entities.filter((entity) => entity.name === state.entityName)[0]!
  const descriptions = entity.tags.reduce((sum, tag) => {
    const [_, name] = tag.match(/^description:(.*)$/) || []
    if (!name) {
      return sum
    }
    return [...sum, ...state.descriptions.filter((d) => d.name === name)]
  }, [])
  return (
    <>
      {
        descriptions.map((description) => {
          if (description.conditionTag) {
            const hasTag = hasMatchingTag(state, description.conditionTag)
            if (hasTag) {
              return <p key={description.name}>{description.message}</p>
            } else {
              return null
            }
          } else {
            return <p key={description.name}>{description.message}</p>
          }
        })
      }
    </>
  )
}

export const ConversibleView = () => {
  const { state, dispatch } = useGame()
  const entity = state.entities.filter((e) => e.name === state.entityName)[0]!
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
    <>
      {
        dialogues.length > 0
        ? (
          <p>
            Would you like to talk about
            {' '}
            {
              commaSeparateComponents(
                dialogues.map((dialogue) => {
                  return (
                    <a key={dialogue.name} onClick={handleNextFn(dialogue)}>{dialogue.topic}</a>
                  )
                }),
                'or'
              )
            }?
          </p>
        )
        : null
      }
    </>
  )
}

export const SkillCheckChoiceView = () => {
  const { state, dispatch } = useGame()
  const object = state.entities.filter((e) => e.name === state.entityName)[0]!
  const data = object.tags.reduce(
    (sum, tag) => {
      const [_, name] = tag.match(/^skill-check:([^:]+)$/) || []
      if (!name) {
        return sum
      }
      const skillCheck = state.skillChecks.filter((sc) => sc.name === name)[0]!
      if (skillCheck.conditionTag) {
        const hasTag = hasMatchingTag(state, skillCheck.conditionTag)
        if (hasTag) {
          return [...sum, { name, title: skillCheck.title }]
        } else {
          return sum
        }
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
    <>
      {
        commaSeparateComponents(
          data.map(({ name, title }) => {
            return (
              <a onClick={handleNextFn(name)}>{title}</a>
            )
          }),
          'or'
        )
      }
    </>
  )
}

export const EntityView = () => {
  const { state, dispatch } = useGame()
  const handleLeave = (event) => {
    dispatch(changeScene('room'))
  }
  if (state.sceneName !== 'entity') {
    return null
  }
  if (!state.entityName) {
    // TODO
    return null
  }
  const entity = state.entities.filter((e) => e.name === state.entityName)[0]!
  return (
    <>
      <h2>{capitalize(entity.title)}</h2>
      <EntityTidbitsView />
      <ConversibleView />
      <SkillCheckChoiceView />
      <p>
        <a onClick={handleLeave}>Go Back</a>.
      </p>
    </>
  )
}