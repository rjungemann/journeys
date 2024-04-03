import { Dispatch, ReactNode, createContext, useContext, useEffect, useReducer } from "react"
import { Game } from "./data"
import { Action } from "./actions"
import { gameReducer } from "./reducers"
import { defaultGame } from "./defaultGame"

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