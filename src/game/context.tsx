import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { Game } from './data'
import { Action, changeState, resetState } from './actions'
import { gameReducer } from './reducers'
import { defaultGame } from './defaultGame'

// -----------
// GameContext
// -----------

export type GameContext = {
  state: Game
  dispatch: Dispatch<Action>
  resetStorage: () => void
  saveState: () => void
  restoreState: () => void
  clearState: () => void
}

export const GAME_KEY = 'journeys'
export const SAVED_STATE_KEY = 'journeys:saved-state'

export const GameContext = createContext<GameContext | null>(null)

export const GameConsumer = GameContext.Consumer

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const key = GAME_KEY
  const storedState = localStorage.getItem(key)
  const startingState = storedState ? JSON.parse(storedState) : defaultGame
  const [state, dispatch] = useReducer(gameReducer, startingState)
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [state])
  const resetStorage = () => {
    dispatch(resetState())
  }
  const saveState = () => {
    localStorage.setItem(SAVED_STATE_KEY, JSON.stringify(state))
  }
  const restoreState = () => {
    const savedState = JSON.parse(
      localStorage.getItem(SAVED_STATE_KEY) || 'null',
    )
    if (savedState) {
      dispatch(changeState(savedState))
    }
  }
  const clearState = () => {
    localStorage.removeItem(SAVED_STATE_KEY)
  }
  return (
    <GameContext.Provider
      value={{
        state,
        dispatch,
        resetStorage,
        saveState,
        restoreState,
        clearState,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export const useGame = (): GameContext => {
  const { state, dispatch, resetStorage, saveState, restoreState, clearState } =
    useContext(GameContext)!
  return { state, dispatch, resetStorage, saveState, restoreState, clearState }
}

// ------------
// ThemeContext
// ------------

type ThemeContext = {
  theme: string
  setTheme: (theme: string) => void
}

export const THEME_KEY = 'theme'
export const THEME_KEY_LIGHT = 'light'
export const THEME_KEY_DARK = 'dark'

export const ThemeContext = createContext<ThemeContext | null>(null)

export const ThemeConsumer = ThemeContext.Consumer

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const key = THEME_KEY
  const storedValue = localStorage.getItem(key)
  let defaultTheme = THEME_KEY_LIGHT
  if (storedValue) {
    if (storedValue === THEME_KEY_DARK) {
      defaultTheme = THEME_KEY_DARK
    }
  } else if (window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      defaultTheme = THEME_KEY_DARK
    }
  }

  const [theme, setTheme] = useState<string>(defaultTheme)
  useEffect(() => {
    localStorage.setItem(key, theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext)!
  return { theme, setTheme }
}
