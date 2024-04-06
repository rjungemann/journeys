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
// @ts-ignore
import playLight from './assets/play-light.svg'
// @ts-ignore
import playDark from './assets/play-dark.svg'
import { useGame, useTheme } from '../context'
import { changeScene } from '../actions'

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
  const returnToGame = () => {
    dispatch(changeScene('room'))
  }
  const toggleInspector = () => {
    if (state.sceneName === 'inspector') {
      dispatch(changeScene(state.previousSceneName))
    } else {
      dispatch(changeScene('inspector'))
    }
  }
  const toggleEdit = () => {
    dispatch(changeScene(state.sceneName === 'edit' ? state.previousSceneName : 'edit'))
  }
  return (
    <nav style={{ flexGrow: 0 }}>
      <a onClick={returnToGame} title="Return to Game">
        {
          theme === 'dark'
          ? <img src={playLight} width={buttonWidth} height={buttonHeight} />
          : <img src={playDark} width={buttonWidth} height={buttonHeight} />
        }
      </a>
      {' '}
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

export const HeadView = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Logo />
      <Nav />
    </div>
  )
}