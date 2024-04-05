import { DialogueView } from "./DialogueView"
import { EntityView } from "./EntityView"
import { InspectorView } from "./InspectorView"
import { RoomView } from "./RoomView"
import { SkillCheckView } from "./SkillCheckView"
import { useGame, useTheme } from "../context"
import { ChoiceView } from "./ChoiceView"
import { ItemCheckView } from "./ItemCheckView"
// @ts-ignore
import logoLight from './logo-light-2x.png'
// @ts-ignore
import logoDark from './logo-dark-2x.png'
// @ts-ignore
import gearSolidDark from './gear-solid-dark.svg'
// @ts-ignore
import gearSolidLight from './gear-solid-light.svg'
// @ts-ignore
import sunDark from './sun-dark.svg'
// @ts-ignore
import sunLight from './sun-light.svg'
// @ts-ignore
import bombDark from './bomb-dark.svg'
// @ts-ignore
import bombLight from './bomb-light.svg'
import { useWanderingBehaviors } from "../behaviors"
import { CombatView } from "./CombatView"
import { showInspector } from "../actions"

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
    dispatch(showInspector(!state.showInspector))
  }
  return (
    <nav style={{ flexGrow: 0 }}>
      <a onClick={toggleInspector} title="Show or hide debug info">
        {
          theme === 'dark'
          ? <img src={gearSolidLight} width={buttonWidth} height={buttonHeight} />
          : <img src={gearSolidDark} width={buttonWidth} height={buttonHeight} />
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
      <InspectorView />
    </div>
  )
}