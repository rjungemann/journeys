import { GameProvider, ThemeProvider } from './game/context'
import { GameView } from './game/views/GameView'
import { ErrorBoundary } from './game/views/ErrorBoundary'

export const App = () => {
  return (
    <ThemeProvider>
      <GameProvider>
        <ErrorBoundary>
          <GameView />
        </ErrorBoundary>
      </GameProvider>
    </ThemeProvider>
  )
}
