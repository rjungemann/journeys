import { DialogueView } from "./DialogueView"
import { EntityView } from "./EntityView"
import { InspectorView } from "./InspectorView"
import { RoomView } from "./RoomView"
import { SkillCheckView } from "./SkillCheckView"
import { useGame, useTheme } from "../context"
import { ChoiceView } from "./ChoiceView"
import { ItemCheckView } from "./ItemCheckView"
// @ts-ignore
import logoLight from './assets/logo-light-2x.png'
// @ts-ignore
import logoDark from './assets/logo-dark-2x.png'
// @ts-ignore
import sunDark from './assets/sun-dark.svg'
// @ts-ignore
import sunLight from './assets/sun-light.svg'
// @ts-ignore
import bombDark from './assets/bomb-dark.svg'
// @ts-ignore
import bombLight from './assets/bomb-light.svg'
// @ts-ignore
import editLight from './assets/edit-light.svg'
// @ts-ignore
import editDark from './assets/edit-dark.svg'
// @ts-ignore
import codeLight from './assets/code-light.svg'
// @ts-ignore
import codeDark from './assets/code-dark.svg'
import { useWanderingBehaviors } from "../behaviors"
import { CombatView } from "./CombatView"
import { changeEditMode, changeScene, showInspector } from "../actions"

export const Logo = () => {
  const { theme } = useTheme()
  const [width, height] = [515/3, 80/3]
  return (
    <a>
      <img src={theme === 'dark' ? logoDark : logoLight} width={width} height={height} />
    </a>
  )
}

export const Nav = () => {
  const { state, dispatch, resetStorage } = useGame()
  const { theme, setTheme } = useTheme()
  const [buttonWidth, buttonHeight] = [28, 28]
  const toggleInspector = (event) => {
    if (state.sceneName === 'inspector') {
      dispatch(changeScene(state.previousSceneName!))
    } else {
      dispatch(changeScene('inspector'))
    }
  }
  const toggleEdit = (event) => {
    dispatch(changeEditMode(!state.editMode))
  }
  return (
    <nav style={{ flexGrow: 0 }}>
      <a onClick={toggleInspector} title="Show or hide debug info">
        {
          theme === 'dark'
          ? <img src={codeLight} width={buttonWidth} height={buttonHeight} />
          : <img src={codeDark} width={buttonWidth} height={buttonHeight} />
        }
      </a>
      {' '}
      <a onClick={toggleEdit} title="Toggle Edit Mode">
        {
          theme === 'dark'
          ? <img src={editLight} width={buttonWidth} height={buttonHeight} />
          : <img src={editDark} width={buttonWidth} height={buttonHeight} />
        }
      </a>
      {' '}
      <a onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} title="Toggle between dark mode and light mode">
        {
          theme === 'dark'
          ? <img src={sunLight} width={buttonWidth} height={buttonHeight} />
          : <img src={sunDark} width={buttonWidth} height={buttonHeight} />
        }
      </a>
      {' '}
      <a onClick={() => resetStorage()} title="Reset all of the game state. Your progress will be lost!">
        {
          theme === 'dark'
          ? <img src={bombLight} width={buttonWidth} height={buttonHeight} />
          : <img src={bombDark} width={buttonWidth} height={buttonHeight} />
        }
      </a>
    </nav>
  )
}

export const GameView = () => {
  const { state } = useGame()
  const { theme } = useTheme()
  useWanderingBehaviors()

  return (
    <div className={`theme-${theme}`}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Logo />
        <Nav />
      </div>
      {state.sceneName === 'entity' ? <EntityView /> : null}
      {state.sceneName === 'dialogue' ? <DialogueView /> : null}
      {state.sceneName === 'choice' ? <ChoiceView /> : null}
      {state.sceneName === 'room' ? <RoomView /> : null}
      {state.sceneName === 'item-check' ? <ItemCheckView /> : null}
      {state.sceneName === 'skill-check' ? <SkillCheckView /> : null}
      {state.sceneName === 'combat' ? <CombatView /> : null}
      {state.sceneName === 'inspector' ? <InspectorView /> : null}
    </div>
  )
}