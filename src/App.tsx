import { MDXProvider } from '@mdx-js/react'
import { GameConsumer, GameProvider, ThemeProvider } from "./game/context"
import { GameView } from "./game/views/GameView"
import { ErrorBoundary } from './game/views/ErrorBoundary'

const mdxComponents = {
  
}

export const App = () => {
  return (
    <ThemeProvider>
      <MDXProvider components={mdxComponents}>
        <GameProvider>
          <ErrorBoundary>
            <GameView />
          </ErrorBoundary>
        </GameProvider>
      </MDXProvider>
    </ThemeProvider>
  )
}
