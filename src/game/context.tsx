import { Dispatch, ReactNode, createContext, useContext, useEffect, useReducer, useState } from "react"
import { Game } from "./data"
import { Action } from "./actions"
import { gameReducer } from "./reducers"
import { defaultGame } from "./defaultGame"

// -----------
// GameContext
// -----------

type GameContext = {
  state: Game
  dispatch: Dispatch<Action>
}

export const GameContext = createContext<GameContext | null>(null)

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const key = 'journeys'
  const storedState = localStorage.getItem(key)
  const startingState = storedState ? JSON.parse(storedState) : defaultGame
  const [state, dispatch] = useReducer(gameReducer, startingState)
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [state])
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => {
  const { state, dispatch } = useContext(GameContext)!
  return { state, dispatch }
}

// ------------
// ThemeContext
// ------------

type ThemeContext = {
  theme: string,
  setTheme: (theme: string) => void
}

export const ThemeContext = createContext<ThemeContext | null>(null)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const key = 'theme'
  const storedValue = localStorage.getItem(key)
  let defaultTheme = 'light'
  if (storedValue) {
    if (storedValue === 'dark') {
      defaultTheme = 'dark'
    }
  } else if (window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      defaultTheme = 'dark'
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