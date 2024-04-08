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
import codeLight from './assets/code-light.svg'
// @ts-ignore
import codeDark from './assets/code-dark.svg'
// @ts-ignore
import playLight from './assets/play-light.svg'
// @ts-ignore
import playDark from './assets/play-dark.svg'
// @ts-ignore
import recordLight from './assets/record-light.svg'
// @ts-ignore
import recordDark from './assets/record-dark.svg'
// @ts-ignore
import rewindLight from './assets/rewind-light.svg'
// @ts-ignore
import rewindDark from './assets/rewind-dark.svg'
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
  const { state, dispatch, resetStorage, saveState, restoreState } = useGame()
  const { theme, setTheme } = useTheme()
  const [buttonWidth, buttonHeight] = [24, 24]
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
      {' '}
      <a onClick={() => saveState()} title="Save the game state for restoring later.">
        {
          theme === 'dark'
          ? <img src={recordLight} width={buttonWidth} height={buttonHeight} />
          : <img src={recordDark} width={buttonWidth} height={buttonHeight} />
        }
      </a>
      {' '}
      <a onClick={() => restoreState()} title="Restore the saved game state.">
        {
          theme === 'dark'
          ? <img src={rewindLight} width={buttonWidth} height={buttonHeight} />
          : <img src={rewindDark} width={buttonWidth} height={buttonHeight} />
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