import { Dispatch, ReactNode, createContext, useContext, useReducer } from "react"
import { Game } from "./data"
import { Action } from "./actions"
import { gameReducer } from "./reducers"
import { defaultGame } from "./defaultGame"

export const GameContext = createContext<{ state: Game, dispatch: Dispatch<Action> } | null>(null)

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, defaultGame)
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