import { GameProvider, ThemeProvider } from './game/context'
import { GameView } from './game/views/GameView'
import { ErrorBoundary } from './game/views/ErrorBoundary'
import { T } from './game/views/T'

export const App = () => {
  return (
    <ThemeProvider>
      <GameProvider>
        <ErrorBoundary>
          <p>
            <T path="sample.message" locals={{ name: 'Alice' }} />
          </p>
          <GameView />
        </ErrorBoundary>
      </GameProvider>
    </ThemeProvider>
  )
}
